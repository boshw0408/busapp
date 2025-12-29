import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';

const ROUTE_FRAME = {
  159: '#FF5A5A', // Red
  166: '#B985C8', // Purple
  165: '#66B85F', // Green
  128: '#9E9E9E', // Gray
};

// ✅ Segment bar colors matched to your screenshots
const ROUTE_SEGMENTS = {
  159: ['#DE509A', '#39B9C0', '#58EDC7'], // Red screenshot (pink / teal / mint)
  166: ['#69DE79', '#5CBB50', '#363CB3'], // Purple screenshot (green / green / blue)
  128: ['#8CE737', '#6B7CC1', '#46D740'], // Gray screenshot (lime / blue / green)
};

// Fallback for routes you haven't provided a segment screenshot for (e.g. 165)
const DEFAULT_SEGMENTS = ['#A7F3C5', '#7E57C2', '#5C38FF'];

const { width: W } = Dimensions.get('window');
const BASE_W = 430;
const s = (n) => Math.round((n * W) / BASE_W);

export default function TicketPage({ route = 165, onBack }) {
  const TOTAL = 3600;
  const [timeRemaining, setTimeRemaining] = useState(TOTAL);

  const frameColor = ROUTE_FRAME[route] || ROUTE_FRAME[159];

  // ✅ Always show segments (blink) for all buses
  const showSegments = true;

  // HARD BLINK (no fade): true/false toggle every 500ms
  const [segVisible, setSegVisible] = useState(true);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Blink segment bar every 0.5s
  useEffect(() => {
    if (!showSegments) return;

    setSegVisible(true);

    const id = setInterval(() => {
      setSegVisible((v) => !v);
    }, 500);

    return () => clearInterval(id);
  }, [showSegments]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const timePct = useMemo(() => {
    const pct = (TOTAL - timeRemaining) / TOTAL;
    return Math.min(1, Math.max(0, pct));
  }, [timeRemaining]);

  // Screenshot-based sizing
  const cardMargin = Math.round(W * 0.058);
  const qrOuterSize = Math.round(W * 0.418);
  const qrInnerSize = Math.round(W * 0.349);

  // Segment colors per route (fallback to default for 165 if you want)
  const segColors = ROUTE_SEGMENTS[route] || DEFAULT_SEGMENTS;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.blueTopBg} />

      <View style={styles.foreground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>One Way Ticket</Text>

          <View style={styles.headerRightSpacer} />
        </View>

        <View style={[styles.ticketCard, { marginHorizontal: cardMargin }]}>
          <View style={styles.ticketContent}>
            <View style={styles.topSection}>
              <View
                style={[
                  styles.qrOuter,
                  {
                    width: qrOuterSize,
                    height: qrOuterSize,
                    backgroundColor: frameColor,
                  },
                ]}
              >
                <View
                  style={[
                    styles.qrInner,
                    { width: qrInnerSize, height: qrInnerSize },
                  ]}
                >
                  <Image
                    source={require('../assets/QR.png')}
                    style={styles.qrImage}
                  />
                </View>
              </View>

              <Text style={styles.tapText}>Tap to enlarge</Text>
              <View style={styles.dashedLine} />

              <Text style={styles.interstateText}>INTERSTATE</Text>
              <Text style={styles.zoneNumber}>2</Text>
              <Text style={styles.zoneRideText}>ZONE RIDE</Text>
              <Text style={styles.adultText}>1 Adult</Text>
            </View>

            <View style={styles.bottomSection}>
              {showSegments && segVisible && (
                <View style={styles.segmentBar}>
                  <View style={[styles.seg, { width: '33%', backgroundColor: segColors[0] }]} />
                  <View style={[styles.seg, { width: '34%', backgroundColor: segColors[1] }]} />
                  <View style={[styles.seg, { width: '33%', backgroundColor: segColors[2] }]} />
                </View>
              )}

              <View style={styles.thinTrack}>
                <View style={[styles.thinFill, { width: `${timePct * 100}%` }]} />
              </View>

              <Text style={styles.expiresText}>
                Expires in {formatTime(timeRemaining)}
              </Text>

              <TouchableOpacity style={styles.instructionsButton}>
                <Text style={styles.instructionsText}>
                  View Onboard Validator Instructions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E9E9E9',
  },

  blueTopBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: s(340),
    backgroundColor: '#1E88E5',
    borderRadius: 10,
  },

  foreground: {
    flex: 1,
    marginTop: -s(18),
  },

  header: {
    height: s(58),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(14),
    justifyContent: 'space-between',
  },
  backButton: {
    width: s(44),
    height: s(44),
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: s(34),
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: s(34),
  },
  headerTitle: {
    fontSize: s(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerRightSpacer: {
    width: s(44),
    height: s(44),
  },

  ticketCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: s(14),
    borderRadius: s(18),

    paddingHorizontal: s(18),
    paddingTop: s(20),

    shadowColor: '#000',
    shadowOffset: { width: 0, height: s(12) },
    shadowOpacity: 0.3,
    shadowRadius: s(5),
    elevation: 8,
  },

  ticketContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: s(12),
  },

  qrOuter: {
    borderRadius: s(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrInner: {
    backgroundColor: '#FFFFFF',
    borderRadius: s(6),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  qrImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    // transform: [{ scale: 1.12 }],
  },

  tapText: {
    fontSize: s(13),
    color: '#6F6F6F',
  },

  dashedLine: {
    width: '92%',
    borderTopWidth: s(2),
    borderColor: '#D9D2EE',
    borderStyle: 'dashed',
    marginBottom: s(8),
  },

  interstateText: {
    fontSize: s(36),
    fontWeight: '700',
    color: '#FF0000',
    letterSpacing: 1,
  },
  zoneNumber: {
    fontSize: s(56),
    fontWeight: '800',
    color: '#000',
  },
  zoneRideText: {
    fontSize: s(20),
    fontWeight: '600',
    color: '#000',
    marginTop: s(2),
    letterSpacing: 0.5,
  },
  adultText: {
    fontSize: s(20),
    fontWeight: '600',
    color: '#000',
    marginTop: s(8),
  },

  bottomSection: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: s(18),
  },

  segmentBar: {
    width: '92%',
    height: s(18),
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: s(10),
  },
  seg: { height: '100%' },

  thinTrack: {
    width: '92%',
    height: s(6),
    borderRadius: s(3),
    backgroundColor: '#DADADA',
    overflow: 'hidden',
  },
  thinFill: {
    height: '100%',
    backgroundColor: '#1E88E5',
  },

  expiresText: {
    fontSize: s(22),
    fontWeight: '600',
    color: '#000',
    marginTop: s(18),
    textAlign: 'center',
  },

  instructionsButton: {
    marginTop: s(10),
    paddingVertical: s(6),
  },
  instructionsText: {
    fontSize: s(12),
    color: '#000',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
