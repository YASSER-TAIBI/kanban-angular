import { Injectable, signal } from '@angular/core';
import { Board } from '../models/board.model';
import { List } from '../models/list.model';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boards = signal<Board[]>([
    {
      id: '1',
      title: 'Projet Web',
      lists: [
        {
          id: '1',
          title: 'À faire',
          boardId: '1',
          position: 0,
          cards: [
            {
              id: '1',
              title: 'Créer le design',
              description: 'Faire les maquettes UI/UX',
              listId: '1',
              position: 0
            }
          ]
        },
        {
          id: '2',
          title: 'En cours',
          boardId: '1',
          position: 1,
          cards: []
        },
        {
          id: '3',
          title: 'Terminé',
          boardId: '1',
          position: 2,
          cards: []
        }
      ]
    }
  ]);

  getBoards() {
    return this.boards;
  }

  addBoard(title: string) {
    const newBoard: Board = {
      id: Date.now().toString(),
      title,
      lists: []
    };
    this.boards.update(boards => [...boards, newBoard]);
  }

  addList(boardId: string, title: string) {
    this.boards.update(boards => 
      boards.map(board => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: [...board.lists, {
              id: Date.now().toString(),
              title,
              boardId,
              position: board.lists.length,
              cards: []
            }]
          };
        }
        return board;
      })
    );
  }

  addCard(listId: string, title: string, description: string) {
    this.boards.update(boards =>
      boards.map(board => ({
        ...board,
        lists: board.lists.map(list => {
          if (list.id === listId) {
            return {
              ...list,
              cards: [...list.cards, {
                id: Date.now().toString(),
                title,
                description,
                listId,
                position: list.cards.length
              }]
            };
          }
          return list;
        })
      }))
    );
  }

  moveCard(cardId: string, fromListId: string, toListId: string) {
    this.boards.update(boards =>
      boards.map(board => ({
        ...board,
        lists: board.lists.map(list => {
          if (list.id === fromListId) {
            return {
              ...list,
              cards: list.cards.filter(card => card.id !== cardId)
            };
          }
          if (list.id === toListId) {
            const cardToMove = board.lists
              .find(l => l.id === fromListId)
              ?.cards.find(c => c.id === cardId);
            if (cardToMove) {
              return {
                ...list,
                cards: [...list.cards, { ...cardToMove, listId: toListId }]
              };
            }
          }
          return list;
        })
      }))
    );
  }

  deleteBoard(boardId: string) {
    this.boards.update(boards => boards.filter(board => board.id !== boardId));
  }

  deleteList(listId: string) {
    this.boards.update(boards =>
      boards.map(board => ({
        ...board,
        lists: board.lists.filter(list => list.id !== listId)
      }))
    );
  }

  deleteCard(cardId: string) {
    this.boards.update(boards =>
      boards.map(board => ({
        ...board,
        lists: board.lists.map(list => ({
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        }))
      }))
    );
  }

  updateCard(cardId: string, title: string, description: string) {
    this.boards.update(boards =>
      boards.map(board => ({
        ...board,
        lists: board.lists.map(list => ({
          ...list,
          cards: list.cards.map(card => {
            if (card.id === cardId) {
              return {
                ...card,
                title,
                description
              };
            }
            return card;
          })
        }))
      }))
    );
  }
}
