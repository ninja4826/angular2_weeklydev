import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { User, UserService } from './user.service';

@Component({
  selector: 'user-form',
  template: require('./user.html'),
})
export class UserComponent {
  appService: AppService;
  userService: UserService;
  
  user: User;
  
  email: string = '';
  oldPass: string = '';
  newPass: string = '';
  
  constructor(appService: AppService, userService: UserService) {
    this.appService = appService;
    this.userService = userService;
  }
  
  ngOnInit() {
    this.user = this.appService.user;
    this.email = this.user.email;
    this.appService.userEmitter.subscribe((user: User) => {
      this.user = user;
    });
  }
  
  updateEmail() {
    this.userService.updateEmail(this.email);
  }
  
  updatePass() {
    
  }
}