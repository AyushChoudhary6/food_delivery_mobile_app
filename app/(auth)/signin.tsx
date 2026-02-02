import { account } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      router.push('/(tabs)');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await account.create('unique()', email, password, firstName + ' ' + lastName);
      await account.createEmailPasswordSession(email, password);
      router.push('/(tabs)');
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header Image Section */}
      <View style={{ height: 280, backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
          }}
          style={{ width: '100%', height: '100%' }}
        />
        {/* Overlay */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
        {/* Logo Badge */}
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: '#FF6B35',
            borderRadius: 30,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#FF6B35',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Ionicons name="fast-food" size={32} color="#fff" />
        </View>
      </View>

      {/* Auth Content */}
      <SafeAreaView style={{ paddingHorizontal: 20, paddingVertical: 28 }} edges={['left', 'right', 'bottom']}>
        {/* Header Text */}
        <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#1a1a1a', marginBottom: 8 }}>
              {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
            </Text>
            <Text style={{ fontSize: 14, color: '#999', fontWeight: '500' }}>
              {activeTab === 'login'
                ? 'Log in to access your orders and favorites'
                : 'Sign up to get started with amazing food delivery'}
            </Text>
          </View>

          {/* Tab buttons */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#f5f5f5',
              borderRadius: 12,
              padding: 6,
              marginBottom: 26,
            }}
          >
            <TouchableOpacity
              onPress={() => setActiveTab('login')}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 10,
                backgroundColor: activeTab === 'login' ? '#FF6B35' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontWeight: '600',
                  color: activeTab === 'login' ? '#fff' : '#999',
                  fontSize: 14,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('signup')}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 10,
                backgroundColor: activeTab === 'signup' ? '#FF6B35' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontWeight: '600',
                  color: activeTab === 'signup' ? '#fff' : '#999',
                  fontSize: 14,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Form */}
          {activeTab === 'login' && (
            <View>
              {/* Email Input */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 }}>
                  Email Address
                </Text>
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#ccc"
                  value={email}
                  onChangeText={setEmail}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    fontSize: 14,
                    color: '#1a1a1a',
                    backgroundColor: '#f9f9f9',
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              {/* Password Input */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 }}>
                  Password
                </Text>
                <View style={{ position: 'relative' }}>
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#ccc"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={{
                      borderWidth: 1,
                      borderColor: '#ddd',
                      borderRadius: 10,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      fontSize: 14,
                      color: '#1a1a1a',
                      backgroundColor: '#f9f9f9',
                      paddingRight: 50,
                    }}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 15,
                      top: 12,
                      padding: 4,
                    }}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleSignIn}
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#FFB388' : '#FF6B35',
                  paddingVertical: 14,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 24,
                  shadowColor: '#FF6B35',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
                    Login
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <View>
              {/* First Name Input */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 }}>
                  First Name
                </Text>
                <TextInput
                  placeholder="Enter your first name"
                  placeholderTextColor="#ccc"
                  value={firstName}
                  onChangeText={setFirstName}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    fontSize: 14,
                    color: '#1a1a1a',
                    backgroundColor: '#f9f9f9',
                  }}
                  editable={!loading}
                />
              </View>

              {/* Last Name Input */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 }}>
                  Last Name
                </Text>
                <TextInput
                  placeholder="Enter your last name"
                  placeholderTextColor="#ccc"
                  value={lastName}
                  onChangeText={setLastName}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    fontSize: 14,
                    color: '#1a1a1a',
                    backgroundColor: '#f9f9f9',
                  }}
                  editable={!loading}
                />
              </View>

              {/* Email Input */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 }}>
                  Email Address
                </Text>
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#ccc"
                  value={email}
                  onChangeText={setEmail}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    fontSize: 14,
                    color: '#1a1a1a',
                    backgroundColor: '#f9f9f9',
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              {/* Password Input */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 }}>
                  Password
                </Text>
                <View style={{ position: 'relative' }}>
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#ccc"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={{
                      borderWidth: 1,
                      borderColor: '#ddd',
                      borderRadius: 10,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      fontSize: 14,
                      color: '#1a1a1a',
                      backgroundColor: '#f9f9f9',
                      paddingRight: 50,
                    }}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 15,
                      top: 12,
                      padding: 4,
                    }}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Signup Button */}
              <TouchableOpacity
                onPress={handleSignUp}
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#FFB388' : '#FF6B35',
                  paddingVertical: 14,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 24,
                  shadowColor: '#FF6B35',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
                    Sign Up
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Privacy Text */}
          <Text
            style={{
              fontSize: 12,
              color: '#999',
              textAlign: 'center',
              marginBottom: 20,
              lineHeight: 18,
            }}
          >
            By signing in, you agree to our{' '}
            <Text style={{ color: '#FF6B35', fontWeight: '600' }}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={{ color: '#FF6B35', fontWeight: '600' }}>
              Privacy Policy
            </Text>
          </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;
