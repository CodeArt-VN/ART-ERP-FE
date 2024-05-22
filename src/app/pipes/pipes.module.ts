import { NgModule } from '@angular/core';
import {
  MyPipe,
  filterProperties,
  searchProperties,
  isNotDeleted,
  SafeHtml,
  SafeStyle,
  SafeFrame,
  searchNoAccents,
} from './filter';
import { DateFriendlyPipe, NumberFriendlyPipe } from './friendly-format.pipe';
@NgModule({
  declarations: [
    MyPipe,
    filterProperties,
    searchProperties,
    isNotDeleted,
    SafeHtml,
    SafeStyle,
    SafeFrame,
    searchNoAccents,

    DateFriendlyPipe,
    NumberFriendlyPipe,
  ],
  imports: [],
  exports: [
    MyPipe,
    filterProperties,
    searchProperties,
    isNotDeleted,
    SafeHtml,
    SafeStyle,
    SafeFrame,
    searchNoAccents,

    DateFriendlyPipe,
    NumberFriendlyPipe,
  ],
})
export class PipesModule {}
