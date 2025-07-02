// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract InnoArtNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct ArtItem {
        uint256 id;
        address creator;
        string tokenURI;
        uint256 price;
        bool forSale;
    }

    uint256 public registrationFee = 0.01 ether; // One-time registration fee (adjustable)
    mapping(uint256 => ArtItem) public artItems;
    mapping(address => bool) public registeredArtists;
    address payable public developer;

    event ArtCreated(uint256 id, address creator, string tokenURI);
    event ArtSold(uint256 id, address buyer, address seller, uint256 price);

    constructor() ERC721("InnoArt", "INART") {
        developer = payable(msg.sender);
    }

    function registerArtist() external payable {
        require(!registeredArtists[msg.sender], "Already registered");
        require(msg.value >= registrationFee, "Insufficient registration fee");
        
        registeredArtists[msg.sender] = true;
        if (msg.value > registrationFee) {
            payable(msg.sender).transfer(msg.value - registrationFee);
        }
    }

    function createArt(string memory tokenURI, uint256 price) external returns (uint256) {
        require(registeredArtists[msg.sender], "Not a registered artist");
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        artItems[newItemId] = ArtItem(
            newItemId,
            msg.sender,
            tokenURI,
            price,
            true
        );
        
        emit ArtCreated(newItemId, msg.sender, tokenURI);
        return newItemId;
    }

    function buyArt(uint256 artId) external payable {
        ArtItem memory artItem = artItems[artId];
        require(artItem.forSale, "Art not for sale");
        require(msg.value >= artItem.price, "Insufficient funds");

        address seller = ownerOf(artId);
        
        // Transfer ownership
        _transfer(seller, msg.sender, artId);
        
        // Distribute funds (20% to developer, 80% to seller)
        uint256 developerShare = (msg.value * 20) / 100;
        uint256 sellerShare = msg.value - developerShare;
        
        developer.transfer(developerShare);
        payable(seller).transfer(sellerShare);
        
        // Update art item
        artItems[artId].forSale = false;
        
        emit ArtSold(artId, msg.sender, seller, artItem.price);
    }

    function setRegistrationFee(uint256 newFee) external onlyOwner {
        registrationFee = newFee;
    }

    function setArtPrice(uint256 artId, uint256 newPrice) external {
        require(ownerOf(artId) == msg.sender, "Not the owner");
        artItems[artId].price = newPrice;
    }

    function toggleForSale(uint256 artId) external {
        require(ownerOf(artId) == msg.sender, "Not the owner");
        artItems[artId].forSale = !artItems[artId].forSale;
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
        require(_exists(tokenId), "Token does not exist");
        artItems[tokenId].tokenURI = tokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return artItems[tokenId].tokenURI;
    }
}