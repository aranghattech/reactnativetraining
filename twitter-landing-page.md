# Building Twitter's Landing Page with React Native & React Native Paper

**Duration:** 90 minutes  
**Difficulty:** Beginner to Intermediate  
**Prerequisites:** Node.js installed, basic React knowledge, familiarity with terminal/command line

---

## Overview

In this workshop, you'll recreate the look and feel of Twitter's (now X) landing page using React Native and React Native Paper. We'll focus purely on the UI—no backend or authentication logic.

### What You'll Build

A mobile landing screen featuring:
- Twitter/X logo and branding
- "See what's happening in the world right now" headline
- Google Sign-in button
- Apple Sign-in button
- Divider with "or"
- "Create account" button
- "Already have an account? Log in" link
- Terms of service text

---

## Part 1: Project Setup (15 minutes)

### Step 1.1: Create a New Expo Project

Open your terminal and run:

```bash
npx create-expo-app@latest TwitterLandingPage --template blank
cd TwitterLandingPage
```

### Step 1.2: Install Dependencies

Install React Native Paper and its dependencies:

```bash
npx expo install react-native-paper react-native-safe-area-context
```

Install vector icons for the logos:

```bash
npx expo install @expo/vector-icons
```

### Step 1.3: Configure React Native Paper

Open `App.js` and replace its contents with:

```javascript
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingScreen from './screens/LandingScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <LandingScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

### Step 1.4: Create the Screens Folder

Create a new folder for your screens:

```bash
mkdir screens
```

### Step 1.5: Create the Landing Screen File

Create a new file `screens/LandingScreen.js`:

```bash
touch screens/LandingScreen.js
```

**Checkpoint:** Your project structure should look like this:
```
TwitterLandingPage/
├── App.js
├── screens/
│   └── LandingScreen.js
├── package.json
└── ...
```

---

## Part 2: Building the Basic Layout (20 minutes)

### Step 2.1: Set Up the Screen Structure

Open `screens/LandingScreen.js` and add the basic structure:

```javascript
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LandingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>𝕏</Text>
        </View>

        {/* Main Content Section */}
        <View style={styles.mainSection}>
          <Text style={styles.headline}>
            See what's happening in the world right now.
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonSection}>
          <Text style={styles.placeholder}>Buttons will go here</Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <Text style={styles.placeholder}>Footer will go here</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
  logoSection: {
    paddingTop: 48,
  },
  logo: {
    fontSize: 42,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mainSection: {
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 40,
  },
  buttonSection: {
    paddingBottom: 16,
  },
  footerSection: {
    paddingBottom: 32,
  },
  placeholder: {
    color: '#666666',
    fontSize: 14,
  },
});
```

### Step 2.2: Test Your Progress

Start the development server:

```bash
npx expo start
```

Scan the QR code with Expo Go (on your phone) or press `i` for iOS simulator / `a` for Android emulator.

**Checkpoint:** You should see a black screen with the X logo at the top and the headline text centered.

---

## Part 3: Adding the Sign-in Buttons (25 minutes)

### Step 3.1: Import Required Components

Update the imports at the top of `LandingScreen.js`:

```javascript
import React from 'react';
import { View, StyleSheet, StatusBar, Pressable } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
```

### Step 3.2: Create the Google Sign-in Button

Replace the `{/* Buttons Section */}` comment and its placeholder with:

```javascript
{/* Buttons Section */}
<View style={styles.buttonSection}>
  {/* Google Sign-in Button */}
  <Pressable style={styles.socialButton}>
    <View style={styles.socialButtonContent}>
      <FontAwesome name="google" size={18} color="#000000" />
      <Text style={styles.socialButtonText}>Continue with Google</Text>
    </View>
  </Pressable>
</View>
```

### Step 3.3: Add the Button Styles

Add these styles to your `StyleSheet.create`:

```javascript
socialButton: {
  backgroundColor: '#FFFFFF',
  borderRadius: 50,
  paddingVertical: 14,
  paddingHorizontal: 24,
  marginBottom: 12,
},
socialButtonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
},
socialButtonText: {
  color: '#000000',
  fontSize: 15,
  fontWeight: '600',
},
```

### Step 3.4: Add the Apple Sign-in Button

After the Google button (inside buttonSection), add:

```javascript
{/* Apple Sign-in Button */}
<Pressable style={styles.socialButton}>
  <View style={styles.socialButtonContent}>
    <Ionicons name="logo-apple" size={20} color="#000000" />
    <Text style={styles.socialButtonText}>Continue with Apple</Text>
  </View>
