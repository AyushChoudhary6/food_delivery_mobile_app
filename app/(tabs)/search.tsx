import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: '1', name: 'Pizza', icon: 'pizza-outline' as const },
    { id: '2', name: 'Burger', icon: 'fast-food-outline' as const },
    { id: '3', name: 'Sushi', icon: 'water-outline' as const },
    { id: '4', name: 'Chinese', icon: 'leaf-outline' as const },
    { id: '5', name: 'Dessert', icon: 'cupcake-outline' as const },
    { id: '6', name: 'Drinks', icon: 'beer-outline' as const },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header */}
        <View style={{ backgroundColor: '#fff', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#eee', marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 15 }}>
            Search
          </Text>

          {/* Search input */}
          <View
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              placeholder="Search restaurants or food..."
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              placeholderTextColor="#999"
              style={{
                flex: 1,
                fontSize: 14,
                color: '#1a1a1a',
              }}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 }}>
            Categories
          </Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  paddingVertical: 20,
                  width: '32%',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Ionicons name={item.icon as any} size={32} color="#FF6B35" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#1a1a1a',
                    marginTop: 8,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Recent Searches */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 }}>
            Recent Searches
          </Text>
          <FlatList
            data={[
              'Margherita Pizza',
              'Chicken Burger',
              'California Rolls',
              'Vegetarian',
              'Fast Delivery',
            ]}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                  marginBottom: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Ionicons name="time-outline" size={18} color="#999" />
                  <Text style={{ fontSize: 14, color: '#1a1a1a' }}>
                    {item}
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={16} color="#ccc" />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
