import { SharedService } from './services/shared.service';
import { StorageService } from './services/storage.service';
import { CoreModule } from './core/core.module';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootService } from './services/boot.service';
import { AuthService } from './services/auth.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    BootService, AuthService, StorageService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
