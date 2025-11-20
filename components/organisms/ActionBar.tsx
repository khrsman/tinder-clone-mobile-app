import { View, StyleSheet } from 'react-native';
import { ActionButton } from '../atoms/ActionButton';

export function ActionBar({ onUndo, onCancel, onLike }: { onUndo: () => void; onCancel: () => void; onLike: () => void }) {
  return (
    <View style={styles.row}>
      <ActionButton name="replay" background="#f0f0f0" color="#444" onPress={onUndo} />
      <ActionButton name="close" background="#333" color="#fff" onPress={onCancel} />
      <ActionButton name="favorite" background="#0fbf7d" color="#fff" onPress={onLike} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 32, paddingVertical: 16, gap: 18 },
});
