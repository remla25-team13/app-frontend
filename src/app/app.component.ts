import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public version: string = 'v0.0.0';
  
  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    this.appService.getVersion().subscribe(response => {
      this.version = response
    })
  }
}
