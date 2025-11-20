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
    name: 'Yolo',
    age: 26,
    bio: 'Amateur cook',
    distanceKm: 24,
    verified: true,
    photos: [
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507149832948-89c05d7f31ab?q=80&w=1080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?q=80&w=1080&auto=format&fit=crop',
    ],
  },
  {
    id: 'op2',
    name: 'Nova',
    age: 24,
    bio: 'Traveler',
    distanceKm: 12,
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1080&auto=format&fit=crop',
    ],
  },
  {
    id: 'op3',
    name: 'Kai 1',
    age: 28,
    bio: 'Runner',
    distanceKm: 8,
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1080&auto=format&fit=crop',
    ],
  },
  {
    id: 'op4',
    name: 'Kai 2',
    age: 28,
    bio: 'Runner',
    distanceKm: 8,
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1080&auto=format&fit=crop',
    ],
  },
  {
    id: 'op5',
    name: 'Kai 3',
    age: 28,
    bio: 'Runner',
    distanceKm: 8,
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1080&auto=format&fit=crop',
    ],
  },
  {
    id: 'op6',
    name: 'Kai 4',
    age: 28,
    bio: 'Runner',
    distanceKm: 8,
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1080&auto=format&fit=crop',
    ],
  },
];
