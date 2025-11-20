import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionBar } from '../../components/organisms/ActionBar';
import { SwipeCard } from '../../components/organisms/SwipeCard';
import { useLikes } from '../../context/likes';
import { opponents } from '../../data/opponents';

export default function Main() {
  const [index, setIndex] = useState(0);
  const { like, undo } = useLikes();

  const current = opponents[index];

  const handleLeft = () => setIndex((i) => Math.min(opponents.length - 1, i + 1));
  const handleRight = () => {
    if (current) like(current.id);
    setIndex((i) => Math.min(opponents.length - 1, i + 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {current ? (
          <SwipeCard opponent={current} />
        ) : null}
        <View style={styles.floatingBar}>
          <ActionBar onUndo={undo} onCancel={handleLeft} onLike={handleRight} />
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
