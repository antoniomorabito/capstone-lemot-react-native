import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { saveProfile } from '../../utils/storage';

export default function Page3Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (name && email.includes('@')) {
      await saveProfile({ name, email });
      router.replace('/home');
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid name and email.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Logo Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>LITTLE LEMON</Text>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.title}>Little Lemon</Text>
          <Text style={styles.subtitle}>Chicago</Text>
          <Text style={styles.description}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served
            with a modern twist.
          </Text>
        </View>
        <Image
          source={require('../../assets/hero.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.button} onTouchEnd={handleSubmit}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495E57',
  },
  heroSection: {
    flexDirection: 'row',
    backgroundColor: '#495E57',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4CE14',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 4,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#fff',
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  form: {
    padding: 24,
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#495E57',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
