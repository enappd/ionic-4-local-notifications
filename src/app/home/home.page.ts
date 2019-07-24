import { Component } from '@angular/core';
import { LocalNotifications, ILocalNotificationActionType } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  clickSub: any;
  constructor(private localNotifications: LocalNotifications, public alertController: AlertController) {

  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  unsub() {
    this.clickSub.unsubscribe();
  }
  simpleNotif() {
    this.clickSub = this.localNotifications.on('click').subscribe(data => {
      console.log(data);
      this.presentAlert('Your notifiations contains a secret = ' + data.data.secret);
      this.unsub();
    });
    this.localNotifications.schedule({
      id: 1,
      text: 'Single Local Notification',
      data: { secret: 'secret' }
    });

  }
  foreNotif() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Single Local Notification',
      data: { secret: 'secret' },
      foreground: true
    });
  }
  multipleNotif() {
    this.localNotifications.schedule([{
      id: 1,
      text: 'Multi ILocalNotification 1',
      data: { secret: 'data' }
    }, {
      id: 2,
      title: 'Local LocalNotification Example',
      text: 'Multi ILocalNotification 2',
      icon: 'assets/ionic_white.png'
    }]);
  }

  delayedNotif() {
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: { at: new Date(new Date().getTime() + 5000) },
      led: 'FF0000',
      sound: null
    });
  }

  progressNotif() {
    this.localNotifications.schedule({
      title: 'Sync in progress',
      text: 'Copied 2 of 10 files',
      progressBar: { value: 20 }
    });
  }

  multiLineNotif() {
    this.localNotifications.schedule({
      title: 'The Big Meeting',
      text: '4:15 - 5:15 PM\nBig Conference Room',
      smallIcon: 'res://calendar',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw'
    });
  }

  summaryNotif() {
    this.localNotifications.schedule({
      title: 'Chat with Irish',
      icon: 'https://enappd.com/static/images/enappd-logo-blue.png',
      text: ['I miss you', 'Irish : I miss you more!', 'I always miss you more by 10%']
    });
  }

  actionNotif() {
    this.clickSub = this.localNotifications.on('click').subscribe(data => {
      console.log(data);
      // this.presentAlert('Your notifiations contains a secret = ' + data.data.secret);
      this.unsub();
    });
    this.localNotifications.schedule({
      title: 'The big survey',
      text: 'Are you a fan of RB Leipzig?',
      attachments: ['http://placekitten.com/g/300/200'],
      actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no', title: 'No' }
      ]
    });
  }

  inputNotif() {
    this.localNotifications.schedule({
      title: 'Justin Rhyss',
      text: 'Do you want to go see a movie tonight?',
      actions: [{
        id: 'reply',
        type: ILocalNotificationActionType.INPUT,
        title: 'Reply'
      }]
    });
  }

  groupNotif() {
    this.localNotifications.schedule([
      { id: 0, title: 'Design team meeting' },
      { id: 1, summary: 'me@gmail.com', group: 'email', groupSummary: true },
      { id: 2, title: 'Please take all my money', group: 'email' },
      { id: 3, title: 'A question regarding this plugin', group: 'email' },
      { id: 4, title: 'Wellcome back home', group: 'email' }
    ]);
  }
}
