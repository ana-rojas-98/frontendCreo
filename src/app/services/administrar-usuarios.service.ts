import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
@Output()
export class AdministrarUsuariosService {
  @Output() newItemEvent = new EventEmitter();
  @Output() UsuarioId: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
}
