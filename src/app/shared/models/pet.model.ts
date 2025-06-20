export interface Pet {
  id: string;
  userId: string;
  name: string;
  type: string;
  breed: string;
  age: Age;
  images: { public_id: string; url: string }[];
  gender: Gender;
  city?: string;
  contactEmail?: string;
  contactPhone?: string;
  preferredContact?: string;
  availableFor?: 'adoption' | 'foster';
  size?: Size;
  care?: Care[];
  color?: string;
  coatLength?: CoatLengthType;
  goodWith?: GoodWith[];
  status?: Status;
  history?: string;
  owner?: {
    isShelter: boolean;
    shelterName: string;
    username: string;
    address: string;
  };
}

export interface PetImageUploadResponse {
  message: string;
  uploadResults: { public_id: string; url: string }[];
}

export type Gender = 'male' | 'female' | 'unknown';
export type Age = 'baby' | 'adult' | 'young' | 'senior';
export type Size =
  | 'small_0_25_lbs'
  | 'medium_26_60_lbs'
  | 'large_61_100_lbs'
  | 'extra_large_101_lbs_or_more';

export type Care =
  | 'vaccinated'
  | 'neutered'
  | 'dewormed'
  | 'house_trained'
  | 'special_needs'
  | 'medications_required'
  | 'needs_regular_grooming'
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
