import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../../Componentes/navbar/navbar.component';
import { FooterComponent } from '../../Componentes/footer/footer.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/users.models';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm: any;

  constructor() {
    this.profileForm = new FormGroup({
      nombre: new FormControl(),
      apellido: new FormControl(),
      edad: new FormControl(),
      relacion: new FormControl(),
      nacionalidad: new FormControl(),
      email: new FormControl()
    });
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      return;
    }
    // Aquí puedes agregar la lógica para manejar la actualización del perfil.
    console.log(this.profileForm.value);
  }
}
