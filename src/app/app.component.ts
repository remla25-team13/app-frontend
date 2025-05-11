import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AppService]
})
export class AppComponent implements OnInit {
  public version: string = 'v0.0.0';
  
  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    this.appService.getVersion().subscribe(response => {
      this.version = response.version
    })
  }
}
