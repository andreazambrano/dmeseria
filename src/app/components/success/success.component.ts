import { Component, OnInit } from '@angular/core';
import { UserWService } from '../../services/user-w.service';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';





@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(  
  public _uw:UserWService, 
  private location: Location,
  private router: Router
  ) { }
   finish(){
this.router.navigate(['/products']);

  }

  ngOnInit() {
  }

}
