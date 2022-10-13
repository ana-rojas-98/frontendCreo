import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-olvide-clave",
  templateUrl: "./olvide-clave.component.html",
  styleUrls: ["./olvide-clave.component.scss"],
})
export class OlvideClaveComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  private _success = new Subject<string>();

  successMessage = '';

  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  public changeSuccessMessage() { this._success.next('Correo electrónico no está registrado'); }
  
  ngOnInit() {
    this._success.subscribe(message => this.successMessage = message);
  }

  email = {
    Email: "",
  };



  validateEmail() {
    console.log(this.email);
    this.authService.validar_correo(this.email).subscribe((res: any) => {
      if (res.resul == 'El correo no existe') {
        this.changeSuccessMessage();
      }
      else {
        this.router.navigate(['cambio-contrasena']);
      }
    });
  }
}

