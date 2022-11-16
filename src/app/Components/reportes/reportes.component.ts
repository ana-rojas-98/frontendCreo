import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GoogleChartComponent } from "angular-google-charts";

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.component.html",
  styleUrls: ["./reportes.component.scss"],
})
export class ReportesComponent implements OnInit {
  constructor(public router: Router) {}

  columnNames = ["Browser", "Percentage"];
  title = "googlechart";
  type = "PieChart";
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
  ngOnInit() {
    let usarioLocalStote = JSON.parse(localStorage.getItem("usario"));
    if (
      usarioLocalStote.reportesCrear == false &&
      usarioLocalStote.reportesVer == false &&
      usarioLocalStote.reportesEditar == false &&
      usarioLocalStote.reportesEliminar == false
    ) {
      this.router.navigate(["private"]);
      return true;
    }
  }
}
