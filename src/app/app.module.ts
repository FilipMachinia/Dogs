import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WalkingRouteComponent} from './walking-route/walking-route.component';
import {HttpClientModule} from '@angular/common/http';
import {AboutComponent} from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WalkingRouteComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'route/:routeId', component: WalkingRouteComponent},
      {path: 'about', component: AboutComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
