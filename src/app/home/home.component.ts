import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { SocketService } from '../socket';
import { User } from '../user';

@Component({
  selector: 'home',
  template: require('./home.html')
})
export class HomeComponent {
  router: Router;
  appService: AppService;
  socketService: SocketService;
  
  user: User;
  
  constructor(router: Router, appService: AppService, socketService: SocketService) {
    this.router = router;
    this.appService = appService;
    this.socketService = socketService;
  }
  
  ngOnInit() {
    if (!this.appService.user) {
      this.router.navigate(['/login']);
    }
    this.user = this.appService.user;
    
    // this.socketService.socket.emit('ayy');
    this.socketService.connect();
  }
}