</Pressable>
```

### Step 3.5: Add the "or" Divider

After the Apple button, add the divider:

```javascript
{/* Divider */}
<View style={styles.dividerContainer}>
  <View style={styles.dividerLine} />
  <Text style={styles.dividerText}>or</Text>
  <View style={styles.dividerLine} />
</View>
```

Add the divider styles:

```javascript
dividerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 8,
},
dividerLine: {
  flex: 1,
  height: 1,
  backgroundColor: '#333333',
},
dividerText: {
  color: '#FFFFFF',
  paddingHorizontal: 16,
  fontSize: 14,
},
```

### Step 3.6: Add the "Create Account" Button

After the divider, add the create account button:

```javascript
{/* Create Account Button */}
<Pressable style={styles.createAccountButton}>
  <Text style={styles.createAccountText}>Create account</Text>
</Pressable>
```

Add the styles:

```javascript
createAccountButton: {
  backgroundColor: '#1D9BF0',
  borderRadius: 50,
  paddingVertical: 14,
  paddingHorizontal: 24,
  marginTop: 8,
},
createAccountText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '700',
  textAlign: 'center',
},
```

**Checkpoint:** You should now see three buttons—Google, Apple, and Create account—with an "or" divider.

---

## Part 4: Adding the Footer Content (15 minutes)

### Step 4.1: Add Terms of Service Text

Replace the footer placeholder with:

```javascript
{/* Footer Section */}
<View style={styles.footerSection}>
  {/* Terms Text */}
  <Text style={styles.termsText}>
    By signing up, you agree to our{' '}
    <Text style={styles.linkText}>Terms</Text>,{' '}
    <Text style={styles.linkText}>Privacy Policy</Text>, and{' '}
    <Text style={styles.linkText}>Cookie Use</Text>.
  </Text>

  {/* Login Link */}
  <View style={styles.loginContainer}>
    <Text style={styles.loginPrompt}>Already have an account? </Text>
    <Pressable>
      <Text style={styles.loginLink}>Log in</Text>
    </Pressable>
  </View>
