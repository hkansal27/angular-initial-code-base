import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BaseHomeComponent } from './components/base-home/base-home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateService } from './services/translate.service';
import { HttpClientModule } from '@angular/common/http';

export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}
@NgModule({
  declarations: [
    AppComponent,
    BaseHomeComponent,
    SidenavComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true,
    },
    TranslatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
