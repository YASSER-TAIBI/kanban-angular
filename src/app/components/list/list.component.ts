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
    <div class="list card-shadow" 
         (dragover)="onDragOver($event)"
         (drop)="onDrop($event)">
      <div class="list-header">
        <h2>{{ list.title }}</h2>
        <div class="list-actions">
          <span class="card-count">{{ list.cards.length }} cartes</span>
          <button class="delete-btn" (click)="deleteList()">×</button>
        </div>
      </div>
      <div class="list-content">
        <app-card *ngFor="let card of list.cards" [card]="card"></app-card>
      </div>
      <button class="add-card-btn" (click)="addCard()">
        <i class="plus-icon">+</i>
        Ajouter une carte
      </button>
    </div>
  `,
  styles: [`
    .list {
      background: white;
      border-radius: 8px;
      width: 272px;
      max-height: calc(100vh - 200px);
      margin: 0;
      padding: 1rem;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-color);
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 0.8rem;
      border-bottom: 2px solid var(--border-color);
      margin-bottom: 1rem;
    }

    .list-header h2 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-color);
    }

    .list-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .card-count {
      font-size: 0.8rem;
      color: #6B778C;
      padding: 0.2rem 0.5rem;
      background: var(--background-color);
      border-radius: 10px;
    }

    .delete-btn {
      border: none;
      background: none;
      color: #6B778C;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.2rem 0.5rem;
      border-radius: 3px;
      transition: all 0.2s ease;
    }

    .delete-btn:hover {
      background-color: var(--hover-color);
      color: var(--danger-color);
    }

    .list-content {
      flex: 1;
      overflow-y: auto;
      min-height: 30px;
      padding: 0.2rem;
      margin: -0.2rem;
    }

    .add-card-btn {
      width: 100%;
      padding: 0.8rem;
      margin-top: 0.5rem;
      background: none;
      border: none;
      color: #5E6C84;
      cursor: pointer;
      text-align: left;
      border-radius: 3px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
    }

    .add-card-btn:hover {
      background-color: var(--hover-color);
      color: var(--text-color);
    }

    .plus-icon {
      font-size: 1.2rem;
      font-weight: bold;
    }

    /* Style pour l'état de drag & drop */
    .list.drag-over {
      background-color: var(--background-color);
      border: 2px dashed var(--primary-color);
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
