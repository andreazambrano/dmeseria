import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { TixInterface } from '../models/tix-interface';
import { InfoInterface } from '../models/info-interface';
import { SaleInterface } from '../models/sale-interface';
import { OrderInterface } from '../models/order-interface';
import { UserWService } from "./user-w.service";

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
	info: Observable<any>;
	tixs: Observable<any>;
	tix: Observable<any>;
	sales: Observable<any>;
	sale: Observable<any>;
	orders: Observable<any>;
	order: Observable<any>;
	
  constructor(
  	public _uw:UserWService,
  	private http: HttpClient, 
  	private authService:AuthService
  	) {}
  	headers : HttpHeaders = new HttpHeaders({
  		"Content-Type":"application/json",
  		Authorization: this.authService.getToken()
  		});
	saveTixFree(tix :TixInterface){
		const url_api='https://db.andesproadventures.com:3025/api/tixes';
		return this.http
		.post<TixInterface>(url_api, tix)
		.pipe(map(data => data));
	}
  	getSalePending(){	
		const url_api='https://db.andesproadventures.com:3025/api/sale?filter[where][status]=new';
		return (this.sales = this.http.get(url_api));
	}
	getOrderPending(){	
		const url_api='https://db.andesproadventures.com:3025/api/order?filter[where][status]=new';
		return (this.orders = this.http.get(url_api));
	}
	getSales(){	
		const url_api = 'https://db.andesproadventures.com:3025/api/sale';
		return this.http.get(url_api);
	}
	getOrders(){	
		const url_api = 'https://db.andesproadventures.com:3025/api/order';
		return this.http.get(url_api);
	}
	getAllTixs(){
		const url_api = 'https://db.andesproadventures.com:3025/api/tixes?filter[where][status]=activated';
		return this.http.get(url_api);
	}
	getBulbos(){
		const url_api = 'https://db.andesproadventures.com:3025/api/tixes?filter[where][and][0][status]=activated&filter[where][and][1][category]=Bulbos';
		return this.http.get(url_api);
	}
	getFrutos(){
		const url_api = 'https://db.andesproadventures.com:3025/api/tixes?filter[where][and][0][status]=activated&filter[where][and][1][category]=Frutos';
		return this.http.get(url_api);
	}
	getLegumbres(){
		const url_api = 'https://db.andesproadventures.com:3025/api/tixes?filter[where][and][0][status]=activated&filter[where][and][1][category]=Legumbres';
		return this.http.get(url_api);
	}
	getTuberculos(){
		const url_api = 'https://db.andesproadventures.com:3025/api/tixes?filter[where][and][0][status]=activated&filter[where][and][1][category]=Tubérculos';
		return this.http.get(url_api);
	}
	getVerduras(){
		const url_api = 'https://db.andesproadventures.com:3025/api/tixes?filter[where][and][0][status]=activated&filter[where][and][1][category]=Verduras';
		return this.http.get(url_api);
	}
	getInfo(){
		const url_api=`https://db.andesproadventures.com:3025/api/infos/`;
		this.info = this.http.get(url_api);
		return (this.info);
	}
	getTixById(id:string){
		let indice = id;
		const url_api=`https://db.andesproadventures.com:3025/api/tixes/${indice}`;
		this.tix = this.http.get(url_api);
		return (this.tix);
	}
	getSaleById(id:string){
		let indice = id;
		const url_api=`https://db.andesproadventures.com:3025/api/sale/${indice}`;
		this.sale = this.http.get(url_api);
		return (this.sale);
	}
	getOrderById(id:string){
		let indice = id;
		const url_api=`https://db.andesproadventures.com:3025/api/order/${indice}`;
		this.order = this.http.get(url_api);
		return (this.order);
	}
	updateCurrency(info :InfoInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=`https://db.andesproadventures.com:3025/api/infos/${id}`;
		return this.http
		.put<InfoInterface>(url_api, info)
		.pipe(map(data => data));
	}
	updatePorcentaje(info :InfoInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=`https://db.andesproadventures.com:3025/api/infos/${id}`;
		return this.http
		.put<InfoInterface>(url_api, info)
		.pipe(map(data => data));
	}
	updateAddress(info :InfoInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=`https://db.andesproadventures.com:3025/api/infos/${id}`;
		return this.http
		.put<InfoInterface>(url_api, info)
		.pipe(map(data => data));
	}
	updateTixCostPrice(tix :TixInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=`https://db.andesproadventures.com:3025/api/tixes/${id}`;
		return this.http
		.put<TixInterface>(url_api, tix)
		.pipe(map(data => data));
	}
	updateTixBeneficio(tix :TixInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=`https://db.andesproadventures.com:3025/api/tixes/${id}`;
		return this.http
		.put<TixInterface>(url_api, tix)
		.pipe(map(data => data));
	}
	updateTixStock(tix :TixInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=`https://db.andesproadventures.com:3025/api/tixes/${id}`;
		return this.http
		.put<TixInterface>(url_api, tix)
		.pipe(map(data => data));
	}


}