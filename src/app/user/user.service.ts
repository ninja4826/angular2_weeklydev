import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
import { ITeam, Team, TeamService } from '../team';
// import { IProject, Project, ProjectService } from '../project';
// import { Survey, SurveyService } from '../survey';
// import { IGhostTeam, GhostTeam, GhostTeamService } from '../ghostTeam';

@Injectable()
export class UserService {
  private http: Http;
  private appState: AppState;
  
  host: string = 'http://weekly.ninja4826.me';
  
  private teamService: TeamService;
  // private projectService: ProjectService;
  // private surveyService: SurveyService;
  // private ghostTeamService: GhostTeamService;
  
  private _user: User;
  
  userEmitter: EventEmitter<User> = new EventEmitter<User>();
  errorEmitter: EventEmitter<string> = new EventEmitter<string>();
  token: string;
  
  constructor(
    http: Http,
    appState: AppState,
    teamService: TeamService,
    // projectService: ProjectService,
    // surveyService: SurveyService,
    // ghostTeamService: GhostTeamService
  ) {
    this.http = http;
    this.appState = appState;
    
    this.teamService = teamService;
    // this.projectService = projectService;
    // this.surveyService = surveyService;
    // this.ghostTeamService = ghostTeamService;
  }
  
  login(username: string, password: string): void {
    console.log('url:', `${this.host}/login`);
    let loginReq = this.http.post(`${this.host}/login`, null, this.jsonHeader(this.getLoginHeader(username, password)));
    loginReq.map(this.decodeUser).subscribe((l: LoginRes) => {
      this.token = l.token;
      console.log('decoded:', l);
      
      this.user = new User(l.user);
    });
  }
  
  newUser(username: string, email: string, password: string): void {
    let newUserReq = this.http.post(`${this.host}/users/new`, { username, email, password }, this.jsonHeader());
    newUserReq.map(this.decodeUser).subscribe((l: LoginRes) => {
      this.token = l.token;
      console.log('decoded:', l);
      
      this.user = new User(l.user);
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
  
  private authHeader(req?: RequestOptions): RequestOptions {
    if (!req) {
      req = new RequestOptions();
    }
    if (!this.token) {
      return req;
    }
    console.log(req);
    req.headers.append('Authorization', this.appState.get('token'));
    return req;
  }
  
  private jsonHeader(req?: RequestOptions): RequestOptions {
    if (req) {
      req.headers.append('Content-Type', 'application/json');
    } else {
      req = new RequestOptions({
        headers: new Headers({ 'Content-Type': 'application/json' })
      });
    }
    return req;
  }
  
  get user(): User {
    return this._user;
  }
  
  set user(v: User) {
    this._user = v;
    this.userEmitter.emit(this._user);
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

export class User {
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