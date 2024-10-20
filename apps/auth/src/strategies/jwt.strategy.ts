import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { TokenPayload } from '../interfaces/token-payload';
interface RpcRequest {
  Authentication: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configServie: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request | RpcRequest) =>
          (request as Request)?.cookies?.Authentication ||
          (request as RpcRequest).Authentication ||
          (request as Request).headers?.Authentication ||
          (request as Request).headers?.authentication,
        ,
      ]),
      secretOrKey: configServie.get<string>('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    return this.usersService.getUser({ _id: userId });
  }
}
