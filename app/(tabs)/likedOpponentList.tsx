import { Image, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { StaticCard } from '../../components/organisms/StaticCard';
import { Opponent, opponents } from '../../data/opponents';
import { likedIdsAtom } from '../../state/recoil';

export default function Main() {
const likedIds = useRecoilValue(likedIdsAtom);
const liked = opponents.filter((o) => likedIds.includes(o.id));
const { width } = useWindowDimensions();
const contentWidth = Math.min(width - 32, 520);   
const cardHeight = Math.round(width * 1.6);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image source={require('../../assets/images/tinderLogo.png')} style={styles.brandLogo} resizeMode="contain" />
        </View>
      </View>
          <ScrollView contentContainerStyle={[styles.scrollContent, { width: contentWidth, alignSelf: 'center' }]}>        
         {liked.length > 0 ? (
           liked.map((op: Opponent) => (
            <View key={op.id} style={styles.cardContainer}>           
                <StaticCard opponent={op} height={cardHeight} />
             </View>
          ))
         ) : (
           <View style={styles.emptyBox} />
         )}
       </ScrollView>
     
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
  scrollContent: { padding: 16, gap: 16 },
  emptyBox: { flex: 1 },
});
