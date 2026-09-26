import React, { useState, useEffect } from 'react'
import { View, Text, Image, Pressable, StyleSheet, Animated, Easing, Dimensions } from 'react-native'
import { TrackPlayer } from 'react-native-track-player'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

/**
 * 车机横屏播放器
 * 三栏布局：左侧播放列表 30% | 中间播放器 40% | 右侧歌词 30%
 */
const CarLandscapePlayer = () => {
    const [track, setTrack] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1.0)
    const [isLiked, setIsLiked] = useState(false)
    const [repeatMode, setRepeatMode] = useState('none')
    const [shuffleMode, setShuffleMode] = useState(false)
    
    const rotateAnim = React.useRef(new Animated.Value(0)).current
    const fadeAnim = React.useRef(new Animated.Value(0)).current

    useEffect(() => {
        setupTrackPlayer()
        fetchCurrentTrack()
        return () => {
            TrackPlayer.removeEventListener(TrackPlayer.Events.PROGRESS_UPDATE, onProgressUpdate)
            TrackPlayer.removeEventListener(TrackPlayer.Events.PLAYBACK_STATE_CHANGED, onPlaybackStateChanged)
            TrackPlayer.removeEventListener(TrackPlayer.Events.TRACK_CHANGE, onTrackChange)
        }
    }, [])

    useEffect(() => {
        if (isPlaying) {
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 360,
                    duration: 20000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start()
        } else {
            rotateAnim.stopAnimation()
        }
    }, [isPlaying])

    const setupTrackPlayer = async () => {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.setupWhenReady()
        
        TrackPlayer.addEventListener(TrackPlayer.Events.PROGRESS_UPDATE, onProgressUpdate)
        TrackPlayer.addEventListener(TrackPlayer.Events.PLAYBACK_STATE_CHANGED, onPlaybackStateChanged)
        TrackPlayer.addEventListener(TrackPlayer.Events.TRACK_CHANGE, onTrackChange)
    }

    const onProgressUpdate = ({ position, duration }) => {
        setProgress(position)
        setDuration(duration)
    }

    const onPlaybackStateChanged = ({ state }) => {
        setIsPlaying(state === TrackPlayer.STATE_PLAYING)
    }

    const onTrackChange = (track) => {
        setTrack(track)
        fetchTrackInfo(track)
    }

    const fetchCurrentTrack = async () => {
        const currentTrack = await TrackPlayer.getCurrentTrack()
        if (currentTrack) {
            setTrack(currentTrack)
            fetchTrackInfo(currentTrack)
        }
    }

    const fetchTrackInfo = async (track) => {
        // 获取歌曲详情、歌词等信息
        // TODO: 实现
    }

    const togglePlayPause = async () => {
        if (isPlaying) {
            await TrackPlayer.pause()
        } else {
            await TrackPlayer.play()
        }
    }

    const nextTrack = async () => {
        await TrackPlayer.skipToNext()
    }

    const previousTrack = async () => {
        await TrackPlayer.skipToPrevious()
    }

    const seekTo = async (position) => {
        await TrackPlayer.seekTo(position)
    }

    const toggleShuffle = async () => {
        const newMode = !shuffleMode
        setShuffleMode(newMode)
        await TrackPlayer.setShuffle(newMode)
    }

    const cycleRepeatMode = async () => {
        const modes = ['none', 'one', 'all']
        const currentIndex = modes.indexOf(repeatMode)
        const nextMode = modes[(currentIndex + 1) % modes.length]
        setRepeatMode(nextMode)
        
        const repeatModeMap = {
            none: TrackPlayer.REPEAT_OFF,
            one: TrackPlayer.REPEAT_ONE,
            all: TrackPlayer.REPEAT_ALL,
        }
        await TrackPlayer.setRepeat(repeatModeMap[nextMode])
    }

    const toggleLike = () => {
        setIsLiked(!isLiked)
        // TODO: 实现收藏功能
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    if (!track) return null

    return (
        <View style={styles.container}>
            {/* 左侧：播放列表（30%） */}
            <View style={[styles.leftPanel, { width: screenWidth * 0.3 }]}>
                <PlaylistPanel />
            </View>

            {/* 中间：播放器（40%） */}
            <View style={[styles.centerPanel, { width: screenWidth * 0.4 }]}>
                <View style={styles.playerContent}>
                    {/* 封面 */}
                    <Animated.View
                        style={[
                            styles.coverContainer,
                            {
                                transform: [{ 
                                    rotate: rotateAnim.interpolate({ 
                                        inputRange: [0, 360], 
                                        outputRange: ['0deg', '360deg'] 
                                    }) 
                                }]
                            }
                        ]}
                    >
                        <Image 
                            source={{ uri: track.artwork || track.coverUrl }} 
                            style={styles.coverImage}
                        />
                    </Animated.View>

                    {/* 歌曲信息 */}
                    <View style={styles.songInfo}>
                        <Text style={styles.songName} numberOfLines="1">
                            {track.title || track.name}
                        </Text>
                        <Text style={styles.artist} numberOfLines="1">
                            {track.artist}
                        </Text>
                        {track.quality && (
                            <View style={styles.qualityBadge}>
                                <Text style={styles.qualityText}>
                                    {track.quality}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* 进度条 */}
                    <View style={styles.progressBar}>
                        <Pressable style={styles.seekBar}>
                            <View style={[styles.seekProgress, { width: `${(progress / duration) * 100}%` }]} />
                            <Animated.View 
                                style={[styles.seekThumb, { 
                                    left: `${(progress / duration) * 100}%`,
                                    opacity: fadeAnim 
                                }]}
                            />
                        </Pressable>
                        <View style={styles.progressText}>
                            <Text style={styles.timeText}>{formatTime(progress)}</Text>
                            <Text style={styles.timeText}>{formatTime(duration)}</Text>
                        </View>
                    </View>

                    {/* 控制按钮 */}
                    <View style={styles.controls}>
                        <Pressable 
                            style={[styles.controlButton, shuffleMode && styles.controlButtonActive]}
                            onPress={toggleShuffle}
                        >
                            <Icon name="shuffle" size={24} color={shuffleMode ? '#6c5ce7' : '#a0a0b0'} />
                        </Pressable>
                        
                        <Pressable style={styles.controlButton} onPress={previousTrack}>
                            <Icon name="skip_previous" size={32} color="#ffffff" />
                        </Pressable>
                        
                        <Pressable style={styles.playButton} onPress={togglePlayPause}>
                            <Icon 
                                name={isPlaying ? 'pause_circle_filled' : 'play_circle_filled'} 
                                size={64} 
                                color="#6c5ce7" 
                            />
                        </Pressable>
                        
                        <Pressable style={styles.controlButton} onPress={nextTrack}>
                            <Icon name="skip_next" size={32} color="#ffffff" />
                        </Pressable>
                        
                        <Pressable 
                            style={[styles.controlButton, repeatMode !== 'none' && styles.controlButtonActive]}
                            onPress={cycleRepeatMode}
                        >
                            <Icon 
                                name={repeatMode === 'one' ? 'repeat_one' : 'repeat'} 
                                size={24} 
                                color={repeatMode !== 'none' ? '#6c5ce7' : '#a0a0b0'} 
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* 右侧：歌词（30%） */}
            <View style={[styles.rightPanel, { width: screenWidth * 0.3 }]}>
                <LyricsPanel />
            </View>
        </View>
    )
}

