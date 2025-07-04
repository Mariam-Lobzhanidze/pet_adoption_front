import { Item } from '../shared/models/item.model';

export const DOG_BREEDS_OPTIONS = [
  { value: 'affenpinscher', label: 'Affenpinscher' },
  { value: 'afghan_hound', label: 'Afghan Hound' },
  { value: 'african_hunting_dog', label: 'African Hunting Dog' },
  { value: 'airedale_terrier', label: 'Airedale Terrier' },
  { value: 'akbash_dog', label: 'Akbash Dog' },
  { value: 'akita', label: 'Akita' },
  { value: 'alapaha_blue_blood_bulldog', label: 'Alapaha Blue Blood Bulldog' },

  { value: 'alaskan_husky', label: 'Alaskan Husky' },
  { value: 'alaskan_malamute', label: 'Alaskan Malamute' },
  { value: 'american_bulldog', label: 'American Bulldog' },
  { value: 'american_bully', label: 'American Bully' },
  { value: 'american_eskimo_dog', label: 'American Eskimo Dog' },

  {
    value: 'american_eskimo_dog_miniature',
    label: 'American Eskimo Dog (Miniature)',
  },
  { value: 'american_foxhound', label: 'American Foxhound' },
  { value: 'american_pit_bull_terrier', label: 'American Pit Bull Terrier' },
  {
    value: 'american_staffordshire_terrier',
    label: 'American Staffordshire Terrier',
  },
  { value: 'american_water_spaniel', label: 'American Water Spaniel' },
  { value: 'anatolian_shepherd_dog', label: 'Anatolian Shepherd Dog' },
  { value: 'appenzeller_sennenhund', label: 'Appenzeller Sennenhund' },
  { value: 'australian_cattle_dog', label: 'Australian Cattle Dog' },
  { value: 'australian_kelpie', label: 'Australian Kelpie' },
  { value: 'australian_shepherd', label: 'Australian Shepherd' },
  { value: 'australian_terrier', label: 'Australian Terrier' },

  { value: 'azawakh', label: 'Azawakh' },
  { value: 'barbet', label: 'Barbet' },
  { value: 'basenji', label: 'Basenji' },
  { value: 'basset_bleu_de_gascogne', label: 'Basset Bleu de Gascogne' },
  { value: 'basset_hound', label: 'Basset Hound' },
  { value: 'beagle', label: 'Beagle' },
  { value: 'bearded_collie', label: 'Bearded Collie' },
  { value: 'beauceron', label: 'Beauceron' },
  { value: 'bedlington_terrier', label: 'Bedlington Terrier' },
  { value: 'belgian_malinois', label: 'Belgian Malinois' },
  { value: 'belgian_tervuren', label: 'Belgian Tervuren' },
  { value: 'bernese_mountain_dog', label: 'Bernese Mountain Dog' },
  { value: 'bichon_frise', label: 'Bichon Frise' },
  { value: 'black_and_tan_coonhound', label: 'Black and Tan Coonhound' },
  { value: 'bloodhound', label: 'Bloodhound' },
  { value: 'bluetick_coonhound', label: 'Bluetick Coonhound' },
  { value: 'boerboel', label: 'Boerboel' },
  { value: 'border_collie', label: 'Border Collie' },
  { value: 'border_terrier', label: 'Border Terrier' },
  { value: 'boston_terrier', label: 'Boston Terrier' },
  { value: 'bouvier_des_flandres', label: 'Bouvier des Flandres' },

  { value: 'boxer', label: 'Boxer' },
  { value: 'boykin_spaniel', label: 'Boykin Spaniel' },
  { value: 'bracco_italiano', label: 'Bracco Italiano' },
  { value: 'briard', label: 'Briard' },
  { value: 'brittany', label: 'Brittany' },
  { value: 'bull_terrier', label: 'Bull Terrier' },
  { value: 'bull_terrier_miniature', label: 'Bull Terrier (Miniature)' },
  { value: 'bullmastiff', label: 'Bullmastiff' },
  { value: 'cairn_terrier', label: 'Cairn Terrier' },
  { value: 'cane_corso', label: 'Cane Corso' },
  { value: 'cardigan_welsh_corgi', label: 'Cardigan Welsh Corgi' },
  { value: 'catahoula_leopard_dog', label: 'Catahoula Leopard Dog' },
  {
    value: 'caucasian_shepherd_ovcharka',
    label: 'Caucasian Shepherd (Ovcharka)',
  },

  {
    value: 'cavalier_king_charles_spaniel',
    label: 'Cavalier King Charles Spaniel',
  },
  { value: 'chesapeake_bay_retriever', label: 'Chesapeake Bay Retriever' },
  { value: 'chinese_crested', label: 'Chinese Crested' },
  { value: 'chinese_shar_pei', label: 'Chinese Shar-Pei' },
  { value: 'chinook', label: 'Chinook' },
  { value: 'chow_chow', label: 'Chow Chow' },
  { value: 'clumber_spaniel', label: 'Clumber Spaniel' },
  { value: 'cocker_spaniel', label: 'Cocker Spaniel' },
  { value: 'cocker_spaniel_american', label: 'Cocker Spaniel (American)' },
  { value: 'coton_de_tulear', label: 'Coton de Tulear' },
  { value: 'dalmatian', label: 'Dalmatian' },
  { value: 'doberman_pinscher', label: 'Doberman Pinscher' },
  { value: 'dogo_argentino', label: 'Dogo Argentino' },
  { value: 'dutch_shepherd', label: 'Dutch Shepherd' },
  { value: 'english_setter', label: 'English Setter' },
  { value: 'english_shepherd', label: 'English Shepherd' },
  { value: 'english_springer_spaniel', label: 'English Springer Spaniel' },
  { value: 'english_toy_spaniel', label: 'English Toy Spaniel' },

  { value: 'english_toy_terrier', label: 'English Toy Terrier' },
  { value: 'eurasier', label: 'Eurasier' },
  { value: 'field_spaniel', label: 'Field Spaniel' },
  { value: 'finnish_lapphund', label: 'Finnish Lapphund' },
  { value: 'finnish_spitz', label: 'Finnish Spitz' },
  { value: 'french_bulldog', label: 'French Bulldog' },
  { value: 'german_pinscher', label: 'German Pinscher' },
  { value: 'german_shepherd_dog', label: 'German Shepherd Dog' },
  { value: 'german_shorthaired_pointer', label: 'German Shorthaired Pointer' },
  { value: 'giant_schnauzer', label: 'Giant Schnauzer' },
  { value: 'glen_of_imaal_terrier', label: 'Glen of Imaal Terrier' },
  { value: 'golden_retriever', label: 'Golden Retriever' },
  { value: 'gordon_setter', label: 'Gordon Setter' },
  { value: 'great_dane', label: 'Great Dane' },
  { value: 'great_pyrenees', label: 'Great Pyrenees' },
  { value: 'greyhound', label: 'Greyhound' },
  { value: 'griffon_bruxellois', label: 'Griffon Bruxellois' },
  { value: 'harrier', label: 'Harrier' },
  { value: 'havanese', label: 'Havanese' },
  { value: 'irish_setter', label: 'Irish Setter' },
  { value: 'irish_terrier', label: 'Irish Terrier' },

  { value: 'irish_wolfhound', label: 'Irish Wolfhound' },
  { value: 'italian_greyhound', label: 'Italian Greyhound' },
  { value: 'japanese_chin', label: 'Japanese Chin' },
  { value: 'japanese_spitz', label: 'Japanese Spitz' },
  { value: 'keeshond', label: 'Keeshond' },
  { value: 'komondor', label: 'Komondor' },
  { value: 'kooikerhondje', label: 'Kooikerhondje' },
  { value: 'kuvasz', label: 'Kuvasz' },
  { value: 'labrador_retriever', label: 'Labrador Retriever' },
  { value: 'lagotto_romagnolo', label: 'Lagotto Romagnolo' },
  { value: 'lancashire_heeler', label: 'Lancashire Heeler' },
  { value: 'leonberger', label: 'Leonberger' },
  { value: 'lhasa_apso', label: 'Lhasa Apso' },
  { value: 'maltese', label: 'Maltese' },
  {
    value: 'miniature_american_shepherd',
    label: 'Miniature American Shepherd',
  },
  { value: 'miniature_pinscher', label: 'Miniature Pinscher' },
  { value: 'miniature_schnauzer', label: 'Miniature Schnauzer' },
  { value: 'newfoundland', label: 'Newfoundland' },
  { value: 'norfolk_terrier', label: 'Norfolk Terrier' },
  { value: 'norwich_terrier', label: 'Norwich Terrier' },
  {
    value: 'nova_scotia_duck_tolling_retriever',
    label: 'Nova Scotia Duck Tolling Retriever',
  },

  { value: 'old_english_sheepdog', label: 'Old English Sheepdog' },
  { value: 'olde_english_bulldogge', label: 'Olde English Bulldogge' },
  { value: 'papillon', label: 'Papillon' },
  { value: 'pekingese', label: 'Pekingese' },
  { value: 'pembroke_welsh_corgi', label: 'Pembroke Welsh Corgi' },
  { value: 'perro_de_presa_canario', label: 'Perro de Presa Canario' },
  { value: 'pharaoh_hound', label: 'Pharaoh Hound' },
  { value: 'plott', label: 'Plott' },
  { value: 'pomeranian', label: 'Pomeranian' },
  { value: 'poodle_miniature', label: 'Poodle (Miniature)' },
  { value: 'poodle_toy', label: 'Poodle (Toy)' },
  { value: 'pug', label: 'Pug' },
  { value: 'puli', label: 'Puli' },
  { value: 'pumi', label: 'Pumi' },
  { value: 'rat_terrier', label: 'Rat Terrier' },
  { value: 'redbone_coonhound', label: 'Redbone Coonhound' },
  { value: 'rhodesian_ridgeback', label: 'Rhodesian Ridgeback' },
  { value: 'rottweiler', label: 'Rottweiler' },
  { value: 'russian_toy', label: 'Russian Toy' },
  { value: 'saint_bernard', label: 'Saint Bernard' },
  { value: 'saluki', label: 'Saluki' },
  { value: 'samoyed', label: 'Samoyed' },
  { value: 'schipperke', label: 'Schipperke' },
  { value: 'scottish_deerhound', label: 'Scottish Deerhound' },
  { value: 'scottish_terrier', label: 'Scottish Terrier' },
  { value: 'sealyham_terrier', label: 'Sealyham Terrier' },
  { value: 'shetland_sheepdog', label: 'Shetland Sheepdog' },
  { value: 'shiba_inu', label: 'Shiba Inu' },
  { value: 'shih_tzu', label: 'Shih Tzu' },
  { value: 'siberian_husky', label: 'Siberian Husky' },
  { value: 'silky_terrier', label: 'Silky Terrier' },
  { value: 'skye_terrier', label: 'Skye Terrier' },
  { value: 'sloughi', label: 'Sloughi' },
  { value: 'spaniel_american_water', label: 'Spaniel (American Water)' },
  { value: 'spaniel_english_cocker', label: 'Spaniel (English Cocker)' },
  { value: 'spaniel_english_springer', label: 'Spaniel (English Springer)' },
  { value: 'spinone_italiano', label: 'Spinone Italiano' },
  { value: 'staffordshire_bull_terrier', label: 'Staffordshire Bull Terrier' },
  { value: 'sussex_spaniel', label: 'Sussex Spaniel' },
  { value: 'swedish_vallhund', label: 'Swedish Vallhund' },
  { value: 'tibetan_mastiff', label: 'Tibetan Mastiff' },
  { value: 'tibetan_spaniel', label: 'Tibetan Spaniel' },
  { value: 'tibetan_terrier', label: 'Tibetan Terrier' },
  { value: 'weimaraner', label: 'Weimaraner' },
  { value: 'welsh_springer_spaniel', label: 'Welsh Springer Spaniel' },
  {
    value: 'west_highland_white_terrier',
    label: 'West Highland White Terrier',
  },
  { value: 'whippet', label: 'Whippet' },
  { value: 'wire_fox_terrier', label: 'Wire Fox Terrier' },
  {
    value: 'wirehaired_pointing_griffon',
    label: 'Wirehaired Pointing Griffon',
  },
  { value: 'xoloitzcuintli', label: 'Xoloitzcuintli' },
  { value: 'yorkshire_terrier', label: 'Yorkshire Terrier' },
];

