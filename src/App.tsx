import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Animated,
  ImageSourcePropType
} from 'react-native';
import data from './data';


const { width, height } = Dimensions.get("window");

const DOT_SIZE = 40;
const LOGO_HEIGHT = 40;
const LOGO_WIDTH = 200;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * .6;

interface ItemProps {
  imageUri: ImageSourcePropType;
  heading: string;
  description: string;
  index: number;
  scrollX: Animated.Value;
}

const Item = ({ imageUri, heading, description, index, scrollX }: ItemProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [(index - .3) * width, index * width, (index + .3) * width];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [.3, 1, .3],
  });
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * .3, 0, -width * .3],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * .6, 0, -width * .6]
  })
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0]
  })

  return (
    <View style={styles.itemContainer}>
      <Animated.Image source={imageUri} style={[styles.itemImage, { transform: [{ scale }] }]}/>
      <View style={styles.itemTextContainer}>
        <Animated.Text style={[styles.itemTitle, { opacity, transform: [{ translateX: translateXHeading }] }]}>{heading}</Animated.Text>
        <Animated.Text style={[styles.itemDescription, { opacity, transform: [{ translateX: translateXDescription }] }]}>{description}</Animated.Text>
      </View>
    </View>
  );
}

const Circle = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {
        data.map(({ color }, index) => {
          const inputRange = [(index -.5) * width, index * width, (index + .5) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [.4, 1, .4],
            extrapolate: "clamp"
          })
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, .2, 0],
          })
          return (
            <Animated.View
              key={`circle${index}`}
              style={[
                styles.circleItem,
                { backgroundColor: color },
                {
                  opacity,
                  transform: [{ scale }]
                }
                ]}
            />
          )
        })
      }
    </View>
  )
}

const Ticker = ({ scrollX }: { scrollX: Animated.Value }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  })
  return (
    <View style={styles.tickerContainer}>
      {data.map(item => {
        return (
          <Animated.Text
            key={`ticker${item.key}`}
            style={[styles.tickerItemText, { transform: [{ translateY }] }]}
          >{item.type}</Animated.Text>
        )
      })}
    </View>
  )
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
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <Circle scrollX={scrollX}/>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <Item {...item} index={index} scrollX={scrollX}/>}
        onScroll={Animated.event([{
          nativeEvent: { contentOffset: { x: scrollX } }
        }], {
          useNativeDriver: true,
        })}
      />
      <Image
        source={require('./assets/ue_black_logo.png')}
        style={styles.logo}
      />
      <Pagination />
      <Ticker scrollX={scrollX}/>
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
  },
  tickerContainer: {
    position: "absolute",
    left: 20,
    top: 50,
    height: TICKER_HEIGHT,
    overflow: "hidden",
  },
  tickerItemText: {
    fontSize: TICKER_HEIGHT,
    textTransform: "uppercase", // 转换成全大写
    fontWeight: "800",
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circleItem: {
    position: "absolute",
    top: '15%',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  }
})

export default App;
