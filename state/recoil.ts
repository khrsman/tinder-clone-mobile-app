import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { Opponent, opponents } from '../data/opponents';

export const indexAtom = atom<number>({ key: 'indexAtom', default: 0 });
export const likedIdsAtom = atom<string[]>({ key: 'likedIdsAtom', default: [] });

export const currentOpponentSelector = selector<Opponent | undefined>({
  key: 'currentOpponentSelector',
  get: ({ get }) => opponents[get(indexAtom)],
});

export function useCardsActions() {
  const setIndex = useSetRecoilState(indexAtom);
  const setLikedIds = useSetRecoilState(likedIdsAtom);
  const current = useRecoilValue(currentOpponentSelector);

  const like = (id: string) => setLikedIds((prev) => [...prev, id]);
  const undo = () => {
    setLikedIds((prev) => prev.slice(0, -1));
    setIndex(0);
  };
  const remove = (id: string) => setLikedIds((prev) => prev.filter((x) => x !== id));

  const handleLikes = () => setIndex((i) => Math.min(opponents.length - 1, i + 1));
  const handleThisLike = () => {
    if (current) like(current.id);
    setIndex((i) => Math.min(opponents.length - 1, i + 1));
  };

  return { like, undo, remove, handleLikes, handleThisLike, setIndex };
}
