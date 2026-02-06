Step 1 : Install EAS CLI
         npm install -g eas-cli
         eas login // Create your account in expo.dev

STEP 2 : Configure EAS
         eas build:configure // IOS/Android/All

Step 3 : Update eas.json

"production": {
"autoIncrement": true,
**"android": {
"buildType": "app-bundle"
}**
}

STEP 4 : Build 

eas build --platform android --profile production

STEP 5 : eas build --profile development --platform android --local

use npx expo-doctor to check your environment
