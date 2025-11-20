import { StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { ActionBar } from '../../components/organisms/ActionBar';
import { SwipeCard } from '../../components/organisms/SwipeCard';
import { currentOpponentSelector, useCardsActions } from '../../state/recoil';

export default function Main() {
  const current = useRecoilValue(currentOpponentSelector);
  const { handleLikes, handleThisLike, undo } = useCardsActions();

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {current ? <SwipeCard /> : null}
        <View style={styles.floatingBar}>
          <ActionBar onUndo={undo} onCancel={handleLikes} onLike={handleThisLike} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f7' },
  cardContainer: { flex: 1, borderRadius: 16, overflow: 'hidden' },
  floatingBar: {  top: -30 },
});
