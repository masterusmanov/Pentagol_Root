import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_LOCAL_HOST}/api/users/activate/${admin.activationLink}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcome to Electronics store App! Confirm your Email',
      template: './confirmation',
      context: {
        name: admin.first_name,
        url,
      }
    });
  }
}
