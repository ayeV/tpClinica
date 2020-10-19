import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

 public message: string;

  constructor(
    public router: Router,
    private activateRoute: ActivatedRoute,
    public ngFireAuth: AngularFireAuth,
  ) { 

  }

  ngOnInit(): void {
    this.verify();
  }



verify()
{
  this.ngFireAuth.applyActionCode(this.activateRoute.snapshot.queryParams['oobCode'])
  .then(() => {
    this.message = "Tu email se ha verificado exitosamente."
  })
  .catch(err => {
    this.message = "Ha ocurrido un error, vuelve a intentarlo más tarde."
  });

}


  goToLogin()
  {
    this.router.navigate(['Login']);
  }

}
