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
  password: string = '';
  
  constructor(router: Router, appService: AppService, userService: UserService) {
    this.router = router;
    this.appService = appService;
    this.userService = userService;
    this.appService.userService = this.userService;
  }
  
  ngOnInit() {
    
  }
  
  doLogin() {
    if (this.username && this.username !== "" && this.password && this.password !== "") {
      this.userService.login(this.username, this.password);
      this.appService.userEmitter.subscribe((user) => {
        if (!this.user) {
          this.router.navigate(['/home']);
        }
        this.user = this.appService.user;
      });
    }
  }
  
  goToSignup() {
    this.router.navigate(['/signup']);
  }
  
  resetPass(): void {
    console.log('Password reset has not yet been implemented.');
  }
}