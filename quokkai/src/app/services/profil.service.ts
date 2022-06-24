import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) {}

  testing(){
    return this.http.get('api/testing')
  }
  article(){
    return this.http.get('http://localhost:8080/article').subscribe((response) => {
    console.log(response);
    });
  }
}