export const CAT_BREEDS_OPTIONS = [
  { value: 'abyssinian', label: 'Abyssinian' },
  { value: 'aegean', label: 'Aegean' },
  { value: 'american_bobtail', label: 'American Bobtail' },
  { value: 'american_curl', label: 'American Curl' },
  { value: 'american_shorthair', label: 'American Shorthair' },
  { value: 'american_wirehair', label: 'American Wirehair' },
  { value: 'arabian_mau', label: 'Arabian Mau' },
  { value: 'australian_mist', label: 'Australian Mist' },
  { value: 'balinese', label: 'Balinese' },
  { value: 'bambino', label: 'Bambino' },
  { value: 'bengal', label: 'Bengal' },
  { value: 'birman', label: 'Birman' },
  { value: 'bombay', label: 'Bombay' },
  { value: 'british_longhair', label: 'British Longhair' },
  { value: 'british_shorthair', label: 'British Shorthair' },
  { value: 'burmese', label: 'Burmese' },
  { value: 'burmilla', label: 'Burmilla' },
  { value: 'california_spangled', label: 'California Spangled' },
  { value: 'chantilly_tiffany', label: 'Chantilly-Tiffany' },
  { value: 'chartreux', label: 'Chartreux' },
  { value: 'chausie', label: 'Chausie' },
  { value: 'cheetoh', label: 'Cheetoh' },
  { value: 'colorpoint_shorthair', label: 'Colorpoint Shorthair' },
  { value: 'cornish_rex', label: 'Cornish Rex' },
  { value: 'cymric', label: 'Cymric' },
  { value: 'cyprus', label: 'Cyprus' },
  { value: 'devon_rex', label: 'Devon Rex' },
  { value: 'donskoy', label: 'Donskoy' },
  { value: 'dragon_li', label: 'Dragon Li' },
  { value: 'egyptian_mau', label: 'Egyptian Mau' },
  { value: 'european_burmese', label: 'European Burmese' },
  { value: 'exotic_shorthair', label: 'Exotic Shorthair' },
  { value: 'havana_brown', label: 'Havana Brown' },
  { value: 'himalayan', label: 'Himalayan' },
  { value: 'japanese_bobtail', label: 'Japanese Bobtail' },
  { value: 'javanese', label: 'Javanese' },
  { value: 'khao_manee', label: 'Khao Manee' },
  { value: 'korat', label: 'Korat' },
  { value: 'kurilian', label: 'Kurilian' },
  { value: 'laperm', label: 'LaPerm' },
  { value: 'maine_coon', label: 'Maine Coon' },
  { value: 'malayan', label: 'Malayan' },
  { value: 'manx', label: 'Manx' },
  { value: 'munchkin', label: 'Munchkin' },
  { value: 'nebelung', label: 'Nebelung' },
  { value: 'norwegian_forest_cat', label: 'Norwegian Forest Cat' },
  { value: 'ocicat', label: 'Ocicat' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'persian', label: 'Persian' },
  { value: 'pixie_bob', label: 'Pixie-bob' },
  { value: 'ragamuffin', label: 'Ragamuffin' },
  { value: 'ragdoll', label: 'Ragdoll' },
  { value: 'russian_blue', label: 'Russian Blue' },
  { value: 'savannah', label: 'Savannah' },
  { value: 'scottish_fold', label: 'Scottish Fold' },
  { value: 'selkirk_rex', label: 'Selkirk Rex' },
  { value: 'siamese', label: 'Siamese' },
  { value: 'siberian', label: 'Siberian' },
  { value: 'singapura', label: 'Singapura' },
  { value: 'snowshoe', label: 'Snowshoe' },
  { value: 'somali', label: 'Somali' },
  { value: 'sphynx', label: 'Sphynx' },
  { value: 'tonkinese', label: 'Tonkinese' },
  { value: 'toyger', label: 'Toyger' },
  { value: 'turkish_angora', label: 'Turkish Angora' },
  { value: 'turkish_van', label: 'Turkish Van' },
  { value: 'york_chocolate', label: 'York Chocolate' },
];

