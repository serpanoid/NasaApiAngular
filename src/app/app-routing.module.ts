import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import { FourthComponent } from './fourth/fourth.component';
import { FifthComponent } from './fifth/fifth.component';
import { SixComponent } from './six/six.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [ { path: 'first-component', component: FirstComponent , canActivate: [AuthGuard]},
{ path: 'second-component', component: SecondComponent, canActivate: [AuthGuard] },
{path: 'third-component', component: ThirdComponent , canActivate: [AuthGuard]},
{path: 'fourth-component', component: FourthComponent , canActivate: [AuthGuard]},
{path: 'fifth-component', component: FifthComponent , canActivate: [AuthGuard]},
{path:'six-component', component: SixComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
