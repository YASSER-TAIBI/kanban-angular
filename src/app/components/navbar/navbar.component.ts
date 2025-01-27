import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">Kanban Board</div>
      <div class="navbar-menu">
        <button class="add-board-btn" (click)="addNewBoard()">+ Nouveau Tableau</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #026AA7;
      color: white;
    }

    .navbar-brand {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .add-board-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 3px;
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .add-board-btn:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  `]
})
export class NavbarComponent {
  constructor(private boardService: BoardService) {}

  addNewBoard() {
    const title = prompt('Nom du nouveau tableau :');
    if (title) {
      this.boardService.addBoard(title);
    }
  }
}
