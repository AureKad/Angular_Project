import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { authState } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { GoogleAuthProvider, User, getAuth, signInWithRedirect, signOut } from 'firebase/auth';
import { Observable, of, switchMap } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthService {
  user$: Observable<User | null>;
  auth: any;

  constructor(
    private userService: UserService,
    private afApp: FirebaseApp,
    private route: ActivatedRoute) { 
    this.user$ = authState(getAuth(this.afApp))
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl)

    signInWithRedirect(getAuth(), new GoogleAuthProvider())
  }

  logout() {
    signOut(getAuth())
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
        switchMap(user => {
          if (user) return this.userService.get(user.uid);
          return of(null)
        }
      )
    )
  }
}



