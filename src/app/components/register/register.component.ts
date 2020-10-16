import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user = new Usuario();
  public especialidades = ['Oftamologia', 'Cardiologia', 'Pediatria'];
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  Register()
  {}

  Cancel()
  {
    this.router.navigate(['Login']);

  }

  setUserRole(role)
  {
    this.user.role = role;
  }
}
