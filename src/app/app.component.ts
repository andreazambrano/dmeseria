import { Component, OnInit } from '@angular/core';
import { TixsService } from "./services/tixs.service";
import { IpbucketService } from "./services/ipbucket.service";
import { DataApiService } from "./services/data-api.service";
import { ProductInfoService } from "./services/product-info.service";
import { UserWService } from "./services/user-w.service";
import { InfoInterface } from './models/info-interface'; 
import { ActivatedRoute, Params} from '@angular/router';
import { OrderInterface } from './models/order-interface';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
// declare var $: any;
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 constructor (
 	public _ps:TixsService, 
 	public _pi:ProductInfoService, 
 	public ipbucket:IpbucketService,
 	public _uw:UserWService, 
 	public dataApi:DataApiService,
  private route:ActivatedRoute,
  private location: Location,
  public router: Router,
  private authService: AuthService
    ){}

  public orders:OrderInterface;
  public order:OrderInterface; 
  info:any={};
    onLogout():void{
    this.authService.logoutUser();
    location.reload();
  }

  loadInfo(){
    this.dataApi
    .getInfo()
    .subscribe((res:any) => {
      if (res[0] === undefined){
       }else{
        this.info=res;
        this._uw.info=this.info;
        }
     });
  }

     getOrders(){
         this.dataApi
         .getOrders()
         .subscribe((res:any) => {
      if (res[0] === undefined){
        return
        }else{
          this.orders=res;
         this._uw.tamano = res.length;
        }
      });
    }

    getDetails(id: string){
      this.dataApi.getOrderById(id).subscribe(order => (this._uw.orderSelected = order));
    }

  anterior(){
    this.getOrders();
    if (this._uw.indice>0){
      this._uw.indice=this._uw.indice-1;
    }
    this.getDetails(this.orders[this._uw.indice].id);
  }
  siguiente(){
    this.getOrders();
    if (this._uw.tamano-this._uw.indice>1){
      this._uw.indice=this._uw.indice+1;
    }   
    this.getDetails(this.orders[this._uw.indice].id);
  }

  setColp(){
    this.loadInfo();
    this._uw.currency=this._uw.info[0].colp;
  }
  setBs(){
    this.loadInfo();
    this._uw.currency=this._uw.info[0].bs;
  }
   setUsd(){
    this.loadInfo();
    this._uw.currency=this._uw.info[0].usd;
  }
 loadAPI = null;  
   url = "assets/dist-assets/js/plugins/metisMenu.min.js";
   url2 = "assets/assetsfruit/js/scripts.js";
    ngOnInit() {
  	 if (this._uw.loaded==true){
          this.loadAPI = new Promise(resolve => {
            this.loadScript();
            this.loadScript2();
          });
        }
        this.getOrders();
        this.loadInfo();
        this._uw.loaded=true;
  }
 public loadScript() {
      let node = document.createElement("script");
      node.src = this.url;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
    public loadScript2() {
      let node = document.createElement("script");
      node.src = this.url2;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
}
