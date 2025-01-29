import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BoardModalComponent } from '../../modals/board-modal/board-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <img src="assets/logo.png" alt="Logo" class="logo" />
        <span class="brand-name">Kanban Board</span>
      </div>
      <div class="navbar-actions">
        <button class="new-board-btn" (click)="createBoard()">
          <i class="plus-icon">+</i>
          Nouveau tableau
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: white;
      padding: 0.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      height: 32px;
      width: auto;
    }

    .brand-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-color);
    }

    .new-board-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .new-board-btn:hover {
      background: var(--primary-dark);
    }

    .plus-icon {
      font-size: 1.2rem;
      font-style: normal;
    }
  `]
})
export class NavbarComponent {
  constructor(
    private boardService: BoardService,
    private modalService: NgbModal
  ) {}

  async createBoard() {
    const modalRef = this.modalService.open(BoardModalComponent);
    modalRef.result.then((title) => {
      if (title) {
        this.boardService.addBoard(title);
      }
    }, () => {});
  }
}
