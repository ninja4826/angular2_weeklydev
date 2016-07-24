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
  @Input() mod: any;
  
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
    
    if (!this.mod) {
      this.mod = (val: number): string => {
        return ''+val;
      };
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
    this.str = this.mod(v);
    this.value = v;
    this.valueChange.next(v);
  }
}