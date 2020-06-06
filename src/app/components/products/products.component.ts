import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { TixInterface } from '../../models/tix-interface'; 
import { InfoInterface } from '../../models/info-interface'; 
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
  	public _uw:UserWService,
  	private dataApi: DataApiService,
     private route:ActivatedRoute,
  private location: Location,
  public router: Router
  	) { }
    info:any={};
    mostrar="todos";
  public tixs:TixInterface;
  public tixsVegetales:TixInterface;
  public tixsFrutas:TixInterface;
  public tixsExquiciteces:TixInterface;
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
  getAllTixs(){
    this.mostrar="Todos";
    this.dataApi
    .getAllTixs()
    // .subscribe((tixs: TixInterface) => (this.tixs=tixs));
    .subscribe((res:any) => {
      if (res[0] === undefined){
       }else{
        this.tixs=res;
        this._uw.tamanoProducts=res.length;
        }
     });
  }
  getBulbos(){
    this.mostrar="Bulbos";
    this.dataApi
    .getBulbos()
    .subscribe((res:any) => {
      if (res[0] === undefined){
       }else{
        this.tixs=res;
        this._uw.tamanoProducts=res.length;
        }
     });
  }
   getFrutos(){
    this.mostrar="Frutos";
    this.dataApi
    .getFrutos()
    .subscribe((res:any) => {
      if (res[0] === undefined){
       }else{
        this.tixs=res;
        this._uw.tamanoProducts=res.length;
        }
     });
  }
  getLegumbres(){
    this.mostrar="Legumbres";
    this.dataApi
    .getLegumbres()
    .subscribe((res:any) => {
      if (res[0] === undefined){
       }else{
        this.tixs=res;
        this._uw.tamanoProducts=res.length;
        }
     });
  }
  getTuberculos(){
    this.mostrar="Tubérculos";
    this.dataApi
    .getTuberculos()
    .subscribe((res:any) => {
      if (res[0] === undefined){
       }else{
        this.tixs=res;
        this._uw.tamanoProducts=res.length;
        }
     });
  }
  getVerduras(){
    this.mostrar="Verduras";
    this.dataApi
    .getVerduras()
    .subscribe((res:any) => {
      if (res[0] === undefined){
       }else{
        this.tixs=res;
        this._uw.tamanoProducts=res.length;
        }
     });
  }
   

  ngOnInit() {
if (this._uw.loadedInfo==true){
        this.loadInfo();
        }
        this._uw.loadedInfo=true;
	this.getAllTixs();
  }

}
