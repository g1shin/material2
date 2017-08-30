/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {LOCALE_ID, NgModule} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE} from './date-adapter';
import {NativeDateAdapter} from './native-date-adapter';
import {MD_DATE_FORMATS} from './date-formats';
import {MD_NATIVE_DATE_FORMATS} from './native-date-formats';


export * from './date-adapter';
export * from './date-formats';
export * from './native-date-adapter';
export * from './native-date-formats';


@NgModule({
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_LOCALE, useExisting: LOCALE_ID}
  ],
})
export class NativeDateModule {}


@NgModule({
  imports: [NativeDateModule],
  providers: [{provide: MD_DATE_FORMATS, useValue: MD_NATIVE_DATE_FORMATS}],
})
export class MdNativeDateModule {}
