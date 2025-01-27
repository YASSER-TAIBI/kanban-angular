import { Component, Input } from '@angular/core';
import { Card } from '../../models/card.model';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" draggable="true" 
         (dragstart)="onDragStart($event)"
         (click)="editCard()">
      <div class="card-header">
        <h3>{{ card.title }}</h3>
        <button class="delete-btn" (click)="deleteCard($event)">×</button>
      </div>
      <p class="card-description">{{ card.description }}</p>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 3px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      padding: 0.8rem;
      margin-bottom: 0.8rem;
      cursor: pointer;
      transition: box-shadow 0.2s;
    }

    .card:hover {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .card-header h3 {
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

    .card-description {
      margin: 0.5rem 0 0;
      font-size: 0.9rem;
      color: #6b778c;
    }
  `]
})
export class CardComponent {
  @Input() card!: Card;

  constructor(private boardService: BoardService) {}

  onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('cardId', this.card.id);
      event.dataTransfer.setData('listId', this.card.listId);
    }
  }

  deleteCard(event: Event) {
    event.stopPropagation();
    if (confirm('Voulez-vous supprimer cette carte ?')) {
      this.boardService.deleteCard(this.card.id);
    }
  }

  editCard() {
    const newTitle = prompt('Modifier le titre :', this.card.title);
    const newDescription = prompt('Modifier la description :', this.card.description);
    
    if (newTitle && newDescription) {
      // Note: We would typically update the card here, but for simplicity
      // we're not implementing the full edit functionality in this demo
    }
  }
}
