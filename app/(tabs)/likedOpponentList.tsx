import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { StaticCard } from '../../components/organisms/StaticCard';
import { Opponent, opponents } from '../../data/opponents';
import { likedIdsAtom } from '../../state/recoil';


export default function LikedOpponentScreen() {
  const likedIds = useRecoilValue(likedIdsAtom);
  const liked = opponents.filter((o) => likedIds.includes(o.id));
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width - 32, 520);
  const cardHeight = Math.round(width * 1.6);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
    <View style={[styles.container, { width: contentWidth, alignSelf: 'center' }]}>
      {liked.length > 0 ? (
        liked.map((op: Opponent) => (
          <View key={op.id} style={styles.cardContainer}>
            <StaticCard opponent={op} height={cardHeight} />
          </View>
        ))
      ) : (
        <View style={styles.emptyBox} />
      )}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f5f5f7' },
  container: { flex: 1, padding: 16, gap: 16 },
  cardContainer: { flex: 1, borderRadius: 16, overflow: 'hidden' },
  emptyBox: { flex: 1 },
});
