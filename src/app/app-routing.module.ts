import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ToDoFormComponent } from './Components/to-do-form/to-do-form.component';
import { LoginComponent } from './login/login.component';
import { ToDoPageComponent } from './to-do-page/to-do-page.component';
import { AllUserPageComponent } from './all-user-page/all-user-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to home page
  { path: 'login', component: LoginComponent},
  { path: 'todo', component: ToDoPageComponent},
  { path: 'allUser', component: AllUserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
