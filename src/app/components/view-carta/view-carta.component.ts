import { AuthService } from './../../service/auth.service';
import { Product } from './../../models/product';
import { Category } from './../../models/category';
import { ProductService } from './../../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-carta',
  templateUrl: './view-carta.component.html',
  styleUrls: ['./view-carta.component.css']
})
export class ViewCartaComponent implements OnInit {

  barId: string;
  categoryList: Category[];
  productListPerCat: Product[];
  name: string;
  image: File;
  direccion: string;
  viewMoreCat: Category[];
  isPictureOpen: boolean;
  pictureSelected: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  this.activatedRoute.paramMap.subscribe(params => {
    this.barId = params.get('id');
    if(this.barId){

      this.getData(this.barId);


      var z = this.product.getAllCategories(this.barId);

      var z = this.product.getAllCategories(this.barId);
      z.valueChanges().subscribe(item => {
        this.categoryList = [];
        this.productListPerCat = [];
        item.forEach(element => {
          var y = element;
          this.categoryList.push(y as Category);
          var v = this.product.getProductsPerCategoryForUser(this.barId, element.id);
          v.valueChanges().subscribe(item => {
          item.forEach(elementProd => {
            var v = elementProd;
            this.productListPerCat.push(v as Product);
            });
          });
        });
       });

    }
  })

  }

  getData(id) {
    this.authService.getProfileForMyDashboard(id).subscribe(
      res => {
        this.name = res.payload.val().name;
        this.image = res.payload.val().image;
        this.direccion = res.payload.val().direccion;
        console.log(this.name);
      });
  }

  selectViewMore(item, catId){
    this.viewMoreCat = item.category;
  }

  unselectViewMore(item){
    this.viewMoreCat = null;

   // this.makeViewMore(null)
  }

  makeViewMore(item) {
    return this.viewMoreCat === item.category;
  }

  openPicture(prod){
    this.pictureSelected = prod;
    this.isPictureOpen = true;
  }
  closePicture(){
    this.isPictureOpen = false;
    this.pictureSelected = null;
  }

}
