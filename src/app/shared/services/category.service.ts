import { Injectable } from '@angular/core';
import { Database, object } from '@angular/fire/database';
import { child, get, getDatabase, orderByChild, query, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: Database = getDatabase()) { }

  getAll(){
    return get(query(ref(this.db, '/categories'), orderByChild('name'))).then((snapshot) => {
      return snapshot.val()
    })
  }
} 


