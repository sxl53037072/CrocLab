import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** 磁吸按钮 */
function initMagneticButtons(
  container: Element,
  selector: string,
  strength = 0.4,
) {
  container.querySelectorAll<HTMLElement>(selector).forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.45, ease: 'power3.out' });

    btn.addEventListener('mouseenter', () => btn.classList.add('is-magnetic-hover'));
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('is-magnetic-hover');
      xTo(0);
      yTo(0);
    });
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((e.clientX - cx) * strength);
      yTo((e.clientY - cy) * strength);
    });
  });
}

/** CTA 区鼠标光斑（仅在该区块激活） */
function initCtaSpotlight(section: HTMLElement) {
  const primary = section.querySelector<HTMLElement>(
    '.cta-spotlight:not(.cta-spotlight-secondary)',
  );
  const secondary = section.querySelector<HTMLElement>('.cta-spotlight-secondary');
  if (!primary) return;

  const pX = gsap.quickTo(primary, 'left', { duration: 0.28, ease: 'power2.out' });
  const pY = gsap.quickTo(primary, 'top', { duration: 0.28, ease: 'power2.out' });
  const sX = secondary
    ? gsap.quickTo(secondary, 'left', { duration: 0.38, ease: 'power2.out' })
    : null;
  const sY = secondary
    ? gsap.quickTo(secondary, 'top', { duration: 0.38, ease: 'power2.out' })
    : null;

  section.addEventListener('mouseenter', () => section.classList.add('is-spotlight-active'));
  section.addEventListener('mouseleave', () => section.classList.remove('is-spotlight-active'));

  section.addEventListener('mousemove', (e) => {
    pX(e.clientX);
    pY(e.clientY);
    if (sX && sY) {
      sX(e.clientX + 40);
      sY(e.clientY + 30);
    }
  });
}

/** 首页磁吸：Hero / 博客等主按钮（CTA 按钮在 CTA 区块单独处理） */
const HOME_MAGNETIC_SELECTOR = 'main .btn-primary, main .btn-secondary';

/** 产品卡片：滚入视口时逐张飞入（无 pin，布局稳定） */
function initProductsReveal() {
  const section = document.querySelector('.products-section');
  if (!section) return;

  const cards = gsap.utils.toArray<HTMLElement>('.product-card-pin');
  const extHeader = section.querySelector('.products-extensions-header');

  // 产品区主标题
  gsap.from('.products-header > *', {
    y: 36,
    autoAlpha: 0,
    duration: 0.75,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.products-header',
      start: 'top 82%',
      toggleActions: 'play none none none',
    },
  });

  // 每张卡片独立飞入，左右交替，动感明显且不影响文档流
  cards.forEach((card, i) => {
    const fromLeft = i % 2 === 0;
    gsap.fromTo(
      card,
      {
        autoAlpha: 0,
        y: 90,
        x: fromLeft ? -70 : 70,
        scale: 0.86,
        rotation: fromLeft ? -10 : 10,
        filter: 'blur(6px)',
      },
      {
        autoAlpha: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotation: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      },
    );
  });

  if (extHeader) {
    gsap.from(extHeader.children, {
      y: 32,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: extHeader,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }
}

/** 博客卡片：整组一次触发，避免 batch 漏掉首张 */
function initBlogCardsReveal() {
  const grid = document.querySelector('.blog-posts-grid');
  if (!grid) return;

  const cards = gsap.utils.toArray<HTMLElement>('.blog-card', grid);
  if (!cards.length) return;

  gsap.set(cards, { autoAlpha: 0, y: 36 });

  ScrollTrigger.create({
    trigger: grid,
    start: 'top 88%',
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
      });
    },
  });
}

