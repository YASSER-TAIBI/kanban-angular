import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../models/board.model';
import { List } from '../models/list.model';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private currentBoard: Board = {
    id: '1',
    title: 'Mon Tableau',
    lists: []
  };

  private boardSubject = new BehaviorSubject<Board>(this.currentBoard);
  board$ = this.boardSubject.asObservable();

  constructor() {
    // Charger les données sauvegardées si elles existent
    const savedBoard = localStorage.getItem('currentBoard');
    if (savedBoard) {
      this.currentBoard = JSON.parse(savedBoard);
      this.boardSubject.next(this.currentBoard);
    }
  }

  private saveBoard() {
    localStorage.setItem('currentBoard', JSON.stringify(this.currentBoard));
    this.boardSubject.next(this.currentBoard);
  }

  getCurrentBoard(): Board {
    return this.currentBoard;
  }

  addBoard(title: string) {
    this.currentBoard = {
      id: Date.now().toString(),
      title,
      lists: []
    };
    this.saveBoard();
  }

  addList(boardId: string, title: string) {
    if (this.currentBoard.id === boardId) {
      const position = this.currentBoard.lists.length;
      const newList: List = {
        id: Date.now().toString(),
        title,
        cards: [],
        boardId,
        position
      };
      this.currentBoard.lists.push(newList);
      this.saveBoard();
    }
  }

  deleteList(listId: string) {
    this.currentBoard.lists = this.currentBoard.lists.filter(list => list.id !== listId);
    // Mettre à jour les positions
    this.currentBoard.lists.forEach((list, index) => {
      list.position = index;
    });
    this.saveBoard();
  }

  addCard(listId: string, cardData: Partial<Card>) {
    const list = this.currentBoard.lists.find(l => l.id === listId);
    if (list) {
      const position = list.cards.length;
      const newCard: Card = {
        id: Date.now().toString(),
        title: cardData.title || '',
        description: cardData.description || '',
        type: cardData.type || 'Evolution',
        listId,
        position
      };
      list.cards.push(newCard);
      this.saveBoard();
    }
  }

  updateCard(cardId: string, cardData: Partial<Card>) {
    this.currentBoard.lists.forEach(list => {
      const card = list.cards.find(c => c.id === cardId);
      if (card) {
        Object.assign(card, cardData);
      }
    });
    this.saveBoard();
  }

  deleteCard(cardId: string) {
    this.currentBoard.lists.forEach(list => {
      const initialLength = list.cards.length;
      list.cards = list.cards.filter(card => card.id !== cardId);
      if (list.cards.length !== initialLength) {
        // Mettre à jour les positions
        list.cards.forEach((card, index) => {
          card.position = index;
        });
      }
    });
    this.saveBoard();
  }

  moveCard(cardId: string, targetListId: string, targetPosition: number) {
    let movedCard: Card | undefined;
    let sourceListId: string | undefined;

    // Trouver et retirer la carte de sa liste d'origine
    this.currentBoard.lists.forEach(list => {
      const cardIndex = list.cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        sourceListId = list.id;
        movedCard = list.cards[cardIndex];
        list.cards.splice(cardIndex, 1);
        // Mettre à jour les positions des cartes restantes
        list.cards.forEach((card, index) => {
          card.position = index;
        });
      }
    });

    // Si la carte a été trouvée, l'ajouter à la nouvelle position
    if (movedCard && sourceListId !== targetListId) {
      const targetList = this.currentBoard.lists.find(list => list.id === targetListId);
      if (targetList) {
        movedCard.listId = targetListId;
        movedCard.position = targetPosition;
        targetList.cards.splice(targetPosition, 0, movedCard);
        // Mettre à jour les positions des cartes après l'insertion
        targetList.cards.forEach((card, index) => {
          card.position = index;
        });
      }
    }

    this.saveBoard();
  }
}
