import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { stackManager, createStackNavigator } from 'react-navigation'


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Notes',
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'First', text: "Lorem ipsum some text", date: "5/23/2018"},
            {key: 'Second', text: "Some other ipsum some text", date: "5/23/2018"},
            {key: 'Third', text: "Some text", date: "5/23/2018"},
            {key: 'Fourth', text: "Testing a very long message that should take up multiple lines and is probably going to break the UI", date: "5/23/2018"},
          ]}
          renderItem={({item}) => <ListItem title={item.key} text={item.text} date={item.date}/>}
        />
      </View>
    )
  }
}

class ListItem extends React.Component {
  constructor(props){
      super(props)

      this.state={
        title: this.props.title,
        date: this.props.date,
        text: this.props.text,
      }
  }

  render() {
    return(
      <View style={styles.listItem}>
        <View style={{width: "93%"}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'baseline'}}>
            <Text style={styles.headerText}>{this.state.title}</Text>
            <Text numberOfLines={1} style={styles.paragraphText}>{" - " + this.state.date}</Text>
          </View>
          <Text style={styles.paragraphText}>{this.state.text}</Text>
        </View>
        <Button title='Delete'/>
      </View>
    )
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home'
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  listItem: {
    backgroundColor: '#eee',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    width: "86%"
  },
  headerText: {
    color: '#333',
    fontSize: 20,
  },
  paragraphText: {
    color: '#444',
    fontSize: 12,
  }

});
