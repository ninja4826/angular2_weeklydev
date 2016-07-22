import { Component } from '@angular/core';

import { AppService } from '../app.service';
import { ISurvey, Survey, SurveyService } from './survey.service';
import { User } from '../user';

@Component({
  selector: 'survey',
  template: require('./survey.html')
})
export class SurveyComponent {
  appService: AppService;
  surveyService: SurveyService;
  
  survey: Survey;
  
  constructor(appService: AppService, surveyService: SurveyService) {
    this.appService = appService;
    this.surveyService = surveyService;
    let survey: ISurvey = {
      role: Array.from(new Set<string>()),
      project_manager: false,
      skill_level: 0,
      project_size: 5,
      timezone: 0
    };
    this.survey = new Survey(survey);
    console.log('new survey:', JSON.stringify(this.survey.role, null, 4));
  }
  
  ngOnInit() {
    this.surveyService.getSurvey().subscribe((survey: Survey) => {
      console.log('old survey:', this.survey);
      this.survey = survey;
      console.log('got survey:', this.survey);
    });
  }
  
  submit(): void {
    this.surveyService.updateSurvey(this.survey.toObject()).subscribe((survey: Survey) => {
      console.log('old survey:', this.survey);
      this.survey = survey;
      console.log('got survey:', this.survey);
    });
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
  
  get skill_level(): string { return this.survey.skill_level+''; }
  set skill_level(v: string) {
    this.survey.skill_level = +v;
  }
}