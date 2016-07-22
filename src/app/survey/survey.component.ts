import { Component } from '@angular/core';

import { AppService } from '../app.service';
import { Survey, SurveyService } from './survey.service';
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
  }
  
  ngOnInit() {
    this.surveyService.getSurvey().subscribe((survey: Survey) => {
      this.survey = survey;
    });
  }
}