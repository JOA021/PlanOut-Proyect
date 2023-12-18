import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, RouterModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  rutaImagen= 'assets/logo.png';
}
