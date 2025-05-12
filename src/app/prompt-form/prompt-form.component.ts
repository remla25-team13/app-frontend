import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prompt-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './prompt-form.component.html',
  styleUrl: './prompt-form.component.css',
})
export class PromptFormComponent implements OnChanges {
  form = new FormGroup({
    prompt: new FormControl(),
    prediction: new FormControl<boolean | null>({value: null, disabled: true})
  })

  hideUndefined: boolean = false

  constructor(private readonly appService: AppService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  queryModel(): void {
    const body = this.form.value

    this.appService.queryModel({ review: body.prompt })
      .subscribe(res => {
        this.form.controls.prediction.setValue(res.result)
        this.form.controls.prediction.enable()
        this.hideUndefined = true
      })
  }

  submit(): void {
    console.log('a')
  }
}
