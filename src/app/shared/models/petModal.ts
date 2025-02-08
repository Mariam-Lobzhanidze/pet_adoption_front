export interface PetDetails {
  name?: string;
  breed: string;
  age: string;
  gender: Gender;
  size?: Size;
  isInShelter?: boolean;
  shelterName?: string;
  careAndBehavior?: Care;
  color?: string;
  coatLength?: CoatLengthType;
  goodWith?: GoodWith[];
  image?: string;
}

export type Care = 'House-trained' | 'Special Needs' | 'Any';

export type CoatLengthType =
  | 'Hairless'
  | 'Short'
  | 'Medium'
  | 'Long'
  | 'Wire'
  | 'Curly';

export type GoodWith = 'Any' | 'Kids' | 'Dogs' | 'Cats';
export type Gender = 'Male' | 'Female';
export type Age = 'Puppy' | 'Adult' | 'Young' | 'Senior';
export type Size =
  | 'Small(0-25 lbs)'
  | 'Medium(26-60 lbs)'
  | 'Large(61-100 lbs)'
  | 'Extra Large(101 lbs or more)';
