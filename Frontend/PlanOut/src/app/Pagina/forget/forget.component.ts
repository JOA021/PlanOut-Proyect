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
  
    constructor(
      private authService: AuthService, 
      private fb: FormBuilder, 
      private route: ActivatedRoute, 
      private router: Router) 
      {
      // Crear el FormGroup en el constructor
      this.resetForm = this.fb.group({
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      });
    }
  
    ngOnInit() {
      this.route.params.subscribe(params => {
        const resetToken = params['token'];
    
        if (resetToken) {
          localStorage.setItem('resetToken', resetToken);
        } else {
          console.error('No se encontró el token en los parámetros de la URL');
          this.router.navigate(['/error']); // Redirigir a la página de error si no hay token
        }
      });
    }
  
    resetPassword() {
      if (this.resetForm && !this.passwordMismatch) {
        const newPassword = this.resetForm.get('newPassword')?.value;
        const confirmPassword = this.resetForm.get('confirmPassword')?.value;
        const resetToken = localStorage.getItem('resetToken');
      
          if (resetToken) {
            this.authService.resetPassword(newPassword, resetToken).subscribe({
              next: (response) => {
                console.log(response);
                this.changePasswordSuccess = true;
                localStorage.removeItem('resetToken');
                // Puedes redirigir a otra página de éxito o mostrar un mensaje de éxito aquí
              },
              error: (error) => {
                console.error(error);
                this.changePasswordError =
                  'Error al cambiar la contraseña. Por favor, inténtalo de nuevo.';
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