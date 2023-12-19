import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../Componentes/navbar/navbar.component';
import { FooterComponent} from '../../Componentes/footer/footer.component';
import { CalendarComponent} from '../../Componentes/calendar/calendar.component';
import { MapaComponent } from '../../Componentes/mapa/mapa.component';
import {Router, RouterOutlet,RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users.models';
import { HttpClientModule } from '@angular/common/http';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule, FormsModule,MapaComponent,NavbarComponent,FooterComponent,CalendarComponent],
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent {
  preferencesForm: FormGroup;

  constructor() {
    this.preferencesForm = new FormGroup({
      location: new FormControl('', Validators.required),
      peopleCount: new FormControl('', Validators.required),
      planType: new FormControl('', Validators.required),
      activityType: new FormControl('', Validators.required),
      additionalPreferences: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (!this.preferencesForm.valid) {
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
    }
        // Aquí puedes manejar la lógica del envío del formulario
    console.log('Form Data:', this.preferencesForm.value);
  }
}
