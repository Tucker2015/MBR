import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import Video from 'react-native-video';
const win = Dimensions.get('window');
export default function VideoPlayer() {


    return (
        <SafeAreaView style={styles.container}>
            <View><Text style={styles.textHead}>Military Broadcasting Radio</Text></View>

            <Video source={{ uri: "https://live.mixshare.co.uk:8443/live/aReBqkSfQ/index.m3u8" }}   // Can be a URL or a local file.
                ref={(ref) => {
                    this.player = ref
                }}                                      // Store reference
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={this.videoError}
                poster={"https://ktinternet.net/radio-logos/mbr_logo.png"}
                disableFocus={true}
                controls={true}           // Callback when video cannot be loaded
                style={styles.backgroundVideo} />
            <View style={styles.bottomContainer}>
                <Text style={styles.textHead}>Live Broadcast</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        zIndex: 1000,
    },
    textHead: {
        color: '#fff',
        fontSize: win.width / 22,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center'
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 250,
        left: 0,
        bottom: 250,
        right: 0,
    },
})
