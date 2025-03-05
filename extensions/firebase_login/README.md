# Firebase authentication extension for EverShop

This extension allows customer to login to EverShop using your Firebase account.

> **Note**: This extension requires EverShop version 1.0.0-rc.6 or higher.

## Installation guide

### Step 1: Install the extension using npm:

```bash
npm install @evershop/firebase_login
```

### Step 2: Enable the extension

Edit the `config/default.json` file in the root directory of your EverShop installation and add the following line to the `extensions` section:

```json
{
  ...,
  "system": {
    ...,
    "extensions": [
      ...,
      {
        "name": "firebase_login",
        "resolve": "node_modules/@evershop/firebase_login",
        "enabled": true,
        "priority": 10
      }
    ]
  }
}
```

### Step 3: Add the Firebase client ID, secret and some other configuration options

Edit the `.env` file:

```shell
API_KEY="YOUR_FIREBASE_API_KEY"
AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
PROJECT_ID="YOUR_PROJECT"
STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
APP_ID="YOUR_APP_ID"
MEASUREMENT_ID="YOUR_MEASUREMENT_ID"
CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
```

### Step 4: Run the build command

```bash
npm run build
```

> **Note**: You can get the Firebase client ID and secret from the [Firebase API Console](https://console.developers.firebase.com/apis/credentials).