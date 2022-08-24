import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user={
    Email:"",
    password:""
  }
  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }
  LogIn(){
    console.log(this.user);
    this.authService.signin(this.user).subscribe((res:any) => {
      console.log(res);
      localStorage.setItem('token',res.token);
      this.router.navigate(['private']);             
    })
  }
}
