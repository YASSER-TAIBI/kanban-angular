import { CardType } from './card-type.model';

export interface Card {
  id: string;
  title: string;
  description: string;
  type: CardType;
  listId?: string;
  position?: number;
}
