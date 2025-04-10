export interface Pet {
  id: string;
  userId: string;
  name: string;
  type: string;
  breed: string;
  age: Age;
  // images: { public_id: string; file: File }[];
  images: { public_id: string; url: string }[];
  gender: Gender;
  size?: Size;
  care?: Care;
  color?: string;
  coatLength?: CoatLengthType;
  goodWith?: GoodWith[];
  status?: Status;
}

export type Gender = 'male' | 'female' | 'unknown';
export type Age = 'baby' | 'adult' | 'young' | 'senior';
export type Size =
  | 'small_0_25_lbs'
  | 'medium_26_60_lbs'
  | 'large_61_100_lbs'
  | 'extra_large_101_lbs_or_more';

export type Care =
  | 'house_trained'
  | 'special_needs'
  | 'medications_required'
  | 'needs_regular_grooming'
  | 'no_special_requirements'
  | 'requires_exercise_or_playtime'
  | 'unknown';

export type Status = 'adopted' | 'fostered' | 'unknown';
export type CoatLengthType =
  | 'hairless'
  | 'short'
  | 'medium'
  | 'long'
  | 'wire'
  | 'curly';

export type GoodWith = 'everyone' | 'kids' | 'dogs' | 'cats';

export interface PetStory {
  image: string;
  petName: string;
  owner: string;
  description: string;
}
