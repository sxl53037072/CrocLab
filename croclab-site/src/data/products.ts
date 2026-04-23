export interface Product {
  id: string;
  name: string;
  tagline: string;
  taglineZh: string;
  description: string;
  descriptionZh: string;
  type: 'app' | 'extension';
  icon: string;
  emoji: string;
  color: string;
  gradient: string;
  platforms: {
    ios?: string;
    android?: string;
    chrome?: string;
  };
  features: {
    icon: string;
    title: string;
    titleZh: string;
    description: string;
    descriptionZh: string;
  }[];
  screenshots: string[];
  pricing?: {
    free: string[];
    freeZh: string[];
    pro?: { price: string; features: string[]; featuresZh: string[] };
  };
}

export const products: Product[] = [
  {
    id: 'focuscroc',
    name: 'FocusCroc',
    tagline: 'Stay focused. Get more done.',
    taglineZh: '保持专注，高效完成。',
    description: 'The Pomodoro timer that actually works. Customizable intervals, focus stats, and gentle reminders to keep you in the zone.',
    descriptionZh: '真正好用的番茄钟。自定义时间间隔、专注统计和温和提醒，帮你保持最佳状态。',
    type: 'app',
    icon: '/images/focuscroc/icon.webp',
    emoji: '🍅',
    color: '#E74C3C',
    gradient: 'from-red-500 to-orange-500',
    platforms: {
      ios: 'https://apps.apple.com/us/app/focuscroc/id6757192119',
      android: '#',
    },
    features: [
      { icon: '⏱️', title: 'Smart Timer', titleZh: '智能计时', description: 'Customizable Pomodoro intervals that adapt to your workflow', descriptionZh: '可自定义的番茄钟间隔，适应你的工作节奏' },
      { icon: '📊', title: 'Focus Stats', titleZh: '专注统计', description: 'Track your productivity trends over days, weeks, and months', descriptionZh: '按日、周、月追踪你的生产力趋势' },
      { icon: '🔔', title: 'Gentle Reminders', titleZh: '温和提醒', description: 'Non-intrusive break alerts that respect your flow state', descriptionZh: '不打扰的休息提醒，尊重你的专注状态' },
      { icon: '🎨', title: 'Beautiful Design', titleZh: '精美设计', description: 'Clean, minimal interface that keeps you focused on what matters', descriptionZh: '简洁优雅的界面，让你专注于重要的事' },
    ],
    screenshots: [],
  },
  {
    id: 'dreamtone',
    name: 'DreamTone',
    tagline: 'Better sleep starts tonight.',
    taglineZh: '今晚开始，睡得更好。',
    description: 'Curated ambient sounds and sleep tools to help you fall asleep faster and wake up refreshed.',
    descriptionZh: '精心策划的环境音和睡眠工具，帮你更快入睡，精神焕发地醒来。',
    type: 'app',
    icon: '/images/dreamtone/icon.webp',
    emoji: '🌙',
    color: '#6C5CE7',
    gradient: 'from-purple-500 to-indigo-500',
    platforms: {
      ios: 'https://apps.apple.com/us/app/dreamtone-sleep-sounds/id6762450717',
      android: '#',
    },
    features: [
      { icon: '🌙', title: 'Ambient Sounds', titleZh: '环境音效', description: 'Rain, ocean, forest, and 30+ carefully crafted soundscapes', descriptionZh: '雨声、海浪、森林等 30+ 精心打造的声景' },
      { icon: '⏰', title: 'Sleep Timer', titleZh: '睡眠计时', description: 'Auto-stop after you fall asleep — never drains your battery', descriptionZh: '入睡后自动停止，不浪费电池' },
      { icon: '📈', title: 'Sleep Tracking', titleZh: '睡眠追踪', description: 'Understand your sleep patterns and improve over time', descriptionZh: '了解你的睡眠模式，逐步改善' },
      { icon: '🎵', title: 'Mix & Match', titleZh: '混搭组合', description: 'Combine multiple sounds to create your perfect sleep environment', descriptionZh: '组合多种声音，打造完美的睡眠环境' },
    ],
    screenshots: [],
  },
  {
    id: 'aidock',
    name: 'AiDock',
    tagline: 'AI superpowers in every tab.',
    taglineZh: '每个标签页的 AI 超能力。',
    description: 'Enhance your AI chat experience across ChatGPT, Claude, Gemini, and more — all from one Chrome extension.',
    descriptionZh: '增强你在 ChatGPT、Claude、Gemini 等平台上的 AI 对话体验——一个扩展搞定。',
    type: 'extension',
    icon: '/images/aidock/icon.webp',
    emoji: '🤖',
    color: '#0984E3',
    gradient: 'from-blue-500 to-cyan-500',
    platforms: {
      chrome: 'https://chromewebstore.google.com/detail/aidock-%E2%80%94-ai-%E5%AF%B9%E8%AF%9D%E7%AE%A1%E7%90%86%E5%99%A8/egalaijjmojfnnefehaajbedfjabpijd',
    },
    features: [
      { icon: '🤖', title: 'Multi-Platform', titleZh: '多平台支持', description: 'Works with ChatGPT, Claude, Gemini, and other AI platforms', descriptionZh: '支持 ChatGPT、Claude、Gemini 等 AI 平台' },
      { icon: '⚡', title: 'Quick Prompts', titleZh: '快捷提示', description: 'One-click prompt templates for common tasks', descriptionZh: '一键提示词模板，快速完成常见任务' },
      { icon: '📋', title: 'Chat Management', titleZh: '对话管理', description: 'Organize and manage your AI conversations efficiently', descriptionZh: '高效组织和管理你的 AI 对话' },
      { icon: '🔒', title: 'Privacy First', titleZh: '隐私优先', description: 'All processing happens locally — your data never leaves your browser', descriptionZh: '所有处理本地完成，数据不离开浏览器' },
    ],
    screenshots: [],
    pricing: {
      free: ['Basic prompt templates', 'Single platform support', 'Chat organization'],
      freeZh: ['基础提示词模板', '单平台支持', '对话组织'],
      pro: {
        price: '$4.9/month',
        features: ['Unlimited prompt library', 'All AI platforms', 'Advanced management', 'Custom templates'],
        featuresZh: ['无限提示词库', '全平台支持', '高级管理', '自定义模板'],
      },
    },
  },
  {
    id: 'devcodec',
    name: 'DevCodec',
    tagline: 'Decode anything. Instantly.',
    taglineZh: '即时解码一切。',
    description: 'JSON formatter, Base64 encoder/decoder, URL parser, JWT debugger, and more — all in your browser sidebar.',
    descriptionZh: 'JSON 格式化、Base64 编解码、URL 解析、JWT 调试等——全在浏览器侧边栏。',
    type: 'extension',
    icon: '/images/devcodec/icon.webp',
    emoji: '🔧',
    color: '#00B894',
    gradient: 'from-emerald-500 to-teal-500',
    platforms: {
      chrome: 'https://chromewebstore.google.com/detail/devcodec-%E5%BC%80%E5%8F%91%E8%80%85%E7%BC%96%E8%A7%A3%E7%A0%81%E5%B7%A5%E5%85%B7%E7%AE%B1/aldgckgohkcgckielncdbiinjimiffmo',
    },
    features: [
      { icon: '🔧', title: 'All-in-One Toolkit', titleZh: '一站式工具', description: 'JSON, Base64, URL encode/decode, JWT, hash, and more', descriptionZh: 'JSON、Base64、URL 编解码、JWT、哈希等' },
      { icon: '⚡', title: 'Instant Results', titleZh: '即时结果', description: 'No server calls — everything runs locally in your browser', descriptionZh: '无需服务器，所有运算在浏览器本地完成' },
      { icon: '🎨', title: 'Clean UI', titleZh: '简洁界面', description: 'Minimal, distraction-free interface in your browser sidebar', descriptionZh: '极简无干扰界面，在浏览器侧边栏使用' },
      { icon: '📦', title: 'Lightweight', titleZh: '轻量级', description: 'Zero bloat — only the tools developers actually need', descriptionZh: '零冗余，只有开发者真正需要的工具' },
    ],
    screenshots: [],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getAppProducts(): Product[] {
  return products.filter(p => p.type === 'app');
}

export function getExtensionProducts(): Product[] {
  return products.filter(p => p.type === 'extension');
}
