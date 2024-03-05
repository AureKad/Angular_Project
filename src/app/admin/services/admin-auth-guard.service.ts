import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map, switchMap } from 'rxjs';
import { user } from '@angular/fire/auth';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
    return this.auth.appUser$.pipe(
      map(appUser => appUser!.isAdmin)
    )
  }
}
