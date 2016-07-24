import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'counter',
  template: require('./counter.html')
})
export class CounterComponent {
  @Input() name: string;
  @Input() value: number;
  @Input() min: number;
  @Input() max: number;
  @Input() replacer: string;
  
  str: string;
  
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  
  constructor() {
    
  }
  
  ngOnInit() {
    if (!this.min) {
      this.min = -Infinity;
    }
    if (!this.max) {
      this.max = Infinity;
    }
    this.val = this.value;
    console.log(`value for ${this.name} is ${this.val}`);
  }
  
  counter(pos: boolean) {
    if (pos) {
      this.val = this.value += 1;
    } else {
      this.val = this.value -= 1;
    }
  }
  
  get val(): number { return this.value; }
  set val(v: number) {
    if (this.replacer) {
      this.str = this.replacer;
    } else {
      this.str = ''+v;
    }
    this.value = v;
    this.valueChange.next(v);
  }
}