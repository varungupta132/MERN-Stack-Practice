# URL Shortener App

A simple URL shortener built with Node.js, Express, MongoDB, and EJS.

## How It Works

1. User submits a name and a long URL via the form
2. The app validates the URL using `valid-url`
3. A short ID is generated using `shortid` and saved to MongoDB alongside the original URL
4. Visiting `http://localhost:3000/<shortId>` redirects to the original URL

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- EJS (templating)
- shortid (ID generation)
- valid-url (URL validation)

## Getting Started

### Prerequisites

- Node.js
- MongoDB running locally on port `27017`

### Install & Run

```bash
npm install
node app.js
```

App runs at `http://localhost:3000`

## Project Structure

```
├── app.js           # Main server & routes
├── model/
│   └── user.js      # Mongoose schema & DB connection
├── views/
│   ├── form.ejs     # URL submission form
│   └── final.ejs    # Result page with shortened URL
└── package.json
```

## Routes

| Method | Route       | Description                        |
|--------|-------------|------------------------------------|
| GET    | `/`         | Render the URL submission form     |
| POST   | `/submit`   | Validate, shorten, and store URL   |
| GET    | `/:id`      | Redirect to the original URL       |
