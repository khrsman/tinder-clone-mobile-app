import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';

export type Opponent = {
  id: string;
  name: string;
  age: number;
  bio: string;
  distanceKm: number;
  photos: string[];
  verified?: boolean;
};

export const indexAtom = atom<number>({ key: 'indexAtom', default: 0 });
export const likedIdsAtom = atom<string[]>({ key: 'likedIdsAtom', default: [] });
export const opponentsAtom = atom<Opponent[]>({ key: 'opponentsAtom', default: [] });

export const currentOpponentSelector = selector<Opponent | undefined>({
  key: 'currentOpponentSelector',
  get: ({ get }) => {
    const list = get(opponentsAtom);
    const idx = get(indexAtom);
    return list[idx];
  },
});

export function useCardsActions() {
  const setIndex = useSetRecoilState(indexAtom);
  const setLikedIds = useSetRecoilState(likedIdsAtom);
  const current = useRecoilValue(currentOpponentSelector);
  const oppList = useRecoilValue(opponentsAtom);

  const like = (id: string) => setLikedIds((prev) => [...prev, id]);
  const undo = () => {
    setLikedIds((prev) => prev.slice(0, -1));
    setIndex(0);
  };
  const remove = (id: string) => setLikedIds((prev) => prev.filter((x) => x !== id));

  const handleLikes = () => setIndex((i) => Math.min(Math.max(oppList.length - 1, 0), i + 1));
  const handleThisLike = () => {
    if (current) like(current.id);
    setIndex((i) => Math.min(Math.max(oppList.length - 1, 0), i + 1));
  };

  return { like, undo, remove, handleLikes, handleThisLike, setIndex };
}
