import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LicenciaService } from 'src/app/services/licencia.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private authService: AuthService, private licenciaService: LicenciaService) { }
  Licencia = {
    Licencia1: "",
  }
  ngOnInit() {
    this.GetLicencia();
  }
  GetLicencia() {
    this.licenciaService.GetLicencia(this.Licencia).subscribe((res: any) => {
      this.Licencia.Licencia1 = res.licencia1;
    });
  }
}
