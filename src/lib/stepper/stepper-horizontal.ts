/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component} from '@angular/core';
import {MdStepper} from './stepper';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  moduleId: module.id,
  selector: 'md-horizontal-stepper, mat-horizontal-stepper',
  templateUrl: 'stepper-horizontal.html',
  styleUrls: ['stepper.css'],
  inputs: ['selectedIndex'],
  host: {
    'class': 'mat-stepper-horizontal',
    'role': 'tablist',
  },
  animations: [
    trigger('stepEnterExit', [
      state('left', style({transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden'})),
      state('center', style({transform: 'translate3d(0%, 0, 0)', visibility: 'visible'})),
      state('right', style({transform: 'translate3d(100%, 0, 0)', visibility: 'hidden'})),
      transition('* => left, * => right, left => center, right => center',
          animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ])
  ],
  providers: [{provide: MdStepper, useExisting: MdHorizontalStepper}]
})
export class MdHorizontalStepper extends MdStepper { }
