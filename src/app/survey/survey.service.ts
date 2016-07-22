import { Injectable } from '@angular/core';

@Injectable()
export class SurveyService {
  constructor() {
    
  }
}

export interface ISurvey {
  id: string;
  user_id: string;
  role: string[];
  project_manager: boolean;
  skill_level: number;
  project_size: number;
  timezone: number;
}

export class Survey implements ISurvey {
  
}