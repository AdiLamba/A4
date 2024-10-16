import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../modules/material-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import { MainFormComponent } from './main-form/main-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MaterialModule,
    HttpClientModule,
    MatListModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
