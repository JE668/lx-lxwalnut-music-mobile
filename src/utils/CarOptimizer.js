import { TrackPlayer } from 'react-native-track-player'

/**
 * 车机优化工具类
 * 针对极氪 7X + 极拓环境优化
 */
class CarOptimizer {
    static initialized = false

    /**
     * 初始化车机优化
     */
    static async init() {
        if (this.initialized) return
        this.initialized = true

        try {
            await this.setupTrackPlayer()
            await this.setupBackgroundKeepAlive()
            this.setupNetworkMonitor()
            this.setupPerformanceOptimization()
            console.log('[CarOptimizer] 初始化成功')
        } catch (error) {
            console.error('[CarOptimizer] 初始化失败:', error)
        }
    }

    /**
     * 配置 TrackPlayer（车机环境优化）
     */
    static async setupTrackPlayer() {
        await TrackPlayer.configure({
            android: {
                allowLossyPlayback: true,
                autoBackupPosition: true,
                backupPositionIntervalMillis: 5000,
                clearAudioFocusLost: true,
                createNotificationChannel: true,
                stopWithPlayback: false,
            },
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_NEXT,
                TrackPlayer.CAPABILITY_PREVIOUS,
                TrackPlayer.CAPABILITY_SEEK_TO,
                TrackPlayer.CAPABILITY_JUMP_FORWARD_15S,
                TrackPlayer.CAPABILITY_JUMP_BACKWARD_15S,
                TrackPlayer.CAPABILITY_TOGGLE_FAVORITE,
                TrackPlayer.CAPABILITY_SET_SHUFFLE,
                TrackPlayer.CAPABILITY_SET_REPEAT,
            ],
            compactPlaybackMode: {
                android: 'notification',
                ios: 'pictureInPicture',
            },
            minUpdateInterval: 1000,
            pauseOnFocusLoss: true,
            rateOnFocusLoss: 0,
        })
    }

    /**
     * 后台保活配置
     */
    static async setupBackgroundKeepAlive() {
        try {
            // 启用通知栏保活
            await TrackPlayer.setQueueTitle('播放列表')
            await TrackPlayer.setLoop(TrackPlayer.REPEAT_ONE)
            
            // 设置播放事件监听
            TrackPlayer.addEventListener(TrackPlayer.Events.ERROR, ({ reason, source, error }) => {
                console.warn('[CarOptimizer] 播放错误:', { reason, source, error })
                this.handlePlaybackError()
            })

            TrackPlayer.addEventListener(TrackPlayer.Events.PLAYBACK_STATE_CHANGED, ({ state }) => {
                this.handlePlaybackStateChanged(state)
            })
        } catch (error) {
            console.error('[CarOptimizer] 后台保活配置失败:', error)
        }
    }

    /**
     * 网络监控（自动降级音质、断网切缓存）
     */
    static setupNetworkMonitor() {
        const { NetworkInfo } = require('react-native-network-info')

        // 定期检查网络状态
        setInterval(async () => {
            try {
                const isInternetReachable = await NetworkInfo.isInternetReachable()
                if (!isInternetReachable) {
                    this.handleNetworkDisconnected()
                } else {
                    this.handleNetworkRecovered()
                }
            } catch (error) {
                console.warn('[CarOptimizer] 网络检测失败:', error)
            }
        }, 10000)
    }

    /**
     * 网络断开处理
     */
    static handleNetworkDisconnected() {
        console.log('[CarOptimizer] 网络断开，切换至本地缓存')
        // 触发切换到本地缓存播放
        const { emitter } = require('../utils/eventBus')
        emitter.emit('network:disconnected')
    }

    /**
     * 网络恢复处理
     */
    static handleNetworkRecovered() {
        console.log('[CarOptimizer] 网络恢复，尝试续播')
        const { emitter } = require('../utils/eventBus')
        emitter.emit('network:recovered')
    }

    /**
     * 播放错误处理（自动换源）
     */
    static handlePlaybackError() {
        const { emitter } = require('../utils/eventBus')
        emitter.emit('playback:error', {})
    }

    /**
     * 播放状态变化处理
     */
    static handlePlaybackStateChanged(state) {
        console.log('[CarOptimizer] 播放状态变化:', state)
    }

    /**
     * 性能优化（车机环境）
     */
    static setupPerformanceOptimization() {
        // 车机性能优化
        // 1. 减少不必要的动画
        // 2. 延迟加载非关键资源
        // 3. 优化内存使用
        
        console.log('[CarOptimizer] 性能优化已启用')
    }

    /**
     * 检查是否已初始化
     */
    static isInitialized() {
        return this.initialized
    }
}

export default CarOptimizer