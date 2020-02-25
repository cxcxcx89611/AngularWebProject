import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {slideToRight} from '../../anims/router.anim';
import {listAnimation} from '../../anims/list.anim';
import {ProjectService} from '../../services/project.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  providers: [
    ProjectService
  ]
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  projects = [];

  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef, private projectServic$: ProjectService) {}

  ngOnInit() {
    this.projectServic$.get('1').subscribe(projects => this.projects = projects);
  }

  openNewProjectDialog() {
    const dialogRef =  this.dialog.open(NewProjectComponent, {data: {title: 'Create New Project'}});
    dialogRef.afterClosed().subscribe(project => {
      this.projectServic$.add(project);
    });
    this.cd.markForCheck();
  }

  launchInviteDialog() {
    const dialogRef =  this.dialog.open(InviteComponent);
  }

  launchEditDialog() {
    const dialogRef =  this.dialog.open(NewProjectComponent, {data: {title: 'Update Project'}});
  }

  launchDeleteDialog(project) {
    const dialogRef =  this.dialog.open(ConfirmDialogComponent,
      {data: {content: 'Are you sure you want to delete this task?', title: 'Delete Confirmation'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id)
    });
    this.cd.markForCheck();
  }
}
