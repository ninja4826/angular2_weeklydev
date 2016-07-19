import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'user',
  template: require('./user.html')
})
export class UserComponent {
  appService: AppService;
  user: User;
  
  constructor(appService: AppService) {
    this.appService = appService;
  }
  
  ngOnInit() {
    this.appService.userEmitter.subscribe((user) => {
      this.user = user;
    });
  }
}