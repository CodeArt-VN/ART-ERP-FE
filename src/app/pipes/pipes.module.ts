import { NgModule } from '@angular/core';
import { MyPipe, filterProperties, searchProperties, isNotDeleted, SafeHtml, SafeStyle, SafeFrame } from './filter/filter';
import { FriendlyCurrencyPipe } from './friendly-currency.pipe';
@NgModule({
	declarations: [MyPipe, filterProperties, searchProperties, isNotDeleted, SafeHtml, SafeStyle, SafeFrame, FriendlyCurrencyPipe ],
	imports: [],
	exports: [MyPipe, filterProperties, searchProperties, isNotDeleted, SafeHtml, SafeStyle, SafeFrame]
})
export class PipesModule {}
