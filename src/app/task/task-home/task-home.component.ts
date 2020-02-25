import {ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {NewTaskComponent} from '../new-task/new-task.component';
import {CopyTaskComponent} from '../copy-task/copy-task.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {NewTaskListComponent} from '../new-task-list/new-task-list.component';
import {slideToRight} from '../../anims/router.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  lists = [
    {
      id: 1,
      order: 1,
      name: 'Open',
      tasks: [
        {
          id: 1,
          desc: 'task1: CURLS DMF job to be enriched',
          completed: false,
          owner: {
            id: 1,
            name: 'Jack'
          },
          dueDate: new Date(),
          priority: 1,
        },
        {
          id: 2,
          desc: 'task2: NDSD job reboot',
          completed: false,
          owner: {
            id: 1,
            name: 'Izzy'
          },
          dueDate: new Date(),
          priority: 2,
        },
        {
          id: 3,
          desc: 'task3: DB server change',
          completed: false,
          owner: {
            id: 1,
            name: 'Izzy'
          },
          dueDate: new Date(),
          reminder: new Date(),
          priority: 3,
        }
      ]
    },
    {
      id: 2,
      name: 'Monitored',
      order: 2,
      tasks: [
        {
          id: 1,
          desc: 'task1: SFTP job transfer',
          completed: false,
          owner: {
            id: 1,
            name: 'Jack'
          },
          dueDate: new Date(),
          priority: 2,
        },
        {
          id: 2,
          desc: 'task2:APP server memory usage',
          completed: true,
          owner: {
            id: 1,
            name: 'Izzy'
          },
          dueDate: new Date(),
          reminder: new Date(),
          priority: 1,
        },
        {
          id: 3,
          desc: 'task3: Oracle DB server session lock',
          completed: true,
          owner: {
            id: 1,
            name: 'Izzy'
          },
          dueDate: new Date(),
          reminder: new Date(),
          priority: 1,
        }
      ]
    }
  ]

  constructor( private dialog: MdDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  lunchNewTaskDialog() {
    this.dialog.open(NewTaskComponent, {data: {title: 'Create New Task'}});
    this.cd.markForCheck();
  }

  launchMoveTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
    this.cd.markForCheck();
  }
  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'Update Task', task: task}});
    this.cd.markForCheck();
  }

  launchDeleteTaskDialog() {
    const dialogRef =  this.dialog.open(ConfirmDialogComponent,
      {data: {content: 'Are you sure you want to delete this task?', title: 'Delete Confirmation'}});
    this.cd.markForCheck();
  }

  launchCreateTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: 'Change Task Name'}});
    this.cd.markForCheck();
  }
  openNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: 'Create New Task'}});
    this.cd.markForCheck();
  }
  handleMove(srcData, list) {
    console.log('default log');
    switch (srcData.tag) {
      case 'task-item':
        console.log('handling item');
        break;
      case 'task-list':
        console.log('handle list');
        const srcList = srcData.data;
        const tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default:
        console.log('default log');
        break;
    }
  }

  handleQuickTask(desc: string) {
   console.log(desc);
  }
}
