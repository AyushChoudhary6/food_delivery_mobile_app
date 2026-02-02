import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALL_FOOD_ITEMS, CATEGORIES, FoodItem } from '@/lib/mockData';

const Home = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [activeCategory, setActiveCategory] = useState('Pizza');
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);

  const offers = [
    {
      id: '1',
      title: 'Get 30% off',
      subtitle: 'on all orders above $50',
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=500&fit=crop',
      discount: '30%',
    },
    {
      id: '2',
      title: 'Free delivery',
      subtitle: 'on orders this weekend',
      image:
        'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=800&h=500&fit=crop',
      discount: 'FREE',
    },
    {
      id: '3',
      title: 'Buy 1 Get 1',
      subtitle: 'on selected items',
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop',
      discount: '50%',
    },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    const filtered = ALL_FOOD_ITEMS.filter((item) => item.category === activeCategory);
    setFilteredItems(filtered);
  }, [activeCategory]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header */}
        <Animated.View
          style={{
            backgroundColor: '#fff',
            paddingVertical: 20,
            paddingHorizontal: 20,
            marginBottom: 25,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <View>
              <Text style={{ fontSize: 13, color: '#999', marginBottom: 6, fontWeight: '500' }}>Welcome back</Text>
              <Text style={{ fontSize: 24, fontWeight: '800', color: '#1a1a1a' }}>
                Your Location
              </Text>
            </View>
            <Animated.View
              style={{
                backgroundColor: '#FF6B35',
                borderRadius: 28,
                width: 56,
                height: 56,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#FF6B35',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Ionicons name="fast-food" size={30} color="#fff" />
            </Animated.View>
          </View>

          {/* Search bar */}
          <TouchableOpacity
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: 14,
              paddingHorizontal: 16,
              paddingVertical: 14,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              borderWidth: 1,
              borderColor: '#f0f0f0',
            }}
          >
            <Ionicons name="search" size={20} color="#999" />
            <Text style={{ fontSize: 15, color: '#999', fontWeight: '500' }}>Search restaurants...</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Special Offers */}
        <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a' }}>
              Special Offers
            </Text>
            <View style={{ backgroundColor: '#FFE8DB', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 }}>
              <Text style={{ fontSize: 11, color: '#FF6B35', fontWeight: '700' }}>Limited time</Text>
            </View>
          </View>
          <FlatList
            data={offers}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 18,
                    overflow: 'hidden',
                    marginBottom: 14,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.08,
                    shadowRadius: 10,
                    elevation: 4,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: '100%', height: 220 }}
                  />
                  {/* Discount Badge */}
                  <View
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      backgroundColor: '#FF6B35',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 20,
                      zIndex: 10,
                    }}
                  >
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#fff' }}>
                      {item.discount}
                    </Text>
                  </View>
                  {/* Content Overlay */}
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(26, 26, 26, 0.75)',
                      paddingVertical: 14,
                      paddingHorizontal: 16,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#fff', marginBottom: 4 }}>
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 13, color: '#ddd', fontWeight: '500' }}>
                      {item.subtitle}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            )}
          />
        </View>

        {/* Categories Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 14 }}>
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor: activeCategory === category ? '#FF6B35' : '#fff',
                  borderWidth: activeCategory === category ? 0 : 1,
                  borderColor: '#eee',
                  shadowColor: activeCategory === category ? '#FF6B35' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: activeCategory === category ? 0.3 : 0,
                  shadowRadius: 6,
                  elevation: activeCategory === category ? 3 : 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: activeCategory === category ? '#fff' : '#1a1a1a',
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Food Items Grid */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 14 }}>
            {activeCategory}s ({filteredItems.length})
          </Text>
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', gap: 12 }}
            renderItem={({ item }) => (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                  flex: 1,
                  marginBottom: 12,
                }}
              >
                <TouchableOpacity
                  onPress={() => router.push(`/(tabs)/fooddetail?id=${item.id}`)}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 6,
                    elevation: 2,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: '100%', height: 160 }}
                  />
                  {/* Discount Badge */}
                  <View
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: '#FF6B35',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      zIndex: 10,
                    }}
                  >
                    <Text style={{ fontSize: 10, fontWeight: '700', color: '#fff' }}>
                      ${item.price}
                    </Text>
                  </View>
                  {/* Item Details */}
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#1a1a1a', marginBottom: 4 }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 11, color: '#999', marginBottom: 6, fontWeight: '500' }}>
                      {item.restaurant}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name="star" size={12} color="#FF6B35" />
                        <Text style={{ fontSize: 11, fontWeight: '600', color: '#1a1a1a' }}>
                          {item.rating}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 10, color: '#999' }}>
                        {item.deliveryTime}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
