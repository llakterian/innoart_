// NFT Upload functionality
document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('nftImage');
    const imagePreview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    const uploadForm = document.getElementById('nftUploadForm');
    
    // Handle image preview
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImage.src = event.target.result;
                previewImage.style.display = 'block';
                imagePreview.querySelector('.upload-instructions').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Drag and drop functionality
    imagePreview.addEventListener('dragover', (e) => {
        e.preventDefault();
        imagePreview.classList.add('dragover');
    });
    
    imagePreview.addEventListener('dragleave', () => {
        imagePreview.classList.remove('dragover');
    });
    
    imagePreview.addEventListener('drop', (e) => {
        e.preventDefault();
        imagePreview.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.match('image.*')) {
            imageUpload.files = e.dataTransfer.files;
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImage.src = event.target.result;
                previewImage.style.display = 'block';
                imagePreview.querySelector('.upload-instructions').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Form submission
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!account) {
            alert('Please connect your wallet first');
            return;
        }
        
        const file = imageUpload.files[0];
        const title = document.getElementById('nftTitle').value;
        const description = document.getElementById('nftDescription').value;
        const price = document.getElementById('nftPrice').value;
        
        if (!file || !title || !price) {
            alert('Please fill in all required fields');
            return;
        }
        
        try {
            // Show loading state
            const createBtn = document.getElementById('createNftBtn');
            createBtn.disabled = true;
            createBtn.textContent = 'Uploading...';
            
            // Upload to IPFS (using mock for now - replace with actual IPFS upload)
            const tokenURI = await uploadToIPFS(file, {
                name: title,
                description: description,
                image: file.name
            });
            
            // Create NFT
            const contract = await getContract();
            const weiPrice = web3.utils.toWei(price, 'ether');
            
            await contract.methods.createArt(tokenURI, weiPrice).send({ from: account });
            
            alert('NFT created successfully!');
            window.location.href = 'gallery.html';
        } catch (error) {
            console.error('Error creating NFT:', error);
            alert(`Error creating NFT: ${error.message}`);
        } finally {
            const createBtn = document.getElementById('createNftBtn');
            if (createBtn) {
                createBtn.disabled = false;
                createBtn.textContent = 'Create NFT';
            }
        }
    });
});

// Mock IPFS upload - replace with actual IPFS implementation
async function uploadToIPFS(file, metadata) {
    // In a real implementation, you would use something like:
    // const client = new NFTStorage({ token: 'YOUR_API_KEY' });
    // const uploaded = await client.store({ ...metadata, image: file });
    // return uploaded.url;
    
    console.log('Mock upload to IPFS:', file, metadata);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`https://ipfs.io/ipfs/mock-cid/${file.name}`);
        }, 1500);
    });
}