import { Component } from '@angular/core';
import { IonApp } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, RouterModule],
})
export class AppComponent {
  constructor() {}
}
