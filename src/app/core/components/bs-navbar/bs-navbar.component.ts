import { Component, Injectable, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { authState } from '@angular/fire/auth';
import { Auth, User, getAuth, signOut } from 'firebase/auth';
import { Observable, map } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { onValue } from 'firebase/database';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css'
})
export class BsNavbarComponent implements OnInit {
  appUser!: AppUser | null ;
  cart!: ShoppingCart;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    
    let cartRef = await this.cartService.getCartRef()
    onValue(cartRef, (snapshot) => {
      this.cart = new ShoppingCart(snapshot.val().items)
    }) 
  }

  logout() {
    this.auth.logout()
  }
}
