# API Documentation

## Base URL

Production: `https://api.vidgencraft.xyz`
Development: `http://localhost:4000`

## Authentication

Most endpoints require authentication using JWT tokens.

Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "user123"
}
```

Response:
```json
{
  "token": "jwt.token.here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "user123"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt.token.here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "user123"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

Response:
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "user123"
  }
}
```

### NFT Operations

#### List NFTs
```http
GET /api/nfts
Authorization: Bearer <token>
```

Response:
```json
{
  "nfts": [
    {
      "id": "nft_id",
      "name": "NFT Name",
      "description": "NFT Description",
      "image": "image_url",
      "owner": "owner_address",
      "tokenId": "1",
      "contractAddress": "0x..."
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 20
}
```

#### Get NFT Details
```http
GET /api/nfts/:id
Authorization: Bearer <token>
```

Response:
```json
{
  "id": "nft_id",
  "name": "NFT Name",
  "description": "NFT Description",
  "image": "image_url",
  "owner": "owner_address",
  "tokenId": "1",
  "contractAddress": "0x...",
  "attributes": [],
  "history": []
}
```

#### Create NFT
```http
POST /api/nfts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "NFT Name",
  "description": "NFT Description",
  "image": "image_data",
  "attributes": []
}
```

Response:
```json
{
  "id": "nft_id",
  "transactionHash": "0x...",
  "tokenId": "1"
}
```

### User Operations

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "new_username",
  "bio": "User bio",
  "avatar": "avatar_url"
}
```

Response:
```json
{
  "user": {
    "id": "user_id",
    "username": "new_username",
    "bio": "User bio",
    "avatar": "avatar_url"
  }
}
```

#### Get User NFTs
```http
GET /api/users/:id/nfts
Authorization: Bearer <token>
```

Response:
```json
{
  "nfts": [],
  "total": 0,
  "page": 1,
  "limit": 20
}
```

### Market Operations

#### List Item for Sale
```http
POST /api/market/list
Authorization: Bearer <token>
Content-Type: application/json

{
  "nftId": "nft_id",
  "price": "1.5",
  "currency": "ETH"
}
```

Response:
```json
{
  "listing": {
    "id": "listing_id",
    "nft": "nft_id",
    "price": "1.5",
    "currency": "ETH",
    "seller": "seller_address",
    "status": "active"
  }
}
```

#### Buy Item
```http
POST /api/market/buy/:listingId
Authorization: Bearer <token>
```

Response:
```json
{
  "transaction": {
    "hash": "0x...",
    "status": "pending"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Permission denied"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1623456789
``` 