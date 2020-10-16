import { Component, OnInit } from '@angular/core';
import {  Usuario } from './../../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user= new Usuario();
  constructor() { }

  ngOnInit(): void {
  }

FillInput()
{

}

Login(){

}

}
