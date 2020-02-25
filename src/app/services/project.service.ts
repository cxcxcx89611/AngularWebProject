import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Project} from '../domain';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProjectService {
  private readonly domain = 'project';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {
  }

  add(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post(uri, JSON.stringify(project), this.headers).map(res => res.json());
  }

  udpate(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    };
    return this.http.patch(uri, JSON.stringify(toUpdate), this.headers).map(res => res.json());
  }

  del(project: Project): Observable<Project> {
    const delTasks$ = Observable.from(project.taskLists).mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`)).count();
    return delTasks$.switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`)).map(_ => project);
  }

  get(userId: string): Observable<Project []> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {params: {'members_like': userId}}).map(res => res.json() as Project[]);
  }

}
