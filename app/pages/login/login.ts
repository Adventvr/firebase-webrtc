import { Component, Inject } from '@angular/core';
import { Page, NavController, ViewController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  username: string = '';
  ref: Firebase;
  users: FirebaseListObservable<any[]>;

  constructor(private nav: NavController, private af: AngularFire, private viewCtrl: ViewController, @Inject(FirebaseRef) ref:Firebase) {
    this.users = this.af.list('/users');
    this.ref = ref;
  }
  
  login(): void {
        console.log(`Adding user to users in chat room: ${this.username} `);
        
        let users: Firebase = this.ref.child('/users');
        // We need to check is user exists in DB
        users.child(this.username).on('value', (snaphot:FirebaseDataSnapshot) => {
            let name = snaphot.val();
            console.log(name);
            if (name) {
                // User exists
                this.viewCtrl.dismiss(this.username);
            } else {
                // User must be created
                // push(value?: any, onComplete?: (error: any) => void): FirebaseWithPromise<void>;
                users.push({
                    name: this.username
                }).then((value: any) => {
                    this.viewCtrl.dismiss(this.username);
                }, (error: any) => {
                    console.log('Error', error);
                });
            }
        }, (error: any) => {
            console.log('Error', error);
        });
    }
}
