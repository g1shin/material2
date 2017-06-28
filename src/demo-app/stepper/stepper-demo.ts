import {Component} from '@angular/core';
import {MdStep} from "../../lib/stepper/step";
@Component({
    moduleId: module.id,
    selector: 'stepper-demo',
    templateUrl: 'stepper-demo.html',
})
export class StepperDemo {
    steps: MdStep[] = [];
}
