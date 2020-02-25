import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Project, TaskList} from '../domain';
import {Observable} from 'rxjs/Observable';
import {Task} from 'app/domain/task.model';

@Injectable()
export class TaskService {
  private readonly domain = 'tasks';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {
  }

  add(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post(uri, JSON.stringify(task), this.headers).map(res => res.json());
  }

  udpate(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc: task.desc,
      priority: task.priority,
      dueDate: task.dueDate,
      reminder: task.reminder,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      remark: task.remark
    };
    return this.http.patch(uri, JSON.stringify(toUpdate), this.headers).map(res => res.json());
  }

  del(task: Task): Observable<Task> {
   const uri = `${this.config.uri}/taskLists/${task.id}`;
   return this.http.delete(uri).mapTo(task);
  }

  get(taskListId: string): Observable<Task []> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {params: {'taskListId': taskListId}}).map(res => res.json() as Task[]);
  }
  getByLists(lists: TaskList[]): Observable<Task[]> {
   return Observable.from(lists).mergeMap(list => this.get(list.id)).reduce((tasks: Task[], t: Task[]) => [... tasks, ...t], []);
  }

  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId).mergeMap(tasks => Observable.from(tasks)).mergeMap(task => this.move(task.id, targetListId))
      .reduce((arr, x) => [...arr, x], []);
  }

  move(taskId: string, taskListId: string): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;
    return this.http.patch(uri, JSON.stringify({ taskListId: taskListId }), this.headers).map(res => res.json());
  }

  complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.patch(uri, JSON.stringify({ completed: !task.completed }), this.headers).map(res => res.json());
  }

}
