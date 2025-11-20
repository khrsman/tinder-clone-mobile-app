import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Opponent } from '../../data/opponents';
import { PhotoIndicator } from '../molecules/PhotoIndicator';

type Props = {
  opponent: Opponent;
  onSwipeLeft?: (id: string) => void;
  onSwipeRight?: (id: string) => void;
};

export function SwipeCard({ opponent, onSwipeLeft, onSwipeRight }: Props) {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const { width } = useWindowDimensions();

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { rotate: `${rotate.value}deg` }],
  }));

  const handleRelease = () => {
    if (translateX.value > 120) {
      if (onSwipeRight) runOnJS(onSwipeRight)(opponent.id);
    } else if (translateX.value < -120) {
      if (onSwipeLeft) runOnJS(onSwipeLeft)(opponent.id);
    } else {
      translateX.value = withSpring(0);
      rotate.value = withSpring(0);
    }
  };

  return (
    <Animated.View style={[styles.card, style]}
      onTouchMove={(e) => {
        const dx = e.nativeEvent.pageX - e.nativeEvent.locationX;
        translateX.value = dx / 4;
        rotate.value = translateX.value / 20;
      }}
      onTouchEnd={handleRelease}
    >
      <Image source={{ uri: opponent.photos[photoIdx] }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />
      <Pressable
        style={StyleSheet.absoluteFill}
        onPressIn={(e) => {
          const x = e.nativeEvent.locationX;
          if (x > width / 2) {
            setPhotoIdx((p) => (p + 1) % opponent.photos.length);
          } else {
            setPhotoIdx((p) => (p - 1 + opponent.photos.length) % opponent.photos.length);
          }
        }}
      />
      <View style={styles.topIndicator}>
        <PhotoIndicator count={opponent.photos.length} active={photoIdx} />
      </View>
      <View style={styles.info}>
        <Text style={styles.badge}>{opponent.bio}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={styles.name}>{opponent.name} {opponent.age}</Text>
          {opponent.verified ? <Text style={styles.verified}>✓</Text> : null}
        </View>
        <Text style={styles.distance}>• {opponent.distanceKm} KM Location</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    flex: 1,
    minHeight: 750,
    backgroundColor: '#000',
  },
  image: { width: '100%', height: '100%' },
  overlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, backgroundColor: '#00000066' },
  topIndicator: { position: 'absolute', top: 8, left: 0, right: 0 },
  info: { position: 'absolute', bottom: 20, left: 16, right: 16, gap: 6 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#b6dfb6', color: '#2a5a2a', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14 },
  name: { color: '#fff', fontSize: 28, fontWeight: '700' },
  verified: { color: '#6bd1ff', fontSize: 20 },
  distance: { color: '#ddd', fontSize: 14 },
  link: { color: '#fff', fontSize: 14, textDecorationLine: 'underline' },
});
