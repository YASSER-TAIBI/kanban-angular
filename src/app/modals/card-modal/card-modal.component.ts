import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../../services/modal.service';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseModalComponent],
  template: `
    <app-base-modal>
      <div class="modal-header">
        <h2>{{ data?.card ? 'Modifier la carte' : 'Nouvelle carte' }}</h2>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="cardTitle">Titre</label>
          <input
            type="text"
            id="cardTitle"
            [(ngModel)]="title"
            placeholder="Entrez le titre de la carte"
            #titleInput
          >
        </div>
        <div class="form-group">
          <label for="cardDescription">Description</label>
          <textarea
            id="cardDescription"
            [(ngModel)]="description"
            placeholder="Entrez la description de la carte"
            rows="4"
          ></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="cancel-btn" (click)="onCancel()">Annuler</button>
        <button class="confirm-btn" 
                (click)="onConfirm()" 
                [disabled]="!title.trim() || !description.trim()">
          {{ data?.card ? 'Modifier' : 'Créer' }}
        </button>
      </div>
    </app-base-modal>
  `,
  styles: [`
    .modal-header {
      margin-bottom: 1.5rem;
    }

    .modal-header h2 {
      margin: 0;
      color: var(--text-color);
      font-size: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-color);
      font-weight: 500;
    }

    input, textarea {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.2s;
      resize: vertical;
    }

    input:focus, textarea:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    textarea {
      min-height: 100px;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.8rem 1.5rem;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .cancel-btn {
      background: none;
      border: 1px solid var(--border-color);
      color: var(--text-color);
    }

    .cancel-btn:hover:not(:disabled) {
      background: var(--hover-color);
    }

    .confirm-btn {
      background: var(--primary-color);
      border: none;
      color: white;
    }

    .confirm-btn:hover:not(:disabled) {
      background: var(--secondary-color);
    }
  `]
})
export class CardModalComponent implements ModalComponent {
  title: string = '';
  description: string = '';
  data: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    if (this.data?.card) {
      this.title = this.data.card.title;
      this.description = this.data.card.description;
    }
  }

  onCancel() {
    this.modalService.close(null);
  }

  onConfirm() {
    if (this.title.trim() && this.description.trim()) {
      this.modalService.close({
        title: this.title.trim(),
        description: this.description.trim()
      });
    }
  }
}
