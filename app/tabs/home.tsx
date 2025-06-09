// ✅ Perbaikan utama:
// Ganti ScrollView utama karena FlatList tidak boleh nested di dalam ScrollView dengan orientasi sama
// Solusi: pindahkan header + chip ke ListHeaderComponent milik FlatList

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { fetchMenuItems, MenuItem } from '../../utils/api'; // pastikan path benar

export default function HomeScreen() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await fetchMenuItems();
      setItems(data);
      const unique = Array.from(new Set(data.map((item) => item.category.title)));
      setCategories(unique);
      setSelected(unique[0]);
    };
    load();
  }, []);

  const filtered = items.filter(
    (i) =>
      (!selected || i.category.title === selected) &&
      i.title.toLowerCase().includes(query.toLowerCase())
  );

  const renderHeader = () => (
    <View>
      <View style={styles.heroContainer}>
        <View>
          <Image
            source={require('../../assets/logo.png')}
            style={{ width: 80, height: 80, resizeMode: 'contain' }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>Little Lemon</Text>
          <Text style={styles.heroSubtitle}>Chicago</Text>
          <Text style={styles.heroDesc}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes
            served with a modern twist.
          </Text>
        </View>
        <Image
          source={require('../../assets/hero.jpg')}
          style={{ width: 100, height: 100, borderRadius: 12 }}
        />
      </View>

      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search menu"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.sectionTitle}>ORDER FOR DELIVERY!</Text>

        <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc} numberOfLines={2}>
                {`The famous ${item.title.toLowerCase()} of our Chicago branch.`}
              </Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <Image
              source={{ uri: `https://source.unsplash.com/100x100/?${item.title}` }}
              style={styles.itemImage}
            />
          </View>
        )}
      />
    </View>
  );

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>
          <Image
            source={{ uri: `https://source.unsplash.com/100x100/?${item.title}` }}
            style={styles.itemImage}
          />
        </View>
      )}
      ListHeaderComponent={renderHeader}
    />
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#495E57',
    alignItems: 'center',
    gap: 12,
  },
  heroTitle: {
    fontSize: 28,
    color: '#F4CE14',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  heroDesc: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  chipScroll: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ccc',
    borderRadius: 20,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#495E57',
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
   separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },
    itemDesc: {
    color: '#555',
    fontSize: 13,
  },
});
