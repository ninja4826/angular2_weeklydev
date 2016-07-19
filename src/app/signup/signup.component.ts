import { Component } from '@angular/core';
import { UserService, User } from '../user';

@Component({
  selector: 'login',
  template: require('./signup.html')
})
export class SignupComponent {
  userService: UserService;
  user: User;
  
  username: string;
  email: string;
  password: string;
  
  constructor(userService: UserService) {
    this.userService = userService;
  }
  
  ngOnInit() {
    this.userService.userEmitter.subscribe((user) => {
      this.user = user;
      console.log('signup got user!', user);
    });
  }
  
  doSignup() {
    if (this.username &&
      this.username !== "" &&
      this.email &&
      this.email !== "" &&
      this.password &&
      this.password !== ""
    ) {
      this.userService.newUser(this.username, this.email, this.password);
    }
  }
}