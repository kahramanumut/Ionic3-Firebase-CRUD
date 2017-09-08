import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  //Creating new object
  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase) {
    this.shoppingItemRef$= this.database.list('shopping-list');
  
  /*
  
  shopping-list:
    0:
      itemName: 'Pizza'
      itemNumber: 1
    
    1:
      itemName: 'Makarna'
      itemNumber: 5
  */
  }

  addShoppingItem(shoppingItem: ShoppingItem){
      /*
      Create a new anonymous object and convert itemNumber to
      a number.

      Push this to our Firebase database under the 'shopping-list' node
      */
  
      this.shoppingItemRef$.push({
          itemName: this.shoppingItem.itemName,
          itemNumber: Number(this.shoppingItem.itemNumber)
      });

      // Reset ShoppingItem
      this.shoppingItem = {} as ShoppingItem;

      //Navigate to user back to ShoppingListpage
      this.navCtrl.pop();
  }

}
