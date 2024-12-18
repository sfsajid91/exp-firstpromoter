# FirstPromoter Frontend

## Setup

Copy `.env.example` to `.env` and set the variables.

## Run

Install dependencies:

```
pnpm install
```

Run the server:

```
pnpm dev
```

Open http://localhost:3000 in your browser.

## Environment Variables

See `.env.example` for the environment variables.

## Endpoints

### Get all promoters

```
GET /api/promoters

Authorization: Bearer <user_id>
```

### Get single promoter

```
GET /api/promoters/:id

Authorization: Bearer <user_id>
```

### Create promoter

```
POST /api/promoters

Authorization: Bearer <user_id>
```

Sample body:

```json
{
  "source": "https://apify.firstpromoter.com",
  "email": "test@example.com",
  "password": "password123",
  "schedule": "0 1 * * *"
}
```

or

```json
{
  "source": "https://apify.firstpromoter.com",
  "email": "test@example.com",
  "password": "password123",
  "manualRun": true,
  "isEnabled": false
}
```

### Update promoter

```
PATCH /api/promoters/:id

Authorization: Bearer <user_id>
```

Sample body:

```json
{
  "isEnabled": false
}
```

or

```json
{
  "schedule": "0 1 * * *"
}
```

### Delete promoter

```
DELETE /api/promoters/:id

Authorization: Bearer <user_id>
```

### Manual run

```
GET /api/manual-run/:id

Authorization: Bearer <user_id>
```

### SSE

```
GET /api/sse/:id

Authorization: Bearer <user_id>
```

This endpoint will stream the promoter data to the client.

### Webhook

```
POST /api/webhook
```

This endpoint is used by Clerk to send webhooks when a user is created, updated or deleted.

### Sample Promoter output

```json
{
  "id": "cm3xethgs0002ty2k0ey1h5ur",
  "source": "https://apify.firstpromoter.com",
  "email": "test@example.com",
  "password": "password123",
  "manualRun": false,
  "isEnabled": true,
  "schedule": "0 1 * * *",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Sample PromoterData outputs

```json
{
  "id": "cm3xethms0004ty2krimjv3ww",
  "promoterId": "cm3xethgs0002ty2k0ey1h5ur",
  "unpaid": 560000,
  "referral": 11,
  "clicks": 110,
  "customers": 11,
  "status": "SUCCESS",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

Failed status:

```json
{
  "id": "cm3xethms0004ty2krimjv3ww",
  "promoterId": "cm3xethgs0002ty2k0ey1h5ur",
  "unpaid": 560000,
  "referral": 11,
  "clicks": 110,
  "customers": 11,
  "status": "FAILED",
  "failedMessage": "Error message",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```
