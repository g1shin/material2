import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {
  FormArray, FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import {MdVerticalStepper} from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'stepper-demo',
  templateUrl: 'stepper-demo.html',
  styleUrls: ['stepper-demo.scss'],
})
export class StepperDemo implements OnInit {
  formGroup: FormGroup;
  //formControl: FormControl;
  activeIndex = 0;
  @ViewChild('linearStepper') _linearStepper: MdVerticalStepper;

  steps = [
    {label: 'Confirm your name', content: 'Last name, First name.'},
    {label: 'Confirm your contact information', content: '123-456-7890'},
    {label: 'Confirm your address', content: '1600 Amphitheater Pkwy MTV'},
    {label: 'You are now done', content: 'Finished!'}
  ];

  linearSteps = [
    {label: 'Confirm your name', content: 'Last name, First name.'},
    {label: 'Confirm your contact information', content: '123-456-7890', disabled: true},
    {label: 'Confirm your address', content: '1600 Amphitheater Pkwy MTV', disabled: true},
    {label: 'You are now done', content: 'Finished!', disabled: true}
  ];

  constructor(private _fb: FormBuilder,
  private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    // this.nameFormGroup = this._fb.group({
    //   firstNameFormCtrl: ['', Validators.required],
    //   lastNameFormCtrl: ['', Validators.required],
    // });
    // this.phoneFormGroup = this._fb.group({
    //   phoneFormCtrl: ['', Validators.required],
    // });

    this.formGroup = this._fb.group({
      formArray: this._fb.array([
        this._fb.group({
          firstNameFormCtrl: ['', Validators.required],
          lastNameFormCtrl: ['', Validators.required],
        }),
        this._fb.group({
          phoneFormCtrl: ['', Validators.required],
        })
      ])
    });

    // const ctrl = <FormArray>this.formGroup.get('formArray');
    // ctrl.controls[this.activeIndex].valueChanges.subscribe(() => {
    //   ctrl.controls[this.activeIndex].updateValueAndValidity();
    // });

    // this.formControl = new FormControl('', Validators.required);
    // this.formControl.valueChanges.subscribe(() => {
    //   if (this.formControl.valid) {
    //     this._linearStepper._steps.toArray()[this.activeIndex + 1].disabled = false;
    //   } else {
    //     this._linearStepper._steps.toArray()[this.activeIndex + 1].disabled = true;
    //   }
    // });
    // this.formGroup.statusChanges.subscribe(() => {
    // });
  }

  onHeaderClick(value: number): void {
    if (value > this.activeIndex) {
      const control = <FormArray>this.formGroup.get('formArray');
      console.log(control.controls[this.activeIndex].status);
      // console.log(control.controls[this.activeIndex].get('firstNameFormCtrl').valid);
      // control.controls[this.activeIndex].valueChanges.subscribe(() => {
      //   console.log('here2');
      //   this._changeDetectorRef.markForCheck();});

      control.controls[this.activeIndex].markAsTouched();

      control.controls[this.activeIndex].updateValueAndValidity();
    }
  }

  customErrorStateMatcher(c: FormControl): boolean {
    const hasInteraction = c.dirty || c.touched;
    const isInvalid = c.invalid;

    return !!(hasInteraction && isInvalid);
  }
}
