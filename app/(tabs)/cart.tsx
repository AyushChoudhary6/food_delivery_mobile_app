import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurant: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Margherita Pizza',
      price: 12.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop',
      restaurant: 'Pizza Palace',
    },
    {
      id: '2',
      name: 'Classic Burger',
      price: 8.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop',
      restaurant: 'Burger King',
    },
    {
      id: '3',
      name: 'California Roll',
      price: 14.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&h=300&fit=crop',
      restaurant: 'Sushi Master',
    },
  ]);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const deliveryFee = 3.99;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items before checking out');
      return;
    }
    Alert.alert('Checkout', `Total amount: $${total.toFixed(2)}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Proceed', onPress: () => Alert.alert('Success', 'Order placed successfully!') },
    ]);
  };

  const handleContinueShopping = () => {
    router.push('/(tabs)/index');
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['top', 'left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View
            style={{
              backgroundColor: '#fff',
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}
          >
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1a1a1a' }}>
              My Cart
            </Text>
          </View>

          {/* Empty State */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#f5f5f5',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Ionicons name="bag" size={60} color="#FF6B35" />
            </View>

            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 10 }}>
              Your cart is empty
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: '#999',
                textAlign: 'center',
                marginBottom: 30,
              }}
            >
              Looks like you haven't added anything yet. Start exploring and add your favorite items.
            </Text>

            <TouchableOpacity
              onPress={handleContinueShopping}
              style={{
                backgroundColor: '#FF6B35',
                paddingVertical: 14,
                paddingHorizontal: 40,
                borderRadius: 25,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
                Start Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['top', 'left', 'right', 'bottom']}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#fff',
          paddingVertical: 16,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1a1a1a' }}>
          My Cart
        </Text>
        <Text style={{ fontSize: 12, color: '#999', marginTop: 5 }}>
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 12,
                flexDirection: 'row',
                gap: 12,
              }}
            >
              {/* Item Image */}
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />

              {/* Item Details */}
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#999', marginTop: 3 }}>
                    {item.restaurant}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#FF6B35' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>

                  {/* Quantity Controls */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#f5f5f5',
                      borderRadius: 6,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      gap: 8,
                    }}
                  >
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Ionicons name="remove" size={18} color="#FF6B35" />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '600', color: '#1a1a1a', minWidth: 20, textAlign: 'center' }}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Ionicons name="add" size={18} color="#FF6B35" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Remove Button */}
              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 }}
              >
                <Ionicons name="trash" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            {/* Promo Code */}
            <View style={{ marginBottom: 20 }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Ionicons name="ticket" size={20} color="#FF6B35" />
                <Text style={{ fontSize: 14, color: '#999', flex: 1 }}>
                  Add promo code
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </View>
            </View>

            {/* Bill Details */}
            <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#1a1a1a', marginBottom: 12 }}>
                Order Summary
              </Text>

              <View style={{ gap: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, color: '#666' }}>Subtotal</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' }}>
                    ${subtotal.toFixed(2)}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, color: '#666' }}>Tax (10%)</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' }}>
                    ${tax.toFixed(2)}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, color: '#666' }}>Delivery Fee</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' }}>
                    ${deliveryFee.toFixed(2)}
                  </Text>
                </View>

                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: '#eee',
                    paddingTopVertical: 10,
                    marginTop: 10,
                    paddingTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#1a1a1a' }}>
                    Total
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#FF6B35' }}>
                    ${total.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity
              onPress={handleCheckout}
              style={{
                backgroundColor: '#FF6B35',
                paddingVertical: 16,
                borderRadius: 10,
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>

            {/* Continue Shopping */}
            <TouchableOpacity
              onPress={handleContinueShopping}
              style={{
                backgroundColor: '#f5f5f5',
                paddingVertical: 16,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#FF6B35' }}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Cart;
