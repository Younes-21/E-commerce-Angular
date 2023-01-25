import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
categories?:any;

  constructor(private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      data =>{
        this.categories = data;
        console.log("ici les categories :",this.categories);
      }
    )
  }

}
