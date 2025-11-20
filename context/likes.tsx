import { createContext, useContext, useState, PropsWithChildren } from 'react';

type LikeContextType = {
  likedIds: string[];
  like: (id: string) => void;
  undo: () => void;
  remove: (id: string) => void;
};

const LikesContext = createContext<LikeContextType | undefined>(undefined);

export function LikesProvider({ children }: PropsWithChildren) {
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const like = (id: string) => setLikedIds((prev) => [...prev, id]);
  const undo = () => setLikedIds((prev) => prev.slice(0, -1));
  const remove = (id: string) => setLikedIds((prev) => prev.filter((x) => x !== id));

  return (
    <LikesContext.Provider value={{ likedIds, like, undo, remove }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error('useLikes must be used within LikesProvider');
  return ctx;
}
