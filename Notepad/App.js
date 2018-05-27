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
        <Text>{notes.notes.title}</Text>
        <FlatList
          data={notes}

          renderItem={({item}) => <ListItem title={item.notes.title} text={item.notes.text} date={item.notes.date}/>}
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
        <View style={{flexDirection: 'row'}}>
          <View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'baseline'}}>
              <Text style={styles.headerText}>{this.state.title}</Text>
              <Text numberOfLines={1} style={styles.paragraphText}>{" - " + this.state.date}</Text>
            </View>
          </View>
        </View>
        <Text numberOfLines={1} style={styles.paragraphText}>{this.state.text}</Text>
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

function loadNotes() {
  //return require('./notes.json')
  return {"notes": [{
    "title": "Some title 1",
    "date": "05/23/18",
    "text": "This is a paragraph with some shit in it"
  }]};
}

export default class App extends React.Component {
  notes = loadNotes();

  render() {
    return <RootStack notes={notes}/>
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
  },
  headerText: {
    //color: '#333',
    color: '#3b64de',
    fontSize: 22,
  },
  paragraphText: {
    color: '#444',
    fontSize: 14,
  }

});
