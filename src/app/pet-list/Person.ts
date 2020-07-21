import { Pet } from './pet';

export interface Person {
  name: string;
  gender: gender;
  age: number;
  pets: Pet[];
}

export enum gender {
  male = 0,
  female = 1
}
