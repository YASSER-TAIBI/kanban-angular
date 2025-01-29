import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../list/list.component';
import { BoardService } from '../../services/board.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListModalComponent } from '../../modals/list-modal/list-modal.component';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ListComponent],
  template: `
    <div class="board" *ngIf="board">
      <div class="board-header">
        <h1>{{ board.title }}</h1>
      </div>
      <div class="board-content">
        <div class="lists-container">
          <div class="lists">
            <app-list *ngFor="let list of board.lists" [list]="list"></app-list>
            <button class="add-list-btn" (click)="addList()">
              <i class="plus-icon">+</i>
              Ajouter une liste
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .board {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .board-header {
      padding: 1rem 2rem;
      background: white;
      border-bottom: 1px solid var(--border-color);
    }

    .board-header h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-color);
    }

    .board-content {
      flex: 1;
      overflow-x: auto;
      padding: 1rem;
    }

    .lists-container {
      height: 100%;
      padding-bottom: 1rem;
    }

    .lists {
      display: flex;
      gap: 1rem;
      height: 100%;
    }

    .add-list-btn {
      background: rgba(255, 255, 255, 0.6);
      border: none;
      border-radius: 8px;
      width: 272px;
      height: fit-content;
      padding: 1rem;
      color: #6B778C;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
    }

    .add-list-btn:hover {
      background: white;
      color: var(--text-color);
    }

    .plus-icon {
      font-size: 1.2rem;
      font-style: normal;
    }

    ::-webkit-scrollbar {
      height: 12px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #D4D4D4;
      border-radius: 6px;
      border: 3px solid var(--background-color);
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #A3A3A3;
    }
  `]
})
export class BoardComponent implements OnInit {
  board: Board | null = null;

  constructor(
    private boardService: BoardService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.boardService.board$.subscribe(board => {
      this.board = board;
    });
  }

  async addList() {
    const modalRef = this.modalService.open(ListModalComponent);
    modalRef.result.then((title) => {
      if (title && this.board) {
        this.boardService.addList(this.board.id, title);
      }
    }, () => {});
  }
}
