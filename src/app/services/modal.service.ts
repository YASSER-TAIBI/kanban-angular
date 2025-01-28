import { Injectable, ComponentRef, createComponent, ApplicationRef, Type, EnvironmentInjector } from '@angular/core';
import { Subject } from 'rxjs';

export interface ModalComponent {
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalContainer: HTMLElement | null = null;
  private currentModal: ComponentRef<any> | null = null;
  private modalResult = new Subject<any>();

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {
    this.setupModalContainer();
  }

  private setupModalContainer() {
    this.modalContainer = document.createElement('div');
    this.modalContainer.className = 'modal-container';
    document.body.appendChild(this.modalContainer);
  }

  open<T extends ModalComponent>(component: Type<T>, data?: any): Promise<any> {
    this.closeCurrentModal();
    
    const componentRef = createComponent(component, {
      environmentInjector: this.injector,
      hostElement: this.modalContainer!
    });

    this.currentModal = componentRef;
    componentRef.instance.data = data;
    
    this.appRef.attachView(componentRef.hostView);
    
    return new Promise((resolve) => {
      const subscription = this.modalResult.subscribe((result) => {
        subscription.unsubscribe();
        resolve(result);
        this.closeCurrentModal();
      });
    });
  }

  close(result?: any) {
    this.modalResult.next(result);
  }

  private closeCurrentModal() {
    if (this.currentModal) {
      this.appRef.detachView(this.currentModal.hostView);
      this.currentModal.destroy();
      this.currentModal = null;
    }
  }
}
