const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto('https://naughtyduk.com/', { waitUntil: 'networkidle', timeout: 30000 });
    
    const scripts = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
    });
    
    const stylesheets = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
    });
    
    const frameworks = await page.evaluate(() => {
        return {
            react: !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || !!document.querySelector('#__next'),
            vue: !!window.__VUE__,
            next: !!window.__NEXT_DATA__,
            gsap: !!window.gsap,
            three: !!window.THREE,
            lenis: !!window.lenis,
            lottie: !!window.lottie,
        };
    });
    
    const animationClasses = await page.evaluate(() => {
        const classes = new Set();
        document.querySelectorAll('*').forEach(el => {
            el.classList.forEach(cls => {
                if (cls.includes('anim') || cls.includes('fade') || cls.includes('slide') || 
                    cls.includes('reveal') || cls.includes('motion') || cls.includes('scroll')) {
                    classes.add(cls);
                }
            });
        });
        return Array.from(classes);
    });
    
    const structure = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('section, [class*="section"], main, header, footer, nav')).map((s, i) => ({
            tag: s.tagName,
            className: s.className?.substring(0, 100),
            id: s.id,
        }));
    });
    
    // Check for GSAP animations
    const gsapInfo = await page.evaluate(() => {
        if (window.gsap) {
            return {
                version: window.gsap.version,
                plugins: Object.keys(window.gsap.plugins || {}),
            };
        }
        return null;
    });
    
    // Check for ScrollTrigger
    const scrollTrigger = await page.evaluate(() => {
        return !!window.ScrollTrigger;
    });
    
    console.log('=== SCRIPTS ===');
    scripts.forEach(s => console.log(s));
    
    console.log('\n=== STYLESHEETS ===');
    stylesheets.forEach(s => console.log(s));
    
    console.log('\n=== FRAMEWORKS ===');
    console.log(JSON.stringify(frameworks, null, 2));
    
    console.log('\n=== GSAP ===');
    console.log(JSON.stringify(gsapInfo, null, 2));
    
    console.log('\n=== SCROLL TRIGGER ===');
    console.log(scrollTrigger);
    
    console.log('\n=== ANIMATION CLASSES ===');
    console.log(animationClasses);
    
    console.log('\n=== STRUCTURE ===');
    console.log(JSON.stringify(structure, null, 2));
    
    await browser.close();
})();
