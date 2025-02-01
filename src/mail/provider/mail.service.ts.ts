import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class MailService {
  constructor(
    //Injecting mailer services from nestjsModules/mailer
    private readonly mailerService: MailerService,
  ) {}

  public async welcomeEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'team.codeland.com',
      subject: `Welcome to the codeland Blog, where all land are code-cultivated`,
      template: './welcome',
      context: {
        name: user.firstName,
        // + '' + user.lastName,
        email: user.email,
        loginUrl: 'http://localhost',
      },
    });
  }
}
