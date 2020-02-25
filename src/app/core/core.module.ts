import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MdIconRegistry} from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';
import { loadSvgResources } from '../utils/svg.util';
import { SharedModule} from '../shared/shared.module';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import 'rxjs/add/operator/take';
import {AppRoutingModule} from '../app-routing.module';
import '../utils/debug.utils';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';



@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  exports: [HeaderComponent, FooterComponent, SidebarComponent, AppRoutingModule],
  providers: [{
    provide: 'BASE_CONFIG', useValue: {
      uri: 'http://localhost:3000'
    }
  }]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule, ir: MdIconRegistry, ds: DomSanitizer) {
    if (parent) {
    throw new Error('this module already exists');
  }
    loadSvgResources(ir, ds);
  }
}
