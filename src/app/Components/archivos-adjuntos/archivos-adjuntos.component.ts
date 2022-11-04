import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archivos-adjuntos',
  templateUrl: './archivos-adjuntos.component.html',
  styleUrls: ['./archivos-adjuntos.component.scss']
})
export class ArchivosAdjuntosComponent implements OnInit {

  constructor(private route: ActivatedRoute, public router: Router, private indicadoresservice: IndicadoresService) { }

  id = 0;
  resultadosTabla = {};

  Adjunto = {
    idArchivo: 0,
  }


  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.Adjunto.idArchivo = this.id;
    this.getAdjuntos();
  }

  descargarArchivo(id, url) {
    this.indicadoresservice.descarga(id).subscribe((res) => {
      let nombreArchivo = res.headers.get("content-disposition");
      //?.split(';')[1].split('=')[1];
      let tipo: Blob = res.body as Blob;
      let a = document.createElement("a");
      a.download = url;
      a.href = window.URL.createObjectURL(tipo);
      a.click();
    });
  }

  getAdjuntos() {
    this.indicadoresservice.ObtenerAdjuntos(this.Adjunto).subscribe((res: any) => {
      this.resultadosTabla = res.map((item) => {
        return item;
      });
    });
    console.log("Resultados", this.resultadosTabla);
  }

  alert(mensaje) {
    Swal.fire(mensaje);
  }

}
