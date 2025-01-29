import { Card } from './card.model';

export interface List {
  id: string;
  title: string;
  cards: Card[];
  boardId?: string;
  position?: number;
}