/**
 * 播放列表面板
 */
const PlaylistPanel = () => {
    return (
        <View style={styles.panelContent}>
            <Text style={styles.panelTitle}>播放列表</Text>
            <Text style={styles.panelHint}>暂无歌曲</Text>
        </View>
    )
}

/**
 * 歌词面板
 */
const LyricsPanel = () => {
    return (
        <View style={styles.panelContent}>
            <Text style={styles.panelTitle}>歌词</Text>
            <Text style={styles.panelHint}>加载中...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#0f0f1a',
    },
    leftPanel: {
        height: '100%',
        backgroundColor: '#1a1a2e',
        borderRightWidth: 1,
        borderRightColor: '#2a2a3e',
    },
    centerPanel: {
        height: '100%',
        backgroundColor: '#0f0f1a',
    },
    rightPanel: {
        height: '100%',
        backgroundColor: '#1a1a2e',
        borderLeftWidth: 1,
        borderLeftColor: '#2a2a3e',
    },
    playerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    coverContainer: {
        width: 280,
        height: 280,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
        backgroundColor: '#16162a',
    },
    coverImage: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
    },
    songInfo: {
        marginTop: 32,
        alignItems: 'center',
    },
    songName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 8,
    },
    artist: {
        fontSize: 20,
        color: '#a0a0b0',
        textAlign: 'center',
    },
    qualityBadge: {
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: '#6c5ce7',
        borderRadius: 12,
    },
    qualityText: {
        fontSize: 12,
        color: '#ffffff',
        fontWeight: '600',
    },
    progressBar: {
        marginTop: 48,
        width: '100%',
    },
    seekBar: {
        height: 4,
        backgroundColor: '#2a2a3e',
        borderRadius: 2,
    },
    seekProgress: {
        height: '100%',
        backgroundColor: '#6c5ce7',
        borderRadius: 2,
    },
    seekThumb: {
        position: 'absolute',
        top: -4,
        width: 12,
        height: 12,
        backgroundColor: '#6c5ce7',
        borderRadius: 6,
    },
    progressText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    timeText: {
        fontSize: 14,
        color: '#a0a0b0',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 48,
        alignItems: 'center',
    },
    controlButton: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    controlButtonActive: {
        backgroundColor: 'rgba(108, 92, 231, 0.2)',
    },
    playButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: 'rgba(108, 92, 231, 0.1)',
    },
    panelContent: {
        flex: 1,
        padding: 24,
    },
    panelTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 16,
    },
    panelHint: {
        fontSize: 14,
        color: '#a0a0b0',
    },
})

export default CarLandscapePlayer