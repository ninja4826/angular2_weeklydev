import { Component, Input } from '@angular/core';

// import { AppService } from '../app.service';
import { Survey } from '../survey.service';
import { User } from '../../user';
import { PositivePipe } from './positive.pipe';
import { CounterComponent } from '../../counter';

@Component({
  selector: 'survey-form',
  template: require('./survey_form.html'),
  directives: [CounterComponent],
  pipes: [PositivePipe]
})
export class SurveyFormComponent {
  // appService: AppService;
  
  @Input() survey: Survey;
  
  constructor() {
    
  }
  
  range(first: number, last: number): number[] {
    let arr = [];
    for (let i = first; i <= last; i++) {
      arr.push(i);
    }
    return arr;
  }
  
  counter(prop: string, pos: boolean): void {
    switch (prop) {
      case 'skill_level':
        if (pos) {
          this.survey.skill_level++;
        } else {
          this.survey.skill_level--;
        }
        break;
    }
  }
  
  get frontend(): boolean { return this.survey.role.has('frontend'); }
  get backend(): boolean { return this.survey.role.has('backend'); }
  get manager(): boolean {
    if (this.survey.role.has('backend') !== this.survey.project_manager) {
      this.manager = this.survey.project_manager;
    }
    return this.survey.project_manager;
  }
  
  set frontend(v: boolean) {
    if (v) {
      this.survey.role.add('frontend');
    } else {
      this.survey.role.delete('frontend');
    }
  }
  
  set backend(v: boolean) {
    if (v) {
      this.survey.role.add('backend');
    } else {
      this.survey.role.delete('backend');
    }
  }
  
  set manager(v: boolean) {
    if (v) {
      this.survey.role.add('manager');
      this.survey.project_manager = true;
    } else {
      this.survey.role.delete('manager');
      this.survey.project_manager = false;
    }
  }
  
  // get skill_level(): string { return this.survey.skill_level+''; }
  // set skill_level(v: string) {
  //   this.survey.skill_level = +v;
  // }
  
  // get project_size(): string { return this.survey.project_size+''; }
  // set project_size(v: string) {
  //   this.survey.project_size = +v;
  // }
  
  // get timezone(): string { return this.survey.timezone+''; }
  // set timezone(v: string) {
  //   this.survey.timezone = +v;
  // }
}