import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../../services/modal.service';

@Component({
  selector: 'app-board-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseModalComponent],
  template: `
    <app-base-modal>
      <div class="modal-header">
        <h2>{{ data?.board ? 'Modifier le tableau' : 'Nouveau tableau' }}</h2>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="boardTitle">Titre du tableau</label>
          <input
            type="text"
            id="boardTitle"
            [(ngModel)]="title"
            placeholder="Entrez le titre du tableau"
            #titleInput
          >
        </div>
      </div>
      <div class="modal-footer">
        <button class="cancel-btn" (click)="onCancel()">Annuler</button>
        <button class="confirm-btn" (click)="onConfirm()" [disabled]="!title.trim()">
          {{ data?.board ? 'Modifier' : 'Créer' }}
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

    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
      border-color: var(--primary-color);
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
export class BoardModalComponent implements ModalComponent {
  title: string = '';
  data: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    if (this.data?.board) {
      this.title = this.data.board.title;
    }
  }

  onCancel() {
    this.modalService.close(null);
  }

  onConfirm() {
    if (this.title.trim()) {
      this.modalService.close(this.title.trim());
    }
  }
}
