import { ReportesService } from './../../services/reportes.service';
import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-reportes-nuevo-tablero1",
  templateUrl: "./reportes-nuevo-tablero1.component.html",
  styleUrls: ["./reportes-nuevo-tablero1.component.scss"],
})
export class ReportesNuevoTablero1Component implements OnInit {
  constructor(private ReportesService: ReportesService) {}

  ngOnInit() {}


  columnNames = ["Browser", "Percentage"];
  title = "googlechart";
  type = "ColumnChart";
  data = [
    ["Name1", 5.0],
    ["Name2", 36.8],
    ["Name3", 42.8],
    ["Name4", 18.5],
    ["Name5", 16.2],
  ];

  options = {
    colors: ["#e0440e", "#e6693e", "#ec8f6e", "#f3b49f", "#f6c7b6"],
    is3D: true,
  };
  width = 500;
  height = 300;


  

}
