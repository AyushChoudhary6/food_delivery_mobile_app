import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Success = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
    }).start();
  }, []);

  const handleGoHome = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
        {/* Animated checkmark circle */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            marginBottom: 40,
          }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: '#FF6B35',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="checkmark" size={60} color="#fff" />
          </View>
        </Animated.View>

        {/* Success message */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          Login Successful
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: '#999',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          You're all set to continue where you left off
        </Text>

        {/* Go to homepage button */}
        <TouchableOpacity
          onPress={handleGoHome}
          style={{
            width: '100%',
            backgroundColor: '#FF6B35',
            paddingVertical: 14,
            borderRadius: 25,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Go to Homepage</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Success;
