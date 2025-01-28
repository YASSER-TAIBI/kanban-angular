import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ListComponent],
  template: `
    <div class="boards-container">
      @for (board of boards(); track board.id) {
        <div class="board card-shadow">
          <div class="board-header">
            <h1>{{ board.title }}</h1>
            <div class="board-actions">
              <button class="add-list-btn success" (click)="addList(board.id)">
                + Nouvelle Liste
              </button>
              <button class="delete-btn danger" (click)="deleteBoard(board.id)">
                Supprimer
              </button>
            </div>
          </div>
          <div class="lists-container">
            <app-list *ngFor="let list of board.lists" [list]="list"></app-list>
            <div class="add-list-placeholder">
              <button class="add-list-btn outline" (click)="addList(board.id)">
                + Ajouter une liste
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .boards-container {
      padding: 2rem;
      height: calc(100vh - 56px);
      overflow-y: auto;
      background-color: var(--background-color);
    }

    .board {
      margin-bottom: 2rem;
      background-color: white;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      padding: 1.5rem;
    }

    .board-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--border-color);
    }

    .board-header h1 {
      margin: 0;
      font-size: 1.5rem;
      color: var(--text-color);
    }

    .board-actions {
      display: flex;
      gap: 1rem;
    }

    .delete-btn {
      background-color: var(--danger-color);
      color: white;
    }

    .delete-btn:hover {
      background-color: #CF513D;
    }

    .success {
      background-color: var(--success-color);
      color: white;
    }

    .success:hover {
      background-color: #4C9A3A;
    }

    .outline {
      background-color: transparent;
      border: 2px dashed var(--border-color);
      color: var(--text-color);
    }

    .outline:hover {
      background-color: var(--hover-color);
    }

    .lists-container {
      display: flex;
      align-items: flex-start;
      overflow-x: auto;
      padding-bottom: 1rem;
      gap: 1rem;
    }

    .add-list-placeholder {
      min-width: 272px;
      padding: 0.5rem;
    }

    .add-list-btn {
      width: 100%;
      padding: 0.8rem;
      border-radius: 3px;
      font-weight: 500;
      transition: all 0.2s ease;
    }
  `]
})
export class BoardComponent {
  boards = this.boardService.getBoards();

  constructor(private boardService: BoardService) {}

  addList(boardId: string) {
    const title = prompt('Nom de la liste :');
    if (title) {
      this.boardService.addList(boardId, title);
    }
  }

  deleteBoard(boardId: string) {
    if (confirm('Voulez-vous supprimer ce tableau ?')) {
      this.boardService.deleteBoard(boardId);
    }
  }
}
