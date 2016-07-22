import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../app.service';

@Injectable()
export class SurveyService {
  private http: Http;
  private appService: AppService;
  
  constructor(http: Http, appService: AppService) {
    this.http = http;
    this.appService = appService;
  }
  
  updateSurvey(survey: ISurvey): Observable<Survey> {
    if (survey.id) {
      delete survey.id;
    }
    if (survey.user_id) {
      delete survey.user_id;
    }
    return this.http.post(`${this.appService.host}/survey`, this.appService.headers(true, true))
      .map((res: Response) => {
        let body = res.json();
        if ('statusCode' in body) {
          return null;
        }
        return new Survey(<ISurvey>body);
      });
  }
  
  getSurvey(): Observable<Survey> {
    return this.http.get(`${this.appService.host}/survey`, this.appService.headers(false, true))
      .map((res: Response) => {
        let body = res.json();
        if ('error' in body) {
          let survey: ISurvey = {
            role: [],
            project_manager: false,
            skill_level: 0,
            project_size: 5,
            timezone: 0
          };
          return new Survey(survey);
        } else {
          return new Survey(<ISurvey>body);
        }
      });
  }
}

export interface ISurvey {
  id?: string;
  user_id?: string;
  role: string[];
  project_manager: boolean;
  skill_level: number;
  project_size: number;
  timezone: number;
}

export class Survey implements ISurvey {
  private _id: string;
  private _user_id: string;
  private _role: string[];
  private _project_manager: boolean;
  private _skill_level: number;
  private _project_size: number;
  private _timezone: number;
  
  constructor(survey: ISurvey) {
    if (survey.id) {
      this._id = survey.id;
    }
    if (survey.user_id) {
      this._user_id = survey.user_id;
    }
    this.role = survey.role;
    this.project_manager = survey.project_manager;
    this.skill_level = survey.skill_level;
    this.project_size = survey.project_size;
    this.timezone = survey.timezone;
  }
  
  get id(): string { return this._id; }
  get user_id(): string { return this._user_id; }
  get role(): string[] { return this._role; }
  get project_manager(): boolean { return this._project_manager; }
  get skill_level(): number { return this._skill_level; }
  get project_size(): number { return this._project_size; }
  get timezone(): number { return this._timezone; }
  
  set id(v: string) {}
  set user_id(v: string) {}
  
  set role(v: string[]) {
    this._role = v.filter(r => ['frontend', 'backend', 'manager'].indexOf(r) !== -1);
  }
  
  set project_manager(v: boolean) {
    this._project_manager = v;
  }
  
  set skill_level(v: number) {
    if (v >= 0 && v <= 5) this._skill_level = v;
  }
  
  set project_size(v: number) {
    if (v >= 3 && v <= 5) this._project_size = v;
  }
  
  set timezone(v: number) {
    if (v >= -12 && v <= 12) this._timezone = v;
  }
  
  toObject(): ISurvey {
    let survey: ISurvey = {
      role: this.role,
      project_manager: this.project_manager,
      skill_level: this.skill_level,
      project_size: this.project_size,
      timezone: this.timezone
    };
    return survey;
  }
}