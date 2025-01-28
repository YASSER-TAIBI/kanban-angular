import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { ListComponent } from '../list/list.component';
import { ModalService } from '../../services/modal.service';
import { ListModalComponent } from '../../modals/list-modal/list-modal.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ListComponent],
  template: `
    <div class="boards-container">
      @for (board of boards(); track board.id) {
        <div class="board">
          <div class="board-header">
            <h2>{{ board.title }}</h2>
            <div class="board-actions">
              <button class="btn btn-success" (click)="addList(board.id)">
                <i class="fas fa-plus"></i> Nouvelle Liste
              </button>
              <button class="btn btn-danger" (click)="deleteBoard(board.id)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="lists-container">
            <app-list *ngFor="let list of board.lists" [list]="list"></app-list>
            <div class="add-list-placeholder">
              <button class="btn btn-outline" (click)="addList(board.id)">
                <i class="fas fa-plus"></i> Ajouter une liste
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
      background-color: #f0f2f5;
    }

    .board {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    }

    .board-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .board-header h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #172b4d;
      font-weight: 600;
    }

    .board-actions {
      display: flex;
      gap: 0.75rem;
    }

    .lists-container {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding-bottom: 1rem;
      min-height: 100px;
    }

    .add-list-placeholder {
      min-width: 272px;
      padding: 0.5rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 3px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn i {
      font-size: 0.875rem;
    }

    .btn-success {
      background-color: #5aac44;
      color: white;
    }

    .btn-success:hover {
      background-color: #519839;
    }

    .btn-danger {
      background-color: #eb5a46;
      color: white;
      padding: 0.5rem 0.75rem;
    }

    .btn-danger:hover {
      background-color: #cf513d;
    }

    .btn-outline {
      background-color: #091e420a;
      color: #172b4d;
      width: 100%;
      justify-content: center;
      border: 1px dashed #091e4221;
    }

    .btn-outline:hover {
      background-color: #091e4214;
    }

    ::-webkit-scrollbar {
      height: 12px;
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 20px;
    }

    ::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 20px;
      border: 3px solid #f1f1f1;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  `]
})
export class BoardComponent {
  boards = this.boardService.getBoards();

  constructor(
    private boardService: BoardService,
    private modalService: ModalService
  ) {}

  async addList(boardId: string) {
    const result = await this.modalService.open(ListModalComponent);
    if (result) {
      this.boardService.addList(boardId, result);
    }
  }

  deleteBoard(boardId: string) {
    if (confirm('Voulez-vous supprimer ce tableau ?')) {
      this.boardService.deleteBoard(boardId);
    }
  }
}
