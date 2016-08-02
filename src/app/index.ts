// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';

import { AppService } from './app.service';
import { UserService } from './user';
// import { TeamService } from './team';
import { SurveyService } from './survey';
import { ProjectService } from './project';

// Application wide providers
export const APP_PROVIDERS = [
  AppService,
  UserService,
  // TeamService,
  SurveyService,
  ProjectService
];
