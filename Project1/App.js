import React, {Component} from 'react';
import { StyleSheet, AppRegistry, Text, ScrollView, SectionList, Button, Alert,
  TextInput, View, ActivityIndicator } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            fetch('https://justinwu.000webhostapp.com/testjson.json')
              .then((response) => response.json())
              .then((responseJson) => {

                this.setState({
                  name: responseJson.name,
                }, function(){

                });

              })
              .catch((error) => {
                console.error(error);
              })
          }}
          title="Press to refresh"
        />
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}

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
