import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef, OverlayContainer} from '@angular/material';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  title: string;
  coverImages = [];
  constructor(@Inject(MD_DIALOG_DATA) private data, private dialogRef: MdDialogRef<NewProjectComponent>, private fb: FormBuilder ) { }

  ngOnInit() {
    this.title = this.data.title;
  }

  onClick() {
    this.dialogRef.close("this is a close information");
  }
}
