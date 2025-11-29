<<<<<<< HEAD
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
=======
import { NgModule } from '@angular/core';
>>>>>>> 49b0e980d2afd9a0fb86a99e2ca4a537d5744aaa
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
<<<<<<< HEAD
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
=======
  declarations: [HomePage]
>>>>>>> 49b0e980d2afd9a0fb86a99e2ca4a537d5744aaa
})
export class HomePageModule {}
