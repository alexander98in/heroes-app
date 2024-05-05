import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


const checkAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( (isAuthenticated) => console.log('Authenticated', isAuthenticated) ),
      tap( (isAuthenticated) => {
        if(isAuthenticated) {
          router.navigate(['/']);
        }
      }),
      map( isAuthenticated => !isAuthenticated ),
    );
};

export const canMatchPublicGuard: CanMatchFn = (route: Route, segments: UrlSegment[]): boolean | Observable<boolean> => {
  console.log('CanMatch');
  console.log({route, segments});

  return checkAuthStatus();
};

export const canActivatePublicGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> => {
  console.log('CanActivate');
  console.log({route, state});

  return checkAuthStatus();
};

