import { Component, Input, EventEmitter } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'alert',
  template: require('./alert.html'),
  styles: [ require('./alert.scss') ]
})
export class AlertComponent {
  @Input() listener: EventEmitter<any>;
  @Input() context: string = 'info';
  @Input() dismissable: boolean = false;
  @Input() countdown: number;
  @Input() fade: number;
  @Input() fixed: boolean = false;
  
  showAlert: boolean = false;
  
  hasCountdown: boolean = true;
  hasFade: boolean = true;
  id: string = '';
  identifier: string;
  
  
  constructor() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      this.id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.identifier = '#'+this.id;
  }
  
  ngOnInit() {
    if (!this.countdown) {
      console.log('does not have countdown');
      this.hasCountdown = false;
    }
    if (!this.fade) {
      console.log('does not have fade.');
      this.hasFade = false;
    }
    console.log(this.countdown);
    console.log(this.fade);
    jQuery(this.identifier).alert();
    this.listener.subscribe((a: any) => {
      this.show();
    });
  }
  
  show(): void {
    console.log('showing alert');
    this.showAlert = true;
    if (this.hasCountdown) {
      setTimeout(() => this.close(true), this.countdown);
    }
  }
  
  close(fade: boolean = false): void {
    console.log('attempting to close...');
    // this.showAlert = false;
    if (fade && this.hasFade) {
      jQuery(this.identifier).fadeOut(this.fade, () => {
        this.showAlert = false;
        jQuery(this.identifier).fadeIn(1, () => {
          
        });
      });
    } else {
      this.showAlert = false;
    }
  }
}