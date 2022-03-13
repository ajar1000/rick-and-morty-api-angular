import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { EmptyComponent } from './empty/empty.component';

const routes: Routes = [
  {
    path: "empty",
    component: EmptyComponent
  },
  {
    path: "details/:id",
    component: CharacterDetailsComponent
  },
  {
    path: '', 
    redirectTo: '/empty', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
