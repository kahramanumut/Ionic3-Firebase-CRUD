import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>
  shoppingItem= {} as ShoppingItem;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase) {

    const shoppingItemId = this.navParams.get('shoppingItemId');

    // Set the scope of our Firebase Object equal to our selected item
    this.shoppingItemRef$ = this.database.object('shopping-list/'+shoppingItemId);
  
    // Subscribe to the Object and assign the result to this.shoppingItem
    this.shoppingItemRef$.subscribe(shoppingItem => this.shoppingItem
    = shoppingItem);
  }

  editShoppingItem(shoppingItem: ShoppingItem){
    //Update our Firebase node with new item data
    this.shoppingItemRef$.update(shoppingItem);

    //Send the user back to the SoppingListPage
    this.navCtrl.pop();
  }

}
