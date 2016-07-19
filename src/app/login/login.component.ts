import { Component } from '@angular/core';
import { UserService, User } from '../user';

@Component({
  selector: 'login',
  template: require('./login.html')
})
export class LoginComponent {
  userService: UserService;
  user: User;
  
  username: string;
  password: string;
  
  constructor(userService: UserService) {
    this.userService = userService;
  }
  
  ngOnInit() {
    this.userService.userEmitter.subscribe((user) => {
      this.user = user;
      console.log('login got user!', user);
    });
  }
  
  doLogin() {
    if (this.username && this.username !== "" && this.password && this.password !== "") {
      this.userService.login(this.username, this.password);
    }
  }
}