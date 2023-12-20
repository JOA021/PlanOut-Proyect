import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../Componentes/navbar/navbar.component';
import { FooterComponent } from '../../Componentes/footer/footer.component';
import { CalendarComponent } from '../../Componentes/calendar/calendar.component';
import { MapaComponent } from '../../Componentes/mapa/mapa.component';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users.models';
import { Chatgpt } from '../../models/chatgpt.models';
import { ChatGptService } from '../../services/chatgpt.service';
import { HttpClientModule } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { ClimaService } from '../../services/clima.service';


@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule, FormsModule, MapaComponent, NavbarComponent, FooterComponent, CalendarComponent],
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})


export class PageHomeComponent {
  preferencesForm: FormGroup;

  Temp: string = "24";
  year: string = "2024";
  month: string = "12";   
  day: string = "30";  
     

  constructor(private ChatGptService: ChatGptService,private ClimaService: ClimaService, private router: Router) {
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
    

    this.ClimaService.TraerClima(this.preferencesForm.value.location, parseInt(this.year), parseInt(this.month), parseInt(this.day)).subscribe({
      next: (clima) => {
        console.log(clima);
        // this.Temp = clima.temperatura_predicha;
      },
      error: (error) => {
        console.error(error);
        // Handle registration error
      }
    })


    const newChatgpt: Chatgpt = {
      Plan: this.preferencesForm.value.additionalPreferences,
      Ciudad: this.preferencesForm.value.location,
      Temp: this.Temp
      };
      
      console.log(location)
     
      



      
    this.ChatGptService.CrearPlan(newChatgpt).subscribe({
      next: (chatpt) => {
        console.log(chatpt);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
        // Handle registration error
      }
    });

    console.log('Form Data:', this.preferencesForm.value);
  }
}