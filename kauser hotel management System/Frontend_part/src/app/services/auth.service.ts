import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getRole(): string | null {
    return sessionStorage.getItem('role'); // <-- FIXED KEY
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';  // matches backend
  }
}


