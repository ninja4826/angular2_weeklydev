import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HmrState } from 'angular2-hmr';

import { User } from './user';

@Injectable()
export class AppState {
  // @HmrState() is used by HMR to track the state of any object during HMR (hot module replacement)
  @HmrState() _state = { };
  
  constructor() {

  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  _clone(object) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}

@Injectable()
export class AppService {
  token: string;
  private _user: User;
  userEmitter: EventEmitter<User> = new EventEmitter<User>();
  
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
    this._user = v;
    this.userEmitter.emit(this._user);
  }
}