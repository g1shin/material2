import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  moduleId: module.id,
  selector: 'stepper-demo',
  templateUrl: 'stepper-demo.html',
  styleUrls: ['stepper-demo.scss']
})
export class StepperDemo {

  nameFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  requestFormGroup: FormGroup;

  userFormGroup: FormGroup;
  personalFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.nameFormGroup = new FormGroup({
      firstCtrl: new FormControl('', Validators.required),
      lastCtrl: new FormControl('', Validators.required),
      addressCtrl: new FormControl('', Validators.required),
      address2Ctrl: new FormControl('')
    });

    this.paymentFormGroup = new FormGroup({
      cardCtrl: new FormControl('', Validators.required),
      billingCtrl: new FormControl('')
    });

    this.requestFormGroup = new FormGroup({
      requestCtrl: new FormControl('')
    });

    this.userFormGroup = new FormGroup({
      usernameCtrl: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      pwCtrl: new FormControl('', Validators.required)
    });

    this.personalFormGroup = new FormGroup({
      nameCtrl: new FormControl('', Validators.required),
      emailCtrl: new FormControl(''),
      phoneCtrl: new FormControl('')
    });
  }
}
