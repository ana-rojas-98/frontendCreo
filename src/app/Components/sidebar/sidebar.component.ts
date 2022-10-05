import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {
  }

  CerrarSesion() {
    this.authService.fnDestroySessionData(function (res_clean_session) {
      if (res_clean_session) {
           }
  });
  }

}
