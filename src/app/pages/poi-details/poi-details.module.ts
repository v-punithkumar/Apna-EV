import { POIDetailsPage } from './poi-details';

import { UIComponentsModule } from '../../components/ui-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    UIComponentsModule
  ],
  declarations: [POIDetailsPage]
})
export class POIDetailsModule { }
