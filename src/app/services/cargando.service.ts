import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
@Injectable({
  providedIn: 'root'
})
export class CargandoService {

constructor() { }

ventanaCargando() {
  Swal.fire({
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    imageUrl: "../../../assets/imagenes/loading-11.gif",
    customClass: {
      popup: "bg-light bg-transparent",
    },
  });
}

}
