import { Pet } from './pet';

export interface Person {
  name: string;
  gender: Gender;
  age: number;
  pets: Pet[];
}

export enum Gender {
  male = 0,
  female = 1
}
