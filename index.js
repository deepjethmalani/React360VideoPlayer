import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  VrButton,
  Environment,
  asset,
  Text
} from 'react-360';
import VideoModule from 'VideoModule';

const customPlayerStyles = StyleSheet.create({
  playOrPause: {
    //TODO: Add styles for the Play Or Pause button
  },
  progress: {
    //TODO: Add styles for progress
  },
});

class CustomVideoPlayer extends React.Component {
  // Create a player
  state = {
    showPlay: true,
    showPause: true,
    videoEvent: {}
  }

  componentWillMount() {
    this.player = VideoModule.createPlayer('customPlayer');
  }

  componentDidMount() {
    this.playSource(this.props.video.source);
    // Or, play in-line on a surface
    Environment.setScreen(
      'default', /* screen name */
      'customPlayer', /* player unique id */
      'default', /* surface name */
      0, 0, 1000, 500 /* relative position on the surface */
    );

    this.player.addListener('onVideoStatusChanged', (event) => {
      let updateObj = {
        videoEvent: event
      }

      switch(event.status) {
        case 'ready':
          updateObj.showPlay = true
          this.setState(updateObj)
          break;
        case 'paused':
          updateObj.showPause = false
          updateObj.showPlay = true
          this.setState(updateObj)
          break;
        case 'playing':
          updateObj.showPause = true
          updateObj.showPlay = false
          this.setState(updateObj)
          break;
        case 'finished':
          updateObj.showPlay = true
          updateObj.showPause = false
          this.setState(updateObj)
          break;
        case 'stopped':
          updateObj.showPlay = true
          updateObj.showPause = false
          this.setState(updateObj)
          break;
        case 'seeking':
          updateObj.showPlay = true
          updateObj.showPause = false
        case 'failed':
          //TODO: show retry
          break;
        case 'closing':
          //TODO: show message that says session is closing
          break;
        case 'closed': 
          //TODO: No session. Hide control overlay
        default: break;
      };

      
      // status - Video play status, can be
      // closed: No session.
      // closing: Session is being closed.
      // failed: Session had an error.
      // finished: Session has finished playing video
      // : Session is seeking a position
    })
  }

  componentWillUnmount() {
    this.player.destroy()
  }

  playSource (source) {
    this.player.play({
      source: {url: asset(source).uri}, // provide the path to the video
      stereo: '3DTB', // optionally, supply the format of the video
      muted: false
    });
  }

  render() {
    return (
      <View>
          {this.state.showPlay ? <VrButton onClick={(e) => { this.player.resume() }}><Text>Resume</Text></VrButton> : <View/>}
          {this.state.showPause ? <VrButton onClick={(e) => { this.player.pause() }}><Text>Pause</Text></VrButton> : <View/>}
          <Text>{this.state.videoEvent.position || '-'}/{this.state.videoEvent.duration || '-'}</Text>
          <Text>Volume: {this.state.videoEvent.volume || '-'}</Text>
      </View>
    )
  }
}

export default class VideoPlayer extends React.Component {
  render() {
    return (
      <View>
        <CustomVideoPlayer 
          video={{source: 'video.mp4'}} 
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('VideoPlayer', () => VideoPlayer);
