import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../app.service';
import { ITeam, Team } from '../team';
import { ISurvey, Survey } from '../survey';
// import { IProject, Project, ProjectService } from '../project';
// import { IGhostTeam, GhostTeam, GhostTeamService } from '../ghostTeam';

@Injectable()
export class UserService {
  private http: Http;
  private appService: AppService;
  
  // private teamService: TeamService;
  // private projectService: ProjectService;
  // private ghostTeamService: GhostTeamService;
  
  constructor(
    http: Http,
    appService: AppService,
    // teamService: TeamService,
    // projectService: ProjectService,
    // ghostTeamService: GhostTeamService
  ) {
    this.http = http;
    this.appService = appService;
    console.log('in user service');
    if (this.appService.token) {
      this.refreshUser();
    }
    // this.teamService = teamService;
    // this.projectService = projectService;
    // this.ghostTeamService = ghostTeamService;
  }
  
  login(username: string, password: string): void {
    console.log('appService.host:', this.appService.host);
    let loginReq = this.http.post(`${this.appService.host}/login`, null, this.appService.headers(true, false, this.getLoginHeader(username, password)));
    loginReq.map(this.decodeUser).subscribe((l: LoginRes) => {
      this.appService.token = l.token;
      console.log('decoded:', l);
      let cookieStr = 'weeklydevtoken';
      cookieStr += '='+l.token;
      cookieStr += '; expires='+new Date(Date.now() + 31536000000).toUTCString();
      cookieStr += '; path=/';
      document.cookie = cookieStr;
      this.appService.user = new User(l.user);
    });
  }
  
  newUser(username: string, email: string, password: string): void {
    let newUserReq = this.http.post(`${this.appService.host}/users/new`, { username, email, password }, this.appService.headers(true, false));
    newUserReq.map(this.decodeUser).subscribe((l: LoginRes) => {
      this.appService.token = l.token;
      console.log('decoded:', l);
      
      this.appService.user = new User(l.user);
    });
  }
  
  refreshUser(): void {
    let refreshReq = this.http.get(`${this.appService.host}/users/me`, this.appService.headers(false, true));
    refreshReq.map((res: Response) => {
      if (!res.ok) {
        return null;
      }
      return <IUser>res.json();
    }).subscribe((_user: User) => {
      let user = new User(_user);
      this.appService.user = user;
      console.log('user refreshed:', user);
    });
  }
  
  joinMatchmaking(): void {
    console.log('do /match/join here');
    let joinReq = this.http.get(`${this.appService.host}/match/join`, this.appService.headers(false, true));
    joinReq.map((res: Response) => {
      if (!res.ok) {
        return null;
      }
      return res;
    }).subscribe((res: Response) => {
      if (res) {
        console.log('refreshing user');
        this.refreshUser();
      }
    });
  }
  
  private decodeUser(res: Response): LoginRes {
    if (!res.ok) {
      return null;
    }
    console.log('res headers:', res.headers);
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
  is_searching: boolean;
  access: string[];
  team: ITeam[];
  survey: ISurvey;
  // project: IProject[];
  // ghostTeams: IGhostTeam[];
}

export class User implements IUser {
  id: string;
  userId: string;
  email: string;
  username: string;
  is_searching: boolean = false;
  access: string[];
  team: Team[] = [];
  survey: Survey;
  // project: Project[];
  // ghostTeams: GhostTeam[];
  
  constructor(user: IUser) {
    if (typeof user !== 'string') {
      this.id = user.id;
      this.userId = user.userId;
      this.email = user.email;
      this.username = user.username;
      this.is_searching = user.is_searching;
      this.access = user.access;
      this.team = user.team.map(t => new Team(t));
      this.survey = new Survey(user.survey);
      // this.project = user.project.map(p => new Project(p));
      // this.ghostTeams = user.ghostTeams.map(gT => new GhostTeam(gT));
    }
  }
}