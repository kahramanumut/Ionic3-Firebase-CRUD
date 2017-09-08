import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditShoppingItemPage } from './edit-shopping-item';

@NgModule({
  declarations: [
    EditShoppingItemPage,
  ],
  imports: [
    IonicPageModule.forChild(EditShoppingItemPage),
  ],
})
export class EditShoppingItemPageModule {}
