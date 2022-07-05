import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() content: string

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {}

  _dismiss() {
    this.modalCtrl.dismiss()
  }
}
