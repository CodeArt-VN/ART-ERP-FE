import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QRWalletPage } from './qr-wallet.page';

@NgModule({
	imports: [QRWalletPage, RouterModule.forChild([{ path: '', component: QRWalletPage }])],
})
export class QRWalletPageModule {}
