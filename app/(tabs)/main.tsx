import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionBar } from '../../components/organisms/ActionBar';

import { useLikes } from '../../context/likes';
import { opponents } from '../../data/opponents';


export default function Main() {
  const [index, setIndex] = useState(0);
  const { like, undo } = useLikes();

  const current = opponents[index];

  const handleLeft = () => setIndex((i) => Math.min(opponents.length - 1, i + 1));
  const handleRight = () => {
    like(current.id);
    setIndex((i) => Math.min(opponents.length - 1, i + 1));
  };

  return (
    <View style={styles.container}>
    
      <ActionBar onUndo={undo} onCancel={handleLeft} onLike={handleRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#f5f5f7' },
});
