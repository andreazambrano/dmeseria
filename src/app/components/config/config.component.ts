import { DataApiService } from '../../services/data-api.service';
import { UserWService } from "../../services/user-w.service";
import { InfoInterface } from '../../models/info-interface'; 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { isError } from "util";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  constructor(
		public _uw:UserWService,
		private dataApi: DataApiService,
		private router: Router,
		private location: Location,
		private formBuilder: FormBuilder
  	) { }
  	ngFormCurrency: FormGroup;
  	ngFormAddress: FormGroup;
  	ngFormPorcentaje: FormGroup;
    
  	submittedCurrency = false;
    submittedPorcentaje = false;
    submittedAddress = false;

    ngFormCostPrice: FormGroup;
    ngFormBeneficio: FormGroup;
    ngFormStock: FormGroup;

  	
  	editing=false;
    editingPorcentaje=false;
    editingAddress=false;

    info:any={};
    infoPorcentaje:any={};
    infoAddress:any={};

    public infoNew:InfoInterface;
    public infoCurrency:InfoInterface;

    loadInfo(){
      this.dataApi
      .getInfo()
      .subscribe((res:any) => {
      if (res[0] === undefined){
         }
      else{
          this.info=res;
          this._uw.info=this.info;
          this.infoNew=this.info[0];
          this.infoCurrency=this.info[0];
          this.infoNew.usd=1/this.info[0].usd;
          }
       });
    }
    ngOnInit() {
      this.loadInfo();
      this.ngFormCurrency = this.formBuilder.group({
        usd: [0, [Validators.required]],
        colp: [0, [Validators.required]]
        });
      this.ngFormPorcentaje= this.formBuilder.group({
        bitcoin: [0, [Validators.required]],
        paypal: [0, [Validators.required]]
        });
      this.ngFormAddress= this.formBuilder.group({
        bitcoinaddress: ['', [Validators.required]],
        paypaladdress: ['', [Validators.required]]
        });
    }
    editar(){
    		this.editing=true;
    		this.loadInfo();
    }
     editarPorcentaje(){
        this.editingPorcentaje=true;
        this.loadInfo();
    }
    editarAddress(){
        this.editingAddress=true;
        this.loadInfo();
    }
    updateCurrency(info){
      this.submittedCurrency = true;
      if (this.ngFormCurrency.invalid) {
        this._uw.errorFormCurrency=true;
        return;
      } 
      this._uw.errorFormCurrency=false;
      this.infoCurrency.usd =(1/info.usd);
      this.infoCurrency.colp = (info.colp);
      let id = this._uw.info[0].id;
      this.dataApi.updateCurrency(this.infoCurrency, id)
        .subscribe(
          // info => this.router.navigate(['/succesConfig'])
      );
      this.info[0].usd=1/info.usd;
      this.infoNew.usd=info.usd;
      this.editing=false;
    }
    updatePorcentaje(info){
      this.submittedPorcentaje = true;
      if (this.ngFormPorcentaje.invalid) {
        this._uw.errorFormCurrency=true;
        return;
      } 
      this._uw.errorFormPorcentaje=false;
      this.infoPorcentaje=this._uw.info[0];
      let usdPre=this._uw.info[0].usd;

      this.infoPorcentaje.usd=(1/usdPre);
      this.infoPorcentaje.bitcoin =(info.bitcoin);
      this.infoPorcentaje.paypal = (info.paypal);
      let id = this._uw.info[0].id;
      this.dataApi.updatePorcentaje(this.infoPorcentaje, id)
        .subscribe(
          // info => this.router.navigate(['/succesConfig'])
      );
      this.info[0].bitcoin=info.bitcoin;
      this.infoNew.bitcoin=info.bitcoin;
      this.editingPorcentaje=false;
      this.infoNew.usd=(usdPre);
      // console.log("usd: " +usdPre);
    }
    updateAddress(info){
      this.submittedAddress = true;
      if (this.ngFormAddress.invalid) {
        this._uw.errorFormAddress=true;
        return;
      } 
      this._uw.errorFormAddress=false;
      this.infoAddress=this._uw.info[0];
      let usdPre=this._uw.info[0].usd;

      this.infoAddress.usd=(1/usdPre);
      this.infoAddress.bitcoinaddress =(info.bitcoinaddress);
      this.infoAddress.paypaladdress = (info.paypaladdress);
      let id = this._uw.info[0].id;
      this.dataApi.updateAddress(this.infoAddress, id)
        .subscribe(
          // info => this.router.navigate(['/succesConfig'])
      );
      this.info[0].bitcoinaddress=info.bitcoinaddress;
      this.infoNew.bitcoin=info.bitcoin;
      this.editingAddress=false;
      this.infoNew.usd=(usdPre);
      // console.log("usd: " +usdPre);
    }


    get fval() {
      return this.ngFormCurrency.controls;
    }
    get fvalPorcentaje() {
      return this.ngFormPorcentaje.controls;
    }
    get fvalAddress() {
      return this.ngFormAddress.controls;
    }
}
