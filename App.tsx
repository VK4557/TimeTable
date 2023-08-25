/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  Pressable,
  Dimensions,
  Text,
  GestureResponderEvent,
  View,
} from 'react-native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import HomeScreen from './modules/home';
import ChatScreen from './modules/chat';

const Bottom = createBottomTabNavigator();

const CustomBottomBtn = (props: BottomTabBarButtonProps) => {
  const focused = useIsFocused();
  const {onPress} = props;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [event, setEvent] = useState<GestureResponderEvent | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const starTime = () => {
    setMinutes(4);
    setSeconds(59);
  };

  return (
    <Pressable
      {...props}
      onPress={e => {
        if (minutes || seconds || focused) return;
        if (event) {
          onPress && e && onPress(e);
          setEvent(null);
        } else {
          starTime();
          setEvent(e);
        }
      }}
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: Dimensions.get('window').width / 4,
        backgroundColor: !event ? 'red' : 'blue',
      }}>
      {seconds > 0 || minutes > 0 ? (
        <>
          <Text style={{position: 'absolute', top: -20}}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </Text>
          <Text>Chat</Text>
        </>
      ) : (
        <Text>Chat</Text>
      )}
    </Pressable>
  );
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Bottom.Navigator>
        <Bottom.Screen name="Home" component={HomeScreen} />
        <Bottom.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarButton: props => <CustomBottomBtn {...props} />,
          }}
        />
        <Bottom.Screen name="Home2" component={HomeScreen} />
        <Bottom.Screen name="Home3" component={HomeScreen} />
      </Bottom.Navigator>
    </NavigationContainer>
  );
}

export default App;
