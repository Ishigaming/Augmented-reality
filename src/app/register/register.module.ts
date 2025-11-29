import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
=======
import { FormsModule } from '@angular/forms';
>>>>>>> 49b0e980d2afd9a0fb86a99e2ca4a537d5744aaa

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    RegisterPageRoutingModule,
    ReactiveFormsModule
=======
    RegisterPageRoutingModule
>>>>>>> 49b0e980d2afd9a0fb86a99e2ca4a537d5744aaa
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
