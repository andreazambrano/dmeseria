import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {



  constructor(  public _uw:UserWService,
   private location: Location,
    public router: Router
     ) { }
   loadAPI = null;  
    url = "assets/dist-assets/js/plugins/metisMenu.min.js";
     url2 = "assets/dist-assets/js/plugins/hopscotch.min.js";
    url3 = "assets/dist-assets/js/scripts/hopscotch.script.min.js";
  ngOnInit() {   
   this._uw.tixPreview.quantity=1;
 if (this._uw.loaded==true){
          this.loadAPI = new Promise(resolve => {
            this.loadScript();
              this.loadScript2();
             this.loadScript3();
          });
        }
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
           public loadScript3() {
      let node = document.createElement("script");
      node.src = this.url3;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }

}
