// ...existing code...
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, interval, Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';

@Injectable({ providedIn: 'root' })
export class PaymentService {


    constructor(private commonService: CommonService, private env: EnvService) {
    }

    public async checkResultRequest(IDPayment): Promise<any> {
        return this.commonService.connect('POST', 'BANK/IncomingPayment/CheckPaymentResult', { IDPayment: IDPayment }).toPromise()
    }
    public async postEDCCSale(payment) {
        return new Promise((resolve, reject) => {
            this.commonService.connect('POST', "BANK/IncomingPayment/PostEDCCSale", payment).toPromise().then(rs => {
                resolve(rs)
            }).catch(err => {
                reject(null);
                this.env.showMessage(err.error?.ExceptionMessage, 'danger');
            });
        })

    }

}