import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { ClientViewComponent } from './app/views/client-view/client-view.component';
import { KitchenViewComponent } from './app/views/kitchen-view/kitchen-view.component';
import { provideHttpClient } from '@angular/common/http';
import { OrderService } from './app/services/order.service';

const routes: Routes = [
  { path: 'client', component: ClientViewComponent },
  { path: 'kitchen', component: KitchenViewComponent },
  { path: '', redirectTo: '/client', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Configura o HttpClient
    OrderService, // Adiciona o OrderService aos providers
    provideRouter(routes)
  ]
}).catch(err => console.error(err));