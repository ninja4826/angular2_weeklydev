import { Component, Input } from '@angular/core';

// import { AppService } from '../app.service';
import { Survey } from '../survey.service';
import { User } from '../../user';
import { CounterComponent } from '../../counter';

@Component({
  selector: 'survey-form',
  template: require('./survey_form.html'),
  directives: [CounterComponent]
})
export class SurveyFormComponent {
  // appService: AppService;
  
  @Input() survey: Survey;
  
  constructor() {
    console.log($);
  }
  
  ngOnInit() {
    console.log('this survey:', this.survey);
  }
  
  // get frontend(): boolean { return this.survey.role.has('frontend'); }
  get frontend(): boolean { return this.survey.role.indexOf('frontend') !== -1; }
  
  // get backend(): boolean { return this.survey.role.has('backend'); }
  get backend(): boolean { return this.survey.role.indexOf('backend') !== -1; }
  
  // get manager(): boolean {
  //   if (this.survey.role.has('backend') !== this.survey.project_manager) {
  //     this.manager = this.survey.project_manager;
  //   }
  //   return this.survey.project_manager;
  // }
  
  get manager(): boolean {
    if ((this.survey.role.indexOf('manager') !== -1) !== this.survey.project_manager) {
      this.manager = this.survey.project_manager;
    }
    return this.survey.project_manager;
  }
  
  private roleSetter(role: string, v: boolean): void {
    if (v) {
      this.survey.role = [...this.survey.role, role];
    } else {
      let index: number = this.survey.role.indexOf(role);
      if (index !== -1) {
        this.survey.role.splice(index, 1);
      }
    }
  }
  
  // set frontend(v: boolean) {
  //   if (v) {
  //     this.survey.role.add('frontend');
  //   } else {
  //     this.survey.role.delete('frontend');
  //   }
  // }
  set frontend(v: boolean) {
    this.roleSetter('frontend', v);
  }
  
  // set backend(v: boolean) {
  //   if (v) {
  //     this.survey.role.add('backend');
  //   } else {
  //     this.survey.role.delete('backend');
  //   }
  // }
  set backend(v: boolean) {
    this.roleSetter('backend', v);
  }
  
  // set manager(v: boolean) {
  //   if (v) {
  //     this.survey.role.add('manager');
  //     this.survey.project_manager = true;
  //   } else {
  //     this.survey.role.delete('manager');
  //     this.survey.project_manager = false;
  //   }
  // }
  set manager(v: boolean) {
    this.roleSetter('manager', v);
    this.survey.project_manager = v;
  }
  
  displayTimezone(val: number): string {
    if (val > 0) {
      return 'UTC+'+val;
    } else if (val < 0) {
      return 'UTC'+val;
    } else {
      return 'UTC';
    }
  }
}