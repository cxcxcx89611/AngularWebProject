import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Project, TaskList} from '../domain';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TaskListService {
  private readonly domain = 'tasklist';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {
  }

  add(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post(uri, JSON.stringify(taskList), this.headers).map(res => res.json());
  }

  udpate(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name
    };
    return this.http.patch(uri, JSON.stringify(toUpdate), this.headers).map(res => res.json());
  }

  del(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http.delete(uri).map(res => res.json() as TaskList);
  }

  get(projectId: string): Observable<TaskList []> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {params: {'projectId': projectId}}).map(res => res.json() as TaskList[]);
  }

  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http.patch(dragUri, JSON.stringify(target.order), this.headers).map(res => res.json());
    const drop$ = this.http.patch(dropUri, JSON.stringify(src.order), this.headers).map(res => res.json());
    return Observable.concat(drag$, drop$).reduce((arrs, list) => [...arrs, list], []);
  }
}
