import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'stepper-demo',
  templateUrl: 'stepper-demo.html',
  styleUrls: ['stepper-demo.scss'],
})
export class StepperDemo {
  nameFormGroup: FormGroup;
  phoneFormGroup: FormGroup;

  steps = [
    {label: 'Confirm your name', content: 'Last name, First name.'},
    {label: 'Confirm your contact information', content: '123-456-7890'},
    {label: 'Confirm your address', content: '1600 Amphitheater Pkwy MTV'},
    {label: 'You are now done', content: 'Finished!'}
  ];

  ngOnInit() {
    this.nameFormGroup = new FormGroup({
      firstNameFormCtrl: new FormControl('', Validators.required),
      lastNameFormCtrl: new FormControl('', Validators.required)
    });

    this.phoneFormGroup = new FormGroup({
      phoneFormCtrl: new FormControl('', Validators.required)
    });
  }
}
