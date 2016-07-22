import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../app.service';
import { ITeam, Team, TeamService } from '../team';
// import { IProject, Project, ProjectService } from '../project';
// import { IGhostTeam, GhostTeam, GhostTeamService } from '../ghostTeam';

@Injectable()
export class UserService {
  private http: Http;
  private appService: AppService;
  
  private teamService: TeamService;
  // private projectService: ProjectService;
  // private ghostTeamService: GhostTeamService;
  
  constructor(
    http: Http,
    appService: AppService,
    teamService: TeamService,
    // projectService: ProjectService,
    // ghostTeamService: GhostTeamService
  ) {
    this.http = http;
    this.appService = appService;
    
    this.teamService = teamService;
    // this.projectService = projectService;
    // this.ghostTeamService = ghostTeamService;
  }
  
  login(username: string, password: string): void {
    console.log('appService.host:', this.appService.host);
    let loginReq = this.http.post(`${this.appService.host}/login`, null, this.appService.jsonHeader(this.getLoginHeader(username, password)));
    loginReq.map(this.decodeUser).subscribe((l: LoginRes) => {
      this.appService.token = l.token;
      console.log('decoded:', l);
      
      this.appService.user = new User(l.user);
    });
  }
  
  newUser(username: string, email: string, password: string): void {
    let newUserReq = this.http.post(`${this.appService.host}/users/new`, { username, email, password }, this.appService.jsonHeader());
    newUserReq.map(this.decodeUser).subscribe((l: LoginRes) => {
      this.appService.token = l.token;
      console.log('decoded:', l);
      
      this.appService.user = new User(l.user);
    });
  }
  
  private decodeUser(res: Response): LoginRes {
    if (!res.ok) {
      return null;
    }
    
    return <LoginRes>res.json();
  }
  
  private getLoginHeader(username: string, pass: string): RequestOptions {
    let headers = new Headers();
    let authStr = btoa(`${username}:${pass}`);
    headers.append("Authorization", `basic ${authStr}`);
    return new RequestOptions({
      headers
    });
  }
}

interface LoginRes {
  token: string;
  user: IUser;
}

export interface IUser {
  id?: string;
  userId: string;
  email: string;
  username: string;
  access: string[];
  team: ITeam[];
  // project: IProject[];
  // ghostTeams: IGhostTeam[];
}

export class User implements IUser {
  id: string;
  userId: string;
  email: string;
  username: string;
  access: string[];
  team: Team[] = [];
  // project: Project[];
  // ghostTeams: GhostTeam[];
  
  constructor(user: IUser) {
    if (typeof user !== 'string') {
      this.id = user.id;
      this.userId = user.userId;
      this.email = user.email;
      this.username = user.username;
      this.access = user.access;
      this.team = user.team.map(t => new Team(t));
      // this.project = user.project.map(p => new Project(p));
      // this.ghostTeams = user.ghostTeams.map(gT => new GhostTeam(gT));
    }
  }
}