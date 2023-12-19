import {LoginComponent} from './Pagina/login/login.component';
import {PageHomeComponent} from './Pagina/page-home/page-home.component';
import {ProfileComponent} from './Pagina/profile/profile.component';
import {RegisterComponent } from './Pagina/register/register.component';
import {ForgetComponent } from './Pagina/forget/forget.component';
import {CalendarioComponent } from './Pagina/calendario/calendario.component';
import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guards';

export const routes: Routes = [ 
    {path: "", component: LoginComponent },
    {path: "register", component: RegisterComponent},   
    {path: "profile", component: ProfileComponent, canActivate:[loginGuard]},    
    {path: "home", component: PageHomeComponent,canActivate:[loginGuard]},
    {path: "forget", component: ForgetComponent},
    {path: "calendario", component: CalendarioComponent} 
 ]