export const HORSE_BREEDS_OPTIONS = [
  { value: 'arabian', label: 'Arabian' },
  { value: 'quarter_horse', label: 'Quarter Horse' },
  { value: 'thoroughbred', label: 'Thoroughbred' },
  { value: 'appaloosa', label: 'Appaloosa' },
  { value: 'paint', label: 'Paint' },
  { value: 'miniature', label: 'Miniature' },
  { value: 'morgan', label: 'Morgan' },
  { value: 'friesian', label: 'Friesian' },
  { value: 'clydesdale', label: 'Clydesdale' },
  { value: 'shetland_pony', label: 'Shetland Pony' },
  { value: 'mustang', label: 'Mustang' },
  { value: 'andalusian', label: 'Andalusian' },
  { value: 'belgian', label: 'Belgian' },
  { value: 'haflinger', label: 'Haflinger' },
  { value: 'percheron', label: 'Percheron' },
  { value: 'gypsy_vanner', label: 'Gypsy Vanner' },
  { value: 'tennessee_walker', label: 'Tennessee Walker' },
  { value: 'icelandic', label: 'Icelandic' },
  { value: 'lipizzan', label: 'Lipizzan' },
  { value: 'welsh_pony', label: 'Welsh Pony' },
];

export const RABBIT_BREEDS_OPTIONS = [
  { value: 'american', label: 'American' },
  { value: 'american_fuzzy_lop', label: 'American Fuzzy Lop' },
  { value: 'angora', label: 'Angora' },
  { value: 'belgian_hare', label: 'Belgian Hare' },
  { value: 'californian', label: 'Californian' },
  { value: 'champagne_d_argent', label: "Champagne d'Argent" },
  { value: 'checkered_giant', label: 'Checkered Giant' },
  { value: 'dutch', label: 'Dutch' },
  { value: 'english_lop', label: 'English Lop' },
  { value: 'english_spot', label: 'English Spot' },
  { value: 'flemish_giant', label: 'Flemish Giant' },
  { value: 'florida_white', label: 'Florida White' },
  { value: 'harlequin', label: 'Harlequin' },
  { value: 'havana', label: 'Havana' },
  { value: 'himalayan', label: 'Himalayan' },
  { value: 'holland_lop', label: 'Holland Lop' },
  { value: 'lionhead', label: 'Lionhead' },
  { value: 'mini_rex', label: 'Mini Rex' },
  { value: 'netherland_dwarf', label: 'Netherland Dwarf' },
  { value: 'new_zealand', label: 'New Zealand' },
];

