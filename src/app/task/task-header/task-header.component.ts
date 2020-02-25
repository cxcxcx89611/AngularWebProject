import {Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = '';
  @Output() newTask = new EventEmitter <String>();
  @Output() moveTask = new EventEmitter <void>();
  @Output() deleteTask = new EventEmitter <void>();
  @Output() changeTaskName = new EventEmitter <void>();
  constructor() { }

  ngOnInit() {
  }

  onNewTaskClick() {
    this.newTask.emit();
  }

  onMoveTaskClick() {
    this.moveTask.emit();
  }

  onDeleteTaskClick() {
    this.deleteTask.emit();
  }
  onChangeTaskNameClick() {
    this.changeTaskName.emit();
  }
}
