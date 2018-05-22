import React, { Component } from 'react';
import { stackManager, createStackNavigator } from 'react-navigation'
import { StyleSheet, AppRegistry, Text, ScrollView, SectionList, Button, Alert,
  TextInput, View, ActivityIndicator } from 'react-native';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  }
  render() {
    return(
      <Button
        title="Go to profile"
        onPress={() => this.props.navigation.navigate('Profile')}
      />
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  }

  render() {
    return(
      <Button
        title="Go home"
        onPress={() => this.props.navigation.navigate('Home')}
      />
    )
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}

/*
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is some text</Text>
        <HomeScreen></HomeScreen>
      </View>
    );
  }
}*/

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => PizzaTranslator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  red: {
    color: 'red'
  }
});
