import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, GuardResult, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';


export const UserGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<GuardResult> => {
  const userService = inject(UserService);
  const router = inject(Router);
  const isValidToken = await userService.validToken();
  if (isValidToken) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};