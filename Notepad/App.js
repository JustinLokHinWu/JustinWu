import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Alert, TouchableOpacity, View, FlatList, Button } from 'react-native';
import { stackManager, createStackNavigator } from 'react-navigation'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Notes',
  }

  render() {
    var notes = loadNotes();

    return (
      <View style={styles.container}>
        <FlatList
          data={notes.notes}
          renderItem={({item}) =>
          <ListItem
            title={item.key}
            text={item.text}
            date={item.date}
            navigation={this.props.navigation}
          />}
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
    const { navigate } = this.props.navigation
    return(
      <TouchableOpacity style={styles.listItem} onPress={() =>
          navigate('Note', { title: this.state.title, text: this.state.text })
        }>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <View style={{flex: 1}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'baseline'}}>
              <Text style={styles.headerText}>{this.state.title}</Text>
              <Text numberOfLines={1} style={styles.paragraphText}>{" - " + this.state.date}</Text>
            </View>
          </View>
          <Button
            title="Delete"
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              Alert.alert(
                'Delete',
                'Are you sure you want to delete this note?',
                [
                  {text: 'Yes', onPress: () => console.log('Yes Pressed')},
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ]
              )
            }}
            />
        </View>
        <Text numberOfLines={1} style={styles.paragraphText}>{this.state.text}</Text>
      </TouchableOpacity>
    )
  }
}

class NoteScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      title: this.props.navigation.state.params.title,
      text: this.props.navigation.state.params.text,
    }
  }
  static navigationOptions = {
    title: "Note"
  }

  render() {

    return(
      <View style={styles.noteScreen}>
        <TextInput
          editable = {true}
          multiline = {true}
          defaultValue = {this.state.text}
        />
      </View>
    )
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Note: NoteScreen,
  },
  {
    initialRouteName: 'Home'
  }
);

function loadNotes() {
  return require('./notes.json')
}

export default class App extends React.Component {

  render() {
    return <RootStack/>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  listItem: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  noteScreen: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 20,
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
