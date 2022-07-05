import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../article';
import { Clipboard, WriteOptions } from '@capacitor/clipboard';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  @Input() article: Article;
  heartClicked = false;

  constructor() { }

  ngOnInit() {}

  copyLink() {
    const link: WriteOptions = {
      string: this.article.link,
    };
    Clipboard.write(link);
    alert('Lien copié !');
  }
}