</View>
```

### Step 4.2: Add the Footer Styles

Add these styles:

```javascript
termsText: {
  color: '#666666',
  fontSize: 13,
  lineHeight: 18,
  marginBottom: 24,
},
linkText: {
  color: '#1D9BF0',
},
loginContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
loginPrompt: {
  color: '#666666',
  fontSize: 15,
},
loginLink: {
  color: '#1D9BF0',
  fontSize: 15,
  fontWeight: '500',
},
```

**Checkpoint:** Your footer should now display the terms text and login link.

---

## Part 5: Final Polish & Refinements (15 minutes)

### Step 5.1: Complete Code

Here's the complete `LandingScreen.js` file with all refinements:

```javascript
import React from 'react';
import { View, StyleSheet, StatusBar, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function LandingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>𝕏</Text>
        </View>

        {/* Main Content Section */}
        <View style={styles.mainSection}>
          <Text style={styles.headline}>
            See what's happening in the world right now.
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonSection}>
          {/* Google Sign-in Button */}
          <Pressable 
            style={({ pressed }) => [
              styles.socialButton,
              pressed && styles.buttonPressed
            ]}
          >
            <View style={styles.socialButtonContent}>
              <FontAwesome name="google" size={18} color="#000000" />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </View>
          </Pressable>

          {/* Apple Sign-in Button */}
          <Pressable 
            style={({ pressed }) => [
              styles.socialButton,
              pressed && styles.buttonPressed
            ]}
          >
            <View style={styles.socialButtonContent}>
              <Ionicons name="logo-apple" size={20} color="#000000" />
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </View>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Create Account Button */}
          <Pressable 
            style={({ pressed }) => [
              styles.createAccountButton,
              pressed && styles.primaryButtonPressed
            ]}
          >
            <Text style={styles.createAccountText}>Create account</Text>
          </Pressable>
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          {/* Terms Text */}
          <Text style={styles.termsText}>
            By signing up, you agree to our{' '}
            <Text style={styles.linkText}>Terms</Text>,{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>, and{' '}
            <Text style={styles.linkText}>Cookie Use</Text>.
          </Text>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginPrompt}>Already have an account? </Text>
            <Pressable>
              {({ pressed }) => (
                <Text style={[styles.loginLink, pressed && styles.linkPressed]}>
                  Log in
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
  
  // Logo Section
  logoSection: {
    paddingTop: 48,
  },
  logo: {
    fontSize: 42,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  // Main Section
  mainSection: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 32,
  },
  headline: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  
  // Button Section
  buttonSection: {
    paddingBottom: 16,
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  socialButtonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonPressed: {
    backgroundColor: '#E7E7E7',
  },
  
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#333333',
  },
  dividerText: {
    color: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  
  // Create Account Button
  createAccountButton: {
    backgroundColor: '#1D9BF0',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  createAccountText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  primaryButtonPressed: {
    backgroundColor: '#1A8CD8',
  },
  
  // Footer Section
  footerSection: {
    paddingBottom: 32,
  },
  termsText: {
    color: '#666666',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 24,
  },
  linkText: {
    color: '#1D9BF0',
  },
  linkPressed: {
    opacity: 0.7,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginPrompt: {
    color: '#666666',
    fontSize: 15,
  },
  loginLink: {
    color: '#1D9BF0',
    fontSize: 15,
    fontWeight: '500',
  },
});
```

### Step 5.2: Verify the Final Result

Run the app and verify that you have:

- [ ] Black background throughout
- [ ] X logo in the top-left
- [ ] Bold headline text centered vertically
- [ ] White Google sign-in button with icon
- [ ] White Apple sign-in button with icon
- [ ] "or" divider with horizontal lines
- [ ] Blue "Create account" button
- [ ] Gray terms text with blue links
- [ ] "Already have an account? Log in" at the bottom
- [ ] Press states on all buttons

---

## Bonus Challenges (If Time Permits)

### Challenge 1: Add a Phone/Email Sign-up Option

Add another button before "Create account":

```javascript
<Pressable style={({ pressed }) => [
  styles.outlineButton,
  pressed && styles.outlineButtonPressed
]}>
  <Text style={styles.outlineButtonText}>Sign up with phone or email</Text>
</Pressable>
```

Styles to add:

```javascript
outlineButton: {
  borderWidth: 1,
  borderColor: '#536471',
  borderRadius: 50,
  paddingVertical: 14,
  paddingHorizontal: 24,
  marginTop: 12,
},
outlineButtonPressed: {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
},
outlineButtonText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '600',
  textAlign: 'center',
},
```

### Challenge 2: Add Subtle Animations

Install react-native-reanimated:

```bash
npx expo install react-native-reanimated
```

Add entrance animations to the buttons using `FadeInDown` from reanimated.

### Challenge 3: Make It Responsive

Use `useWindowDimensions` to adjust layout for tablets:

```javascript
import { useWindowDimensions } from 'react-native';

// Inside your component:
const { width } = useWindowDimensions();
const isTablet = width > 600;

// Adjust padding and font sizes based on isTablet
```

---

## Quick Reference: Twitter/X Brand Colors

| Element | Color Code |
|---------|------------|
| Background | `#000000` |
| Primary Blue | `#1D9BF0` |
| Primary Blue (Pressed) | `#1A8CD8` |
| White | `#FFFFFF` |
| Gray Text | `#666666` |
| Border Gray | `#333333` |
| Secondary Gray | `#536471` |

---

## Troubleshooting

### "Module not found" Error
Make sure you've installed all dependencies:
```bash
npx expo install react-native-paper react-native-safe-area-context @expo/vector-icons
```

### Icons Not Showing
Clear the cache and restart:
```bash
npx expo start -c
```

### Styles Not Applying
- Check for typos in style names
- Ensure styles are inside `StyleSheet.create()`
- Verify you're using the correct style property names (e.g., `backgroundColor` not `background-color`)

### App Not Updating
- Save your file (Ctrl+S / Cmd+S)
- Shake your device and tap "Reload"
- Restart the Expo server

---

## Summary

Congratulations! You've successfully recreated Twitter's landing page UI using:

- **React Native** for cross-platform mobile development
- **React Native Paper** for Material Design components
- **Expo Vector Icons** for social media icons
- **SafeAreaView** for proper device spacing
- **Pressable** for interactive buttons with press states
- **StyleSheet** for organized, performant styles

### Key Concepts Covered

1. Setting up a React Native project with Expo
2. Using React Native Paper's `PaperProvider`
3. Creating custom styled buttons
4. Building flexible layouts with `flex`
5. Implementing press states for better UX
6. Using nested `Text` components for inline link styling
7. Working with custom dividers

### Next Steps

- Add navigation to connect this screen to login/signup screens
- Implement actual authentication with Firebase or Auth0
- Add form validation for the signup flow
- Explore React Native Paper's theming capabilities

---

*Workshop created for educational purposes. Twitter/X branding is property of X Corp.*
