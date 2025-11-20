import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  name: 'replay' | 'close' | 'favorite';
  color?: string;
  background?: string;
  onPress?: () => void;
  size?: number;
};

export function ActionButton({ name, color = '#fff', background = '#222', onPress, size = 64 }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        { backgroundColor: background, width: size, height: size, borderRadius: size / 2, alignSelf: 'center' },
      ]}
      onPress={onPress}
    >
      <MaterialIcons name={name} size={34} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  } as ViewStyle,
});
