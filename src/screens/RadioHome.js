import React, { useState, useEffect, useCallback } from 'react';
import * as Animatable from 'react-native-animatable';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  Linking,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import TrackPlayer, {
  usePlaybackState,
  updateMetadataForTrack,
} from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NativeWebpage from '../screens/ClipScreen';
import { AirPlayButton } from 'react-native-airplay-cast';

export default function Radio() {
  const fadeIn = {
    from: {
      translateX: -600,
      opacity: 0,
    },
    to: {
      translateX: 0,
      opacity: 1
    },
  };
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const playbackState = usePlaybackState();
  const [trackName, setTrackName] = useState('Giving Veterans a voice');
  const [artistName, setArtistName] = useState('Military Broadcast Radio');
  const [albumCover, setAlbumCover] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    fetch('https://json.kevtucker.com/mbradio')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    setup();
    getCurrentTrackData();
  }, [getCurrentTrackData]);

  //With this fetch call I get the current song name and artist
  const getCurrentTrackData = useCallback(() => {
    TrackPlayer.addEventListener('playback-metadata-received', async (e) => {
      let [artist, title] = [e.artist, e.title];
      if (e.artist == null || e.title == null) {
        if (Platform.OS === 'ios') {
          [artist, title] = e.title.split(' - ');
          updateTrackPlayer(artist, title);
        } else {
          setAlbumCover('');
        }
        setTrackName(title == null ? 'Giving Veterans a voice' : title);
        setArtistName(artist == null ? 'Military Broadcast Radio' : artist);
        TrackPlayer.updateMetadataForTrack('1111', {
          title: title == null ? 'Giving Veterans a voice' : title,
          artist: artist == null ? 'Military Broadcast Radio' : artist,
          artwork: data.img,
        });
        return;
      }
      setTrackName(title);
      setArtistName(artist);
      updateTrackPlayer(artist, title);
    });
  }, []);

  const updateTrackPlayer = (artist, track) => {
    fetch(`https://itunes.apple.com/search?term=?${artist}+${track}&limit=2`)
      .then((res) => res.json())
      .then((body) => {
        // console.log(body);
        //checking if we parsed invalid artist and track, if so I set album cover to "" so you will se default one and I return so other part of the code won't run
        if (body.error != null) {
          setAlbumCover('');
          //I assume track never changes that's why a hardcoded the id
          TrackPlayer.updateMetadataForTrack('1111', {
            title: track,
            artist: artist,
            artwork: data.img,
          });
          return;
        }
        const link = body.results[0]['trackViewUrl'];
        const img = body.results[0]['artworkUrl100'].replace(
          '100x100',
          '600x600',
        );
        //I set the image using useState
        setLink(link);
        setAlbumCover(img);
        //I assume track never changes that's why a hardcoded the id
        TrackPlayer.updateMetadataForTrack('1111', {
          title: track,
          artist: artist,
          artwork: img === '' ? data.img : img,
        });
      })
      .catch((error) => {
        setAlbumCover('');
        TrackPlayer.updateMetadataForTrack('1111', {
          title: track,
          artist: artist,
          artwork: data.img,
        });
        console.log('error log', error);
      });
  };
  async function setup() {
    await TrackPlayer.setupPlayer({
      waitForBuffer: true,
    });
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      alwaysPauseOnInterruption: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  }

  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.setupPlayer().then(async () => {
        TrackPlayer.add({
          id: '1111',
          url: data.url,
          artist: 'MBR',
          title: 'Giving Veterans a voice',
          artwork: data.img,
        });
      });
      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }
  var playButton = 'play';
  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    playButton = 'pause';
  }
  function getStateName(state) {
    switch (state) {
      case TrackPlayer.STATE_NONE:
        return 'Hit play to start';
      case TrackPlayer.STATE_PLAYING:
        return 'Playing';
      case TrackPlayer.STATE_PAUSED:
        return 'Paused';
      case TrackPlayer.STATE_STOPPED:
        return 'Stopped';
      case TrackPlayer.STATE_BUFFERING:
        return 'Buffering';
    }
  }
  return (

    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={albumCover === '' ? { uri: data.img } : { uri: albumCover }}
        blurRadius={20}
        resizeMode="cover"
        style={globalStyles.backgroundImage}>
        <View style={globalStyles.textPosition}>
          <Text style={globalStyles.headerText}>{data.station}</Text>
        </View>
        <View>
          <Image
            source={albumCover === '' ? { uri: data.img } : { uri: albumCover }}
            style={globalStyles.cover}
          />
        </View>
        <View style={[{ position: 'absolute', bottom: 70 }]}>
          <NativeWebpage />
        </View>
        {/* <View style={{ position: 'absolute', bottom: 80 }}>

          <VolumeSlider />
        </View> */}

        <Animatable.View
          animation={fadeIn}
          style={globalStyles.playContainer}>
          <TouchableOpacity
            style={globalStyles.playButtonContainer}
            onPress={togglePlayback}>
            <Ionicons
              name={playButton}
              size={25}
              color="#000"
              style={[{ alignSelf: 'center' }]}
            />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text
              adjustsFontSizeToFit={false}
              numberOfLines={3}
              style={globalStyles.metaText}>
              {artistName}
            </Text>
            <Text
              adjustsFontSizeToFit={false}
              numberOfLines={3}
              style={globalStyles.metaText}>
              {trackName}
            </Text>
          </View>

          <View>
            <TouchableOpacity>
              {Platform.OS === 'ios' && (
                <AirPlayButton
                  activeTintColor="blue"
                  tintColor="white"
                  style={{ width: 40, height: 40 }}
                />
              )}
            </TouchableOpacity>
          </View>
        </Animatable.View>

      </ImageBackground>
    </SafeAreaView>
  );
}

