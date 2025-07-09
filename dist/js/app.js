// Main application functionality
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize web3
    await initWeb3();
    // Load NFTs on gallery page
    if (document.getElementById('nftGallery')) {
        loadNFTs();
    }
    // Load featured artists on homepage
    if (document.getElementById('featuredArtists')) {
        loadFeaturedArtists();
    }
});
// Load NFTs from contract
async function loadNFTs() {
    try {
        const contract = await getContract();
        const nftCount = await contract.methods._tokenIds().call();
        const gallery = document.getElementById('nftGallery');
        gallery.innerHTML = '';
        for (let i = 1; i <= nftCount; i++) {
            const nft = await contract.methods.artItems(i).call();
            if (nft.id === '0')
                continue;
            const nftCard = document.createElement('div');
            nftCard.className = 'nft-card';
            // Create a blurred preview for non-owners
            const isOwner = account && account.toLowerCase() === nft.owner.toLowerCase();
            const previewStyle = isOwner ? '' : 'filter: blur(5px);';
            nftCard.innerHTML = `
                <div class="nft-image-container">
                    <img src="${nft.tokenURI}" alt="NFT ${i}" style="${previewStyle}">
                    ${!isOwner ? '<div class="preview-overlay">Purchase to view full resolution</div>' : ''}
                </div>
                <div class="nft-info">
                    <h3>${nft.title || `InnoArt #${i}`}</h3>
                    <p class="artist">By ${formatAddress(nft.creator)}</p>
                    <div class="price-container">
                        <span class="price">${formatETH(nft.price)} ETH</span>
                        ${nft.forSale ?
                `<button class="buy-btn" onclick="buyNFT(${i}, '${nft.price}')">Buy Now</button>` :
                '<span class="sold-badge">Sold</span>'}
                    </div>
                </div>
            `;
            gallery.appendChild(nftCard);
        }
    }
    catch (error) {
        console.error("Error loading NFTs:", error);
    }
}
// Buy NFT function
async function buyNFT(tokenId, price) {
    try {
        const contract = await getContract();
        const weiPrice = price.toString();
        // Show confirmation dialog
        const confirmed = confirm(`Purchase this NFT for ${formatETH(weiPrice)} ETH?`);
        if (!confirmed)
            return;
        // Execute purchase
        await contract.methods.buyArt(tokenId).send({
            from: account,
            value: weiPrice
        });
        alert('Purchase successful!');
        loadNFTs(); // Refresh the gallery
    }
    catch (error) {
        console.error("Purchase failed:", error);
        alert(`Purchase failed: ${error.message}`);
    }
}
// Load featured artists
async function loadFeaturedArtists() {
    // This would ideally come from your contract or a backend
    // For now, we'll use mock data
    const featuredArtists = [
        {
            name: "DigitalPainter",
            sales: 45,
            avatar: "assets/images/artist1.png"
        },
        {
            name: "CryptoCreator",
            sales: 32,
            avatar: "assets/images/artist2.png"
        },
        {
            name: "BlockchainArtist",
            sales: 28,
            avatar: "assets/images/artist3.png"
        }
    ];
    const container = document.getElementById('featuredArtists');
    container.innerHTML = '';
    featuredArtists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.className = 'artist-card';
        artistCard.innerHTML = `
            <img src="${artist.avatar}" alt="${artist.name}">
            <h3>${artist.name}</h3>
            <p>${artist.sales} NFTs sold</p>
            <a href="gallery.html?artist=${artist.name}" class="btn-view">View Art</a>
        `;
        container.appendChild(artistCard);
    });
}
// Format Ethereum address for display
function formatAddress(address) {
    if (!address)
        return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
