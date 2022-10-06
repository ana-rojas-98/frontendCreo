import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user={
    Email:"",
    Password:""
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
      localStorage.setItem('token',res.payload);
      this.router.navigate(['private']); 
      localStorage.setItem("idUsuario", res.usuario.usuarioid)
      return res            
    })
  }  

}
