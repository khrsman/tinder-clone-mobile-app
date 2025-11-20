import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Opponent } from '../../data/opponents';
import { PhotoIndicator } from '../molecules/PhotoIndicator';

export function StaticCard({ opponent, height }: { opponent: Opponent; height?: number }) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const { width, height: screenH } = useWindowDimensions();
  const overlayHeight = Math.max(150, Math.round(width * 0.22));
  const cardHeight = height ?? screenH;

  return (
    <View style={[styles.card, { height: cardHeight }]}>      
      <Image source={{ uri: opponent.photos[photoIdx] }} style={styles.image} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.9)']}
        locations={[0, 0.6, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        pointerEvents="none"
        style={[styles.overlay, { height: overlayHeight }]}
      />
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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <MaterialIcons name="location-on" size={14} color="#ddd" />
          <Text style={styles.distance}>{opponent.distanceKm} KM Location</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: { width: '100%', height: '100%' },
  overlay: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  topIndicator: { position: 'absolute', top: 8, left: 0, right: 0 },
  info: { position: 'absolute', bottom: 20, left: 16, right: 16, gap: 6 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#b6dfb6', color: '#2a5a2a', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14 },
  name: { color: '#fff', fontSize: 28, fontWeight: '700' },
  verified: { color: '#6bd1ff', fontSize: 20 },
  distance: { color: '#ddd', fontSize: 14 },
});
