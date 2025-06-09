import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Page1 from './onboarding/Page1';
import Page2 from './onboarding/Page2';
import Page3Form from './onboarding/Page3Form';

const { width, height } = Dimensions.get('window');

export default function OnboardingPager() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < 2) {
      const nextPage = currentPage + 1;
      pagerRef.current?.setPage(nextPage);
      setCurrentPage(nextPage);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        scrollEnabled={false} // Disable swipe if you want button-only navigation
      >
        {[Page1, Page2, Page3Form].map((Component, index) => (
          <View key={`page-${index}`} style={styles.page}>
            <Component onNext={handleNext} />
          </View>
        ))}
      </PagerView>

      {/* Page Indicators */}
      <View style={styles.indicatorContainer}>
        {[0, 1, 2].map((index) => (
          <TouchableOpacity
            key={`indicator-${index}`}
            style={[
              styles.indicator,
              currentPage === index && styles.activeIndicator,
            ]}
            onPress={() => {
              pagerRef.current?.setPage(index);
              setCurrentPage(index);
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width,
    height,
  },
  page: {
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#495E57',
    width: 16,
  },
});
