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
        <div class="board">
          <div class="board-header">
            <h1>{{ board.title }}</h1>
            <button class="delete-btn" (click)="deleteBoard(board.id)">Supprimer le tableau</button>
          </div>
          <div class="lists-container">
            <app-list *ngFor="let list of board.lists" [list]="list"></app-list>
            <button class="add-list-btn" (click)="addList(board.id)">
              + Ajouter une liste
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .boards-container {
      padding: 2rem;
      height: calc(100vh - 56px);
      overflow-x: auto;
    }

    .board {
      margin-bottom: 2rem;
    }

    .board-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .board-header h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #172b4d;
    }

    .delete-btn {
      padding: 0.5rem 1rem;
      background-color: #eb5a46;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }

    .delete-btn:hover {
      background-color: #cf513d;
    }

    .lists-container {
      display: flex;
      align-items: flex-start;
      overflow-x: auto;
      padding-bottom: 1rem;
    }

    .add-list-btn {
      min-width: 272px;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.24);
      border: none;
      border-radius: 3px;
      color: white;
      cursor: pointer;
      margin-left: 0.5rem;
      height: fit-content;
    }

    .add-list-btn:hover {
      background: rgba(255, 255, 255, 0.32);
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
