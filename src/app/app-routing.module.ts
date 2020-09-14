import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { InputDataComponent } from './input-data/input-data.component';
import { NameDataComponent } from './name-data/name-data.component';
import { TaskCompComponent } from './task-comp/task-comp.component';
const routes: Routes = [
  {
    path: 'accounts',
    component: LoginComponentComponent
  },
  {
    path: 'Form',
    component: InputDataComponent
  },
  {
    path: 'Task',
    component: NameDataComponent
  },
  {
    path:'Task1',
    component: TaskCompComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
