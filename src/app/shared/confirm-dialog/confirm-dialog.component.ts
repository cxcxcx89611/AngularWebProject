import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h3 md-dialog-title>{{title}}</h3>
    <div md-dialog-content>
     {{content}}
    </div>
    <div md-dialog-actions>
      <button type="button" md-raised-button color="primary" (click)="onClick(true)">Ok</button>
      <button type="button" md-dialog-close md-button (click)="onClick(false)">Cancel</button>
    </div>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {

  title = '';
  content = '';
  constructor(
    private dialogRef: MdDialogRef <ConfirmDialogComponent>,
    @Inject(MD_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  onClick(result: boolean) {
    this.dialogRef.close(result);
  }

}
