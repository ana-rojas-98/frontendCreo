import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-gestor-noti',
  templateUrl: './gestor-noti.component.html',
  styleUrls: ['./gestor-noti.component.scss']
})
export class GestorNotiComponent implements OnInit {

  constructor( private authService: AuthService) { }

  resultadosNotificaciones:any=[];
  notificacion={
    asunto:"",
    creador:"",
    fechaCreacion:"",
    periodicidad:"",
    FechaEnvio:"",
  }
  ngOnInit() {
    this.traer();
  }

  traer(){
    this.authService.getNotificacion(this.notificacion).subscribe((res:any)=>{
      this.resultadosNotificaciones = res.map((item)=>{
        return item;
      });
    })
  }

}
