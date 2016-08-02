import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IProject, Project, ProjectService } from './project.service';

@Component({
  selector: 'project',
  template: require('./project.html')
})
export class ProjectComponent {
  private route: ActivatedRoute;
  private router: Router;
  private projectService: ProjectService;
  
  private sub: any;
  project: Project;
  
  constructor(route: ActivatedRoute, router: Router, projectService: ProjectService) {
    this.route = route;
    this.router = router;
    this.projectService = projectService;
  }
  
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      let id = params['id'];
      this.projectService.getProject(id).subscribe((project: Project) => {
        this.project = project;
      });
    });
  }
}