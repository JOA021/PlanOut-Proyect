import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/forget.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css',
})

export class ForgetComponent implements OnInit {
  resetForm: FormGroup;
  passwordMismatch: boolean = false;
  changePasswordSuccess: boolean = false;
  changePasswordError: string = '';
  showVerification: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      newPassword: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)],
      ],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const resetToken = params['token'];

      if (resetToken) {
        localStorage.setItem('resetToken', resetToken);
      } else {
        console.error('No se encontró el token en los parámetros de la URL');
        this.router.navigate(['/error']);
      }
    });
  }

  resetPassword() {
    this.showVerification = true; // Mostrar verificaciones después de presionar Enviar

    if (this.resetForm && !this.passwordMismatch) {
      const newPassword = this.resetForm.get('newPassword')?.value;
      const confirmPassword = this.resetForm.get('confirmPassword')?.value;
      const resetToken = localStorage.getItem('resetToken');

      if (newPassword !== confirmPassword) {
        this.changePasswordSuccess = false;
        this.changePasswordError = 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.';
        return;
      }

      if (resetToken) {
        this.authService.resetPassword(newPassword, resetToken).subscribe({
          next: (response) => {
            console.log(response);
            this.changePasswordSuccess = true;
            localStorage.removeItem('resetToken');
          },
          error: (error) => {
            console.error(error);
            this.changePasswordSuccess = false;
            if (error.name === 'TokenExpiredError') {
              this.changePasswordError = 'El enlace de restablecimiento de contraseña ha caducado.';
            } else if (error.name === 'JsonWebTokenError') {
              this.changePasswordError = 'Token de restablecimiento de contraseña inválido.';
            } else {
              this.changePasswordError = 'Error al actualizar la contraseña. Por favor, inténtalo de nuevo.';
            }
          },
        });
      } else {
        console.error('No se encontró el token en el almacenamiento local');
      }
    } else {
      console.error('El formulario no es válido');
    }
  }
}