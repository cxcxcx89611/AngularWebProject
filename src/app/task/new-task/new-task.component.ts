import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {

  title: string;
  priorities = [
    {
      label: 'High',
      value: 1
    },
    {
      label: 'Medium',
      value: 2
    },
    {
      label: 'Low',
      value: 3
    }
  ];
  constructor(@Inject(MD_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.title = this.data.title;
  }
  onClick() {
  }
}
