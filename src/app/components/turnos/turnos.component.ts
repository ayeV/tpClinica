import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0;
  }
  public especialidades = ['Oftamologia', 'Cardiologia', 'Pediatria'];
  public horarios = ['9:00', '9:30', '10:00'];

  toppings = new FormControl();

  constructor(private router:Router,private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  comboChange(event) {
    // if (!event) {
    //   this.user.specialities = this.toppings.value;
    //   console.log(this.user.specialities);
    // }
  }

  Confirm()
  {

  }

  logOut() {
    this.authService.SignOut().then((res) => {
      this.router.navigate(['/Login']);
    }).catch((ex) => {
      console.log(ex);

    });

  }

  Cancel()
  {
    
  }


}
