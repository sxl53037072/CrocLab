export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const translations = {
  en: {
    'nav.apps': 'Apps',
    'nav.extensions': 'Extensions',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    'hero.tagline': 'Independent Developer Studio',
    'hero.title': 'Crafting tools that make your digital life simpler.',
    'hero.description': 'We build focused, beautiful apps and browser extensions — one product at a time.',
    'hero.cta': 'Explore Our Products',

    'products.title': 'Our Products',
    'products.subtitle': 'Each product is carefully designed to solve a real problem.',
    'products.learnMore': 'Learn More',
    'products.apps': 'Mobile Apps',
    'products.extensions': 'Chrome Extensions',

    'blog.title': 'Latest from the Blog',
    'blog.subtitle': 'Tips, guides, and insights on productivity, sleep, AI, and developer tools.',
    'blog.readMore': 'Read More',
    'blog.viewAll': 'View All Posts',
    'blog.minRead': 'min read',

    'about.title': 'About CrocLab',
    'about.description': 'CrocLab is an independent developer studio dedicated to building focused, high-quality apps and browser extensions. Our name comes from our first product, FocusCroc — the "Croc" represents persistence and precision, while "Lab" reflects our spirit of continuous experimentation.',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'To create tools that are simple, useful, and delightful. We believe great software doesn\'t need to be complex — it needs to solve real problems elegantly.',
    'about.values.title': 'Our Values',
    'about.values.quality': 'Quality over quantity — every product is crafted with care',
    'about.values.privacy': 'Privacy first — we never sell your data',
    'about.values.simple': 'Simplicity — powerful features, intuitive interfaces',
    'about.values.global': 'Global mindset — built for users worldwide',

    'contact.title': 'Get in Touch',
    'contact.description': 'Have questions, feedback, or partnership ideas? We\'d love to hear from you.',
    'contact.email': 'Email Us',
    'contact.twitter': 'Follow on X',

    'footer.rights': 'All rights reserved.',
    'footer.madeWith': 'Made with',
    'footer.by': 'by CrocLab',
    'footer.products': 'Products',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',

    'product.features': 'Features',
    'product.screenshots': 'Screenshots',
    'product.download': 'Download',
    'product.addToChrome': 'Add to Chrome — It\'s Free',
    'product.appStore': 'Download on App Store',
    'product.playStore': 'Get it on Google Play',
    'product.pricing': 'Pricing',
    'product.free': 'Free',
    'product.pro': 'Pro',
    'product.faq': 'FAQ',
    'product.backToHome': 'Back to CrocLab',
  },
  zh: {
    'nav.apps': '应用',
    'nav.extensions': '浏览器扩展',
    'nav.blog': '博客',
    'nav.about': '关于',
    'nav.contact': '联系',

    'hero.tagline': '独立开发者工作室',
    'hero.title': '打造让数字生活更简单的工具。',
    'hero.description': '我们专注构建精美的应用和浏览器扩展——一次一个产品。',
    'hero.cta': '探索我们的产品',

    'products.title': '我们的产品',
    'products.subtitle': '每个产品都精心设计，解决真实的问题。',
    'products.learnMore': '了解更多',
    'products.apps': '移动应用',
    'products.extensions': '浏览器扩展',

    'blog.title': '最新博客',
    'blog.subtitle': '关于效率、睡眠、AI 和开发工具的技巧、指南和洞察。',
    'blog.readMore': '阅读全文',
    'blog.viewAll': '查看所有文章',
    'blog.minRead': '分钟阅读',

    'about.title': '关于 CrocLab',
    'about.description': 'CrocLab 是一个独立开发者工作室，致力于构建专注、高品质的应用和浏览器扩展。我们的名字来源于第一个产品 FocusCroc——"Croc"代表坚韧和精准，而"Lab"体现了我们持续实验的精神。',
    'about.mission.title': '我们的使命',
    'about.mission.text': '创造简单、实用且令人愉悦的工具。我们相信好软件不必复杂——它需要优雅地解决真实问题。',
    'about.values.title': '我们的价值观',
    'about.values.quality': '质量优于数量——每个产品都精心打造',
    'about.values.privacy': '隐私至上——我们绝不出售你的数据',
    'about.values.simple': '简洁至上——强大功能，直觉界面',
    'about.values.global': '全球视野——为全球用户而生',

    'contact.title': '联系我们',
    'contact.description': '有问题、反馈或合作想法？欢迎随时联系。',
    'contact.email': '发送邮件',
    'contact.twitter': '关注 X',

    'footer.rights': '版权所有。',
    'footer.madeWith': '用',
    'footer.by': '由 CrocLab 制作',
    'footer.products': '产品',
    'footer.resources': '资源',
    'footer.legal': '法律',
    'footer.privacy': '隐私政策',
    'footer.terms': '使用条款',

    'product.features': '功能特色',
    'product.screenshots': '截图',
    'product.download': '下载',
    'product.addToChrome': '添加到 Chrome — 免费',
    'product.appStore': '在 App Store 下载',
    'product.playStore': '在 Google Play 下载',
    'product.pricing': '定价',
    'product.free': '免费版',
    'product.pro': '专业版',
    'product.faq': '常见问题',
    'product.backToHome': '返回 CrocLab',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function useTranslation(lang: Lang) {
  return function t(key: TranslationKey): string {
    return translations[lang][key] || translations[defaultLang][key] || key;
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}
