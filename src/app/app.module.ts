import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FlexLayoutModule } from "@angular/flex-layout";
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import {ButtonModule} from 'primeng/button';
import { AlertaComponent } from './components/alerta/alerta.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import {TableModule} from 'primeng/table';
import { AltaAdminComponent } from './components/alta-admin/alta-admin.component';
import { MisDatosComponent } from './components/mis-datos/mis-datos.component';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import { MenuComponent } from './components/menu/menu.component';
import {TooltipModule} from 'primeng/tooltip';
import { AdminMedicoComponent } from './components/admin-medico/admin-medico.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {FieldsetModule} from 'primeng/fieldset';
import {DialogModule} from 'primeng/dialog';
import { CargarResenaComponent } from './components/cargar-resena/cargar-resena.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { VerResenaComponent } from './components/ver-resena/ver-resena.component';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CargarEncuestaComponent } from './components/cargar-encuesta/cargar-encuesta.component';
import { VerEncuestaComponent } from './components/ver-encuesta/ver-encuesta.component';
import {RatingModule} from 'primeng/rating';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';

@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TurnosComponent,
    MisTurnosComponent,
    EmailVerificationComponent,
    AlertaComponent,
    AdminUsersComponent,
    AltaAdminComponent,
    MisDatosComponent,
    MenuComponent,
    AdminMedicoComponent,
    CargarResenaComponent,
    VerResenaComponent,
    CargarEncuestaComponent,
    VerEncuestaComponent
  ],
  imports: [
    RadioButtonModule,
    InputTextareaModule,
    RatingModule,
    DynamicDialogModule,
    InputNumberModule,
    DialogModule,
    FieldsetModule,
    NgxMaterialTimepickerModule.setLocale('es'),
    TooltipModule,
    CarouselModule,
    TableModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    ButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,
    MatTooltipModule,
    HttpClientModule,
    ToastModule,
    MatCheckboxModule,
    MatCardModule,
    CardModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    ProgressSpinnerModule,
    FlexLayoutModule,
    MatNativeDateModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MatExpansionModule,
    MatDialogModule,
  ],
  providers: [DialogService,DynamicDialogRef,DynamicDialogConfig,MessageService,
    {provide: MAT_DATE_LOCALE, useValue: 'es'},],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
