import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { BoardModalComponent } from '../../modals/board-modal/board-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <h1>Kanban Board</h1>
      </div>
      <div class="navbar-menu">
        <button class="add-board-btn" (click)="addNewBoard()">
          <i class="fas fa-plus"></i> Nouveau Tableau
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #0079bf;
      padding: 0.5rem 2rem;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    }

    .navbar-brand h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .add-board-btn {
      background-color: rgba(255, 255, 255, 0.3);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 3px;
      cursor: pointer;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background-color 0.2s ease;
    }

    .add-board-btn:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }

    .add-board-btn i {
      font-size: 0.875rem;
    }
  `]
})
export class NavbarComponent {
  constructor(
    private boardService: BoardService,
    private modalService: ModalService
  ) {}

  async addNewBoard() {
    const result = await this.modalService.open(BoardModalComponent);
    if (result) {
      this.boardService.addBoard(result);
    }
  }
}
