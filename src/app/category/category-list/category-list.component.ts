import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories:any
  isAdmin = false;

  constructor(
    private categoryService: CategoryService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    /*if (this.tokenStorageService.hasRole('ADMIN')) {
      this.isAdmin = true*/
      this.categoryService.getAll().subscribe(
        res => {
          console.log("res category list")
          console.log(res)
          this.categories = res
        },
        err =>{
        }
      )
    //}
  }
  goToCategoryCreate(){
    this.router.navigate(['/category-create']);
  }

  editCategory(id:number){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentIndex: id
      }
    };
    this.router.navigate(['/category-edit'], navigationExtras);
  }
  deleteCategory(id:number){
   // if (this.isAdmin) {
     this.categoryService.delete(id).subscribe(
      data => {
        console.log(data);
//        this.router.navigate(['/category-list']);
     window.location.reload();

      }
     )
    //}
  }

}