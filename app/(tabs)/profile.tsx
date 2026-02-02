import { account } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Models } from 'react-native-appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      checkAuth();
    }, [])
  );

  const checkAuth = async () => {
    try {
      setLoading(true);
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      console.log('Not logged in:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await account.deleteSession('current');
            setUser(null);
          } catch (error) {
            Alert.alert('Error', 'Failed to logout');
          }
        },
      },
    ]);
  };

  const handleLogin = () => {
    router.push('/(auth)/signin');
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['top', 'left', 'right', 'bottom']}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FF6B35" />
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['top', 'left', 'right', 'bottom']}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Ionicons name="person-circle-outline" size={100} color="#ccc" />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20, color: '#1a1a1a' }}>
            Profile
          </Text>
          <Text style={{ fontSize: 16, color: '#666', marginTop: 10, textAlign: 'center', marginBottom: 30 }}>
            Log in to view your profile, orders, and saved addresses
          </Text>
          
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: '#FF6B35',
              paddingVertical: 15,
              paddingHorizontal: 40,
              borderRadius: 25,
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
              Log In / Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header */}
        <View style={{ backgroundColor: '#fff', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1a1a1a' }}>
            Profile
          </Text>
        </View>

        {/* User Info Card */}
        {user && (
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 15,
                padding: 20,
                alignItems: 'center',
              }}
            >
              {/* Avatar */}
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: '#FF6B35',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 15,
                }}
              >
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff' }}>
                  {initials}
                </Text>
              </View>

              {/* Name */}
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 5 }}>
                {user.name}
              </Text>

              {/* Email */}
              <Text style={{ fontSize: 14, color: '#999', marginBottom: 15 }}>
                {user.email}
              </Text>

              {/* Edit Profile Button */}
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: '#FF6B35',
                  paddingVertical: 12,
                  borderRadius: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: '#f0f0f0',
                  paddingVertical: 12,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#666' }}>
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Menu Items */}
        <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 10 }}>
            ACCOUNT
          </Text>

          <MenuItemCard icon="receipt" label="My Orders" />
          <MenuItemCard icon="bookmark" label="Saved Addresses" />
          <MenuItemCard icon="heart" label="Favorite Restaurants" />
          <MenuItemCard icon="card" label="Saved Payment Methods" />
        </View>

        {/* Support */}
        <View style={{ marginTop: 25, paddingHorizontal: 20, marginBottom: 25 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 10 }}>
            SUPPORT
          </Text>

          <MenuItemCard icon="help-circle" label="Help & Support" />
          <MenuItemCard icon="document-text" label="Terms & Conditions" />
          <MenuItemCard icon="shield" label="Privacy Policy" />
        </View>

        {/* Logout Button */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: '#ff4444',
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Ionicons name="log-out" size={18} color="#fff" />
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItemCard = ({ icon, label }: { icon: any; label: string }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
        <View style={{ backgroundColor: '#f5f5f5', borderRadius: 10, padding: 10 }}>
          <Ionicons name={icon} size={22} color="#FF6B35" />
        </View>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#1a1a1a' }}>
          {label}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );
};

export default Profile;
