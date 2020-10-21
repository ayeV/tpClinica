import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor( private authService: AuthenticationService,public router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.SignOut().then((res) => {
      this.router.navigate(['/Login']);
    }).catch((ex) => {
      console.log(ex);

    });

  }
}