export const BIRD_BREEDS_OPTIONS = [
  { value: 'african_grey', label: 'African Grey' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'budgerigar', label: 'Budgerigar (Budgie)' },
  { value: 'cockatiel', label: 'Cockatiel' },
  { value: 'cockatoo', label: 'Cockatoo' },
  { value: 'conure', label: 'Conure' },
  { value: 'canary', label: 'Canary' },
  { value: 'dove', label: 'Dove' },
  { value: 'eclectus', label: 'Eclectus' },
  { value: 'finch', label: 'Finch' },
  { value: 'lovebird', label: 'Lovebird' },
  { value: 'macaw', label: 'Macaw' },
  { value: 'parakeet', label: 'Parakeet' },
  { value: 'parrotlet', label: 'Parrotlet' },
  { value: 'pigeon', label: 'Pigeon' },
  { value: 'quaker_parrot', label: 'Quaker Parrot' },
  { value: 'toucan', label: 'Toucan' },
  { value: 'lorikeet', label: 'Lorikeet' },
  { value: 'poicephalus', label: 'Poicephalus' },
  { value: 'senegal', label: 'Senegal' },
];

export const ALL_BREEDS: { value: string; label: string }[] = [
  ...DOG_BREEDS_OPTIONS,
  ...CAT_BREEDS_OPTIONS,
  ...HORSE_BREEDS_OPTIONS,
  ...BIRD_BREEDS_OPTIONS,
  ...RABBIT_BREEDS_OPTIONS,
];

