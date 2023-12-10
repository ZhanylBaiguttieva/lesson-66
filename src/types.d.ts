export interface Meat {
  id: string;
  time: string;
  description: string;
  calories: string;
}

export type ApiMeat = Omit<Meat, 'id'>;

export interface MeatsList {
  [id:string]: ApiMeat;
}