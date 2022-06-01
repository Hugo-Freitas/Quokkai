import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Article } from '../article';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.page.html',
  styleUrls: ['./actualites.page.scss'],
})
export class ActualitesPage implements OnInit {
  region?;
  articles: Article[] = [];

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.getRegion();
    /* init d'articles pour test le rendu */
    this.articles.push(
      {
        title: 'Article super positif',
        link: 'https://www.google.com/',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vestibulum lacinia ornare. Integer lobortis lacinia lobortis.' +
          ' Morbi tincidunt, neque id rhoncus volutpat, sem lacus auctor nibh, bibendum faucibus massa enim in ante. Sed scelerisque' +
          ' tempus vehicula. Aenean sodales tristique placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a aug' +
          'ue sagittis, vulputate arcu vehicula, lacinia velit. Ut ullamcorper tellus nec massa vulputate, non consequat dui hendrer' +
          'it. Phasellus vitae neque tristique, pulvinar est et, convallis sem. Aliquam eu nunc consectetur, sodales neque luctus, d' +
          'ignissim neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam aliquam nisl vitae maximus dictum. C' +
          'urabitur tincidunt dolor id viverra suscipit. Fusce dapibus laoreet gravida. Donec feugiat rutrum ex, eu tincidunt neque ' +
          'porta nec. Vestibulum convallis, nunc id lacinia fringilla, sapien odio vehicula lectus, dictum euismod erat tellus id enim. ',
        region: this.region,
        id: 1,
      },
      {
        title: 'Article ultra positif',
        link: 'https://www.google.com/',
        content:
          'Proin eget sagittis justo. Sed hendrerit volutpat aliquet. Fusce vitae orci mi. Sed eget arcu eu leo maximus dapibus sed ' +
          'eu justo. Praesent rutrum, elit eu tincidunt pellentesque, ligula tortor efficitur nibh, rhoncus commodo ipsum tortor se' +
          'd nulla. Nunc quis tempus velit. Sed congue lorem et nunc varius suscipit. In viverra, erat ac semper rhoncus, purus mi ' +
          'auctor massa, eu pretium risus diam in nulla. Vivamus viverra varius porta. Morbi pellentesque eros sit amet ipsum vehic' +
          'ula, quis tempor neque rutrum. Praesent laoreet dapibus lacinia. Nulla eu vulputate purus, eget euismod nibh. Nulla risu' +
          's tortor, mattis in velit a, dictum fermentum odio. Vivamus eget arcu nec nulla maximus dictum in feugiat massa.,',
        region: this.region,
        id: 2,
      }
    );
  }

  getRegion(): void {
    this.region = this.route.snapshot.paramMap.get('region');
  }
}
