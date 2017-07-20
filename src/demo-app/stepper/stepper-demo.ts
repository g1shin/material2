import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'stepper-demo',
  templateUrl: 'stepper-demo.html',
  styleUrls: ['stepper-demo.scss'],
})
export class StepperDemo {
  formControl: FormControl;

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

  constructor() {
    this.formControl = new FormControl();
  }
}
