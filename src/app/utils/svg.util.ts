import { MdIconRegistry} from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';

export const loadSvgResources = ( ir: MdIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/images';
  const sideBarDir = `${imgDir}/sidebar`;
  const iconDir = `${imgDir}/icons`;
  const avatarDir = `${imgDir}/avatar`;
  ir.addSvgIcon('avatar1', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/boy.svg`));
  ir.addSvgIcon('avatar2', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/girl.svg`));
  ir.addSvgIcon('menu1', ds.bypassSecurityTrustResourceUrl(`${imgDir}/menu2.svg`));
  ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/day.svg`));
  ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/month.svg`));
  ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/week.svg`));
  ir.addSvgIcon('project', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/project.svg`));
  ir.addSvgIcon('project2', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/project2.svg`));
  ir.addSvgIcon('add', ds.bypassSecurityTrustResourceUrl(`${iconDir}/add.svg`));
  ir.addSvgIcon('delete', ds.bypassSecurityTrustResourceUrl(`${iconDir}/delete.svg`));
  ir.addSvgIcon('move', ds.bypassSecurityTrustResourceUrl(`${iconDir}/move.svg`));
}
