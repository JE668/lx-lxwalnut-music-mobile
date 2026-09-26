/**
 * 音质选择器
 * 支持自动降级策略和多音源 fallback
 */
class QualitySelector {
    static qualities = {
        FLAC: { br: 999000, label: 'FLAC 无损', bitrate: 0, extension: 'flac' },
        HIGH: { br: 320000, label: '高音质 320kbps', bitrate: 320000, extension: 'mp3' },
        MEDIUM: { br: 192000, label: '较高 192kbps', bitrate: 192000, extension: 'mp3' },
        LOW: { br: 128000, label: '标准 128kbps', bitrate: 128000, extension: 'mp3' },
    }

    static qualityOrder = ['FLAC', 'HIGH', 'MEDIUM', 'LOW']

    /**
     * 根据网络类型和用户选择确定音质
     * @param {string} networkType - WiFi | 4G | 3G | 2G | Disconnected
     * @param {string} userChoice - AUTO | FLAC | HIGH | MEDIUM | LOW
     * @returns {object} 音质配置
     */
    static async selectQuality(networkType, userChoice) {
        if (userChoice === 'AUTO' || !userChoice) {
            return this.getAutoQuality(networkType)
        }
        return this.qualities[userChoice] || this.qualities.HIGH
    }

    /**
     * 自动音质选择策略
     */
    static getAutoQuality(networkType) {
        switch (networkType) {
            case 'WiFi':
            case 'wifi':
                return this.qualities.FLAC
            case '4G':
            case 'LTE':
                return this.qualities.HIGH
            case '3G':
                return this.qualities.MEDIUM
            case '2G':
                return this.qualities.LOW
            case 'Disconnected':
            case 'offline':
                return null
            default:
                return this.qualities.HIGH
        }
    }

    /**
     * 带 fallback 的音质选择
     * 从首选音质开始，逐级降级直到找到可用音源
     */
    static async playWithFallback(songId, preferredQuality, songInfo) {
        const fallbackOrder = this.getFallbackOrder(preferredQuality)
        
        for (const quality of fallbackOrder) {
            try {
                const result = await this.getSongUrl(songId, quality.br, songInfo)
                if (result?.url) {
                    return {
                        url: result.url,
                        quality: quality,
                        source: result.source,
                    }
                }
            } catch (error) {
                console.warn(`[QualitySelector] 音质 ${quality.label} 获取失败:`, error)
            }
        }

        return null
    }

    /**
     * 获取 fallback 顺序
     */
    static getFallbackOrder(preferredQuality) {
        const startIndex = this.qualityOrder.indexOf(preferredQuality)
        
        if (startIndex === -1) {
            return [this.qualities.HIGH]
        }

        return this.qualityOrder.slice(startIndex).map(q => this.qualities[q])
    }

    /**
     * 获取歌曲 URL
     * 注意：实际实现需要根据项目的音源系统适配
     */
    static async getSongUrl(songId, br, songInfo) {
        // TODO: 根据项目的音源系统实现
        // 这里需要调用自定义音源或 API
        throw new Error('getSongUrl 需要实现')
    }

    /**
     * 获取音质标签（用于 UI 显示）
     */
    static getQualityLabel(quality) {
        if (!quality) return '未知'
        
        switch (quality) {
            case 'FLAC':
                return 'FLAC 无损'
            case 'HIGH':
                return '320kbps'
            case 'MEDIUM':
                return '192kbps'
            case 'LOW':
                return '128kbps'
            default:
                return quality
        }
    }

    /**
     * 获取音质颜色（用于 UI 徽章）
     */
    static getQualityColor(quality) {
        switch (quality) {
            case 'FLAC':
                return '#ff6b6b'  // 红色
            case 'HIGH':
                return '#6c5ce7'  // 紫色
            case 'MEDIUM':
                return '#a29bfe'  // 浅紫
            case 'LOW':
                return '#a0a0b0'  // 灰色
            default:
                return '#a0a0b0'
        }
    }
}

export default QualitySelector