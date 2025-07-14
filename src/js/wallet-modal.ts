import { Web3Handler } from './web3';
import { WalletProvider } from './wallet-connector';

export class WalletModal {
  private modal: HTMLElement | null = null;
  private web3Handler: Web3Handler;
  private onConnected?: () => void;

  constructor(onConnected?: () => void) {
    this.web3Handler = Web3Handler.getInstance();
    this.onConnected = onConnected;
  }

  public show(): void {
    if (this.modal) {
      this.modal.remove();
    }
    
    this.createModal();
    document.body.appendChild(this.modal!);
    
    // Animate in
    requestAnimationFrame(() => {
      this.modal?.classList.add('active');
    });
  }

  public hide(): void {
    if (!this.modal) return;
    
    this.modal.classList.remove('active');
    setTimeout(() => {
      this.modal?.remove();
      this.modal = null;
    }, 300);
  }

  private createModal(): void {
    const wallets = this.web3Handler.getAvailableWallets();
    
    this.modal = document.createElement('div');
    this.modal.className = 'wallet-modal-overlay';
    this.modal.innerHTML = `
      <div class="wallet-modal">
        <div class="wallet-modal-header">
          <h3>Connect Wallet</h3>
          <button class="close-btn" aria-label="Close">&times;</button>
        </div>
        <div class="wallet-modal-content">
          <p>Choose your preferred wallet to connect to InnArt</p>
          <div class="wallet-list">
            ${wallets.map(wallet => `
              <button class="wallet-option" data-wallet="${wallet.name}">
                <span class="wallet-icon">${wallet.icon}</span>
                <span class="wallet-name">${wallet.name}</span>
                <span class="wallet-status">${wallet.isInstalled() ? 'Installed' : 'Not Installed'}</span>
              </button>
            `).join('')}
          </div>
          ${wallets.length === 0 ? `
            <div class="no-wallets">
              <p>No wallets detected. Please install a supported wallet:</p>
              <ul>
                <li><a href="https://metamask.io" target="_blank">MetaMask</a></li>
                <li><a href="https://www.coinbase.com/wallet" target="_blank">Coinbase Wallet</a></li>
                <li><a href="https://trustwallet.com" target="_blank">Trust Wallet</a></li>
              </ul>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.setupEventListeners();
    this.injectStyles();
  }

  private setupEventListeners(): void {
    if (!this.modal) return;

    // Close button
    const closeBtn = this.modal.querySelector('.close-btn');
    closeBtn?.addEventListener('click', () => this.hide());

    // Overlay click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    });

    // Wallet options
    const walletOptions = this.modal.querySelectorAll('.wallet-option');
    walletOptions.forEach(option => {
      option.addEventListener('click', async (e) => {
        const walletName = (e.currentTarget as HTMLElement).dataset.wallet;
        if (walletName) {
          await this.connectToWallet(walletName);
        }
      });
    });

    // ESC key
    document.addEventListener('keydown', this.handleEscKey);
  }

  private handleEscKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.hide();
      document.removeEventListener('keydown', this.handleEscKey);
    }
  };

  private async connectToWallet(walletName: string): Promise<void> {
    try {
      this.setConnecting(walletName, true);
      
      const success = await this.web3Handler.connectWallet(walletName);
      
      if (success) {
        this.hide();
        this.onConnected?.();
        this.showSuccess(`Connected to ${walletName}!`);
      } else {
        this.showError(`Failed to connect to ${walletName}`);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      this.showError(error instanceof Error ? error.message : 'Connection failed');
    } finally {
      this.setConnecting(walletName, false);
    }
  }

  private setConnecting(walletName: string, isConnecting: boolean): void {
    const walletOption = this.modal?.querySelector(`[data-wallet="${walletName}"]`);
    if (walletOption) {
      walletOption.classList.toggle('connecting', isConnecting);
      const statusElement = walletOption.querySelector('.wallet-status');
      if (statusElement) {
        statusElement.textContent = isConnecting ? 'Connecting...' : 'Installed';
      }
    }
  }

  private showSuccess(message: string): void {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    document.body.appendChild(successElement);
    setTimeout(() => successElement.remove(), 3000);
  }

  private showError(message: string): void {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
    setTimeout(() => errorElement.remove(), 5000);
  }

  private injectStyles(): void {
    if (document.getElementById('wallet-modal-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'wallet-modal-styles';
    styles.textContent = `
      .wallet-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .wallet-modal-overlay.active {
        opacity: 1;
      }

      .wallet-modal {
        background: var(--card-background);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 0;
        width: 100%;
        max-width: 480px;
        max-height: 80vh;
        overflow: hidden;
        transform: scale(0.9);
        transition: transform 0.3s ease;
      }

      .wallet-modal-overlay.active .wallet-modal {
        transform: scale(1);
      }

      .wallet-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid var(--border-color);
      }

      .wallet-modal-header h3 {
        margin: 0;
        color: var(--text-light);
        font-size: 1.25rem;
      }

      .close-btn {
        background: none;
        border: none;
        color: var(--text-dark);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.25rem;
        transition: color 0.2s ease;
      }

      .close-btn:hover {
        color: var(--text-light);
      }

      .wallet-modal-content {
        padding: 1.5rem;
      }

      .wallet-modal-content p {
        margin: 0 0 1.5rem 0;
        color: var(--text-dark);
        text-align: center;
      }

      .wallet-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .wallet-option {
        display: flex;
        align-items: center;
        padding: 1rem;
        background: var(--background-light);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
        width: 100%;
      }

      .wallet-option:hover {
        background: var(--card-background);
        border-color: var(--primary-color);
        transform: translateY(-2px);
      }

      .wallet-option:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .wallet-option.connecting {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .wallet-icon {
        font-size: 1.5rem;
        margin-right: 0.75rem;
      }

      .wallet-name {
        flex: 1;
        color: var(--text-light);
        font-weight: 500;
      }

      .wallet-status {
        color: var(--text-dark);
        font-size: 0.875rem;
      }

      .no-wallets {
        text-align: center;
        color: var(--text-dark);
      }

      .no-wallets ul {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0 0;
      }

      .no-wallets li {
        margin: 0.5rem 0;
      }

      .no-wallets a {
        color: var(--primary-color);
        text-decoration: none;
      }

      .no-wallets a:hover {
        text-decoration: underline;
      }

      @media (max-width: 480px) {
        .wallet-modal {
          margin: 1rem;
          max-width: calc(100% - 2rem);
        }
        
        .wallet-modal-header {
          padding: 1rem;
        }
        
        .wallet-modal-content {
          padding: 1rem;
        }
      }
    `;
    
    document.head.appendChild(styles);
  }
}
