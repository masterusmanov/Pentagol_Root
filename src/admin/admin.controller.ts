import { Controller, Get, Post, Body, UseGuards, Param, Res, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { Admin } from './models/admin.model';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { AdminSelfGuard } from '../guards/admin-self.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@ApiTags('Admin')
@Controller('users')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Register admin'})
  @ApiResponse({ status: 201, type: Admin})
  @Post('signup')
  registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ){
    return this.adminService.registration(createAdminDto, res);
  };

  @ApiOperation({ summary: 'Login admin'})
  @ApiResponse({ status: 200, type: Admin})
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ){
    return this.adminService.login(loginAdminDto, res);
  };
  
  @ApiOperation({summary: 'Logout admin'})
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status: 200, type: Admin})
  @HttpCode(HttpStatus.OK)
  @Post("signout")
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough:true}) res:Response
  ){    
    return this.adminService.logout(refreshToken, res)
  };

  @ApiOperation({summary: 'Activate admin'})
  @ApiResponse({status: 200, type: [Admin]})
  @Get('activate/:link')
  activate(@Param('link') link: string){
    return this.adminService.activate(link);
  };

  @ApiOperation({summary: 'For ID refresh token'})
  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status: 200, type: [Admin]})
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response
  ){
    return this.adminService.refreshToken(+id, refreshToken, res);
  };

  @ApiOperation({summary: "Get all admins"})
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: "Get one admin"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }
  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({summary: "Delete admin"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
