/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, Input} from '@angular/core';
import {MdStep} from "./step";
@Component({
    moduleId: module.id,
    selector: 'mat-stepper',
    templateUrl: 'stepper.html',
    styleUrls: ['stepper.scss'],
})

export class MdStepper {
    selectStep(step: MdStep): void {
        step.active = true;
    }
}
