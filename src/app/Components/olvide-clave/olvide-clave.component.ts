import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-olvide-clave",
  templateUrl: "./olvide-clave.component.html",
  styleUrls: ["./olvide-clave.component.scss"],
})
export class OlvideClaveComponent implements OnInit {
  constructor(
    private router: Router
    ){}

  ngOnInit() {}
}
