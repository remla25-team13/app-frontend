import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';
import { PromptFormComponent } from './prompt-form/prompt-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, PromptFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public version: string = 'v0.0.0';
  public model_type: string = 'unknown';

  constructor(private readonly appService: AppService) { }

  ngOnInit(): void {
    this.appService.getVersion().subscribe(response => {
      this.version = response.version;
      this.model_type = response.model_type;
    })
  }
}
