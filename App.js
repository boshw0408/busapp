import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LandingPage from './components/LandingPage';
import TicketPage from './components/TicketPage';

export default function App() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const handleBack = () => {
    setSelectedRoute(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {selectedRoute ? (
        <TicketPage route={selectedRoute} onBack={handleBack} />
      ) : (
        <LandingPage onRouteSelect={handleRouteSelect} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E88E5',
  },
});

