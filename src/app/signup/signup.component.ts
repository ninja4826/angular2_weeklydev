import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { UserService, User } from '../user';
import { Survey, SurveyService, SurveyFormComponent } from '../survey';

@Component({
  selector: 'login',
  template: require('./signup.html'),
  directives: [SurveyFormComponent]
})
export class SignupComponent {
  router: Router;
  appService: AppService;
  userService: UserService;
  surveyService: SurveyService;
  user: User;
  
  inSignup: boolean = true;
  signupDone: boolean = false;
  inSurvey: boolean = false;
  
  username: string = 'testuser';
  email: string = 'hueske.steam@gmail.com';
  password: string = 'asdfasdf';
  
  survey: Survey = new Survey();
  
  constructor(router: Router, appService: AppService, userService: UserService, surveyService: SurveyService) {
    this.router = router;
    this.appService = appService;
    this.userService = userService;
    this.surveyService = surveyService;
  }
  
  ngOnInit() {
    this.appService.userEmitter.subscribe((user) => {
      this.user = user;
      console.log('signup got user!', user);
    });
  }
  
  doSignup() {
    if (this.username &&
      this.username !== "" &&
      this.email &&
      this.email !== "" &&
      this.password &&
      this.password !== ""
    ) {
      // this.userService.newUser(this.username, this.email, this.password);
      this.setMode('signupDone');
    }
  }
  
  doSurvey(survey: boolean) {
    if (survey) {
      this.setMode('inSurvey');
    } else {
      this.doSend(false);
    }
  }
  
  doSend(survey: boolean = true) {
    this.userService.newUser(this.username, this.email, this.password);
    this.appService.userEmitter.subscribe((user: User) => {
      if (survey) {
        this.surveyService.updateSurvey(this.survey.toObject()).subscribe((survey: Survey) => {
          console.log(survey);
          this.router.navigate(['/home']);
        });
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
  
  setMode(mode: string) {
    this.inSignup = false;
    this.signupDone = false;
    this.inSurvey = false;
    
    switch (mode) {
      case 'inSignup':
        this.inSignup = true;
        break;
      case 'signupDone':
        this.signupDone = true;
        break;
      case 'inSurvey':
        this.inSurvey = true;
        break;
    }
  }
}