import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { DataService } from '../../data.service';
import { ActivatedRoute, Params } from '@angular/router';

declare var $: any;

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private dataService: DataService, private http: Http, private route: ActivatedRoute) {
    this.filesToUpload = [];
  }

  editMode = false;


  uploadUrl = environment.serverAdress;

  status = 0;
  originalCode: '';
  product: any = {};
  categories: any = [];
  checkedCategories: any = {};
  filesToUpload: Array<File>;
  imageUrl: any = '';


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

    if (this.filesToUpload && this.filesToUpload[0]) {
      var reader = new FileReader();

      reader.onload = (e: any) => {
        this.product.imageUrl = e.target.result;
        this.imageUrl = '';
      };

      reader.readAsDataURL(this.filesToUpload[0]);
    }
    else {
      this.product.imageUrl = '';
    }
  }

  changeImageUrl(url) {
    this.imageUrl = url;
    const uploadInput = $('#imageUpload');
    uploadInput.wrap('<form>').closest('form').get(0).reset();
    uploadInput.unwrap();
    this.filesToUpload = [];
    this.product.imageUrl = url;
  }

  makeFileRequest(url: string, files: Array<File>, callback) {
    const imageFile = files[0];
    this.status = 1;
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      formData.append("image", imageFile, imageFile.name);
      this.http.post(url, formData)
        .subscribe(
          res => callback(res.json()),
          err => callback(null, err)
        );

    });
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['code']) {
            this.product.code = params['code'];
            this.dataService.getProductDetails(this.product.code)
              .subscribe(
                data => {
                  const tempProduct = data.json().product;
                  this.originalCode = tempProduct.code;
                  this.product = tempProduct;
                  this.imageUrl = tempProduct.imageUrl;
                  data.json().categories.forEach(item => {
                    this.checkedCategories[item.category] = true;
                  })
                }
              )
            this.editMode = true;
          } else {
            this.editMode = false;
          }

        }
      )
    this.dataService.getCategories().subscribe(
      categories => {
        this.categories = categories.json();
        $(document).ready(() => {
          $('.ui.checkbox').checkbox();
        });
      },
      err => window.location.href = '/login'
    );
  }

  newProduct() {
    this.checkedCategories = {};
    this.product = {};
    this.status = 0;
    $(document).ready(() => {
      $('.ui.checkbox').checkbox();
      this.changeImageUrl('');
    });
  }

  sendForm() {


    if (this.filesToUpload.length) {
      this.makeFileRequest(this.uploadUrl + 'fileupload', this.filesToUpload, (imageUrl, errUploading) => {
        if (imageUrl) {
          this.product.imageUrl = 'images/' + imageUrl;

          this.saveProduct();
        }
        else {
          this.status = 3;
        }
      });
    } else {
      this.saveProduct()
    }
  }

  saveProduct() {
    this.status = 1;
    if (this.editMode) {
      this.dataService.updateProduct({ product: this.product, categories: this.checkedCategories }, this.originalCode)
        .subscribe(
          res => {
            if (res.json().success) {
              this.status = 2;
            } else {
              this.status = 3;
            }
          },
          err => {
            if (err.status == 401) { window.location.href = '/login'; return; }
            this.status = 3;
          }
        )
    } else {
      this.dataService.createProduct({ product: this.product, categories: this.checkedCategories })
        .subscribe(
          res => {
            if (res.json().success) {
              this.status = 2;
            } else {
              this.status = 3;
            }
          },
          err => {
            if (err.status == 401) { window.location.href = '/login'; return; }
            this.status = 3;
          }
        )
    }
  }

  tryAgain() {
    this.status = 0;
    $(document).ready(() => {
      $('.ui.checkbox').checkbox();
    });
  }

  validate() {
    if (
      this.product.code &&
      this.product.details &&
      this.product.name &&
      this.product.price &&
      (this.product.imageUrl || this.filesToUpload.length)
    ) {
      return true;
    }
    return false;
  }

}