export const ICON_CARDS_ITEMS: Item[] = [
  {
    label: 'Dogs',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="92" cy="140" r="8"/><circle cx="164" cy="140" r="8"/><line x1="128" y1="192" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><polyline points="144 176 128 192 112 176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line x1="104" y1="48" x2="152" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M104,48,50.37,32.24a8,8,0,0,0-9.8,6.29l-16.42,88c-1.54,8.23,9,13,14.16,6.42Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M152,48l53.63-15.76a8,8,0,0,1,9.8,6.29l16.42,88c1.54,8.23-9,13-14.16,6.42Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M208,120.38V184a32,32,0,0,1-32,32H80a32,32,0,0,1-32-32V120.38" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>',
    route: '/pets/search',
    value: 'dogs',
  },
  {
    label: 'Cats',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="128" y1="192" x2="128" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line x1="128" y1="48" x2="128" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><polyline points="144 176 128 192 112 176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line x1="96" y1="53.01" x2="96" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line x1="160" y1="53.01" x2="160" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M67.6,67.6h0a102.87,102.87,0,0,1,120.8,0h0l21.94-25.24A8,8,0,0,1,224,48v88c0,48.6-43,88-96,88s-96-39.4-96-88V48a8,8,0,0,1,13.66-5.66Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><circle cx="84" cy="140" r="8"/><circle cx="172" cy="140" r="8" /></svg>',
    route: '/pets/search',
    value: 'cats',
  },
  {
    label: 'More pets',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="212" cy="108" r="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><circle cx="44" cy="108" r="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><circle cx="92" cy="60" r="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><circle cx="164" cy="60" r="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M128,104A36,36,0,0,0,93.43,130a43.49,43.49,0,0,1-20.67,25.9,32,32,0,0,0,27.73,57.62,72.49,72.49,0,0,1,55,0,32,32,0,0,0,27.73-57.62A43.46,43.46,0,0,1,162.57,130,36,36,0,0,0,128,104Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>',
    route: '/pets/search',
    value: 'others',
  },
  {
    label: 'Shelters',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="16" y1="216" x2="240" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><polyline points="152 216 152 152 104 152 104 216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line x1="40" y1="116.69" x2="40" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line x1="216" y1="216" x2="216" y2="116.69" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M24,132.69l98.34-98.35a8,8,0,0,1,11.32,0L232,132.69" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>',
    route: '/shelter-list',
    value: 'shelters',
  },
  {
    label: 'Birds',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="164" cy="68" r="8"/><path d="M104,99.52V76.89c0-28.77,23-52.75,51.74-52.89a52,52,0,0,1,50.59,38.89L232,80,208,96v24a96,96,0,0,1-96,96H24a8,8,0,0,1-6.25-13Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line x1="128" y1="128" x2="54.67" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>',
    route: '/pets/search',
    value: 'birds',
  },

  {
    label: 'Horses',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M176,120a48,48,0,0,1-48,48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><circle cx="124" cy="100" r="8"/><path d="M64,200c17.43,15.6,40.59,24.48,65.94,24,51.48-1,93.33-43.13,94.05-94.61A96,96,0,0,0,128,32h-8V64L16,128l13.79,22a24,24,0,0,0,23.51,9.62c17.47-3,48.06-7.64,74.7,8.34h0L92.13,217.32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>',
    route: '/pets/search',
    value: 'horses',
  },
  {
    label: 'Rabbits',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="100" cy="164" r="8"/><circle cx="156" cy="164" r="8"/><polyline points="144 200 128 213.31 112 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M146.56,98.73C152.16,72.39,167,16,190.94,16c28.22,0,18.27,65.06-6.91,113" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M109.44,98.73C103.84,72.39,89,16,65.06,16,36.84,16,46.79,81.06,72,129" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M191.71,153.82A44,44,0,1,1,128,213.3a44,44,0,1,1-63.71-59.48,64,64,0,0,1,127.42,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>',
    route: '/pets/search',
    value: 'rabbits',
  },
];

