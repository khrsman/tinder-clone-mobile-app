import { TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  name: 'replay' | 'close' | 'favorite';
  color?: string;
  background?: string;
  onPress?: () => void;
};

export function ActionButton({ name, color = '#fff', background = '#222', onPress }: Props) {
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: background }]} onPress={onPress}>
      <MaterialIcons name={name} size={28} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  } as ViewStyle,
});
