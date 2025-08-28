MockDataApp – How to Run

Prerequisites

Before running the app, make sure you have:

Node.js installed (version 18 or higher) – comes with npm.

Expo CLI installed globally:

npm install -g expo-cli


Git installed (optional, if you want to clone the repository).

Android Studio or Xcode for emulator/simulator (optional, physical device works too).

Step 1: Clone the Repository

If you haven’t already, clone the project from GitHub:

git clone https://github.com/Mckenzie-loga/MockDataApp-Assessment.git
cd MockDataApp-Assessment

Step 2: Install Dependencies

Install all the required packages:

npm install


This installs everything the app needs, including React Native, Expo, TypeScript, and other dependencies.

Step 3: Start the App

Run the Expo development server:

npm start


or

expo start


This will open Expo Dev Tools in your browser.

You will see a QR code to scan with your phone (Expo Go app).

You can also run on an Android emulator or iOS simulator.

Step 4: Running on a Device

Android: Open the Expo Go app and scan the QR code.

iOS: Open the Expo Go app and scan the QR code (or use the simulator on Mac).

Step 5: Using the App

Scroll through the Media Feed to see posts.

Tap a post to view details.

Tap the image to see it full screen.

Use the search bar to filter posts by title.

Tap Remind me if the post is due within 24 hours to schedule a notification.

Step 6: Common Commands
Command	Purpose
npm start	Start Expo development server
npm run android	Run on Android emulator
npm run ios	Run on iOS simulator (Mac only)
npm test	Run Jest tests
npm run lint	Check code style (if configured)
