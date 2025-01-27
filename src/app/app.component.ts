import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BoardComponent } from './components/board/board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, BoardComponent],
  template: `
    <div class="app-container">
      <app-navbar></app-navbar>
      <app-board></app-board>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      background-color: #0079bf;
    }
  `]
})
export class AppComponent {
  title = 'kanban-angular';
}
