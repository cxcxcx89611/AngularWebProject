import { NgModule } from '@angular/core';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import {TaskRoutingModule} from './task-routing.module';
import {SharedModule} from '../shared/shared.module';
import { NewTaskComponent } from './new-task/new-task.component';
import { CopyTaskComponent } from './copy-task/copy-task.component';
import { NewTaskListComponent } from './new-task-list/new-task-list.component';
import { QuickStartComponent } from './quick-start/quick-start.component';

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule
  ],
  declarations: [TaskHomeComponent, TaskHeaderComponent, TaskListComponent, TaskItemComponent, NewTaskComponent, CopyTaskComponent, NewTaskListComponent, QuickStartComponent],
  entryComponents: [NewTaskComponent, CopyTaskComponent, NewTaskListComponent]
})
export class TaskModule { }
