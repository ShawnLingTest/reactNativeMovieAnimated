import React from 'react';
import { View, StyleSheet, StatusBar, FlatList, Image, Dimensions, Text } from 'react-native';
import data from './data';


const { width, height } = Dimensions.get("window");

const DOT_SIZE = 40;
const LOGO_HEIGHT = 40;
const LOGO_WIDTH = 200;

const Item = ({ imageUri, heading, description }: any) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={imageUri} style={[styles.itemImage]}/>
      <View style={styles.itemTextContainer}>
        <Text style={[styles.itemTitle]}>{heading}</Text>
        <Text style={[styles.itemDescription]}>{description}</Text>
      </View>
    </View>
  );
}

const Pagination = () => {
  return (
    <View style={styles.pagination}>
      {
        data.map((item) => {
          return (
            <View key={item.key} style={styles.paginationDotContainer}>
              <View style={[styles.paginationDot, { backgroundColor: item.color }]}/>
            </View>
          )
        })
      }
    </View>
  )
}


const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <FlatList
        data={data}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Item {...item}/>}
      />
      <Image
        source={require('./assets/ue_black_logo.png')}
        style={styles.logo}
      />
      <Pagination />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    position: "absolute",
    left: 10,
    bottom: 10,
    resizeMode: "contain",
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    transform: [
      {translateX: -LOGO_WIDTH / 2},
      {translateY: -LOGO_HEIGHT / 2},
      { rotateZ: '-90deg' },
      {translateX: LOGO_WIDTH / 2},
      {translateY: LOGO_HEIGHT / 2}
    ],
  },
  pagination: {
    position: "absolute",
    right: 20,
    bottom: 40,
    flexDirection: "row",
    height: DOT_SIZE,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: "center",
    justifyContent: "center"
  },
  paginationDot: {
    width: DOT_SIZE * .3,
    height: DOT_SIZE * .3,
    borderRadius: DOT_SIZE * .15
  },
  itemContainer: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    width: width * .75,
    height: height * .75,
    resizeMode: "contain",
    // backgroundColor: 'red',
    flex: 1,
  },
  itemTextContainer: {
    flex: .5,
    alignItems: "flex-start",
    alignSelf: "flex-end",
    // backgroundColor: 'red',
  },
  itemTitle: {
    color: '#444',
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 5,
  },
  itemDescription: {
    color: '#ccc',
    fontWeight: '600',
    textAlign: "left",
    width: width * .75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    // backgroundColor: 'red',
  }
})

export default App;
