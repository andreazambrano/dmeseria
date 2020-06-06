import {RouterModule,Routes} from '@angular/router';
import {
	AdminComponent,
	FooterComponent,
	ProductsComponent,
	ProductdetailComponent,
	TestappComponent,
	SidenavComponent,
	ConfigComponent,
	OrdersComponent,
	OrderdetailComponent,
	AddproductComponent,
	SuccessComponent

	}from "./components/index.paginas";

	import { AuthGuard } from './guards/auth.guard';

const app_routes: Routes = [
	{path:'',component:TestappComponent},
	{path:'admin',component:AdminComponent},
	{path:'footer',component:FooterComponent},
	{path:'products',component:ProductsComponent},
	{path:'productdetail/:id',component:ProductdetailComponent},
	{path:'config',component:ConfigComponent},
	{path:'sidenav',component:SidenavComponent},
	{path:'orders',component:OrdersComponent},
	{path:'orderdetail',component:OrderdetailComponent},
	{path:'addproduct',component:AddproductComponent},
	{path:'success',component:SuccessComponent },
	{path:'**',pathMatch:'full',redirectTo:''}
	];
	export const app_routing = RouterModule.forRoot(app_routes);

