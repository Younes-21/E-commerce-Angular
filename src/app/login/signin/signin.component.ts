import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email:any;
  password:any;
  users:any;
  found =false;
  connect =true;
  constructor(private userService : UserService ,private router: Router) { }


  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
      this.users = data;
      console.log("users:",this.users)
      },
      err => {
        console.log(err)  
      }
      );
      const found = localStorage.getItem('found');
      console.log("found here",found)
      if(found == 'true'){
          this.router.navigate(['/home']); 
      }
    }
  login(){
    console.log("f login")
    for(let i=0;i<this.users.length;i++){
if(this.email == this.users[i].email && this.password == this.users[i].password ){
  localStorage.setItem('UserRole', this.users[i].role)
  localStorage.setItem('UserId', this.users[i].id)
  this.found = true;
}
}
if(this.found == true){
  this.connect = true;
  console.log("fouuuuuund")
  localStorage.setItem('found','true')

  //this.router.navigate(['/home']); 
  location.reload();
}
else{
  this.connect = false;
}
  }

}
