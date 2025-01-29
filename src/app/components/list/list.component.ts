import { Component, Input } from '@angular/core';
import { List } from '../../models/list.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { BoardService } from '../../services/board.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardModalComponent } from '../../modals/card-modal/card-modal.component';

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
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.8rem;
      margin-top: 0.5rem;
      border: none;
      border-radius: 3px;
      background-color: transparent;
      color: #6B778C;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .add-card-btn:hover {
      background-color: var(--hover-color);
      color: var(--text-color);
    }

    .plus-icon {
      font-size: 1.2rem;
      font-style: normal;
    }

    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #D4D4D4;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #A3A3A3;
    }
  `]
})
export class ListComponent {
  @Input() list!: List;

  constructor(
    private boardService: BoardService,
    private modalService: NgbModal
  ) {}

  async addCard() {
    const modalRef = this.modalService.open(CardModalComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.boardService.addCard(this.list.id, result);
      }
    }, () => {});
  }

  deleteList() {
    if (confirm('Voulez-vous supprimer cette liste ?')) {
      this.boardService.deleteList(this.list.id);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    const element = event.currentTarget as HTMLElement;
    element.classList.add('drag-over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('drag-over');

    const cardData = event.dataTransfer?.getData('text/plain');
    if (cardData) {
      const card = JSON.parse(cardData);
      const cardElements = element.querySelectorAll('.card');
      let targetPosition = this.list.cards.length;

      // Calculate drop position
      const mouseY = event.clientY;
      cardElements.forEach((cardElement, index) => {
        const rect = cardElement.getBoundingClientRect();
        if (mouseY < rect.top + rect.height / 2) {
          targetPosition = Math.min(targetPosition, index);
        }
      });

      this.boardService.moveCard(card.id, this.list.id, targetPosition);
    }
  }
}
