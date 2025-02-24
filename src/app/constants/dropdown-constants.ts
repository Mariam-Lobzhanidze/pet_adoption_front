import { Item } from '../shared/models/item.model';

export const ADOPT_ITEMS: Item[] = [
  { label: 'About Adopto', route: '' },
  { label: 'Adopting Pets', route: '' },
  { label: 'Animal Shelters&Rescues', route: '' },
];

export const DOG_ITEMS: Item[] = [
  { label: 'Dog Adoption', route: '/about' },
  { label: 'Dog Breeds', route: '/adopt' },
  { label: 'Feeding Your Dog', route: '' },
  { label: 'Dog Behavior', route: '' },
  { label: 'Dog Health&Wellness', route: '' },
  { label: 'Dog Training', route: '' },
  { label: 'Other Dog Information', route: '' },
];

export const CAT_ITEMS: Item[] = [
  { label: 'Cat Adoption', route: '/about' },
  { label: 'Cat Breeds', route: '/adopt' },
  { label: 'Feeding Your Cat', route: '' },
  { label: 'Cat Behavior', route: '' },
  { label: 'Cat Health&Wellness', route: '' },
  { label: 'Cat Training', route: '' },
  { label: 'Other Cat Information', route: '' },
];
export const OTHER_TYPE_ITEMS: Item[] = [
  { label: 'Birds', route: '/about' },
  { label: 'Exotic Pets', route: '/adopt' },
  { label: 'Guinea Pigs', route: '' },
  { label: 'Horses', route: '' },
  { label: 'Rabbits', route: '' },
  { label: 'Reptiles', route: '' },
  { label: 'Small&Furry Pets', route: '' },
];

export const PET_TYPE_CARDS_ITEMS = [
  { label: 'Dogs', icon: 'ph-dog', route: '/', selected: false },
  { label: 'Cats', icon: 'ph-cat', route: '/', selected: false },
  { label: 'Others', icon: 'ph-paw-print', route: '', selected: false },
  {
    label: 'Shelters',
    icon: 'ph-house-line',
    route: '/',
    selected: false,
  },
];
