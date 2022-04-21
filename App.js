import * as React from 'react';
import {StatusBar, Dimensions, TouchableOpacity, Animated, Text, View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

const schedules = [
  {
    schedule:
      'Kuliah Pegembangan Aplikasi Mobile',
    day: 'Senin, Monday, 月曜日',
  },
  {
    schedule: 
      'Kuliah Kriptografi',
    day: 'Selasa, Tuesday, 火曜日',
  },
  {
    schedule:
      'Kuliah Socio Informatika dan Etika Profesi',
    day: 'Rabu, Wednesday, 肺',
  },
  {
    schedule: 
      'Kuliah Kapita Selekta Informatika',
    day: 'Kamis, Thursday, 木曜日',
  },
  {
    schedule:
      "Kuliah Kewirausahaan",
    day: 'Jumat, Friday, 金曜日',
  },
  {
    schedule:
      'Organisasi',
    day: 'Sabtu, Saturday, 土曜日',
  },
  {
    schedule:
      "Istirahat",
    day: 'Minggu, Sunday, 週',
  }
];

const Circle = ({ onPress, index, schedules, animatedValue, animatedValue2 }) => {
  const { initialBgColor, nextBgColor, bgColor } = colors[index];
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const backgroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });
  const dotBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        { backgroundColor },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: dotBgColor,
            transform: [
              { perspective: 200 },
              {
                rotateY: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },

              {
                scale: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 6, 1],
                }),
              },

              {
                translateX: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0%', '50%', '0%'],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.05, 0.5, 1],
                      outputRange: [1, 0, 0, 1],
                      // extrapolate: "clamp"
                    }),
                  },
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ['0deg', '180deg', '180deg', '180deg'],
                    }),
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ]}
          >
            <AnimatedAntDesign name='arrowright' size={28} color={'white'} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const colors = [
  {
    initialBgColor: 'red',
    bgColor: 'blue',
    nextBgColor: 'black',
  },
  {
    initialBgColor: 'yellow',
    bgColor: 'green',
    nextBgColor: 'pink',
  },
  {
    initialBgColor: 'orange',
    bgColor: 'aliceblue',
    nextBgColor: 'aqua',
  },
  {
    initialBgColor: 'aquamarine',
    bgColor: 'azure',
    nextBgColor: 'beige',
  },
  {
    initialBgColor: 'bisque',
    bgColor: 'blanchedalmond',
    nextBgColor: 'blueviolet',
  },
  {
    initialBgColor: 'brown',
    bgColor: 'burlywood',
    nextBgColor: 'cadetblue',
  },
];

export default function App() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [...Array(schedules.length).keys()];
  const [index, setIndex] = React.useState(0);

  const animate = (i) =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: TEXT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    animate((index + 1) % colors.length).start();
    setIndex((index + 1) % colors.length);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 100 }}>
      <StatusBar hidden />
      <Circle
        index={index}
        onPress={onPress}
        schedules={schedules}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
      />
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange,
                outputRange: schedules.map((_, i) => -i * width * 2),
              }),
            },
          ],
          opacity: sliderAnimatedValue.interpolate({
            inputRange: [...Array(schedules.length * 2 + 1).keys()].map(
              (i) => i / 2
            ),
            outputRange: [...Array(schedules.length * 2 + 1).keys()].map((i) =>
              i % 2 === 0 ? 1 : 0
            ),
          }),
        }}
      >
        {schedules.slice(0, colors.length).map(({ schedule, day }, i) => {
          return (
            <View style={{ paddingRight: width, width: width * 2 }} key={i}>
              <Text
                style={[styles.paragraph, { color: colors[i].nextBgColor }]}
              >
                {schedule}
              </Text>
              <Text
                style={[
                  styles.paragraph,
                  {
                    color: colors[i].nextBgColor,
                    fontSize: 10,
                    fontWeight: 'normal',
                    textAlign: 'right',
                    opacity: 0.8,
                  },
                ]}
              >
                ______ {day}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 50,
  },
  paragraph: {
    margin: 12,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Menlo',
    color: 'white',
  },
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'turquoise',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