const initHomeAnimations = () => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isMotion: '(prefers-reduced-motion: no-preference)',
      isDesktop: '(min-width: 1024px) and (pointer: fine)',
    },
    (context) => {
      const { isMotion, isDesktop } = context.conditions as {
        isMotion: boolean;
        isDesktop: boolean;
      };

      if (!isMotion) return;

      if (isDesktop) {
        initMagneticButtons(document.body, HOME_MAGNETIC_SELECTOR, 0.38);
      }

      document
        .querySelectorAll('.animate-on-scroll, .reveal-left, .reveal-right')
        .forEach((el) => el.classList.add('visible'));

      document
        .querySelectorAll<HTMLElement>('.float-slow, .float-medium')
        .forEach((el) => el.classList.remove('float-slow', 'float-medium'));

      // Hero 入场
      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 },
      });

      heroTl
        .from('.hero-badge', { y: 18, autoAlpha: 0, duration: 0.5 })
        .from('.hero-title', { y: 32, autoAlpha: 0, filter: 'blur(8px)' }, '<0.1')
        .from('.hero-subtitle', { y: 22, autoAlpha: 0 }, '<0.18')
        .from('.hero-cta-row > *', { y: 18, autoAlpha: 0, stagger: 0.08 }, '<0.15')
        .from(
          '.hero-icons-row .product-mini-icon',
          {
            autoAlpha: 0,
            y: 16,
            stagger: { each: 0.07, from: 'start' },
            ease: 'back.out(1.7)',
            duration: 0.55,
          },
          '<0.2',
        )
        .from('.hero-icons-stats', { x: -12, autoAlpha: 0, duration: 0.6 }, '<0.3');

      gsap.utils.toArray<HTMLElement>('.hero-section .blob').forEach((blob, i) => {
        gsap.to(blob, {
          xPercent: gsap.utils.random(-12, 12),
          yPercent: gsap.utils.random(-12, 12),
          scale: gsap.utils.random(0.92, 1.08),
          duration: gsap.utils.random(6, 10),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.4,
        });
      });

      gsap.to('.hero-section .blob', {
        yPercent: '-=40',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-carousel', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      if (isDesktop) {
        const heroSection = document.querySelector<HTMLElement>('.hero-section');
        if (heroSection) {
          const blobs = gsap.utils.toArray<HTMLElement>('.hero-section .blob');
          const quickX = blobs.map((b) =>
            gsap.quickTo(b, 'x', { duration: 1.2, ease: 'power3' }),
          );
          const quickY = blobs.map((b) =>
            gsap.quickTo(b, 'y', { duration: 1.2, ease: 'power3' }),
          );

          heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
            const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
            blobs.forEach((_, i) => {
              const intensity = 30 + i * 18;
              quickX[i](xRatio * intensity);
              quickY[i](yRatio * intensity);
            });
          });
        }
      }

      const carousel = document.getElementById('hero-carousel');
      if (carousel) {
        const slides = carousel.querySelectorAll<HTMLElement>('.hero-slide');
        slides.forEach((slide) => {
          const img = slide.querySelector('img');
          if (img) gsap.set(img, { scale: 1.08, transformOrigin: '50% 55%' });
        });

        const kenBurns = (slide: Element) => {
          const img = slide.querySelector('img');
          if (!img) return;
          gsap.fromTo(
            img,
            { scale: 1.15, x: -12 },
            { scale: 1.0, x: 12, duration: 6, ease: 'power1.out', overwrite: true },
          );
        };

        const firstActive = carousel.querySelector('.hero-slide.active');
        if (firstActive) kenBurns(firstActive);

        const observer = new MutationObserver((mutations) => {
          mutations.forEach((m) => {
            if (m.attributeName !== 'class') return;
            const target = m.target as HTMLElement;
            if (target.classList.contains('active')) kenBurns(target);
          });
        });
        slides.forEach((s) => observer.observe(s, { attributes: true }));
      }

      // 其他区块标题（排除产品区，产品区单独处理）
      ScrollTrigger.batch('.section-eyebrow, .section-title, .section-sub', {
        start: 'top 85%',
        onEnter: (els) => {
          const filtered = els.filter((el) => !el.closest('.products-section'));
          if (!filtered.length) return;
          gsap.from(filtered, {
            y: 28,
            autoAlpha: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          });
        },
      });

      initProductsReveal();
      initBlogCardsReveal();

      const featuresWrap = document.querySelector('.reveal-left .features-list');
      if (featuresWrap) {
        gsap.from(featuresWrap.children, {
          x: -30,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.reveal-left', start: 'top 75%' },
        });
      }

      gsap.from('.reveal-left .section-eyebrow, .reveal-left h2, .reveal-left p', {
        x: -40,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.reveal-left', start: 'top 75%' },
      });

      gsap.from('.reveal-right', {
        x: 60,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.reveal-right', start: 'top 75%' },
      });

      gsap.fromTo(
        '.showcase-image',
        { scale: 1.06 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.showcase-image',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      const ctaSection = document.querySelector<HTMLElement>('.cta-section');
      if (ctaSection) {
        const ctaTrigger = {
          trigger: ctaSection,
          start: 'top 75%',
          once: true,
        };

        gsap.from('.cta-logo', {
          scale: 0,
          rotation: -180,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'back.out(1.6)',
          scrollTrigger: ctaTrigger,
        });
        gsap.from('.cta-title', {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          delay: 0.25,
          ease: 'power3.out',
          scrollTrigger: ctaTrigger,
        });
        gsap.from('.cta-sub', {
          y: 22,
          autoAlpha: 0,
          duration: 0.7,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: ctaTrigger,
        });
        gsap.from('.cta-actions > *', {
          y: 18,
          autoAlpha: 0,
          duration: 0.6,
          delay: 0.55,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: ctaTrigger,
        });

        gsap.fromTo(
          '.cta-bg-image',
          { scale: 1.1 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: ctaSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );

        if (isDesktop) {
          initCtaSpotlight(ctaSection);
          initMagneticButtons(
            ctaSection,
            '.cta-btn-primary, .cta-btn-secondary',
            0.45,
          );
        }
      }

      window.addEventListener('load', () => ScrollTrigger.refresh());
    },
  );
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomeAnimations);
} else {
  initHomeAnimations();
}
