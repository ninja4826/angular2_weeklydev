import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { User } from '../user';

@Component({
  selector: 'home',
  template: require('./home.html')
})
export class HomeComponent {
  router: Router;
  appService: AppService;
  
  user: User;
  
  constructor(router: Router, appService: AppService) {
    this.router = router;
    this.appService = appService;
  }
  
  ngOnInit() {
    if (!this.appService.user) {
      this.router.navigate(['/login']);
    }
    this.user = this.appService.user;
  }
}