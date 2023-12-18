import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css'
})
export class ForgetComponent {
  rutaImagen= 'assets/logo.png';
}
