import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Platform, Text, TouchableOpacity, Dimensions, BackHandler } from 'react-native'
import Video from 'react-native-video'

const LIVE_VIDEO_URL = 'https://stream.rdstv.radio/out/v1/ec85f72b87f04555aa41d616d5be41dc/index_8.m3u8'

interface Props {
    isVisible: boolean
    setIsVideoVisible: (status: boolean) => void
}

const VideoPlayer: React.FC<Props> = (props) => {
    const [paused, setPaused] = useState(true)
    const videoPlayer = useRef(null)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                videoPlayer.current.dismissFullscreenPlayer()
                return true
            }
          );
      
          return () => backHandler.remove();
    }, [])

    useEffect(() => {
        if (props.isVisible === true && paused !== false) {
            videoPlayer.current.source = { uri: LIVE_VIDEO_URL }
            setPaused(false)
            videoPlayer.current.presentFullscreenPlayer()
        }
    }, [props.isVisible])

    const exitFullscreenHandler = async () => {
        videoPlayer.current.source = ''
        props.setIsVideoVisible(false)
        setPaused(true)
    }

    const changePlayback = (playbackRate) => {
        if (playbackRate.playbackRate == 0) {
            videoPlayer.current.source = { uri: '' }
        } else {
            videoPlayer.current.source = { uri: LIVE_VIDEO_URL }
        }
    }

    return (
        <View style={props.isVisible ? styles.visible : styles.hidden}>
            <Video
                source={{ uri: LIVE_VIDEO_URL }}
                paused={paused}
                ref={videoPlayer}
                fullscreenOrientation="landscape"
                onFullscreenPlayerWillDismiss={exitFullscreenHandler}
                onPlaybackRateChange={(playbackRate) => changePlayback(playbackRate)}
                style={{ height: '100%', width: '100%' }}
                // @ts-ignore
                resizeMode="cover"
                repeat={false}
                onLoadStart={(payload) => console.log(payload)}
                onLoad={(payload) => console.log(payload)}
            />
            {Platform.OS == 'android' ? (
                <TouchableOpacity
                    onPress={() => videoPlayer.current.dismissFullscreenPlayer()}
                    style={{
                        height: 40,
                        width: 40,
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.40)',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            color: '#fff'
                        }}
                    >
                        X
                    </Text>
                </TouchableOpacity>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    visible: {
        position: 'absolute',
        width: Dimensions.get('window').height,
        height: Dimensions.get('window').width,
        top: 0,
        left: 0
    },
    hidden: {
        width: 0,
        height: 0
    }
})

export default VideoPlayer
