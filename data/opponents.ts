export type Opponent = {
  id: string;
  name: string;
  age: number;
  bio: string;
  distanceKm: number;
  photos: string[];
  verified?: boolean;
};

export const opponents: Opponent[] = [
  {
    id: 'op1',
    name: 'Ava',
    age: 24,
    bio: 'Photographer',
    distanceKm: 5,
    photos: [
       'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1080&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'op2',
    name: 'Mia',
    age: 27,
    bio: 'Designer',
    distanceKm: 12,
    photos: [     
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1080&auto=format&fit=crop&q=80',
       'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1080&auto=format&fit=crop&q=80',
         'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1080&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'op3',
    name: 'Sophia',
    age: 26,
    bio: 'Runner',
    distanceKm: 8,
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1080&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'op4',
    name: 'Olivia',
    age: 29,
    bio: 'Chef',
    distanceKm: 3,
    photos: [
      'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=1080&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'op5',
    name: 'Isabella',
    age: 25,
    bio: 'Artist',
    distanceKm: 7,
    photos: [
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531256379411-1f03d03a6f04?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1080&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'op6',
    name: 'Emma',
    age: 30,
    bio: 'Yoga Enthusiast',
    distanceKm: 10,
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1080&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'op7',
    name: 'Charlotte',
    age: 28,
    bio: 'Traveler',
    distanceKm: 15,
    photos: [
      'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=1080&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'op8',
    name: 'Amelia',
    age: 23,
    bio: 'Musician',
    distanceKm: 6,
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1080&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'op9',
    name: 'Harper',
    age: 27,
    bio: 'Writer',
    distanceKm: 9,
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1080&auto=format&fit=crop&q=80',
    ],
  }
];
