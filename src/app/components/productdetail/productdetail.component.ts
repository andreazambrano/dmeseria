import { ActivatedRoute, Params} from '@angular/router';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface'; 
import { HttpClient } from  '@angular/common/http';

import { UserWService } from "../../services/user-w.service";
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { DemoFilePickerAdapter } from  '../../file-picker.adapter';
import { FilePickerComponent } from '../../../assets/file-picker/src/lib/file-picker.component';
import { FilePreviewModel } from '../../../assets/file-picker/src/lib/file-preview.model';
import { ValidationError } from '../../../assets/file-picker/src/lib/validation-error.model';
import { isError } from "util";
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {


   adapter = new DemoFilePickerAdapter(this.http,this._uw);
  @ViewChild('uploader', { static: true }) uploader: FilePickerComponent;
   myFiles: FilePreviewModel[] = [];

 loadAPI = null;   
  constructor(
      private  http: HttpClient,
    public _uw:UserWService,
    private dataApi: DataApiService,
    private location: Location,
    private route:ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  	) { }

     public images:any[]=[];

    ngFormProductInfo: FormGroup;
    submittedProductInfo= false;
    editingProductInfo=false;
    updateImages=false;
    deletingProduct=false;
    deleted=false;
    edited=false;
    tixProductInfo:any={};

    public tixUpdate:TixInterface;
    public tix:TixInterface;

    editarProductInfo(){
        this.editingProductInfo=true;
    }

    updateImagesFuuntion(){

      this.updateImages=true;
    }

    calcelUpdate(){
      this.updateImages=false; 
    }
    deleteProduct(){
      this.deletingProduct=true;
    }
    borrar(tix){
      tix.status="deleted";
          let id = tix.id;
      this.dataApi.updateTixProductInfo(this.tixProductInfo, id)
        .subscribe(
      );
      this.deleted=true;  

    }
    cancelBorrar(){
      this.deletingProduct=false; 

    }
    updateProductInfo(tix){
      this.submittedProductInfo= true;
      if (this.ngFormProductInfo.invalid) {
        this._uw.errorFormProductInfo=true;
        return;
      } 
      this._uw.errorFormProductInfo=false;
      this.tixProductInfo=tix;
      if (this.updateImages){
      this.tixProductInfo.images=this._uw.images;
      }
      let id = tix.id;
      this.dataApi.updateTixProductInfo(this.tixProductInfo, id)
        .subscribe(
      );
      this.editingProductInfo=false;
      this.updateImages=false;
        // this._uw.images=[];
        this.edited=true;
       this._uw.images=[]; 
    }

    ngOnInit() {
      // this._uw.images=[];
      this.ngFormProductInfo = this.formBuilder.group({
          productName: ['', [Validators.required]],
          description: ['', [Validators.required]],
          dimensiones: ['', [Validators.required]],
          globalPrice: [0, [Validators.required]]
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
      // this._uw.images=this.tix.images;
    }

    get fvalProductInfo() {
      return this.ngFormProductInfo.controls;
    }

      reset():void{
    this._uw.selectorA=true;
    this.router.navigate(['/addtixs']);
  }
   onValidationError(e: ValidationError) {
    console.log(e);
  }
  onUploadSuccess(e: FilePreviewModel) {
  this.images=this._uw.file;
  }
  onRemoveSuccess(e: FilePreviewModel) {  
    console.log(e);
  }
  onFileAdded(file: FilePreviewModel) {
     this.myFiles.push(file);
  }

  removeFile() {
  this.uploader.removeFileFromList(this.myFiles[0].fileName);
  }
}
