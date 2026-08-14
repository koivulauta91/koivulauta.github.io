Deploy to Firebase Hosting

1. Create a Firebase project (Firebase Console -> Create project) and enable Hosting.
2. Create a service account JSON (Console -> IAM & Admin -> Service accounts -> Create key) and download the JSON key.
3. In GitHub, go to the repository -> Settings -> Secrets and variables -> Actions -> New repository secret and add a secret named FIREBASE_SERVICE_ACCOUNT containing the full JSON contents of the key file.
4. Push to main. The GitHub Actions workflow (.github/workflows/firebase-deploy.yml) builds the site and deploys the dist/ folder to Firebase Hosting automatically.

Local test:
- Install Firebase CLI: npm i -g firebase-tools
- Login: firebase login
- Deploy: firebase deploy --only hosting

Notes:
- The workflow uses the official FirebaseHosting GitHub Action and expects the service account JSON in the FIREBASE_SERVICE_ACCOUNT secret.
- Ensure the projectId in .firebaserc matches your Firebase project ID (default is 'koivulauta').
