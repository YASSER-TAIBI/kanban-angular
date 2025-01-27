import { Component, Input } from '@angular/core';
import { List } from '../../models/list.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="list">
      <div class="list-header">
        <h2>{{ list.title }}</h2>
        <button class="delete-btn" (click)="deleteList()">×</button>
      </div>
      <div class="list-content" 
           (dragover)="onDragOver($event)"
           (drop)="onDrop($event)">
        <app-card *ngFor="let card of list.cards" [card]="card"></app-card>
      </div>
      <button class="add-card-btn" (click)="addCard()">+ Ajouter une carte</button>
    </div>
  `,
  styles: [`
    .list {
      background: #ebecf0;
      border-radius: 3px;
      width: 272px;
      max-height: calc(100vh - 120px);
      margin-right: 1rem;
      padding: 0.5rem;
      flex-shrink: 0;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
    }

    .list-header h2 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .delete-btn {
      border: none;
      background: none;
      color: #6b778c;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0 0.3rem;
    }

    .delete-btn:hover {
      color: #172b4d;
    }

    .list-content {
      min-height: 30px;
      padding: 0.5rem;
    }

    .add-card-btn {
      width: 100%;
      padding: 0.5rem;
      background: none;
      border: none;
      color: #5e6c84;
      cursor: pointer;
      text-align: left;
      border-radius: 3px;
    }

    .add-card-btn:hover {
      background-color: rgba(9, 30, 66, 0.08);
      color: #172b4d;
    }
  `]
})
export class ListComponent {
  @Input() list!: List;

  constructor(private boardService: BoardService) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      const cardId = event.dataTransfer.getData('cardId');
      const fromListId = event.dataTransfer.getData('listId');
      if (fromListId !== this.list.id) {
        this.boardService.moveCard(cardId, fromListId, this.list.id);
      }
    }
  }

  addCard() {
    const title = prompt('Titre de la carte :');
    const description = prompt('Description de la carte :');
    if (title && description) {
      this.boardService.addCard(this.list.id, title, description);
    }
  }

  deleteList() {
    if (confirm('Voulez-vous supprimer cette liste ?')) {
      this.boardService.deleteList(this.list.id);
    }
  }
}
