import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
   @Input() modelType: string = '';
   
  form = new FormGroup({
    prompt: new FormControl(),
    corrected: new FormControl<boolean | null>({value: null, disabled: true}),
    original: new FormControl<boolean | null>({value: null, disabled: true})
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
        this.form.controls.original.setValue(res.result)

        this.form.controls.corrected.setValue(res.result)
        this.form.controls.corrected.enable()

        this.hideUndefined = true
      })
  }

  submit(): void {
    this.appService.submit({
      review: this.form.controls.prompt.value, 
      corrected: this.form.controls.corrected.value ?? false,
      original: this.form.controls.original.value ?? false,
      modelType: this.modelType
    }).subscribe(res => {
      console.log(res)
    })

  }
}
