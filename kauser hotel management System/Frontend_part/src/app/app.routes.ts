import { Routes } from '@angular/router';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { SignupComponent } from './components/signup/signup.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactComponent } from './components/contact/contact.component';
import { DiningComponent } from './components/dining/dining.component';
import { ServicesComponent } from './components/services/services.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HeroBannerComponent }, // Home → Hero Banner
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dining', component: DiningComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '**', redirectTo: '' } // fallback → Hero Banner
];
