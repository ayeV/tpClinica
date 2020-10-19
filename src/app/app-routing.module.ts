import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { RegisterComponent } from './components/register/register.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import {AuthGuard} from  './services/auth-guard.service';

const routes: Routes = [
  { path: 'Login', component: LoginComponent},
  { path: 'Registro', component: RegisterComponent},
  { path: '', component: HomeComponent },
  { path: 'PedirTurno', component: TurnosComponent, canActivate: [AuthGuard]},
  { path: 'MisTurnos', component: MisTurnosComponent, canActivate: [AuthGuard]},
  { path: 'EmailVerificado', component: EmailVerificationComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
