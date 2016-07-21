import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../app.service';
import { IUser, User } from '../user';

@Injectable()
export class TeamService {
  private http: Http;
  private appService: AppService;
  host: string = 'http://weekly.ninja4826.me';
  
  constructor(http: Http, appService: AppService) {
    this.http = http;
    this.appService = appService;
  }
  
  getTeams(teamIDs: string[]): Observable<Team[]> {
    return Observable.create((observer) => {
      this.http.get(`${this.host}/users/me/teams`, this.appService.authHeader())
        .map((res: Response) => {
          let body = res.json();
          let team_len = body.length;
        });
    });
  }
}

export interface ITeam {
  // owner: IUser | string;
  // manager: IUser[] | string[];
  // backend: IUser[] | string[];
  // frontend: IUser[] | string[];
  owner: IUser;
  manager: IUser[];
  backend: IUser[];
  frontend: IUser[];
}

export class Team {
  owner: User;
  manager: User[] = [];
  backend: User[] = [];
  frontend: User[] = [];
  
  constructor(team: ITeam) {
    if (typeof team !== 'string') {
      this.owner = new User(team.owner);
      this.manager = team.manager.map(m => new User(m));
      this.backend = team.backend.map(b => new User(b));
      this.frontend = team.frontend.map(f => new User(f));
    }
  }
}