export const PET_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: 'dogs', label: 'Dogs' },
  { value: 'cats', label: 'Cats' },
  { value: 'horses', label: 'Horses' },
  { value: 'birds', label: 'Birds' },
  { value: 'rabbits', label: 'Rabbits' },
];

export const PET_AGE_OPTIONS = [
  { value: 'baby', label: 'Baby' },
  { value: 'adult', label: 'Adult' },
  { value: 'young', label: 'Young' },
  { value: 'senior', label: 'Senior' },
];

export const PET_GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  // { value: 'unknown', label: 'Unknown' },
];

export const PET_SIZE_OPTIONS = [
  { label: 'Small(0-25 lbs)', value: 'small_0_25_lbs' },
  { label: 'Medium(26-60 lbs)', value: 'medium_26_60_lbs' },
  { label: 'Large(61-100 lbs)', value: 'large_61_100_lbs' },
  {
    label: 'Extra Large(101 lbs or more)',
    value: 'extra_large_101_lbs_or_more',
  },
];

export const PET_CARE_OPTIONS = [
  { value: 'vaccinated', label: 'Vaccinated' },
  { value: 'neutered', label: 'Neutered' },
  { value: 'dewormed', label: 'Dewormed' },
  { value: 'special_needs', label: 'Special Needs' },
  { value: 'medications_required', label: 'Medications Required' },
  { value: 'needs_regular_grooming', label: 'Needs Regular Grooming' },
  { value: 'house_trained', label: 'House Trained' },
  {
    value: 'requires_exercise_or_playtime',
    label: 'Requires Exercise or Playtime',
  },

  { value: 'unknown', label: 'Unknown' },
];

export const GOOD_WITH_OPTIONS = [
  {
    value: 'everyone',
    label: 'Everyone',
  },
  {
    value: 'dogs',
    label: 'Dogs',
  },
  {
    value: 'cats',
    label: 'Cats',
  },
  {
    value: 'kids',
    label: 'Kids',
  },
];
