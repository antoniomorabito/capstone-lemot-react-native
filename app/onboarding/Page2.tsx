import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface Page2Props {
  onNext: () => void;
}

// export default function Page2({ onNext }: Page2Props)
export default function Page2({onNext} :Page2Props) {
  return(
    <View style={styles.container}>
      <Image source={require('../../assets/hero.jpg')} style={styles.hero} />
      <Text style={styles.title}>Why Choose Little Lemon?</Text>
      <Text style={styles.description}>
        We provide an authentic Mediterranean dining experience with fast service,
        cozy atmosphere, and delicious healthy food. Perfect for families, friends,
        and food lovers.
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
  hero: {
    width: 200,
    height: 200,
    marginBottom: 24,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 12,
    textAlign: 'center',
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
