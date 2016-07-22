import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { User } from '../user';
import { Team } from './team.service';

@Component({
  selector: 'team',
  template: require('./team.html')
})
export class TeamComponent {
  appService: AppService;
  
  user: User;
  team: Team;
  
  constructor(appService: AppService) {
    this.appService = appService;
  }
  
  ngOnInit() {
    this.user = this.appService.user;
    this.team = this.user.team[0];
  }
}