import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatospersonalesComponent } from './pages/datospersonales/datospersonales.component';

const routes: Routes = [
  {path: 'listar', component: DatospersonalesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
