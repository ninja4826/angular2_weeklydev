// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';

import { AppState, AppService } from './app.service';
import { UserService } from './user';
import { TeamService } from './team';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  AppService,
  UserService,
  TeamService
];
