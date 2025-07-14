// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract InnoArtNFT is ERC721, Ownable, IERC2981, Pausable, ReentrancyGuard {
    uint256 private _tokenIds;

    struct ArtItem {
        uint256 id;
        address creator;
        string tokenURI;
        uint256 price;
        bool forSale;
        uint256 royaltyPercentage;
    }

    uint256 public registrationFee = 0.01 ether;
    uint256 public platformFeePercentage = 20; // Configurable platform fee
    uint256 public constant MAX_ROYALTY = 20; // 20% max royalty
    address payable public developer;
    
    mapping(uint256 => ArtItem) public artItems;
    mapping(address => bool) public registeredArtists;

    event ArtistRegistered(address indexed artist);
    event ArtCreated(uint256 indexed id, address indexed creator, string tokenURI);
    event ArtSold(uint256 indexed id, address indexed buyer, address indexed seller, uint256 price);
    event PriceUpdated(uint256 indexed id, uint256 newPrice);
    event SaleStatusChanged(uint256 indexed id, bool forSale);
    event PlatformFeeUpdated(uint256 newFee);
    event DeveloperUpdated(address newDeveloper);
    event TokenURIUpdated(uint256 indexed id, string newTokenURI);

    constructor() ERC721("InnoArt", "INART") Ownable(msg.sender) {
        developer = payable(msg.sender);
    }

    function registerArtist() external payable whenNotPaused {
        require(!registeredArtists[msg.sender], "Artist already registered");
        require(msg.value >= registrationFee, "Insufficient registration fee");
        
        registeredArtists[msg.sender] = true;
        
        if (msg.value > registrationFee) {
            payable(msg.sender).transfer(msg.value - registrationFee);
        }
        
        emit ArtistRegistered(msg.sender);
    }

    function createArt(
        string memory tokenURI, 
        uint256 price,
        uint256 royaltyPercentage
    ) external whenNotPaused returns (uint256) {
        require(registeredArtists[msg.sender], "Not a registered artist");
        require(bytes(tokenURI).length > 0, "Empty token URI");
        require(price > 0, "Price must be greater than 0");
        require(royaltyPercentage <= MAX_ROYALTY, "Royalty too high");

       _tokenIds++;
    uint256 newItemId = _tokenIds;

        _safeMint(msg.sender, newItemId);
        
        artItems[newItemId] = ArtItem({
            id: newItemId,
            creator: msg.sender,
            tokenURI: tokenURI,
            price: price,
            forSale: true,
            royaltyPercentage: royaltyPercentage
        });
        
        emit ArtCreated(newItemId, msg.sender, tokenURI);
        return newItemId;
    }

    function batchCreateArt(
    string[] memory tokenURIs,
    uint256[] memory prices,
    uint256[] memory royaltyPercentages
) external whenNotPaused returns (uint256[] memory) {
    require(tokenURIs.length == prices.length && prices.length == royaltyPercentages.length, "Array length mismatch");
    require(registeredArtists[msg.sender], "Not a registered artist");
    
    uint256[] memory newItemIds = new uint256[](tokenURIs.length);
    
    for (uint256 i = 0; i < tokenURIs.length; i++) {
        require(bytes(tokenURIs[i]).length > 0, "Empty token URI");
        require(prices[i] > 0, "Price must be greater than 0");
        require(royaltyPercentages[i] <= MAX_ROYALTY, "Royalty too high");

        _tokenIds++;
        uint256 newItemId = _tokenIds;
        
        _safeMint(msg.sender, newItemId);
        
        artItems[newItemId] = ArtItem({
            id: newItemId,
            creator: msg.sender,
            tokenURI: tokenURIs[i],
            price: prices[i],
            forSale: true,
            royaltyPercentage: royaltyPercentages[i]
        });
        
        newItemIds[i] = newItemId;
        emit ArtCreated(newItemId, msg.sender, tokenURIs[i]);
    }
    
    return newItemIds;
}

    function buyArt(uint256 artId) external payable whenNotPaused nonReentrant {
        ArtItem memory artItem = artItems[artId];
        require(artItem.forSale, "Art not for sale");
        require(msg.value >= artItem.price, "Insufficient funds");
        require(ownerOf(artId) != msg.sender, "Cannot buy your own NFT");

        address payable seller = payable(ownerOf(artId));
        
        // Set to false before transfer to prevent reentrancy
        artItems[artId].forSale = false;
        
        _transfer(seller, msg.sender, artId);
        
        uint256 platformFee = (msg.value * platformFeePercentage) / 100;
        uint256 royaltyFee = (msg.value * artItem.royaltyPercentage) / 100;
        
        // Check for overflow
        require(platformFee + royaltyFee <= msg.value, "Fee calculation error");
        
        uint256 sellerProceeds = msg.value - platformFee - royaltyFee;
        
        // Use call instead of transfer for better gas handling
        (bool success1, ) = developer.call{value: platformFee}("");
        require(success1, "Platform fee transfer failed");
        
        (bool success2, ) = artItem.creator.call{value: royaltyFee}("");
        require(success2, "Royalty transfer failed");
        
        (bool success3, ) = seller.call{value: sellerProceeds}("");
        require(success3, "Seller payment failed");
        
        emit ArtSold(artId, msg.sender, seller, artItem.price);
    }

    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view override returns (address receiver, uint256 royaltyAmount) {
        require(_ownerOf(tokenId) != address(0), "Nonexistent token");
ArtItem memory item = artItems[tokenId];
        royaltyAmount = (salePrice * item.royaltyPercentage) / 100;
        return (item.creator, royaltyAmount);
    }

    function setRegistrationFee(uint256 newFee) external onlyOwner {
        require(newFee != registrationFee, "Fee already set to this value");
        registrationFee = newFee;
    }

    function setPlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 50, "Platform fee too high");
        require(newFee != platformFeePercentage, "Fee already set to this value");
        platformFeePercentage = newFee;
        emit PlatformFeeUpdated(newFee);
    }

    function setDeveloper(address payable newDeveloper) external onlyOwner {
        require(newDeveloper != address(0), "Invalid address");
        developer = newDeveloper;
        emit DeveloperUpdated(newDeveloper);
    }

    function setArtPrice(uint256 artId, uint256 newPrice) external {
        require(ownerOf(artId) == msg.sender, "Not the owner");
        require(newPrice > 0, "Price must be greater than 0");
        artItems[artId].price = newPrice;
        emit PriceUpdated(artId, newPrice);
    }

    function toggleForSale(uint256 artId) external {
        require(ownerOf(artId) == msg.sender, "Not the owner");
        artItems[artId].forSale = !artItems[artId].forSale;
        emit SaleStatusChanged(artId, artItems[artId].forSale);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Nonexistent token");
        return artItems[tokenId].tokenURI;
    }

    function updateTokenURI(uint256 artId, string memory newTokenURI) external {
        require(ownerOf(artId) == msg.sender || msg.sender == artItems[artId].creator, "Not authorized");
        require(bytes(newTokenURI).length > 0, "Empty token URI");
        artItems[artId].tokenURI = newTokenURI;
        emit TokenURIUpdated(artId, newTokenURI);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }



    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, IERC165) returns (bool) {
        return 
            interfaceId == type(IERC2981).interfaceId || 
            super.supportsInterface(interfaceId);
    }
}