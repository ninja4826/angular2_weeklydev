import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
import { Team, TeamService } from './team.service';
import { Project, ProjectService } from './project.service';
import { Survey, SurveyService } from './survey.service';
import { GhostTeam, GhostTeamService } from './ghostTeam.service';

@Injectable()
export class UserService {
  http: Http;
  appState: AppState;
  
  _user: User;
  
  userEmitter: EventEmitter<User> = new EventEmitter<User>();
  token: string;
  
  constructor(http: Http, appState: AppState) {
    this.http = http;
    this.appState = appState;
  }
  
  login(username: string, password: string): Observable<User> {
    return this.http.post('/login', { username, password }, this.jsonHeader(this.getLoginHeader(username, pass)))
      .map((res: Response) => {
        let body = res.json();
        if (body.token) {
          this.token = body.token;
          this.appState.set('token', body.token);
        }
        if (body.user) {
          this.user = new User(body.user);
          return this.user;
        }
        return null;
      });
  }
  
  newUser(username: string, email: string, password: string): Observable<User> {
    return this.http.post('/users/new', { username, email, password }, this.jsonHeader())
      .map((res: Response) => {
        let body = res.json();
        if (body.token) {
          this.token = body.token;
          this.appState.set('token', body.token);
        }
        if (body.user) {
          this.user = new User(body.user);
          return this.user;
        }
        return null;
      });
  }
  
  userFromJSON(user: IUser) {
    
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
    req.headers.append('Bearer', this.appState.get('token'));
    return req;
  }
  
  private jsonHeader(req?: RequestOptions): RequestOptions {
    if (!req) {
      req = new RequestOptions();
    }
    req.headers.append('Content-Type', 'application/json');
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

export interface IUser {
  email: string;
  username: string;
  password: string;
  admin: boolean;
  team: string[];
  project: string[];
  survey: string[];
  is_searching: boolean;
  created_on: Date;
  token: {
    uuid: string;
    valid: boolean;
  };
  ghostTeams: string[];
}

export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  admin: boolean;
  team: Team[];
  project: Project[];
  survey: Survey;
  is_searching: boolean;
  created_on: Date;
  token: {
    uuid: string;
    valid: boolean;
  };
  ghostTeams: GhostTeam[];
}