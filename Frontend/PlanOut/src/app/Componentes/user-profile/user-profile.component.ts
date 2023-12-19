import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserListComponent implements OnInit {
  constructor(private userService:UserService){}

  ngOnInit(){
    this.userService.Profile().subscribe({
      next:(user)=>{
        console.log(user)
        
      },
      error:(error) =>{
        console.log(error);

      }
    })
  } 


}