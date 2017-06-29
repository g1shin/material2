import {Component} from '@angular/core';
import {MdStep} from '../../lib/stepper/step';
@Component({
    moduleId: module.id,
    selector: 'stepper-demo',
    templateUrl: 'stepper-demo.html',
})
export class StepperDemo {
    steps: [
        {label: 'Step 1', content: 'Content 1'},
        {label: 'Step 2', content: 'Content 2', active: true},
        {label: 'Step 3', content: 'Content 3', disabled: true}
    ];
}
