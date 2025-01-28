import { Component, Input } from '@angular/core';
import { Card } from '../../models/card.model';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { ModalService } from '../../services/modal.service';
import { CardModalComponent } from '../../modals/card-modal/card-modal.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card hover-effect" 
         draggable="true" 
         (dragstart)="onDragStart($event)"
         (click)="editCard()">
      <div class="card-header">
        <h3>{{ card.title }}</h3>
        <button class="delete-btn" (click)="deleteCard($event)">×</button>
      </div>
      <p class="card-description">{{ card.description }}</p>
      <div class="card-footer">
        <span class="edit-hint">Cliquez pour modifier</span>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px var(--shadow-color);
      padding: 1rem;
      margin-bottom: 0.8rem;
      cursor: pointer;
      border: 1px solid var(--border-color);
      transition: all 0.2s ease;
    }

    .card:hover {
      box-shadow: 0 2px 5px var(--shadow-color);
      transform: translateY(-2px);
    }

    .card.dragging {
      opacity: 0.5;
      transform: scale(0.95);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }

    .card-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-color);
      word-break: break-word;
      flex: 1;
      padding-right: 0.5rem;
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
      opacity: 0;
    }

    .card:hover .delete-btn {
      opacity: 1;
    }

    .delete-btn:hover {
      background-color: var(--hover-color);
      color: var(--danger-color);
    }

    .card-description {
      margin: 0;
      font-size: 0.9rem;
      color: #6B778C;
      line-height: 1.4;
      word-break: break-word;
    }

    .card-footer {
      margin-top: 0.8rem;
      padding-top: 0.8rem;
      border-top: 1px solid var(--border-color);
      display: flex;
      justify-content: flex-end;
    }

    .edit-hint {
      font-size: 0.8rem;
      color: #6B778C;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .card:hover .edit-hint {
      opacity: 0.8;
    }
  `]
})
export class CardComponent {
  @Input() card!: Card;

  constructor(
    private boardService: BoardService,
    private modalService: ModalService
  ) {}

  onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('cardId', this.card.id);
      event.dataTransfer.setData('listId', this.card.listId);
    }
  }

  async deleteCard(event: Event) {
    event.stopPropagation();
    if (confirm('Voulez-vous supprimer cette carte ?')) {
      this.boardService.deleteCard(this.card.id);
    }
  }

  async editCard() {
    const result = await this.modalService.open(CardModalComponent, {
      card: this.card
    });
    
    if (result) {
      // Note: We need to add an updateCard method to the BoardService
      this.boardService.updateCard(this.card.id, result.title, result.description);
    }
  }
}
