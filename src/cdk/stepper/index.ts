/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {CdkStepper} from './stepper';
import {CommonModule} from '@angular/common';
import {CdkStep} from './step';
import {CdkStepLabel} from './step-label';
import {PortalModule} from '../portal';
@NgModule({
    imports: [CommonModule, PortalModule],
    exports: [CdkStep, CdkStepper, CdkStepLabel],
    declarations: [CdkStep, CdkStepper, CdkStepLabel]
})
export class CdkStepperModule {}

export * from './stepper';
export * from './step';
export * from './step-label';
