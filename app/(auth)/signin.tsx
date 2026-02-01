import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const signin = () => {
  return (
    <View>
      <Text>signin</Text>
      <Button title='Signin' onPress={() => router.push("/signin")}></Button>
    </View>
  )
}

export default signin