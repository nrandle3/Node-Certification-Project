import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http : HttpClient, private router: Router) { }

  register(userinfo : any){
    this.http.post("http://localhost:3000/api/v1/users/register", {
      firstname: userinfo.firstname,
      lastname: userinfo.lastname,
      email : userinfo.email,
      streetaddress: userinfo.streetaddress,
      city: userinfo.city,
      state: userinfo.state,
      zipcode: userinfo.zipcode,
      password : userinfo.password,
      confirmpassword : userinfo.confirmpassword
    }).subscribe((response : any)=>{
      console.log(response.value);
      this.router.navigate(["/login"])
    })
  }
}
