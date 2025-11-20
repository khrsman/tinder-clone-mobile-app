import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { ActionBar } from '../../components/organisms/ActionBar';
import { SwipeCard } from '../../components/organisms/SwipeCard';
import { currentOpponentSelector, useCardsActions } from '../../state/recoil';

export default function Main() {
  const current = useRecoilValue(currentOpponentSelector);
  const { handleLikes, handleThisLike, undo } = useCardsActions();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const contentWidth = Math.min(width - 32, 520);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image source={require('../../assets/images/tinderLogo.png')} style={styles.brandLogo} resizeMode="contain" />
        </View>
      </View>
      <View style={[styles.cardContainer, { width: contentWidth, alignSelf: 'center' }]}>
        {current ? <SwipeCard /> : null}
        <View style={[styles.floatingBar, { width: contentWidth, alignSelf: 'center', bottom: insets.bottom + 16 }]}>
          <ActionBar onUndo={undo} onCancel={handleLikes} onLike={handleThisLike} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f7' },
  header: { paddingTop: 8, paddingBottom: 12, alignItems: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandLogo: { width: 120, height: 25, marginVertical: 10 },
  cardContainer: { flex: 1, borderRadius: 16, overflow: 'hidden' },
  floatingBar: { position: 'absolute', left: 0, right: 0 },
});
