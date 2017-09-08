import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,
  private actionSheetCtrl:ActionSheetController) {

     // Pointing shoppingListRef$ at Firebase -> 'shopping-list' node
    this.shoppingListRef$=this.database.list('shopping-list');
  }

  selectShoppingItem(shoppingItem: ShoppingItem){

    this.actionSheetCtrl.create({
      //title: '${shoppingItem.itemName}',
      buttons:[
        {
        text:'Edit',
        handler:() =>{
          // Send the user to the EditShoppingItemPage
          this.navCtrl.push(EditShoppingItemPage, 
            { shoppingItemId: shoppingItem.$key });

            /*
            Navigation stack:
            ['ShoppingListPage' ,
            'EditShoppingItemPage',
            { shoppingItemId: ' K0WSAsOwas12ASWs' }
            
            */
        }
      },
      {
        text:'Delete',
        role: 'desctructive',
        handler:() =>{
          // Delete the current ShoppingItem
          this.shoppingListRef$.remove(shoppingItem.$key);
        }
      },
      {
        text:'Cancel',
        role: 'cancel',
        handler:() =>{
          console.log("The user has selected the cancel button");
        }
      }
    ]
    }
  ).present();

  }

  navigateToAddShoppingPage() {
      this.navCtrl.push(AddShoppingPage);
  }

}
