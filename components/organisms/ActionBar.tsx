import { StyleSheet, View } from 'react-native';
import { ActionButton } from '../atoms/ActionButton';

export function ActionBar({ onUndo, onCancel, onLike }: { onUndo: () => void; onCancel: () => void; onLike: () => void }) {
  return (
    <View style={styles.row}>
      <ActionButton name="replay" background="#FEFEFE" color="#444" onPress={onUndo} size={36} />
      <ActionButton name="close" background="#FEFEFE" color="#FE5664" onPress={onCancel} size={64} />
      <ActionButton name="favorite" background="#FEFEFE" color="#0fbf7d" onPress={onLike} size={64} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 32, gap: 18 },
});
