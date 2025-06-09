import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { deleteProfile, getProfile } from '../../utils/storage';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getProfile();
      if (profile) {
        setName(profile.name);
        setEmail(profile.email);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    await deleteProfile();
    router.replace('/');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Image source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }} style={styles.avatar} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Personal information</Text>

      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }} style={styles.profilePic} />
        <View style={styles.avatarButtons}>
          <Pressable style={styles.changeButton}>
            <Text style={styles.changeText}>Change</Text>
          </Pressable>
          <Pressable style={styles.removeButton}>
            <Text>Remove</Text>
          </Pressable>
        </View>
      </View>

      {/* Form */}
      <Text style={styles.label}>First name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Last name</Text>
      <TextInput style={styles.input} value="Doe" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Phone number</Text>
      <TextInput style={styles.input} value="(217) 555-0113" keyboardType="phone-pad" />

      {/* Notifications */}
      <Text style={styles.sectionTitle}>Email notifications</Text>
      {['Order statuses', 'Password changes', 'Special offers', 'Newsletter'].map((item) => (
        <View key={item} style={styles.switchContainer}>
          <Switch value={isSubscribed} onValueChange={setIsSubscribed} />
          <Text style={{ marginLeft: 8 }}>{item}</Text>
        </View>
      ))}

      {/* Buttons */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>

      <View style={styles.buttonRow}>
        <Pressable style={styles.cancelButton}>
          <Text>Discard changes</Text>
        </Pressable>
        <Pressable style={styles.saveButton}>
          <Text style={styles.saveText}>Save changes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { width: 120, height: 40, resizeMode: 'contain' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 16 },
  avatarSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  profilePic: { width: 60, height: 60, borderRadius: 30 },
  avatarButtons: { marginLeft: 12 },
  changeButton: { backgroundColor: '#495E57', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  changeText: { color: 'white' },
  removeButton: { marginTop: 8 },
  label: { marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  logoutButton: { backgroundColor: '#F4CE14', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 24 },
  logoutText: { fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelButton: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, flex: 1, marginRight: 10, alignItems: 'center' },
  saveButton: { padding: 12, backgroundColor: '#495E57', borderRadius: 6, flex: 1, alignItems: 'center' },
  saveText: { color: 'white', fontWeight: 'bold' },
});
