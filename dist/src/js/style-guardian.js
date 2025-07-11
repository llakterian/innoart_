// Style Guardian - Ensures CSS styles persist and don't break
class StyleGuardian {
    constructor() {
        this.init();
    }
    init() {
        this.ensureStylesLoaded();
        this.preventStyleBreakage();
        this.monitorAnimations();
    }
    ensureStylesLoaded() {
        // Ensure global CSS is loaded
        const existingLink = document.querySelector('link[href*="global.css"]');
        if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'src/styles/global.css';
            document.head.appendChild(link);
        }
    }
    preventStyleBreakage() {
        // Prevent style resets from other sources
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target;
                    // Protect body background
                    if (target.tagName === 'BODY') {
                        const bodyStyle = target.style;
                        if (!bodyStyle.background || bodyStyle.background === 'none') {
                            this.restoreBodyBackground();
                        }
                    }
                }
            });
        });
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }
    restoreBodyBackground() {
        // Restore body background if it gets removed
        const body = document.body;
        if (!body.style.background || body.style.background === 'none') {
            body.style.background = 'var(--background-dark)';
            body.style.backgroundImage = `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
      `;
        }
    }
    monitorAnimations() {
        // Check if animations are still running
        setInterval(() => {
            const beforeElement = getComputedStyle(document.body, '::before');
            const afterElement = getComputedStyle(document.body, '::after');
            // If animations stop, restart them
            if (beforeElement.animationPlayState === 'paused' ||
                afterElement.animationPlayState === 'paused') {
                this.restartAnimations();
            }
        }, 5000); // Check every 5 seconds
    }
    restartAnimations() {
        // Force restart animations if they stop
        const style = document.createElement('style');
        style.textContent = `
      body::before, body::after {
        animation-play-state: running !important;
      }
    `;
        document.head.appendChild(style);
        // Remove the style after a short delay
        setTimeout(() => {
            document.head.removeChild(style);
        }, 100);
    }
    // Method to manually fix styles if needed
    fixStyles() {
        this.restoreBodyBackground();
        this.restartAnimations();
        this.ensureStylesLoaded();
    }
}
// Initialize style guardian
const styleGuardian = new StyleGuardian();
// Make it globally available for debugging
window.styleGuardian = styleGuardian;
// Auto-fix styles if page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        setTimeout(() => {
            styleGuardian.fixStyles();
        }, 100);
    }
});
