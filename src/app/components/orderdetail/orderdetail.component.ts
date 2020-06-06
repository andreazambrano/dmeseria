import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { OrderInterface } from '../../models/order-interface';
import { UserWService } from "../../services/user-w.service";
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { isError } from "util";

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  constructor(
      public _uw:UserWService,
      private dataApi: DataApiService,
      private location: Location,
      private route:ActivatedRoute,
      public router: Router,
      private formBuilder: FormBuilder
  	) { }
  public orders:OrderInterface;
  public order:OrderInterface;  

  getOrders(){
        this.dataApi
        .getOrders()
        .subscribe((orders: OrderInterface) => (this.orders=orders));
    }
  checkSteep(){
    if (this._uw.orderSelected.status=="new" ){
      this._uw.new=true;

    }
    if (this._uw.orderSelected.status=="verifcar" ){
      this._uw.pago=true;

    }
    if (this._uw.orderSelected.status=="proccess" ){
      this._uw.proccess=true;

    }
    if (this._uw.orderSelected.status=="concretada" ){
      this._uw.concretada=true;
    }
  }
  setSteepOne(){
    // this._uw.steepOne=true;
    this._uw.new=true;
    this._uw.pago=false;
     this._uw.proccess=false;
  }
  setSteepTwo(){
    this._uw.new=false;
    this._uw.pago=true;
    this._uw.proccess=false;
  }
  setSteepThree(){
  // this._uw.steepOne=true;

  // this._uw.verificar=true;
  }

  ngOnInit() {
    this.getOrders();  	   
    if (this._uw.idSelected != undefined ){
      this.getDetails(this._uw.idSelected);
    }
    if (this._uw.orderSelected.steeps === undefined ){
      this.router.navigate(['/orders']);
    }
    else {
      if (this._uw.orderSelected != undefined && this._uw.orderSelected.steeps[2].steep==true){
        this._uw.new=false;
        this._uw.pago=false;
        this._uw.proccess=true;
      }
    }
    // this._uw.new=true;
  }

  getDetails(id: string){
    this.dataApi.getOrderById(id).subscribe(order => (this._uw.orderSelected = order));
  }

}
