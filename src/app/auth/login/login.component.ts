import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: RouterExtensions
  ) { }

  ngOnInit() {
  }

  onSignin() {
    // this.router.navigate(['/home']);
  }

}
