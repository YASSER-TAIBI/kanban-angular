import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from '../../models/card.model';
import { CardType } from '../../models/card-type.model';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ card ? 'Modifier la carte' : 'Nouvelle carte' }}</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      <form>
        <div class="mb-3">
          <label for="title" class="form-label">Titre</label>
          <input
            type="text"
            class="form-control"
            id="title"
            [(ngModel)]="formData.title"
            name="title"
            placeholder="Entrez un titre"
            required
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea
            class="form-control"
            id="description"
            [(ngModel)]="formData.description"
            name="description"
            placeholder="Entrez une description"
            rows="3"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="type" class="form-label">Type de carte</label>
          <select class="form-select" id="type" [(ngModel)]="formData.type" name="type" required>
            <option value="Evolution">Évolution</option>
            <option value="Bug">Bug</option>
          </select>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Annuler</button>
      <button type="button" class="btn btn-primary" (click)="onSubmit()" [disabled]="!formData.title">
        {{ card ? 'Modifier' : 'Créer' }}
      </button>
    </div>
  `
})
export class CardModalComponent {
  @Input() card?: Card;

  formData: { title: string; description: string; type: CardType } = {
    title: '',
    description: '',
    type: 'Evolution'
  };

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.card) {
      this.formData = {
        title: this.card.title,
        description: this.card.description,
        type: this.card.type
      };
    }
  }

  onSubmit() {
    if (this.formData.title && this.formData.type) {
      this.activeModal.close(this.formData);
    }
  }
}
