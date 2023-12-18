import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../Componentes/navbar/navbar.component';
import { FooterComponent} from '../../Componentes/footer/footer.component';
import { CalendarComponent} from '../../Componentes/calendar/calendar.component';
import { MapaComponent } from '../../Componentes/mapa/mapa.component';
import { RouterOutlet,RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterOutlet, RouterModule, CalendarComponent, MapaComponent],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.css'
})
export class PageHomeComponent {
  
}
