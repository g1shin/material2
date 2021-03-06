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
  TemplateRef,
  ViewEncapsulation,
  Optional,
  Inject,
  forwardRef
} from '@angular/core';
import {LEFT_ARROW, RIGHT_ARROW, ENTER, SPACE} from '@angular/cdk/keycodes';
import {CdkStepLabel} from './step-label';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {AbstractControl} from '@angular/forms';
import {Directionality} from '@angular/cdk/bidi';

/** Used to generate unique ID for each stepper component. */
let nextId = 0;

/**
 * Position state of the content of each step in stepper that is used for transitioning
 * the content into correct position upon step selection change.
 */
export type StepContentPositionState = 'previous' | 'current' | 'next';

/** Change event emitted on selection changes. */
export class StepperSelectionEvent {
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
  encapsulation: ViewEncapsulation.None
})
export class CdkStep {
  /** Template for step label if it exists. */
  @ContentChild(CdkStepLabel) stepLabel: CdkStepLabel;

  /** Template for step content. */
  @ViewChild(TemplateRef) content: TemplateRef<any>;

  /** The top level abstract control of the step. */
  @Input() stepControl: AbstractControl;

  /** Whether user has seen the expanded step content or not . */
  interacted = false;

  /** Label of the step. */
  @Input()
  label: string;

  @Input()
  get editable() { return this._editable; }
  set editable(value: any) {
    this._editable = coerceBooleanProperty(value);
  }
  private _editable = true;

  /** Whether the completion of step is optional or not. */
  @Input()
  get optional() { return this._optional; }
  set optional(value: any) {
    this._optional = coerceBooleanProperty(value);
  }
  private _optional = false;

  /** Return whether step is completed or not. */
  @Input()
  get completed() {
    return this._customCompleted == null ? this._defaultCompleted : this._customCompleted;
  }
  set completed(value: any) {
    this._customCompleted = coerceBooleanProperty(value);
  }
  private _customCompleted: boolean | null = null;

  private get _defaultCompleted() {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }

  constructor(@Inject(forwardRef(() => CdkStepper)) private _stepper: CdkStepper) { }

  /** Selects this step component. */
  select(): void {
    this._stepper.selected = this;
  }
}

@Directive({
  selector: '[cdkStepper]',
})
export class CdkStepper {
  /** The list of step components that the stepper is holding. */
  @ContentChildren(CdkStep) _steps: QueryList<CdkStep>;

  /** The list of step headers of the steps in the stepper. */
  _stepHeader: QueryList<ElementRef>;

  /** Whether the validity of previous steps should be checked or not. */
  @Input()
  get linear() { return this._linear; }
  set linear(value: any) { this._linear = coerceBooleanProperty(value); }
  private _linear = false;

  /** The index of the selected step. */
  @Input()
  get selectedIndex() { return this._selectedIndex; }
  set selectedIndex(index: number) {
    if (this._anyControlsInvalid(index)
        || index < this._selectedIndex && !this._steps.toArray()[index].editable) {
      // remove focus from clicked step header if the step is not able to be selected
      this._stepHeader.toArray()[index].nativeElement.blur();
    } else if (this._selectedIndex != index) {
      this._emitStepperSelectionEvent(index);
      this._focusIndex = this._selectedIndex;
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
  @Output() selectionChange = new EventEmitter<StepperSelectionEvent>();

  /** The index of the step that the focus can be set. */
  _focusIndex: number = 0;

  /** Used to track unique ID for each stepper component. */
  _groupId: number;

  constructor(@Optional() private _dir: Directionality) {
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

  /** Returns unique id for each step content element. */
  _getStepContentId(i: number): string {
    return `mat-step-content-${this._groupId}-${i}`;
  }

  /** Returns position state of the step with the given index. */
  _getAnimationDirection(index: number): StepContentPositionState {
    const position = index - this._selectedIndex;
    if (position < 0) {
      return 'previous';
    } else if (position > 0) {
      return 'next';
    } else {
      return 'current';
    }
  }

  /** Returns the type of icon to be displayed. */
  _getIndicatorType(index: number): 'number' | 'edit' | 'done' {
    const step = this._steps.toArray()[index];
    if (!step.completed || this._selectedIndex == index) {
      return 'number';
    } else {
      return step.editable ? 'edit' : 'done';
    }
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
        if (this._dir && this._dir.value === 'rtl') {
          this._focusStep((this._focusIndex + this._steps.length - 1) % this._steps.length);
        } else {
          this._focusStep((this._focusIndex + 1) % this._steps.length);
        }
        break;
      case LEFT_ARROW:
        if (this._dir && this._dir.value === 'rtl') {
          this._focusStep((this._focusIndex + 1) % this._steps.length);
        } else {
          this._focusStep((this._focusIndex + this._steps.length - 1) % this._steps.length);
        }
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

  private _anyControlsInvalid(index: number): boolean {
    const stepsArray = this._steps.toArray();
    stepsArray[this._selectedIndex].interacted = true;
    if (this._linear) {
      return stepsArray.slice(0, index).some(step => step.stepControl.invalid);
    }
    return false;
  }
}
