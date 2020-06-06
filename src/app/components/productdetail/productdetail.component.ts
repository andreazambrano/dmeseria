import { ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface'; 
import { UserWService } from "../../services/user-w.service";
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { isError } from "util";
// declare var $: any;
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {


 loadAPI = null;   
 url6 = "assets/dist-assets/js/scripts/script.min.js";
 url5 = "assets/dist-assets/js/scripts/script_2.min.js";
 url4 = "assets/dist-assets/js/scripts/echart.options.min.js";
  url = "assets/dist-assets/js/scripts/apexAreaChart.script.min.js";
  url2 = "assets/dist-assets/js/scripts/echarts.script.min.js";
  urla="assets/dist-assets/js/scripts/dashboard.v4.script.min.js";
  url3 = "assets/dist-assets/js/scripts/widgets-statistics.min.js";

  constructor(
    public _uw:UserWService,
    private dataApi: DataApiService,
    private location: Location,
    private route:ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  	) { }


    ngFormCostPrice: FormGroup;
    ngFormBeneficio: FormGroup;
    ngFormStock: FormGroup;

    submittedCostPrice= false;
    submittedBeneficio = false;
    submittedStock = false;


    editingCostPrice=false;
    editingBeneficio=false;
    editingStock=false;

    tixCostPrice:any={};
    tixBeneficio:any={};
    tixStock:any={};

    public tixUpdate:TixInterface;
    public tix:TixInterface;

    editarCostPrice(){
        this.editingCostPrice=true;
    }
    editarBeneficio(){
        this.editingBeneficio=true;
    }
    editarStock(){
        this.editingStock=true;
    }

    updateCostPrice(tix){
      this.submittedCostPrice= true;
      if (this.ngFormCostPrice.invalid) {
        this._uw.errorFormCostPrice=true;
        return;
      } 
      this._uw.errorFormCostPrice=false;
      this.tixCostPrice=tix;
      let costPrice=tix.costPrice;

      this.tixCostPrice.costPrice=costPrice;
            this.tixCostPrice.globalPrice=this.tixCostPrice.costPrice+(this.tixCostPrice.costPrice*tix.beneficio/100);
      let id = tix.id;
      this.dataApi.updateTixCostPrice(this.tixCostPrice, id)
        .subscribe(
          // tix => this.router.navigate(['/succesConfig'])
      );
          this.editingCostPrice=false;
    }
        updateBeneficio(tix){
      this.submittedBeneficio= true;
      if (this.ngFormBeneficio.invalid) {
        this._uw.errorFormBeneficio=true;
        return;
      } 
      this._uw.errorFormBeneficio=false;
      this.tixBeneficio=tix;
      let beneficio=tix.beneficio;

      this.tixBeneficio.beneficio=beneficio;
      this.tixBeneficio.globalPrice=this.tixBeneficio.costPrice+(this.tixBeneficio.costPrice*tix.beneficio/100);
      let id = tix.id;
      this.dataApi.updateTixBeneficio(this.tixBeneficio, id)
        .subscribe(
          // tix => this.router.navigate(['/succesConfig'])
      );
          this.editingBeneficio=false;

    }

    updateStock(tix){
      this.submittedStock= true;
      if (this.ngFormStock.invalid) {
        this._uw.errorFormStock=true;
        return;
      } 
      this._uw.errorFormStock=false;
      this.tixStock=tix;
      let stock=tix.stock;

      this.tixStock.stock=stock;
      this.tixStock.globalPrice=this.tixStock.costPrice+(this.tixStock.costPrice*tix.beneficio/100);
      let id = tix.id;
      this.dataApi.updateTixStock(this.tixStock, id)
        .subscribe(
          // tix => this.router.navigate(['/succesConfig'])
      );
          this.editingStock=false;
    }
    
    

  ngOnInit() {

    this.ngFormCostPrice = this.formBuilder.group({
        costPrice: [0, [Validators.required]]
        });
    this.ngFormBeneficio = this.formBuilder.group({
        beneficio: [0, [Validators.required]]
        });
    this.ngFormStock = this.formBuilder.group({
        stock: [0, [Validators.required]],
        stockmin: [0, [Validators.required]]
        });
    

    this.getDetails(this.route.snapshot.paramMap.get('id'));
     if (this._uw.loaded==true){
          this.loadAPI = new Promise(resolve => {

           });
        }
     this._uw.loaded=true;
  }
  getDetails(id: string){
    this.dataApi.getTixById(id).subscribe(tix => (this.tix = tix));
  }
  get fvalCostPrice() {
      return this.ngFormCostPrice.controls;
    }
    get fvalBeneficio() {
      return this.ngFormBeneficio.controls;
    }
    get fvalStock() {
      return this.ngFormStock.controls;
    }

}
