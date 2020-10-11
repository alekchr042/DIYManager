import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterComponent } from '../counter/counter.component';
import { AuthGuard } from './AuthGuard';
import { FetchDataComponent } from '../fetch-data/fetch-data.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  //{ path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  //{ path: 'account', loadChildren: accountModule },
  { path: '', component: HomeComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
