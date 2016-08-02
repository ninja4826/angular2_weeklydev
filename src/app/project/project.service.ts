import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {
  private http: Http;
  private appService: AppService;
  
  constructor(http: Http, appService: AppService) {
    this.http = http;
    this.appService = this.appService;
    console.log(this.appService);
  }
  
  getProjects(): Observable<Project[]> {
    console.log('getting projects');
    let getReq = this.http.get(`${this.appService.host}/projects`, this.appService.headers(false, true));
    return getReq.map((res: Response) => {
      if (!res.ok) {
        return null;
      }
      
      let body = res.json();
      let projects: Project[] = body.map((b: any) => {
        return new Project({
          id: b._id,
          deadline: new Date(b.deadline),
          description: b.description,
          title: b.title,
          created_on: new Date(b.created_on)
        });
      });
      console.log('projects found:', projects);
    });
  }
  
  getProject(id: string): Observable<Project> {
    let getReq = this.http.get(`${this.appService.host}/projects/${id}`, this.appService.headers(false, true));
    return getReq.map((res: Response) => {
      if (!res.ok) {
        return null;
      }
      let body = res.json();
      return new Project({
        id: body._id,
        deadline: new Date(body.deadline),
        description: body.description,
        title: body.title,
        created_on: new Date(body.created_on)
      });
    })
  }
}

export interface IProject {
  id?: string;
  deadline: Date;
  description: string;
  title: string;
  created_on: Date;
}

export class Project implements IProject {
  id: string;
  deadline: Date;
  description: string;
  title: string;
  created_on: Date;
  
  constructor(proj: IProject) {
    if (proj.id) {
      this.id = proj.id;
    }
    this.deadline = proj.deadline;
    this.description = proj.description;
    this.title = proj.title;
    this.created_on = proj.created_on;
  }
}