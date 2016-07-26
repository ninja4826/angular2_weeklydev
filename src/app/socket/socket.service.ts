import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import { AppService } from '../app.service';

@Injectable()
export class SocketService {
  appService: AppService;
  
  socket: any;
  constructor(appService: AppService) {
    this.appService = appService;
    console.log('socket service');
  }
  
  ngOnInit() {
  }
  
  connect() {
    console.log('attempting connection');
    this.socket = io(`http://${process.env.API_URL}`);
    console.log('connecting to ', `http://${process.env.API_URL}`);
    this.socket.on('connect', () => {
      console.log('connected to socket.');
      this.socket.emit('ayy');
    });
    
    this.socket.on('event', (data: any) => {
      console.log('event data:', data);
    });
    
    this.socket.on('disconnect', () => {
      console.log('disconnected from socket.');
    });
  }
}