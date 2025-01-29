import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-board-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Nouveau tableau</h4>
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
            [(ngModel)]="title"
            name="title"
            placeholder="Entrez un titre"
            required
          />
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Annuler</button>
      <button type="button" class="btn btn-primary" (click)="onSubmit()" [disabled]="!title.trim()">
        Créer
      </button>
    </div>
  `
})
export class BoardModalComponent {
  title: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  onSubmit() {
    if (this.title.trim()) {
      this.activeModal.close(this.title.trim());
    }
  }
}
