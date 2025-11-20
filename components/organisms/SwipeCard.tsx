import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useRecoilValue } from 'recoil';
import { currentOpponentSelector, useCardsActions } from '../../state/recoil';
import { PhotoIndicator } from '../molecules/PhotoIndicator';

export function SwipeCard() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const exited = useSharedValue(false);
  const opponent = useRecoilValue(currentOpponentSelector);
  const { handleLikes, handleThisLike } = useCardsActions();
  const overlayHeight = Math.max(150, Math.round(width * 0.22));

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { rotate: `${rotate.value}deg` }],
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? Math.min(1, Math.abs(translateX.value) / (width * 0.4)) : 0,
    transform: [{ rotate: '-12deg' }],
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? Math.min(1, Math.abs(translateX.value) / (width * 0.4)) : 0,
    transform: [{ rotate: '12deg' }],
  }));

  const pan = Gesture.Pan().minDistance(12)
    .onUpdate((e) => {
      translateX.value = e.translationX;
      rotate.value = translateX.value / 20;
    })
    .onEnd(() => {
      const threshold = width * 0.25;
      if (translateX.value > threshold) {
        exited.value = true;
        translateX.value = withTiming(width, { duration: 220 }, (finished) => {
          if (finished) runOnJS(handleThisLike)();
          translateX.value = 0;
          rotate.value = 0;
          exited.value = false;
        });
      } else if (translateX.value < -threshold) {
        exited.value = true;
        translateX.value = withTiming(-width, { duration: 220 }, (finished) => {
          if (finished) runOnJS(handleLikes)();
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


  useEffect(() => {
    setPhotoIdx(0);
  }, [opponent?.id]);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, style]}>
        {opponent ? (
          <Image source={{ uri: opponent.photos[photoIdx] }} style={styles.image} resizeMode="cover" />
        ) : null}
        <View style={[styles.overlay, { height: overlayHeight }]} />
        <Animated.View style={[styles.like, likeStyle]} pointerEvents="none">
          <Text style={styles.likeText}>LIKE</Text>
        </Animated.View>
        <Animated.View style={[styles.nope, nopeStyle]} pointerEvents="none">
          <Text style={styles.nopeText}>NOPE</Text>
        </Animated.View>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPressIn={(e) => {
            if (!opponent) return;
            const x = e.nativeEvent.locationX;
            if (x > width / 2) {
              setPhotoIdx((p) => (p + 1) % opponent.photos.length);
            } else {
              setPhotoIdx((p) => (p - 1 + opponent.photos.length) % opponent.photos.length);
            }
          }}
        />
        {opponent ? (
          <>
            <View style={styles.topIndicator}>
              <PhotoIndicator count={opponent.photos.length} active={photoIdx} />
            </View>
            <View style={styles.info}>
              <Text style={styles.badge}>{opponent.bio}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.name}>{opponent.name} {opponent.age}</Text>
                {opponent.verified ? <Text style={styles.verified}>✓</Text> : null}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MaterialIcons name="location-on" size={14} color="#ddd" />
                <Text style={styles.distance}>{opponent.distanceKm} KM Location</Text>
              </View>
            </View>
          </>
        ) : null}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    flex: 1,
    marginBottom: 50,
    backgroundColor: '#000',
  },
  image: { width: '100%', height: '100%' },
  overlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, backgroundColor: '#00000066' },
  like: { position: 'absolute', top: 28, left: 16, borderWidth: 8, borderColor: '#0fbf7d', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  likeText: { color: '#0fbf7d', fontSize: 34, fontWeight: '900', letterSpacing: 3 },
  nope: { position: 'absolute', top: 28, right: 16, borderWidth: 8, borderColor: '#ff6b6b', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  nopeText: { color: '#ff6b6b', fontSize: 34, fontWeight: '900', letterSpacing: 3 },
  topIndicator: { position: 'absolute', top: 8, left: 0, right: 0 },
  info: { position: 'absolute', bottom: 20, left: 16, right: 16, gap: 6, marginBottom: 30 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#b6dfb6', color: '#2a5a2a', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14 },
  name: { color: '#fff', fontSize: 28, fontWeight: '700' },
  verified: { color: '#6bd1ff', fontSize: 20 },
  distance: { color: '#ddd', fontSize: 14 },
  link: { color: '#fff', fontSize: 14, textDecorationLine: 'underline' },
});
