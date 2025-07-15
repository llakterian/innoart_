// Currency Converter for ETH to KES and other currencies
class CurrencyConverter {
    constructor() {
        this.rates = {};
        this.lastUpdate = null;
        this.UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes
        this.init();
    }
    
    async init() {
        await this.fetchRates();
        this.startAutoUpdate();
    }
    
    async fetchRates() {
        try {
            // Using CoinGecko free API
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=kes,usd,eur,gbp,jpy,cad,aud,chf,cny,inr');
            const data = await response.json();
            
            if (data.ethereum) {
                this.rates = data.ethereum;
                this.lastUpdate = new Date();
                this.updateUI();
            }
        } catch (error) {
            console.error('Failed to fetch exchange rates:', error);
            // Fallback rates if API fails
            this.rates = {
                kes: 450000, // Approximate ETH to KES
                usd: 3400,   // Approximate ETH to USD
                eur: 3100,   // Approximate ETH to EUR
                gbp: 2600,   // Approximate ETH to GBP
                jpy: 520000, // Approximate ETH to JPY
                cad: 4700,   // Approximate ETH to CAD
                aud: 5200,   // Approximate ETH to AUD
                chf: 3050,   // Approximate ETH to CHF
                cny: 24000,  // Approximate ETH to CNY
                inr: 290000  // Approximate ETH to INR
            };
        }
    }
    
    startAutoUpdate() {
        setInterval(() => {
            this.fetchRates();
        }, this.UPDATE_INTERVAL);
    }
    
    convertETH(ethAmount, targetCurrency = 'kes') {
        const rate = this.rates[targetCurrency.toLowerCase()];
        if (!rate) {
            console.warn(`Currency ${targetCurrency} not supported`);
            return null;
        }
        
        return (parseFloat(ethAmount) * rate).toFixed(2);
    }
    
    formatCurrency(amount, currency = 'kes') {
        const currencySymbols = {
            kes: 'KES',
            usd: '$',
            eur: '€',
            gbp: '£',
            jpy: '¥',
            cad: 'C$',
            aud: 'A$',
            chf: 'CHF',
            cny: '¥',
            inr: '₹'
        };
        
        const symbol = currencySymbols[currency.toLowerCase()] || currency.toUpperCase();
        return `${symbol} ${parseFloat(amount).toLocaleString()}`;
    }
    
    updateUI() {
        // Update all price displays on the page
        const priceElements = document.querySelectorAll('.price-converter');
        
        priceElements.forEach(element => {
            const ethAmount = element.dataset.ethAmount;
            const currency = element.dataset.currency || 'kes';
            
            if (ethAmount && this.rates[currency.toLowerCase()]) {
                const convertedAmount = this.convertETH(ethAmount, currency);
                const formattedAmount = this.formatCurrency(convertedAmount, currency);
                
                element.innerHTML = `
                    <span class="eth-price">${ethAmount} ETH</span>
                    <span class="fiat-price">(${formattedAmount})</span>
                `;
            }
        });
        
        // Update last update timestamp
        const updateElements = document.querySelectorAll('.rates-update-time');
        updateElements.forEach(element => {
            element.textContent = `Last updated: ${this.lastUpdate.toLocaleTimeString()}`;
        });
    }
    
    getSupportedCurrencies() {
        return Object.keys(this.rates);
    }
    
    getRate(currency) {
        return this.rates[currency.toLowerCase()];
    }
}

// Initialize currency converter
window.currencyConverter = new CurrencyConverter();

// Helper function to create price display elements
function createPriceDisplay(ethAmount, currency = 'kes') {
    const element = document.createElement('div');
    element.className = 'price-converter';
    element.dataset.ethAmount = ethAmount;
    element.dataset.currency = currency;
    
    if (window.currencyConverter && window.currencyConverter.rates[currency.toLowerCase()]) {
        const convertedAmount = window.currencyConverter.convertETH(ethAmount, currency);
        const formattedAmount = window.currencyConverter.formatCurrency(convertedAmount, currency);
        
        element.innerHTML = `
            <span class="eth-price">${ethAmount} ETH</span>
            <span class="fiat-price">(${formattedAmount})</span>
        `;
    } else {
        element.innerHTML = `<span class="eth-price">${ethAmount} ETH</span>`;
    }
    
    return element;
}

// CSS for price display
const priceStyles = document.createElement('style');
priceStyles.textContent = `
    .price-converter {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .eth-price {
        font-weight: 600;
        color: var(--primary-color);
        font-size: 1.2rem;
    }
    
    .fiat-price {
        font-size: 0.9rem;
        color: var(--text-dark);
    }
    
    .rates-update-time {
        font-size: 0.8rem;
        color: var(--text-dark);
        text-align: center;
        margin-top: 0.5rem;
    }
`;
document.head.appendChild(priceStyles);
