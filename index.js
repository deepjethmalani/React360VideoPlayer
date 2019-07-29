import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Image,
  Environment,
  NativeModules,
} from 'react-360';
import VideoModule from 'VideoModule';

 
export default class take6 extends React.Component {
  fishVideo = () => {
 
  // Play fish video
  VideoModule.createPlayer('myplayer');
  VideoModule.play('myplayer', { source: {url: asset('video.mp4').uri}, muted: false });
  Environment.setScreen('default', 'myplayer', 'default', 0, 0, 1000, 500);
}; 
  render() {
    return (
      <View>
      {this.fishVideo()}
    </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('take6', () => take6);
