import { images } from '@/constants';
import { Slot } from 'expo-router';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

export default function AuthLayout() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.scrollviewContent}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={[styles.viewContent, { height: Dimensions.get('screen').height / 2.25 }]} >
          <ImageBackground  source={images.loginGraphic} style={styles.imagebackgroundContent} />
          <Image source={images.logo} style={styles.logo} />
        </View>

      </ScrollView>
      <Slot />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollviewContent:{
    backgroundColor: '#fff',
    height: '100%',
  },
  viewContent:{
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imagebackgroundContent:{
    width: '100%',
    borderRadius: 30,
    resizeMode: 'stretch',    
  },
  logo:{
    alignSelf:'center',
    size: '48px',
    position: 'absolute',
    bottom: -24,
    zIndex: 10,
  }

})