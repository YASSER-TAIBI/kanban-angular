import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  open(component: any, data: any = {}) {
    const modalRef = this.modalService.open(component);
    Object.assign(modalRef.componentInstance, data);
    return modalRef.result;
  }
}
