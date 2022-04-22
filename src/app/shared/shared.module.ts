import { NgModule } from '@angular/core';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    SearchFilterPipe,
  ],
  imports: [
    ComponentsModule,
  ],
  exports: [
    SearchFilterPipe,
    ComponentsModule,
  ],
})
export class SharedModule { }
