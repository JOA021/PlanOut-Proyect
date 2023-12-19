import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users.models';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  rutaImagen = 'assets/logo.png';

  constructor(private userService: UserService, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    const newUser: User = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.userService.register(newUser).subscribe({
      next: (user) => {
        console.log(user);
        // Handle successful registration
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
        // Handle registration error
      }
    });
  }
}
