import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class JwtAuthGuard extends AuthGuard('jwt') {
//   handleRequest(
//     err: any,
//     user: any,
//     info: any,
//     context: ExecutionContext,
//     status: any,
//   ) {
//     if (info instanceof JsonWebTokenError) {
//       throw new UnauthorizedException('Invalid Token!');
//     }

//     return super.handleRequest(err, user, info, context, status);
//   }

//   async canActivate(
//     context: ExecutionContext,
//   ): Promise<any>{
//     try {
//       const a= await  super.canActivate(context);
//       return a ;
//     } catch (error) {
//       context.switchToHttp().getResponse().send("fuck you")
//       throw new UnauthorizedException('Invalid Token!');
//     }
//   }
}
