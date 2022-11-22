import { Component, OnInit } from "@angular/core";
import { ReportesService } from "./../../services/reportes.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-private",
  templateUrl: "./private.component.html",
  styleUrls: ["./private.component.scss"],
})
export class PrivateComponent implements OnInit {
  constructor(private authService: AuthService,
    private reportesService: ReportesService) {}
  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
  mostrar=false;
  resultadosTabla:any=[];
  resultados:any=[];
  indicadores:any=[];
  avance:any=[];

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});
    if(this.usarioLocalStote.typeuser=='1'){
        this.mostrar=true;
    }else if(this.usarioLocalStote.typeuser=='2'){
        this.mostrar=true;
    }else if(this.usarioLocalStote.typeuser=='3'){
        this.mostrar=false;
  }
  this.pantallaPrin();
  }
  
  activos=0;
  inactivos=0;
  total=0;
  completados=0;
  faltantes=0;
  totales=0;
  pantallaPrin(){
    this.authService.getUsuarios("").subscribe((res: any) => {
      this.resultados=res.map((item)=>{
        this.resultadosTabla.push(item);
        if(item.estado=='1'){
          this.activos++;
        }else if(item.estado=='0'){
          this.inactivos++;
        }
      })
      console.log("inactivos",this.inactivos)
      console.log("activos",this.activos)
      this.total=this.activos+this.inactivos;
      console.log("total",this.total)
      });
      console.log("array que trae", this.resultadosTabla)
      this.reportesService
      .ConsultarIndicadoresAsignados()
      .subscribe((res: any) => {
        this.indicadores= res.map((item) => {
          if(item.avance==100){
            this.completados++;
          }else if(item.avance>=0 && item.avance<100){
            this.faltantes++;
          }
        });
        console.log("completados",this.completados)
        console.log("faltantes",this.faltantes)
        this.totales=this.completados+this.faltantes;
        console.log("totales",this.totales)
      });
  }
}
