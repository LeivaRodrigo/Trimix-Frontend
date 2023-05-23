import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveUpdateComponent } from './saveUpdate/saveUpdate.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'saveUpdate', component: SaveUpdateComponent },
  { path: 'saveUpdate/:id', component: SaveUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
