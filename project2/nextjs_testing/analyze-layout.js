const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    
    await page.goto('https://naughtyduk.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(5000);
    
    // Get detailed layout info
    const layout = await page.evaluate(() => {
        const sections = [];
        document.querySelectorAll('section, [class*="section"], [class*="hero"], [class*="grid"]').forEach(el => {
            const rect = el.getBoundingClientRect();
            sections.push({
                tag: el.tagName,
                className: el.className?.substring(0, 150),
                width: rect.width,
                height: rect.height,
                top: rect.top,
                childCount: el.children.length,
            });
        });
        return sections;
    });
    
    // Get typography
    const typography = await page.evaluate(() => {
        const headings = [];
        document.querySelectorAll('h1, h2, h3, h4').forEach(el => {
            const style = getComputedStyle(el);
            headings.push({
                tag: el.tagName,
                text: el.textContent?.substring(0, 80),
                fontSize: style.fontSize,
                fontWeight: style.fontWeight,
                fontFamily: style.fontFamily?.substring(0, 80),
                lineHeight: style.lineHeight,
                letterSpacing: style.letterSpacing,
                color: style.color,
            });
        });
        return headings;
    });
    
    // Get grid items specifically
    const gridItems = await page.evaluate(() => {
        const grids = [];
        document.querySelectorAll('[class*="grid"], [style*="grid"]').forEach(grid => {
            const items = Array.from(grid.children).map(child => ({
                className: child.className?.substring(0, 100),
                width: child.getBoundingClientRect().width,
                height: child.getBoundingClientRect().height,
            }));
            grids.push({
                className: grid.className?.substring(0, 150),
                columns: getComputedStyle(grid).gridTemplateColumns,
                gap: getComputedStyle(grid).gap,
                itemCount: items.length,
                items: items.slice(0, 6),
            });
        });
        return grids;
    });
    
    // Get all text content and structure
    const structure = await page.evaluate(() => {
        const body = document.body;
        const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);
        const texts = [];
        while (walker.nextNode()) {
            const text = walker.currentNode.textContent?.trim();
            if (text && text.length > 2) {
                texts.push(text.substring(0, 100));
            }
        }
        return texts.slice(0, 50);
    });
    
    // Get all stylesheets
    const stylesheets = await page.evaluate(() => {
        return Array.from(document.styleSheets).map(s => s.href).filter(Boolean);
    });
    
    // Get scripts
    const scripts = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
    });
    
    // Check for frameworks
    const frameworks = await page.evaluate(() => {
        return {
            react: !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__,
            next: !!window.__NEXT_DATA__,
            gsap: !!window.gsap,
            three: !!window.THREE,
            lenis: !!window.lenis,
            lottie: !!window.lottie,
            framerMotion: !!window.__framer_motion,
            nuxt: !!window.__NUXT__,
            vue: !!window.__VUE__,
        };
    });
    
    // Take screenshots
    await page.screenshot({ path: '/tmp/naughtyduk-hero.png' });
    
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/tmp/naughtyduk-grid.png' });
    
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/tmp/naughtyduk-grid2.png' });
    
    console.log('=== TYPOGRAPHY ===');
    console.log(JSON.stringify(typography, null, 2));
    
    console.log('\n=== GRID LAYOUTS ===');
    console.log(JSON.stringify(gridItems, null, 2));
    
    console.log('\n=== FRAMEWORKS ===');
    console.log(JSON.stringify(frameworks, null, 2));
    
    console.log('\n=== SCRIPTS ===');
    scripts.forEach(s => console.log(s));
    
    console.log('\n=== STYLESHEETS ===');
    stylesheets.forEach(s => console.log(s));
    
    console.log('\n=== PAGE TEXTS ===');
    structure.forEach(t => console.log(t));
    
    await browser.close();
})();
