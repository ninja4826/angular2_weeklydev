import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { User } from './user';

@Injectable()
export class AppService {
  
  host: string = 'http://weekly.ninja4826.me';
  
  token: string;
  private _user: User;
  userEmitter: EventEmitter<User> = new EventEmitter<User>();
  
  signin: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() {
    
  }
  
  authHeader(req?: RequestOptions): RequestOptions {
    if (!req) {
      req = new RequestOptions();
    }
    if (!this.token) {
      return req;
    }
    console.log(req);
    req.headers.append('Authorization', this.token);
    return req;
  }
  
  jsonHeader(req?: RequestOptions): RequestOptions {
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
    if (!this._user) {
      this._user = v;
      this.signin.emit(null);
    } else {
      this._user = v;
    }
    this.userEmitter.emit(this._user);
  }
}