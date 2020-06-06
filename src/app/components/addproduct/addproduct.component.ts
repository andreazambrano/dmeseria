import { AuthService } from '../../services/auth.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { delay, map } from 'rxjs/operators';
import { DemoFilePickerAdapter } from  '../../file-picker.adapter';
import { FilePickerComponent } from '../../../assets/file-picker/src/lib/file-picker.component';
import { FilePreviewModel } from '../../../assets/file-picker/src/lib/file-preview.model';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { HttpClient } from  '@angular/common/http';
import { isError } from "util";
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface';  
import { UserWService } from '../../services/user-w.service';
import { ValidationError } from '../../../assets/file-picker/src/lib/validation-error.model';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  favoriteSeason: string;
  seasons: string[] = ['Un precio para todos', 'Precio por talla'];

 adapter = new DemoFilePickerAdapter(this.http,this._uw);
  @ViewChild('uploader', { static: true }) uploader: FilePickerComponent;
   myFiles: FilePreviewModel[] = [];

 ngFormAddtixs: FormGroup;
  submitted = false;
  constructor(
  private  http: HttpClient,
  public _uw:UserWService, 
  private dataApiService: DataApiService,
  private location: Location,
  private router: Router,
  private formBuilder: FormBuilder
  	) { }

public tix : TixInterface ={
      userd:"",
      productName:"",
      description:"",
      notes:"",
      category:"categoría",
      check:[],
      color:"",
      colection:"",
      globalPrice:0,
      images:[],
      modelo:"",
      presentacion:"",
      new:true,
      status:"",
      tallas:[],
      typePrice:"global"
    };


    public isError = false;
    public isLogged =false;
    public check = "check";
    public urlCreated = "";
    public images:any[]=[];
    public checks:any[]=[];
    public sin:any[]=[];
    public con:any[]=[];
    public tallas:any[]=[];

     iniciador(size){
        for (var i = 0; i < size; i++) {
          this.checks[i]=true;
          if (this._uw.moccs)
          {
          this.con[i]=0;
          this.sin[i]=0;
          }
        }
     }


  ngOnInit() {      
    this._uw.images=[];
    this.ngFormAddtixs = this.formBuilder.group({
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      presentacion:[true, [Validators.required]],
      globalPrice: [0,[Validators.required]]
      });
  }


 get fval() {
  return this.ngFormAddtixs.controls;
  }

  sendTix(){
      this.submitted = true;
      if (this.ngFormAddtixs.invalid) {
        this._uw.errorFormAddtixs=true;
        this._uw.continuar=true;
        this._uw.formulario=true;
      return;
        } 
      this._uw.errorFormAddtixs=false;
      this.tix = this.ngFormAddtixs.value;
      this.tix.status="activated";
      this.tix.images=this._uw.images;
      this._uw.continuar=true;
      this.dataApiService.saveTixFree(this.tix)
        .subscribe(
        );
        this.router.navigate(['/success']);
  }    
    
 finish(){
    if (this._uw.errorFormAddtixs){
      this._uw.formulario=true;
      this.sendTix();    
    }

  }
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
  set():void{
   
  }
  setType():void{

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
