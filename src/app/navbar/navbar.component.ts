import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  UserRole=localStorage.getItem('UserRole');

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("f navbar :",this.UserRole)
   }
  
   logout(){
    localStorage.removeItem('UserRole');
    localStorage.removeItem('found');
    window.location.reload();
   }
  

}
