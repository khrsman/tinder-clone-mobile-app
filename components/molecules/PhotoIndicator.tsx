import { View, StyleSheet } from 'react-native';

export function PhotoIndicator({ count, active }: { count: number; active: number }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.dot, i === active ? styles.dotActive : null]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6, alignSelf: 'center', padding: 8 },
  dot: { width: 44, height: 4, borderRadius: 2, backgroundColor: '#ffffff66' },
  dotActive: { backgroundColor: '#ffffff' },
});
