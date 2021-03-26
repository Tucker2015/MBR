import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, useWindowDimensions, StatusBar, StyleSheet, FlatList, ImageBackground, SafeAreaView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { globalStyles } from '../styles/globalStyles';
import ListCard from '../components/ListCard'
import Route from '../components/ListCard'

export default Schedule = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch('https://vpn.kevtucker.com/testDB')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const image = require('../assets/banner.png');

  const MonRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ImageBackground
        source={image}
        blurRadius={Platform.OS === 'ios' ? 10 : 2}
        style={styles.backgroundImage}>
        <Text style={styles.dayText}>Monday</Text>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : (
          <FlatList
            data={data.monday}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => <ListCard item={item} />}
          />
        )}
      </ImageBackground>
    </View>
  );
  const TueRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#000' }} >
      <ImageBackground
        source={image}
        blurRadius={Platform.OS === 'ios' ? 10 : 2}
        style={styles.backgroundImage}>
        <Text style={styles.dayText}>Tuesday</Text>
        <FlatList
          data={data.tuesday}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => <ListCard item={item} />}
        />
      </ImageBackground>
    </View>
  );
  const WedRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ImageBackground
        source={image}
        blurRadius={Platform.OS === 'ios' ? 10 : 2}
        style={styles.backgroundImage}>
        <Text style={styles.dayText}>Wednesday</Text>
        <FlatList
          data={data.wednesday}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => <ListCard item={item} />}
        />
      </ImageBackground>
    </View>
  );
  const ThuRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ImageBackground
        source={image}
        blurRadius={Platform.OS === 'ios' ? 10 : 2}
        style={styles.backgroundImage}>
        <Text style={styles.dayText}>Thursday</Text>
        <FlatList
          data={data.thursday}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => <ListCard item={item} />}
        />
      </ImageBackground>
    </View>
  );
  const FriRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ImageBackground
        source={image}
        blurRadius={Platform.OS === 'ios' ? 10 : 2}
        style={styles.backgroundImage}>
        <Text style={styles.dayText}>Friday</Text>
        <FlatList
          data={data.friday}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => <ListCard item={item} />}
        />
      </ImageBackground>
    </View>
  );
  const SatRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ImageBackground
        source={image}
        blurRadius={Platform.OS === 'ios' ? 10 : 2}
        style={styles.backgroundImage}>
        <Text style={styles.dayText}>Saturday</Text>
        <FlatList
          data={data.saturday}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => <ListCard item={item} />}
        />
      </ImageBackground>
    </View>
  );
  const SunRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ImageBackground
        source={image}
        blurRadius={Platform.OS === 'ios' ? 10 : 2}
        style={styles.backgroundImage}>
        <Text style={styles.dayText}>Sunday</Text>
        <FlatList
          data={data.sunday}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => <ListCard item={item} />}
        />
      </ImageBackground>
    </View>
  );

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'mon', title: 'Mo' },
    { key: 'tue', title: 'Tu' },
    { key: 'wed', title: 'We' },
    { key: 'thu', title: 'Th' },
    { key: 'fri', title: 'Fr' },
    { key: 'sat', title: 'Sa' },
    { key: 'sun', title: 'Su' },
  ]);

  const renderScene = SceneMap({
    mon: MonRoute,
    tue: TueRoute,
    wed: WedRoute,
    thu: ThuRoute,
    fri: FriRoute,
    sat: SatRoute,
    sun: SunRoute,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.headerText}>Weekly Schedule</Text>
      <TabView
        tabBarPosition='top'
        style={{ padding: 0 }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  dayText: {
    marginTop: 10,
    padding: 5,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },

  headerText: {
    margin: 5,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center'
  },
  backgroundImage: {
    flex: 1,

    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

})