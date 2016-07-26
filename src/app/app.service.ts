import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { User, UserService } from './user';

@Injectable()
export class AppService {
  userService: UserService;
  private _host: string = 'http://localhost:1337/v1';
  private _origin: string = '';
  
  token: string;
  private _user: User;
  userEmitter: EventEmitter<User> = new EventEmitter<User>();
  
  signin: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() {
    if (process.env.API_URL) {
      this._host = `http://${process.env.API_URL}/v1`;
      // this._host = process.env.API_URL;
    }
    if (process.env.ORIGIN) {
      this._origin = `http://${process.env.ORIGIN}`;
    }
    console.log('API URL:', this._host);
  }
  
  headers(json: boolean, auth: boolean, req?: RequestOptions): RequestOptions {
    if (!req) {
      req = new RequestOptions({ headers: new Headers({}) });
    }
    
    // req.headers.append('Access-Control-Origin', this._origin);
    
    if (json) {
      req.headers.append('Content-Type', 'application/json');
    }
    
    if (auth && this.token) {
      req.headers.append('Authorization', this.token);
    }
    console.log('req:', req);
    return req;
  }
  
  get user(): User {
    return this._user;
  }
  
  set user(v: User) {
    let firstSignin: boolean = false;
    if (!this._user) {
      firstSignin = true;
    }
    this._user = v;
    this.userEmitter.emit(this._user);
    console.log('appService: User has been set.');
    if (firstSignin) {
      this.signin.emit(null);
    }
  }
  
  get host(): string {
    return this._host;
  }
}