import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user_reg ={
    Fullname:"",
    Email:"",
    Pass:"",
    Typeuser:""
  }
  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }
  Sing_up(){
    console.log(this.user_reg);
    this.authService.singup(this.user_reg).subscribe((res:any)=>{
      console.log(res);      
    })
  }

}
