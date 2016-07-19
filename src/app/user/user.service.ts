import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
// import { Team, TeamService } from '../team';
// import { Project, ProjectService } from '../project';
// import { Survey, SurveyService } from '../survey';
// import { GhostTeam, GhostTeamService } from '../ghostTeam';

@Injectable()
export class UserService {
  private http: Http;
  private appState: AppState;
  
  // private teamService: TeamService;
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
    // teamService: TeamService,
    // projectService: ProjectService,
    // surveyService: SurveyService,
    // ghostTeamService: GhostTeamService
  ) {
    this.http = http;
    this.appState = appState;
    
    // this.teamService = teamService;
    // this.projectService = projectService;
    // this.surveyService = surveyService;
    // this.ghostTeamService = ghostTeamService;
  }
  
  // login(username: string, password: string): Observable<User> {
  //   return this.http.post('/login', { username, password }, this.jsonHeader(this.getLoginHeader(username, pass)))
  //     .map((res: Response) => {
  //       let body = res.json();
  //       if (body.token) {
  //         this.token = body.token;
  //         this.appState.set('token', body.token);
  //       }
  //       if (body.user) {
  //         // this.user = new User(body.user);
  //         // return this.user;
  //         let userObserv = this.userFromJSON(body.user);
  //         return userObserv.do((u) => {
  //           this.user = u;
  //         });
  //       }
  //       return null;
  //     });
  // }
  
  // newUser(username: string, email: string, password: string): Observable<User> {
  //   return this.http.post('/users/new', { username, email, password }, this.jsonHeader())
  //     .map((res: Response) => {
  //       let body = res.json();
  //       if (body.token) {
  //         this.token = body.token;
  //         this.appState.set('token', body.token);
  //       }
  //       if (body.user) {
  //         // this.user = new User(body.user);
  //         // return this.user;
  //         // let userObserv = this.userFromJSON(body.user);
  //         // return userObserv.do((u) => {
  //         //   this.user = u;
  //         // });
  //         return this.userFromJSON(body.user);
  //       }
  //       return null;
  //     });
  // }
  
  login(username: string, password: string): void {
    let loginReq = this.http.post('/api/login', null, this.jsonHeader(this.getLoginHeader(username, password)));
    // loginReq.subscribe(this.decodeUser);
    // console.log(loginReq);
    loginReq.map(this.decodeUser).subscribe((l: LoginRes) => {
      this.token = l.token;
      // console.log('token in service:', this.token);
      console.log('decoded:', l);
      
      this.userFromJSON(l.user).subscribe((user: User) => {
        console.log('user in service:', user);
        this.user = user;
      })
    });
    // loginReq.do(this.decodeUser).subscribe();
  }
  
  newUser(username: string, email: string, password: string): void {
    let newUserReq = this.http.post('/api/users/new', { username, email, password }, this.jsonHeader());
    newUserReq.map(this.decodeUser).subscribe((l: LoginRes) => {
      this.token = l.token;
      console.log('decoded:', l);
      this.userFromJSON(l.user).subscribe((user: User) => {
        console.log('user in service:', user);
        this.user = user;
      })
    })
  }
  
  private decodeUser(res: Response): LoginRes {
    if (!res.ok) {
      return null;
    }
    
    return <LoginRes>res.json();
  }
  
  userFromJSON(user: IUser): Observable<User> {
    return Observable.create((observer) => {
      let newUser: User = {
        id: user.id,
        userId: user.userId,
        email: user.email,
        username: user.username,
        access: user.access
      };
      console.log('new user:', newUser);
      console.log(observer);
      // TODO: Retrieve related observables
      
      // TODO: Remove once other services have been created
      observer.next(newUser);
    });
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
  team: string[];
  project: string[];
  ghostTeams: string[];
}

export interface User {
  id: string;
  userId: string;
  email: string;
  username: string;
  access: string[];
  // team: Team[];
  // project: Project[];
  // ghostTeams: GhostTeam[];
}

class UserRelations {
  private _team: boolean = false;
  private _project: boolean = false;
  private _survey: boolean = false;
  private _ghostTeams: boolean = false;
  
  done: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    
  }
  
  private emit(): void {
    if (this.team &&
      this.project &&
      this.survey &&
      this.ghostTeams
    ) {
      this.done.emit(null);
    }
  }
  
  get team(): boolean { return this._team; }
  get project(): boolean { return this._project };
  get survey(): boolean { return this._survey };
  get ghostTeams(): boolean { return this._ghostTeams; }
  
  set team(v: boolean) {
    this._team = v;
    this.emit();
  }
  
  set project(v: boolean) {
    this._project = v;
    this.emit();
  }
  
  set survey(v: boolean) {
    this._survey = v;
    this.emit();
  }
  
  set ghostTeams(v: boolean) {
    this._ghostTeams = v;
    this.emit();
  }
}