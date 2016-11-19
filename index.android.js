import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import timer from 'react-native-timer';
import Sound from 'react-native-sound';

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
    this.playSound();
  }

  restartTimer() {
    this.setState({secondsRemaining: 3}, () => timer.setInterval(
      this, 'sustractSecond', () => this.setState({secondsRemaining: this.state.secondsRemaining - 1}), 1000
    ));
    this.playSound();
  }

  playSound() {
    // Load the sound file 'click.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    let click = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        console.log('duration in seconds: ' + click.getDuration());

        // Play the sound with an onEnd callback
        click.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });

        console.log('volume: ' + click.getVolume());
        console.log('loops: ' + click.getNumberOfLoops());

        click.getCurrentTime((seconds) => console.log('at ' + seconds));
      }
    });
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
