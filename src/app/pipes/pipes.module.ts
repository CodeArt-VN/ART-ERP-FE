import { NgModule } from '@angular/core';
import { MyPipe, filterProperties, searchProperties, isNotDeleted, SafeHtml, SafeStyle, SafeFrame, searchNoAccents } from './filter/filter';
import { FriendlyCurrencyPipe } from './friendly-currency.pipe';
@NgModule({
	declarations: [MyPipe, filterProperties, searchProperties, isNotDeleted, SafeHtml, SafeStyle, SafeFrame, FriendlyCurrencyPipe,searchNoAccents ],
	imports: [],
	exports: [MyPipe, filterProperties, searchProperties, isNotDeleted, SafeHtml, SafeStyle, SafeFrame,searchNoAccents]
})
export class PipesModule {}
