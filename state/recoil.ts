import Constants from 'expo-constants';
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';



export type Opponent = {
  id: number;
  name: string;
  age: number;
  bio: string;
  distanceKm: number;
  photos: string[];
  verified?: boolean;
};

export const indexAtom = atom<number>({ key: 'indexAtom', default: 0 });
export const likedIdsAtom = atom<number[]>({ key: 'likedIdsAtom', default: [] });
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
  const idx = useRecoilValue(indexAtom);

  const like = (id: number) => setLikedIds((prev) => [...prev, id]);
  async function sendRewind() {
    const rawBase = process.env.BASE_URL ?? (Constants.expoConfig?.extra as any)?.BASE_URL as string;
    const host = String(rawBase || '').trim().replace(/^[`'"\s]+|[`'"\s]+$/g, '').replace(/\/+$/, '');
    const url = `${host}/api/likes/rewind`;
    const payload = { user_id: 1 };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.error('rewind_api_error', { status: res.status, url, payload, body });
      }
    } catch (error) {
      console.error('rewind_api_exception', { url, payload, error: String(error) });
    }
  }

  const undo = () => {
    const prevIdx = Math.max(idx - 1, 0);
    const prevOpponent = oppList[prevIdx];
    if (prevOpponent) setLikedIds((prev) => prev.filter((x) => x !== prevOpponent.id));
    setIndex(prevIdx);
    sendRewind();
  };
  const remove = (id: number) => setLikedIds((prev) => prev.filter((x) => x !== id));

  async function sendLikeStatus(peopleId: number, status: 'like' | 'dislike') {
    const BASE_URL = process.env.BASE_URL ?? (Constants.expoConfig?.extra as any)?.BASE_URL as string;
    const url = `${BASE_URL}/api/likes`; 
    const payload = { people_id: peopleId, status, user_id: 1 };
    console.log(url);
    console.log(payload);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.error('likes_api_error', { status: res.status, url, payload, body });
      }
    } catch (error) {
      console.error('likes_api_exception', { url, payload, error: String(error) });
    }
  }

  const handleLikes = () => {
    if (current) sendLikeStatus(current.id, 'dislike');
    setIndex((i) => Math.min(Math.max(oppList.length - 1, 0), i + 1));
  };
  const handleThisLike = () => {
    if (current) {
      like(current.id);
      sendLikeStatus(current.id, 'like');
    }
    setIndex((i) => Math.min(Math.max(oppList.length - 1, 0), i + 1));
  };

  return { like, undo, remove, handleLikes, handleThisLike, setIndex };
}
