//! 更新默认主题配置后，需要执行 npm run build:theme 重新构建index.json

const fs = require('fs')
const path = require('path')
const { createThemeColors } = require('./utils')

const defaultThemes = [
  {
    id: 'green',
    name: '绿意盎然',
    isDark: false,
    config: {
      primary: 'rgb(77, 175, 124)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'var(c-primary-light-600-alpha-700)',
      'c-main-background': 'rgba(255, 255, 255, 1)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': '#4baed5',
      'c-badge-tertiary': '#e7aa36',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'blue',
    name: '蓝田生玉',
    isDark: false,
    config: {
      primary: 'rgb(52, 152, 219)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'var(c-primary-light-600-alpha-700)',
      'c-main-background': 'rgba(255, 255, 255, 1)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': '#5cbf9b',
      'c-badge-tertiary': '#5cbf9b',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'blue_plus',
    name: '蛋雅深蓝',
    isDark: false,
    config: {
      primary: 'rgb(77, 131, 175)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'var(c-primary-light-600-alpha-600)',
      'c-main-background': 'rgba(255, 255, 255, 1)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': 'rgba(66.6, 150.7, 171, 1)',
      'c-badge-tertiary': 'rgba(54, 196, 231, 1)',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'orange',
    name: '橙黄橘绿',
    isDark: false,
    config: {
      primary: 'rgb(245, 171, 53)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'var(c-primary-light-600-alpha-700)',
      'c-main-background': 'rgba(255, 255, 255, 1)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': '#9ed458',
      'c-badge-tertiary': '#9ed458',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'brown',
    name: '泥牛入海',
    isDark: false,
    config: {
      primary: 'rgba(188, 128, 68, 1)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'var(c-primary-light-600-alpha-700)',
      'c-main-background': 'rgba(255, 255, 255, 1)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': '#483472',
      'c-badge-tertiary': '#647D39',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'red',
    name: '热情似火',
    isDark: false,
    config: {
      primary: 'rgb(214, 69, 65)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'var(c-primary-light-600-alpha-700)',
      'c-main-background': 'rgba(255, 255, 255, 1)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': '#dfbb6b',
      'c-badge-tertiary': '#dfbb6b',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'pink',
    name: '粉装玉琢',
    isDark: false,
    config: {
      primary: 'rgb(241, 130, 141)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'var(c-primary-light-600-alpha-700)',
      'c-main-background': 'rgba(255, 255, 255, 1)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': '#f5b684',
      'c-badge-tertiary': '#f5b684',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'purple',
    name: '重斤球紫',
    isDark: false,
    config: {
      primary: 'rgb(155, 89, 182)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'var(c-primary-light-600-alpha-700)',
      'c-main-background': 'rgba(255, 255, 255, 1)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': '#e5a39f',
      'c-badge-tertiary': '#e5a39f',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'grey',
    name: '灰常美丽',
    isDark: false,
    config: {
      primary: 'rgb(108, 122, 137)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'var(c-primary-light-600-alpha-700)',
      'c-main-background': 'rgba(255, 255, 255, 1)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': '#b19b9f',
      'c-badge-tertiary': '#b19b9f',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'ming',
    name: '青出于黑',
    isDark: false,
    config: {
      primary: 'rgb(51, 110, 123)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'var(c-primary-light-600-alpha-700)',
      'c-main-background': 'rgba(255, 255, 255, 1)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': '#6376a2',
      'c-badge-tertiary': '#6376a2',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'blue2',
    name: '清热板蓝',
    isDark: false,
    config: {
      primary: 'rgb(79, 98, 208)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'var(c-primary-light-600-alpha-700)',
      'c-main-background': 'rgba(255, 255, 255, 1)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': '#b080db',
      'c-badge-tertiary': '#b080db',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'black',
    name: '黑灯瞎火',
    isDark: true,
    config: {
      primary: 'rgb(190, 190, 190)',
      font: 'rgb(255, 255, 255)',
      'c-app-background': 'rgba(0, 0, 0, 0)',
      'c-main-background': 'rgba(19, 19, 19, 0.95)',
      'bg-image': 'landingMoon.png',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary-dark-200)',
      'c-badge-secondary': 'var(c-primary)',
      'c-badge-tertiary': 'var(c-primary-dark-300)',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'mid_autumn',
    name: '月里嫦娥',
    isDark: false,
    config: {
      primary: 'rgb(74, 55, 82)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'rgba(255, 255, 255, 0)',
      'c-main-background': 'rgba(255, 255, 255, 0.9)',
      'bg-image': 'jqbg.jpg',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': '#af9479',
      'c-badge-tertiary': '#af9479',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'naruto',
    name: '木叶之村',
    isDark: false,
    config: {
      primary: 'rgb(87, 144, 167)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'rgba(255, 255, 255, 0.15)',
      'c-main-background': 'rgba(255, 255, 255, 0.8)',
      'bg-image': 'myzcbg.jpg',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'var(c-primary)',
      'c-badge-secondary': 'var(c-primary-light-100)',
      'c-badge-tertiary': 'var(c-primary-light-100)',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'china_ink',
    name: '近墨者黑',
    isDark: false,
    config: {
      primary: 'rgba(47, 47, 47, 1)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'rgba(255, 255, 255, 0)',
      'c-main-background': 'rgba(255, 255, 255, 0.8)',
      'bg-image': 'china_ink.jpg',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': 'rgba(137, 70, 70, 1)',
      'c-badge-secondary': 'rgba(67, 139, 65, 1)',
      'c-badge-tertiary': 'rgba(132, 135, 65, 1)',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'happy_new_year',
    name: '新年快乐',
    isDark: false,
    config: {
      primary: 'rgb(192, 57, 43)',
      font: 'rgb(33, 33, 33)',
      'c-app-background': 'rgba(255, 255, 255, 0.15)',
      'c-main-background': 'rgba(255, 255, 255, 0.8)',
      'bg-image': 'xnkl.png',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': '#7fb575',
      'c-badge-secondary': '#dfbb6b',
      'c-badge-tertiary': 'var(c-primary-light-100)',
      'c-liked': '#ef4444',
    },
  },
  {
    id: 'alger_dark',
    name: 'Alger 暗黑',
    isDark: true,
    config: {
      // Alger Music 风格的紫色系
      primary: '#6c5ce7',
      font: 'rgba(255, 255, 255, 0.95)',
      // 深色渐变背景（Alger 标志性）
      'c-app-background': 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
      'c-main-background': 'rgba(26, 26, 46, 0.85)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      // Alger Music 风格配色
      'c-badge-primary': '#6c5ce7',
      'c-badge-secondary': '#a29bfe',
      'c-badge-tertiary': '#74b9ff',
      'c-liked': '#ff6b6b',

      // Alger 特色：毛玻璃效果背景
      'c-card-background': 'rgba(255, 255, 255, 0.08)',
      'c-card-border': 'rgba(255, 255, 255, 0.12)',
      'c-shadow-color': 'rgba(108, 92, 231, 0.3)',
    },
  },
  {
    id: 'alger_light',
    name: 'Alger 亮色',
    isDark: false,
    config: {
      // Alger Music 风格的紫色系
      primary: '#6c5ce7',
      font: 'rgba(26, 26, 46, 0.95)',
      // 亮色渐变背景
      'c-app-background': 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f0f7 100%)',
      'c-main-background': 'rgba(255, 255, 255, 0.92)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      // Alger Music 风格配色
      'c-badge-primary': '#6c5ce7',
      'c-badge-secondary': '#a29bfe',
      'c-badge-tertiary': '#74b9ff',
      'c-liked': '#ff6b6b',

      // Alger 特色：毛玻璃效果背景
      'c-card-background': 'rgba(255, 255, 255, 0.7)',
      'c-card-border': 'rgba(108, 92, 231, 0.15)',
      'c-shadow-color': 'rgba(108, 92, 231, 0.2)',
    },
  },
  {
    id: 'alger_purple',
    name: 'Alger 紫罗兰',
    isDark: true,
    config: {
      // 深紫色渐变（Alger 标志性）
      primary: '#a29bfe',
      font: 'rgba(255, 255, 255, 0.95)',
      'c-app-background': 'linear-gradient(135deg, #1a0033 0%, #2d1b4e 50%, #1a1a2e 100%)',
      'c-main-background': 'rgba(45, 27, 78, 0.85)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': '#a29bfe',
      'c-badge-secondary': '#6c5ce7',
      'c-badge-tertiary': '#fd79a8',
      'c-liked': '#ff7675',

      'c-card-background': 'rgba(162, 155, 254, 0.1)',
      'c-card-border': 'rgba(162, 155, 254, 0.2)',
      'c-shadow-color': 'rgba(162, 155, 254, 0.4)',
    },
  },
  {
    id: 'alger_ocean',
    name: 'Alger 深海',
    isDark: true,
    config: {
      // 深蓝色渐变（Alger 海洋主题）
      primary: '#74b9ff',
      font: 'rgba(255, 255, 255, 0.95)',
      'c-app-background': 'linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #1a3a52 100%)',
      'c-main-background': 'rgba(13, 33, 55, 0.85)',
      'bg-image': '',
      'bg-image-position': 'center',
      'bg-image-size': 'cover',

      'c-badge-primary': '#74b9ff',
      'c-badge-secondary': '#0984e3',
      'c-badge-tertiary': '#00cec9',
      'c-liked': '#ff7675',

      'c-card-background': 'rgba(116, 185, 255, 0.08)',
      'c-card-border': 'rgba(116, 185, 255, 0.15)',
      'c-shadow-color': 'rgba(116, 185, 255, 0.3)',
    },
  },
]

const themes = defaultThemes.map(({ config: { primary, font, ...extInfo }, ...themeInfo }) => {
  return {
    ...themeInfo,
    isCustom: false,
    config: {
      themeColors: createThemeColors(primary, font, themeInfo.isDark),
      extInfo,
    },
  }
})

fs.writeFileSync(
  path.join(__dirname, 'themes.ts'),
  `//! 此文件由 createThemes.js 生成\n\nexport default ${JSON.stringify(themes, null, 2)} as const`
)
