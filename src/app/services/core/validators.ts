import {FormControl } from '@angular/forms';

export class CompareValidator {
    static confirmPassword(control: any): any {
        if(control.parent){
            var compare:string = control.parent.controls['newPassword'].value;
            if (control.value != compare) {
                return {
                    "notvalid": true
                };
            } 
        }
        

        return null;
    }
}

export class AgeValidator {
    static isValid(control: FormControl): any {
        if (isNaN(control.value)) {
            return {
                "not a number": true
            };
        }

        if (control.value % 1 !== 0) {
            return {
                "not a whole number": true
            };
        }

        if (control.value < 18) {
            return {
                "too young": true
            };
        }

        if (control.value > 120) {
            return {
                "not realistic": true
            };
        }

        return null;
    }
}



export class UsernameValidator {
    static checkUsername(control: FormControl): any {
        return new Promise(resolve => {
            setTimeout(() => {
                if (control.value.toLowerCase() === "greg") {
                    resolve({
                        "username taken": true
                    });
                } else {
                    resolve(null);
                }
            }, 0);
        });
    }
}