import { Component } from '@angular/core';

import { AppService } from '../app.service';
import { ISurvey, Survey, SurveyService } from './survey.service';
import { User } from '../user';
import { SurveyFormComponent } from './survey_form';

@Component({
  selector: 'survey',
  template: require('./survey.html'),
  directives: [SurveyFormComponent]
})
export class SurveyComponent {
  appService: AppService;
  surveyService: SurveyService;
  
  survey: Survey;
  
  constructor(appService: AppService, surveyService: SurveyService) {
    this.appService = appService;
    this.surveyService = surveyService;
    // let survey: ISurvey = {
    //   role: Array.from(new Set<string>()),
    //   project_manager: false,
    //   skill_level: 0,
    //   project_size: 5,
    //   timezone: new Date().getTimezoneOffset() / -60
    // };
    // this.survey = new Survey(survey);
    this.survey = new Survey();
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
      this.survey = survey;
    });
  }
}