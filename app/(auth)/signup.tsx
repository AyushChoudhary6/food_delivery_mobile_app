import { account } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await account.create('unique()', email, password, firstName + ' ' + lastName);
      await account.createEmailPasswordSession(email, password);
      router.push('/(tabs)');
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a1a1a' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ position: 'relative', height: 250, marginBottom: 20 }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#2a2a2a',
            }}
          >
            <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#fff', padding: 20 }}>
              Create Account
            </Text>
            <Text style={{ fontSize: 14, color: '#ccc', paddingHorizontal: 20 }}>
              Join us and start ordering delicious food
            </Text>
          </View>

          {/* Logo */}
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              backgroundColor: '#FF6B35',
              borderRadius: 30,
              width: 60,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="fast-food" size={32} color="#fff" />
          </View>
        </View>

        {/* Form */}
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          {/* First Name input */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>First Name</Text>
            <TextInput
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#999"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#e0e0e0',
                paddingVertical: 12,
                fontSize: 14,
                color: '#1a1a1a',
              }}
            />
          </View>

          {/* Last Name input */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Last Name</Text>
            <TextInput
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#999"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#e0e0e0',
                paddingVertical: 12,
                fontSize: 14,
                color: '#1a1a1a',
              }}
            />
          </View>

          {/* Email input */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Email address</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#999"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#e0e0e0',
                paddingVertical: 12,
                fontSize: 14,
                color: '#1a1a1a',
              }}
            />
          </View>

          {/* Password input */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#999"
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: '#e0e0e0',
                  paddingVertical: 12,
                  fontSize: 14,
                  color: '#1a1a1a',
                }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password input */}
          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Confirm Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#999"
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: '#e0e0e0',
                  paddingVertical: 12,
                  fontSize: 14,
                  color: '#1a1a1a',
                }}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={loading}
            style={{
              backgroundColor: '#FF6B35',
              paddingVertical: 14,
              borderRadius: 25,
              alignItems: 'center',
              marginBottom: 20,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Sign Up</Text>
            )}
          </TouchableOpacity>

          {/* Login link */}
          <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 13, color: '#666' }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signin')}>
              <Text style={{ fontSize: 13, color: '#FF6B35', fontWeight: '600' }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;