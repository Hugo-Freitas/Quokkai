import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../article';
import { Clipboard, WriteOptions } from '@capacitor/clipboard';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  @Input() article: Article;
  heartClicked = false;

  constructor(private modalCtrl: ModalController) {}

  async _openModal(title, content) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        title: title,
        content: content,
      },
    });
    return await modal.present();
  }

  ngOnInit() {}

  copyLink() {
    const link: WriteOptions = {
      string: this.article.link,
    };
    Clipboard.write(link);
    this._openModal('Lien copié !', 'Le lien de l\'article a bien été copié dans votre presse papier. Vous pouvez maintenant le partager à tous vos amis.');
  }
}
