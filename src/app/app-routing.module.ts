import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseHomeComponent } from './components/base-home/base-home.component';

const routes: Routes = [
  {
    path: '', component: BaseHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
