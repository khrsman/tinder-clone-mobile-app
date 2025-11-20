import { useState } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Opponent } from '../../data/opponents';
import { PhotoIndicator } from '../molecules/PhotoIndicator';

type Props = {
  opponent: Opponent;
  onSwipeLeft?: (id: string) => void;
  onSwipeRight?: (id: string) => void;
};

export function SwipeCard({ opponent, onSwipeLeft, onSwipeRight }: Props) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const exited = useSharedValue(false);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { rotate: `${rotate.value}deg` }],
  }));

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      rotate.value = translateX.value / 20;
    })
    .onEnd(() => {
      const threshold = width * 0.25;
      if (translateX.value > threshold) {
        exited.value = true;
        translateX.value = withTiming(width, { duration: 220 }, (finished) => {
          if (finished && onSwipeRight) runOnJS(onSwipeRight)(opponent.id);
          translateX.value = 0;
          rotate.value = 0;
          exited.value = false;
        });
      } else if (translateX.value < -threshold) {
        exited.value = true;
        translateX.value = withTiming(-width, { duration: 220 }, (finished) => {
          if (finished && onSwipeLeft) runOnJS(onSwipeLeft)(opponent.id);
          translateX.value = 0;
          rotate.value = 0;
          exited.value = false;
        });
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    })
    .onFinalize(() => {
      if (!exited.value) {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
      exited.value = false;
    });

  const tap = Gesture.Tap().onEnd((e) => {
    // 'worklet';
    // const x = e.x;
    // if (x > width / 2) {
    //   runOnJS(goNext)();
    // } else {
    //   runOnJS(goPrev)();
    // }
  });

  return (
    <GestureDetector gesture={Gesture.Simultaneous(pan, tap)}>
      <Animated.View style={[styles.card, style]}>
        <Image source={{ uri: opponent.photos[photoIdx] }} style={styles.image} resizeMode="cover" />
        <View style={styles.overlay} />
         {/* <Pressable
        style={StyleSheet.absoluteFill}
        onPressIn={(e) => {
          const x = e.nativeEvent.locationX;
          if (x > width / 2) {
            setPhotoIdx((p) => (p + 1) % opponent.photos.length);
          } else {
            setPhotoIdx((p) => (p - 1 + opponent.photos.length) % opponent.photos.length);
          }
        }}
      /> */}
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
    </GestureDetector>
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
