import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/newpass/reset-password';
  constructor(private http: HttpClient) { }

  resetPassword(newPassword: string, resetToken: string) {
    const data = { newPassword, resetToken };
    return this.http.post(this.apiUrl, data);
  }
}