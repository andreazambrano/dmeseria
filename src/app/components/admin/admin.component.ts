import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isError } from "util";
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { UserWService } from "../../services/user-w.service";
import { UserInterface } from '../../models/user-interface'; 
import { DataApiService } from "../../services/data-api.service";
declare var NgForm:any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	 ngFormLogin: FormGroup;
  submitted = false;

  constructor(
    public scrollTopService:ScrollTopService,
    public dataApi:DataApiService,
    public _uw:UserWService,
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router, 
    private location: Location
    ) { }
  public user : UserInterface ={
    name:"",
  	email:"",
  	password:""
  };
  public isError = false;
  public isLogged =false;

  ngOnInit() {
    this.scrollTopService.setScrollTop();
	  this.ngFormLogin = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
      });
    }
     get fval() {
  return this.ngFormLogin.controls;
  }
   onLogin(){
     this.submitted = true;
      if (this.ngFormLogin.invalid) {
      return;
        } 
//      alert('form fields are validated successfully!');
      return this.authService.loginUser(
        this.user.email, 
        this.user.password
        )
    	.subscribe( 
    		data => {
          //console.log(data);
            	this.authService.setUser(data.user);
            	const token = data.id;
              this.authService.setToken(token);
              this._uw.userd=data.id;
              this._uw.name=data.name;
              this.router.navigate(['']);
              this.isError = false;
        },
         error => this.onIsError()
        ); 
  }   
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

   onCheckUser(): void {
    if (this.authService.getCurrentUser() === null) {
         this.isLogged = false;
      this._uw.isLogged=false;
      this.router.navigate(['/admin']);
    } else {
      this.isLogged = true;
      this._uw.isLogged = true;
      this.router.navigate(['']);
    }
  }

}
