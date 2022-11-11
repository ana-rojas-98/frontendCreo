import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-private",
  templateUrl: "./private.component.html",
  styleUrls: ["./private.component.scss"],
})
export class PrivateComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.enviarCorreos().subscribe((res: any) => {});
    this.authService.enviarCorreosIndicadores().subscribe((res: any) => {});
  }
}
