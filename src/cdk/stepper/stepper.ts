/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  Directive,
  // This import is only used to define a generic type. The current TypeScript version incorrectly
  // considers such imports as unused (https://github.com/Microsoft/TypeScript/issues/14953)
  // tslint:disable-next-line:no-unused-variable
  ElementRef,
  Component,
  ContentChild,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {LEFT_ARROW, RIGHT_ARROW, ENTER, SPACE} from '@angular/cdk/keyboard';
import {CdkStepLabel} from './step-label';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

/** Used to generate unique ID for each stepper component. */
let nextId = 0;

/** Change event emitted on selection changes. */
export class CdkStepperSelectionEvent {
  /** Index of the step now selected. */
  selectedIndex: number;

  /** Index of the step previously selected. */
  previouslySelectedIndex: number;

  /** The step instance now selected. */
  selectedStep: CdkStep;

  /** The step instance previously selected. */
  previouslySelectedStep: CdkStep;
}

@Component({
  selector: 'cdk-step',
  templateUrl: 'step.html',
})
export class CdkStep {
  /** Template for step label if it exists. */
  @ContentChild(CdkStepLabel) stepLabel: CdkStepLabel;

  /** Template for step content. */
  @ViewChild(TemplateRef) content: TemplateRef<any>;

  /** Whether step is disabled or not. */
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  /** Whether the user has interacted with step or not. */
  get interacted() { return this._interacted; }
  set interacted(value: any) {
    this._interacted = coerceBooleanProperty(value);
  }
  private _interacted = false;

  /** Label of the step. */
  @Input()
  label: string;

  constructor(private _stepper: CdkStepper) { }

  /** Selects this step component. */
  select(): void {
    this._stepper.selected = this;
  }
}

@Directive({
  selector: 'cdk-stepper',
  host: {
    '(focus)': '_focusStep()',
    '(keydown)': '_onKeydown($event)',
  },
})
export class CdkStepper {
  /** The list of step components that the stepper is holding. */
  @ContentChildren(CdkStep) _steps: QueryList<CdkStep>;

  /** The list of step headers of the steps in the stepper. */
  _stepHeader: QueryList<ElementRef>;

  /** The index of the selected step. */
  @Input()
  get selectedIndex() { return this._selectedIndex; }
  set selectedIndex(index: number) {
    this._steps.toArray()[this._selectedIndex].interacted = true;
    if (this._selectedIndex != index && !this._steps.toArray()[index].disabled) {
      this._emitStepperSelectionEvent(index);
      this._focusStep(this._selectedIndex);
    }
  }
  private _selectedIndex: number = 0;

  /** The step that is selected. */
  @Input()
  get selected() { return this._steps[this.selectedIndex]; }
  set selected(step: CdkStep) {
    let index = this._steps.toArray().indexOf(step);
    this.selectedIndex = index;
  }

  /** Event emitted when the selected step has changed. */
  @Output() selectionChange = new EventEmitter<CdkStepperSelectionEvent>();

  /** The index of the step that the focus can be set. */
  _focusIndex: number = 0;

  /** Used to track unique ID for each stepper component. */
  private _groupId: number;

  constructor() {
    this._groupId = nextId++;
  }

  /** Selects and focuses the next step in list. */
  next(): void {
    this.selectedIndex = Math.min(this._selectedIndex + 1, this._steps.length - 1);
  }

  /** Selects and focuses the previous step in list. */
  previous(): void {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }

  /** Returns a unique id for each step label element. */
  _getStepLabelId(i: number): string {
    return `mat-step-label-${this._groupId}-${i}`;
  }

  /** Returns nique id for each step content element. */
  _getStepContentId(i: number): string {
    return `mat-step-content-${this._groupId}-${i}`;
  }

  private _emitStepperSelectionEvent(newIndex: number): void {
    const stepsArray = this._steps.toArray();
    this.selectionChange.emit({
      selectedIndex: newIndex,
      previouslySelectedIndex: this._selectedIndex,
      selectedStep: stepsArray[newIndex],
      previouslySelectedStep: stepsArray[this._selectedIndex],
    });
    this._selectedIndex = newIndex;
  }

  _onKeydown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case RIGHT_ARROW:
        this._focusStep((this._focusIndex + 1) % this._steps.length);
        break;
      case LEFT_ARROW:
        this._focusStep((this._focusIndex + this._steps.length - 1) % this._steps.length);
        break;
      case SPACE:
      case ENTER:
        this.selectedIndex = this._focusIndex;
        break;
      default:
        // Return to avoid calling preventDefault on keys that are not explicitly handled.
        return;
    }
    event.preventDefault();
  }

  private _focusStep(index: number) {
    this._focusIndex = index;
    this._stepHeader.toArray()[this._focusIndex].nativeElement.focus();
  }
}
