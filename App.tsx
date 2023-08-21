/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import dayjs from 'dayjs';

const data = [
  {
    user: 'Sahil',
    data: [
      {
        date: 6,
        value: 'SL',
      },
      {
        date: 23,
        value: 'WFH',
      },
    ],
  },
  {
    user: 'Vijay',
    data: [
      {
        date: 3,
        value: 'SL',
      },
      {
        date: 19,
        value: 'SL',
      },
      {
        date: 30,
        value: 'SL',
      },
    ],
  },
  {
    user: 'Naresh',
    data: [
      {
        date: 5,
        value: 'WFH',
      },
    ],
  },
  {
    user: 'Vishal',
    data: [
      {
        date: 1,
        value: 'SL',
      },
    ],
  },
  {
    user: 'Sudhir',
    data: [
      {
        date: 2,
        value: 'WFH',
      },
    ],
  },
  {
    user: 'Rahul',
    data: [
      {
        date: 31,
        value: 'SL',
      },
    ],
  },
];

const RenderDataRow = ({userData}: any) => {
  const monthDays = dayjs().daysInMonth();

  const renderTableView = ({item, index}: any) => {
    const val = userData.data.filter((val: any) => val.date - 1 === index)[0]
      ?.value;
    return (
      <View
        style={[
          styles.daysBox,
          {
            backgroundColor:
              val === 'SL'
                ? 'red'
                : val === 'WFH'
                ? '#02d1e8'
                : 'rgba(135, 206, 235, .4)',
            borderWidth: 0.5,
            borderColor: 'gray',
          },
        ]}>
        <Text style={styles.userDataLabel}>{val}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={Array(monthDays).fill(0)}
      keyExtractor={(itm, i) => 'key-' + i}
      renderItem={renderTableView}
      contentContainerStyle={{flexGrow: 1, borderWidth: 0}}
      horizontal
      scrollEnabled={false}
    />
  );
};

const BoxWidth = 55;
const BoxHeight = 50;

function App(): JSX.Element {
  const monthDays = dayjs().daysInMonth();

  return (
    <SafeAreaView>
      <Text style={styles.monthHeading}>{dayjs().format('MMMM, YYYY')}</Text>
      <ScrollView style={{}}>
        <View style={styles.row}>
          <View style={styles.userListView}>
            <FlatList
              data={data}
              keyExtractor={(itm, i) => 'keyUser-' + i}
              renderItem={({item, index}: any) => (
                <View style={styles.userBox}>
                  <Text style={styles.userLabel}>{item.user}</Text>
                </View>
              )}
              contentContainerStyle={{flexGrow: 1}}
              scrollEnabled={false}
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <FlatList
                data={Array(monthDays).fill(0)}
                keyExtractor={(itm, i) => 'key1-' + i}
                renderItem={({item, index}: any) => (
                  <View style={styles.daysBox}>
                    <Text style={{color: 'black'}}>{index + 1}</Text>
                  </View>
                )}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                numColumns={monthDays}
                scrollEnabled={false}
              />
              {data.map((user, index) => (
                <RenderDataRow userData={user} key={index} />
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  monthHeading: {fontSize: 25, fontWeight: '600'},
  userListView: {marginTop: BoxHeight},
  userBox: {
    height: BoxHeight,
    width: 80,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  userLabel: {fontWeight: '600', color: 'black'},
  daysBox: {
    height: BoxHeight,
    width: BoxWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDataLabel: {fontWeight: '600', color: 'white'},
});

export default App;
