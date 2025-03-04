import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import TestImage1 from './TestImages/TestImage1.png';
import TestImage2 from './TestImages/TestImage2.png';
import TestImage3 from './TestImages/TestImage3.png';
import TestImage4 from './TestImages/TestImage4.png';
import TestImage5 from './TestImages/TestImage5.png';
import TestImage6 from './TestImages/TestImage6.png';
import TestImage7 from './TestImages/TestImage7.png';
import TestImage8 from './TestImages/TestImage8.png';
import TestImage9 from './TestImages/TestImage9.png';
import TestImage10 from './TestImages/TestImage10.png';
import TestImage11 from './TestImages/TestImage11.png';
import TestImage12 from './TestImages/TestImage12.png';
import TestImage13 from './TestImages/TestImage13.png';
import TestImage14 from './TestImages/TestImage14.png';
import TestImage15 from './TestImages/TestImage15.png';
import TestImage16 from './TestImages/TestImage16.png';
import TestImage17 from './TestImages/TestImage17.png';
import TestImage18 from './TestImages/TestImage18.png';
import TestImage19 from './TestImages/TestImage19.png';
import TestImage20 from './TestImages/TestImage20.png';
import TestImage21 from './TestImages/TestImage21.png';
import TestImage22 from './TestImages/TestImage22.png';
import TestImage23 from './TestImages/TestImage23.png';
import TestImage24 from './TestImages/TestImage24.png';
import TestImage25 from './TestImages/TestImage25.png';
import TestImage26 from './TestImages/TestImage26.png';
import TestImage27 from './TestImages/TestImage27.png';
import TestImage28 from './TestImages/TestImage28.png';
import TestImage29 from './TestImages/TestImage29.png';
import TestImage30 from './TestImages/TestImage30.png';
import TestImage31 from './TestImages/TestImage31.png';
import TestImage32 from './TestImages/TestImage32.png';
import TestImage33 from './TestImages/TestImage33.png';
import TestImage34 from './TestImages/TestImage34.png';
import TestImage35 from './TestImages/TestImage35.png';
import TestImage36 from './TestImages/TestImage36.png';
import TestImage37 from './TestImages/TestImage37.png';
import TestImage38 from './TestImages/TestImage38.png';
import TestImage39 from './TestImages/TestImage39.png';
import TestImage40 from './TestImages/TestImage40.png';
import TestImage41 from './TestImages/TestImage41.png';
import TestImage42 from './TestImages/TestImage42.png';
import TestImage43 from './TestImages/TestImage43.png';
import TestImage44 from './TestImages/TestImage44.png';
import TestImage45 from './TestImages/TestImage45.png';
import TestImage46 from './TestImages/TestImage46.png';
import TestImage47 from './TestImages/TestImage47.png';
import TestImage48 from './TestImages/TestImage48.png';
import TestImage49 from './TestImages/TestImage49.png';
import TestImage50 from './TestImages/TestImage50.png';

const images = [
  TestImage1, TestImage2, TestImage3, TestImage4, TestImage5,
  TestImage6, TestImage7, TestImage8, TestImage9, TestImage10,
  TestImage11, TestImage12, TestImage13, TestImage14, TestImage15,
  TestImage16, TestImage17, TestImage18, TestImage19, TestImage20,
  TestImage21, TestImage22, TestImage23, TestImage24, TestImage25,
  TestImage26, TestImage27, TestImage28, TestImage29, TestImage30,
  TestImage31, TestImage32, TestImage33, TestImage34, TestImage35,
  TestImage36, TestImage37, TestImage38, TestImage39, TestImage40,
  TestImage41, TestImage42, TestImage43, TestImage44, TestImage45,
  TestImage46, TestImage47, TestImage48, TestImage49, TestImage50,
];

const Review = () => {
  const imageElements = images.map((image, i) => (
    <Image
      key={i}
      source={image}
      style={styles.image}
      resizeMode="cover"
    />
  ));

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Review</Text>
        {imageElements}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    margin: 10,
    borderRadius: 10,
  },
});
export default Review;
