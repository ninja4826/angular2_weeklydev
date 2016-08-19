export interface IUser {
  shortId?: string;
  id?: string;
  username: string;
  fullName: string;
  team: ITeam[];
  survey: ISurvey;
  // project: IProject[];
  // ghostTeams: IGhostTeam[];
  isSearching: boolean;
}

export class User implements IUser {
  shortId: string;
  id: string;
  username: string;
  fullName: string;
  team: Team[] = [];
  survey: Survey;
  // project: Project[];
  // ghostTeams: GhostTeam[];
  isSearching: boolean = false;
  
  constructor(user: IUser) {
    if (typeof user !== 'string') {
      this.shortId = user.shortId;
      this.id = user.id;
      this.username = user.username;
      this.fullName = user.fullName;
      this.team = user.team.map(t => new Team(t));
      this.survey = new Survey(user.survey);
      // this.project = user.project.map(p => new Project(p));
      // this.ghostTeams = user.ghostTeams.map(gT => new GhostTeam(gT));
    }
  }
}

export interface ITeam {
  owner: IUser;
  manager: IUser[];
}