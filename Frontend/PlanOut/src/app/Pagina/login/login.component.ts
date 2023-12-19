import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule,FormsModule} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../models/users.models';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  rutaImagen = 'assets/logo.png';

  constructor(private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }

    const user:User = {
      password: this.loginForm.value.password,
      email: this.loginForm.value.email,         
    }
    
    

    
    this.userService.login(user).subscribe({

      next:(token)=>{
        console.log(token)
        this.userService.saveToken(token)
        this.router.navigate(['/home'])
      },
      error:(error) =>{
        console.log(error);

      }
    })
  }
}
