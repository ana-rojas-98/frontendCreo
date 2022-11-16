import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes-tableros',
  templateUrl: './reportes-tableros.component.html',
  styleUrls: ['./reportes-tableros.component.scss']
})
export class ReportesTablerosComponent implements OnInit {

  constructor() { }

  usarioLocalStote = JSON.parse(localStorage.getItem("usario"));

  ngOnInit() {
  }

}
