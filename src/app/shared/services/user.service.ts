import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, object } from '@angular/fire/database';
import { child, get, getDatabase, ref, update } from 'firebase/database';
import { Observable, filter, map } from 'rxjs';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: Database = getDatabase()) {
  }

  save(user: User) {
    update(ref(this.db, '/users/' + user.uid), {
      name: user.displayName,
      email: user.email
    })
  }

  get(uid: string): Promise<AppUser> {
    return get(child(ref(this.db), '/users/' + uid)).then((snapshot) => {
      return snapshot.val()
    })
    
  }
}
