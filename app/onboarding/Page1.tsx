import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';


interface Page1Props {
  onNext: () => void;
}


export default function Page1({ onNext }: Page1Props) {
  return (
  <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>What is Little Lemon?</Text>
      <Text style={styles.description}>
        Little Lemon is a family-owned Mediterranean restaurant in Chicago.
        We bring traditional recipes with a modern twist, using fresh ingredients
        to deliver a delightful experience.
      </Text>
      <Pressable style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>NEXT</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
   button: {
    backgroundColor: '#495E57',
    padding: 12,
    borderRadius: 6,
    marginTop: 24,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
