import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function LandingPage({ onRouteSelect }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Route</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.button166]}
          onPress={() => onRouteSelect(166)}
        >
          <Text style={styles.buttonText}>166</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.button165]}
          onPress={() => onRouteSelect(165)}
        >
          <Text style={styles.buttonText}>165</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.button159]}
          onPress={() => onRouteSelect(159)}
        >
          <Text style={styles.buttonText}>159</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.button128]}
          onPress={() => onRouteSelect(128)}
        >
          <Text style={styles.buttonText}>Gray</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.button128]}
          onPress={() => onRouteSelect(100)}
        >
          <Text style={styles.buttonText}>Yellow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.button128]}
          onPress={() => onRouteSelect(101)}
        >
          <Text style={styles.buttonText}>Pink</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.button128]}
          onPress={() => onRouteSelect(102)}
        >
          <Text style={styles.buttonText}>Blue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E88E5',
    paddingTop: 50,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  button: {
    width: 200,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button166: {
    backgroundColor: '#9C27B0', // Purple
  },
  button165: {
    backgroundColor: '#4CAF50', // Green
  },
  button159: {
    backgroundColor: '#F44336', // Red
  },
  button128: {
    backgroundColor: '#9E9E9E', // Gray
  },
  button100: {
    backgroundColor: '#FFD700', // Gray
  },
  button101: {
    backgroundColor: '#FFC0CB', // Gray
  },
  button102: {
    backgroundColor: '#0000FF', // Gray
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
