import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { UserService, User } from '../user';

@Component({
  selector: 'login',
  template: require('./login.html')
})
export class LoginComponent {
  router: Router;
  appService: AppService;
  userService: UserService;
  user: User;
  
  username: string = '';
  email: string = '';
  password: string = '';
  
  signupMode: boolean = false;
  
  constructor(router: Router, appService: AppService, userService: UserService) {
    this.router = router;
    this.appService = appService;
    this.userService = userService;
  }
  
  ngOnInit() {
    this.appService.userEmitter.subscribe((user) => {
      this.user = user;
      console.log('login got user!', user);
      this.router.navigate(['/home']);
    });
  }
  
  doLogin() {
    if (this.username && this.username !== "" && this.password && this.password !== "") {
      this.userService.login(this.username, this.password);
    }
  }
  
  goToSignup() {
    this.router.navigate(['/signup']);
  }
  
  // doSignup() {
  //   if (this.username &&
  //     this.username !== "" &&
  //     this.email &&
  //     this.email !== "" &&
  //     this.password &&
  //     this.password !== ""
  //   ) {
  //     this.userService.newUser(this.username, this.email, this.password);
  //   }
  // }
}