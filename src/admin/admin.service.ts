import { Injectable, BadRequestException, UnauthorizedException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4, v4 } from 'uuid';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './models/admin.model';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {};

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({
      where: { email: createAdminDto.email },
    });
    if (admin) {
      throw new BadRequestException('Email already exists!');
    };
    if (createAdminDto.password !== createAdminDto.confirmPassword) {
      throw new BadRequestException('Password is not match!');
    };

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newUser = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updatedUser = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activationLink: uniqueKey,
      },
      {
        where: { id: newUser.id },
        returning: true,
      }
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    console.log(updatedUser[1][0])
    await this.mailService.sendUserConfirmation(updatedUser[1][0]);
    const response = {
      message: 'Admin registred',
      admin: updatedUser[1][0],
      tokens,
    };
    return response;
  };

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      email: admin.email
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  };

  async login(loginAdminDto: LoginAdminDto, res: Response){
    const { email, password } = loginAdminDto;
    const admin = await this.adminRepo.findOne({ where: { email } });
    if(!admin){
      throw new UnauthorizedException('Admin not registred');
    };
    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if(!isMatchPass){
      throw new UnauthorizedException('Admin not registred(pass)');
    }
    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedUser = await this.adminRepo.update(
      {hashed_refresh_token: hashed_refresh_token},
        {where: {id: admin.id}, returning: true }
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    const response = {
      message: 'Admin logged in',
      admin: updatedUser[1][0],
      tokens,
    };
    return response;
  };

  async refreshToken(admin_id: number, refresh_token: string, res: Response){
    const decodedToken = this.jwtService.decode(refresh_token);
    if(!admin_id != decodedToken['id']){
      throw new BadRequestException('Admin not found');
    };
    const admin = await this.adminRepo.findOne({ where: { id: admin_id } });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('Admin not found!');
    }
    const tokenMatch = await bcrypt.compare(refresh_token, admin.hashed_refresh_token);
    if(!tokenMatch){
      throw new ForbiddenException('Forbidden');
    };
    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedUser = await this.adminRepo.update(
      {hashed_refresh_token: hashed_refresh_token},
      {where: {id: admin.id}, returning: true}
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    const response = {
      message: 'Admin refreshed',
      admin: updatedUser[1][0],
      tokens
    };
    return response;
  };

  async logout(refreshToken: string, res: Response){
    const userData  = await this.jwtService.verify(refreshToken,{
      secret: process.env.REFRESH_TOKEN_KEY
    });
    if(!userData){
      throw new ForbiddenException('Admin not found');
    };
    const updatedUser = await this.adminRepo.update(
      {hashed_refresh_token: null},
      {where: {id: userData.id}, returning: true},
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      admin: updatedUser[1][0]
    };
    return response;
  };  

  async activate(link: string){
    if(!link){
      throw new BadRequestException('Activation link not found');
    }
    const updatedUser = await this.adminRepo.update(
      {is_active: true},
      {where:
         {
          activationLink: link, 
          is_active: true
        }, 
          returning: true
        }
    );
    if(!updatedUser[1][0]){
      throw new BadRequestException('Admin already activated');
    }
        
    const response = {
      message: 'admin activated  successfully',
      admin: updatedUser
    };
    return response;
  };
 
  async findAll() {
    const allAdmin = await this.adminRepo.findAll({include: {all: true}});
    if(!allAdmin){
      throw new HttpException('No Admin list available', HttpStatus.NOT_FOUND)
    };
    return allAdmin;
  }

  async findOne(id: number) {
    const oneCustmer = await this.adminRepo.findOne({where: {id}});
    if(!oneCustmer){
      throw new HttpException('No Admin information found', HttpStatus.NOT_FOUND)
    };
    return oneCustmer;
  }

  async remove(id: number) {
    const deleteAdmin =  await this.adminRepo.destroy({where: {id}});
    if(!deleteAdmin){
      throw new HttpException('No admin information found', HttpStatus.NOT_FOUND)
    };
    return deleteAdmin;
  }
}
