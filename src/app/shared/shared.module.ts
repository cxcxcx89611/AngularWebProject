import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule, MdCheckboxModule, MdDatepickerModule, MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule, MdMenuModule, MdNativeDateModule, MdOptionModule, MdRadioModule, MdSelectModule, MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdToolbarModule, MdTooltipModule, OverlayModule
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {HttpModule} from '@angular/http';
import {DirectiveModule} from '../directive/directive.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import {ServicesModule} from '../services/services.module';
import { AgeInputComponent } from './age-input/age-input.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    MdToolbarModule,
    MdCardModule,
    MdInputModule,
    MdDialogModule,
    OverlayModule,
    MdAutocompleteModule,
    MdOptionModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdRadioModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    HttpModule,
    DirectiveModule,
    ReactiveFormsModule,
    FormsModule,
    ServicesModule
  ],
  declarations: [ConfirmDialogComponent, ImageListSelectComponent, AgeInputComponent],
  exports: [CommonModule,
    MdButtonModule,
    MdIconModule,
    MdToolbarModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdSlideToggleModule,
    MdDialogModule,
    OverlayModule,
    MdAutocompleteModule,
    MdOptionModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    HttpModule,
    DirectiveModule,
    ReactiveFormsModule,
    FormsModule,
    ImageListSelectComponent,
    ServicesModule,
    AgeInputComponent
  ]
})
export class SharedModule { }
