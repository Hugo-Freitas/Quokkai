import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  @Input() loginInfo: any = { email: '', password: '' };
  errorMessage = false;
  message: string = '';

  constructor(
    private router: Router,
    private ProfilService: ProfilService
    ) {}

  ngOnInit() {}

  login() {
    
    if ((this.loginInfo.email == '') && (this.loginInfo.password != '')) {
      this.message = 'Veuillez entrer un email.' ;
      this.errorMessage = true ;
    } else if ((this.loginInfo.email != '') && (this.loginInfo.password == '')) {
      this.message = 'Veuillez entrer un mot de passe.' ;
      this.errorMessage = true ;
    } else if ((this.loginInfo.email == '') && (this.loginInfo.password == '')){
      this.message = 'Veuillez remplir les champs.' ;
      this.errorMessage = true ;
    } else {
      this.ProfilService.connexion(this.loginInfo).subscribe((res)=>{
        if (res.status == 404) {
          this.message = 'Données incorrectes.' ;
          this.errorMessage = true;
        } else if (res.status == 200){
          this.router.navigate(['/quokkai/actualites/' + res.region]);
          this.errorMessage = false;
        } else {
          console.log(res.status)
        } 
      })
    }
  }


  redirect(route) {
    this.router.navigate([route]);
  }
}
