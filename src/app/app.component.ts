/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { User } from './user';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.style.css')
  ],
  template: require('./app.html')
})
export class App {
  private router: Router;
  private appService: AppService;
  
  user: User;

  constructor(router: Router, appService: AppService) {
    this.router = router;
    this.appService = appService;
  }

  ngOnInit() {
    this.appService.signin.subscribe(() => {
      this.router.navigate(['/home']);
    });
    
    this.appService.userEmitter.subscribe((user: User) => {
      this.user = user;
    });
  }
  
  signout() {
    this.appService.token = undefined;
    this.appService.user = undefined;
    this.router.navigate(['/login']);
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
