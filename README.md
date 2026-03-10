# Heardle ITA

Versione Italiana di Heardle.

---

## Environment Variables (`.env`)

The project requires a `.env` file in the **root of the repository** to run locally. This file is **not committed to the repository** (it is listed in `.gitignore`) to protect sensitive credentials.

### How to create it

Create a file named `.env` in the project root and populate it with the following variables:

```dotenv
REACT_APP_VERSION=$npm_package_version
GENERATE_SOURCEMAP=false
REACT_APP_PUBLIC_URL=https://heardle.it

# Firebase
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_DATABASE_URL=https://your_project-default-rtdb.europe-west1.firebasedatabase.app
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_MESSAGGING=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id
REACT_APP_MEASUREMENT_ID=your_measurement_id

# Spotify
REACT_APP_SPOTIFY_API_KEY=your_base64_encoded_spotify_client_id_and_secret
```

### Variable descriptions

| Variable | Description |
|---|---|
| `REACT_APP_VERSION` | Auto-set from `package.json` version |
| `GENERATE_SOURCEMAP` | Set to `false` to disable source maps in production builds |
| `REACT_APP_PUBLIC_URL` | Public URL of the deployed app |
| `REACT_APP_FIREBASE_API_KEY` | Firebase project API key |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `REACT_APP_DATABASE_URL` | Firebase Realtime Database URL |
| `REACT_APP_PROJECT_ID` | Firebase project ID |
| `REACT_APP_STORAGE_BUCKET` | Firebase Storage bucket |
| `REACT_APP_MESSAGGING` | Firebase Messaging sender ID |
| `REACT_APP_APP_ID` | Firebase App ID |
| `REACT_APP_MEASUREMENT_ID` | Google Analytics measurement ID |
| `REACT_APP_SPOTIFY_API_KEY` | Base64-encoded Spotify `client_id:client_secret` |

### CI/CD

For the GitHub Actions deploy workflow, all the above variables must be added as **repository secrets** under **Settings → Secrets and variables → Actions**. The workflow will generate the `.env` file automatically at build time.
