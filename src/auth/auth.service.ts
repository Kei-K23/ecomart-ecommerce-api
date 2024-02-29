import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async login({ email, password }: LoginDto): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(`Invalid email : ${email}`);
    }

    const isAuthPassword = await argon2.verify(user.password, password);

    if (!isAuthPassword) {
      throw new UnauthorizedException(`Invalid password`);
    }

    return {
      accessToken: this.jwt.sign({ userId: user.id }),
    };
  }
}
