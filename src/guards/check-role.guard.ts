import { CanActivate, ExecutionContext, Injectable, NotAcceptableException } from "@nestjs/common";
import { Roles } from "@decorators";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { RequestInterface } from './check-auth.guard'

@Injectable()
export class CheckRoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<RequestInterface>();
        const roles = this.reflector.get(Roles, context.getHandler());
        // return true;

        if (!roles || !roles.includes(request.role)) {
            throw new NotAcceptableException(
                "Sizda bu so'rov uchun ruxsat yo'q",
            );
        }
        return true;
    }
}