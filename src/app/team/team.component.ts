import { Component, Inject } from '@angular/core';
import { AppService } from '../app.service';
import { UserService, User } from '../user';
import { Team } from './team.service';

@Component({
  selector: 'team',
  template: require('./team.html')
})
export class TeamComponent {
  appService: AppService;
  userService: UserService;
  
  user: User;
  team: Team;
  
  constructor(
    appService: AppService,
    // userService: UserService
  ) {
    this.appService = appService;
    // this.userService = userService;
    // console.log(this.appService.userService);
    this.userService = this.appService.userService;
  }
  
  ngOnInit() {
    this.user = this.appService.user;
    this.team = this.user.team[0];
    this.appService.userEmitter.subscribe((user: User) => {
      console.log('user emitted');
      this.user = user;
      this.team = this.user.team[0];
    });
  }
  
  startSearching(): void {
    this.userService.joinMatchmaking();
  }
}