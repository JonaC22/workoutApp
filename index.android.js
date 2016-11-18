import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import timer from 'react-native-timer';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#212121'
  },
  start: {
    fontSize: 100,
    color: '#607D8B'
  },
  secondsRemaining: {
    fontSize: 120,
    color: '#FF5722'
  },
  done: {
    fontSize: 120,
    color: '#E64A19'
  }
});

export default class workoutApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: 'WorkoutApp',
      secondsRemaining: 3,
      showTimer: false
    };
  }

  showTimer() {
    this.setState({showTimer: true}, () => timer.setInterval(
      this, 'sustractSecond', () => this.setState({secondsRemaining: this.state.secondsRemaining - 1}), 1000
    ));
  }

  restartTimer() {
    this.setState({secondsRemaining: 3}, () => timer.setInterval(
      this, 'sustractSecond', () => this.setState({secondsRemaining: this.state.secondsRemaining - 1}), 1000
    ));
  }

  render() {

    if(this.state.secondsRemaining <= 0) {
      timer.clearInterval(this, 'sustractSecond');
    }

    return (
      <View style={{flex: 1}}>
        <Text style={styles.titleText}>
            {this.state.titleText}
        </Text>
        <TouchableOpacity onPress={() => requestAnimationFrame(() => this.showTimer())}>
          {this.state.showTimer ? (null) : (<Text style={styles.start}>Start!</Text>)}
        </TouchableOpacity>

        {this.state.showTimer && this.state.secondsRemaining > 0 ? (
          <Text style={styles.secondsRemaining}>{this.state.secondsRemaining}</Text>
        ) : (
          null
        )}

        {this.state.secondsRemaining <= 0 ? (
          <View style={{flex: 1}}>
            <Text style={styles.done}>DONE!</Text>
            <TouchableOpacity onPress={() => requestAnimationFrame(() => this.restartTimer())}>
              <Text style={styles.start}>Restart!</Text>
            </TouchableOpacity>
          </View>
        ) : (
          null
        )}

      </View>
    );
  }
}

AppRegistry.registerComponent('workoutApp', () => workoutApp);
