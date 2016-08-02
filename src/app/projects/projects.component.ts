import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProject, Project, ProjectService } from '../project';

@Component({
  selector: 'projects',
  template: require('./projects.html')
})
export class ProjectsComponent {
  private router: Router;
  private projectService: ProjectService;
  
  projects: Project[] = [];
  
  constructor(router: Router, projectService: ProjectService) {
    this.router = router;
    this.projectService = projectService;
    
    // let project: IProject = {
    //   id: "579bc9ff691cf71c7a035a6d",
    //   deadline: new Date(2016, 7, 9),
    //   description: "Dummy project for testing purposes",
    //   title: "Test Project",
    //   created_on: new Date(2016, 6, 29)
    // };
    
    // this.projects = [new Project(project)];
  }
  
  ngOnInit() {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }
  
  goToProject(id: string): void {
    this.router.navigate(['/project', id]);
  }
}