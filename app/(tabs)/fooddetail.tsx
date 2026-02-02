import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALL_FOOD_ITEMS } from '@/lib/mockData';

export default function FoodDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);

  const food = ALL_FOOD_ITEMS.find((item) => item.id === id);

  if (!food) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['top', 'left', 'right', 'bottom']}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#999' }}>Food item not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    Alert.alert('Success', `${food.name} x${quantity} added to cart!`, [
      { text: 'Continue Shopping', onPress: () => router.back() },
      { text: 'Go to Cart', onPress: () => router.push('/(tabs)/cart') },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header with Back Button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#fff', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a', flex: 1, textAlign: 'center' }}>
            {food.name}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Food Image */}
        <View style={{ position: 'relative', marginBottom: 24 }}>
          <Image
            source={{ uri: food.image }}
            style={{ width: '100%', height: 300 }}
          />
          {/* Discount Badge */}
          <View
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: '#FF6B35',
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 24,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff' }}>
              ${food.price}
            </Text>
          </View>

          {/* Rating Badge */}
          <View
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              backgroundColor: '#1a1a1a',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Ionicons name="star" size={16} color="#FF6B35" />
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff' }}>
              {food.rating}
            </Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 18,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 }}>
              {food.name}
            </Text>
            <Text style={{ fontSize: 13, color: '#999', marginBottom: 16, fontWeight: '500' }}>
              {food.restaurant}
            </Text>

            <View style={{ borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <Text style={{ fontSize: 14, color: '#666', fontWeight: '500' }}>Category</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' }}>
                  {food.category}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <Text style={{ fontSize: 14, color: '#666', fontWeight: '500' }}>Delivery Time</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="time-outline" size={14} color="#FF6B35" />
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' }}>
                    {food.deliveryTime}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: '#666', fontWeight: '500' }}>Rating</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name="star" size={14} color="#FF6B35" />
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' }}>
                    {food.rating}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#1a1a1a', marginBottom: 12 }}>
            Description
          </Text>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 14,
              padding: 16,
              borderLeftWidth: 4,
              borderLeftColor: '#FF6B35',
            }}
          >
            <Text style={{ fontSize: 14, color: '#666', lineHeight: 22, fontWeight: '500' }}>
              {food.description}
            </Text>
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#1a1a1a', marginBottom: 12 }}>
            Quantity
          </Text>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={{
                backgroundColor: '#f5f5f5',
                width: 44,
                height: 44,
                borderRadius: 22,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="remove" size={20} color="#FF6B35" />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a', minWidth: 40, textAlign: 'center' }}>
              {quantity}
            </Text>

            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={{
                backgroundColor: '#FF6B35',
                width: 44,
                height: 44,
                borderRadius: 22,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Add to Cart Button */}
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            onPress={handleAddToCart}
            style={{
              backgroundColor: '#FF6B35',
              paddingVertical: 16,
              borderRadius: 14,
              alignItems: 'center',
              marginBottom: 12,
              shadowColor: '#FF6B35',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>
              Add to Cart (${(food.price * quantity).toFixed(2)})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: '#f5f5f5',
              paddingVertical: 16,
              borderRadius: 14,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#FF6B35' }}>
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
