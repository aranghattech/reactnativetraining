import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts
  , Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';  
import { Image } from 'expo-image';

export default function App() {

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  }); //Map the fonts to useFonts hook

   const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    },
    text : {
      color: 'white',
      fontSize: 70,
      fontFamily: fontsLoaded ? 'Roboto_700Bold' : undefined, //Use the font if loaded
    },
    description : {
      color: 'white',
      fontSize: 20,
      fontFamily: fontsLoaded ? 'Roboto_400Regular' : undefined, //Use the font if loaded
    },
    image: {
      width: 200,
      height: 100,
      borderRadius: 10,
      marginTop: 20,
    },
  });

  return (
    <SafeAreaProvider>
       <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <StatusBar 
              animated={true}
              backgroundColor='#ff0000'
              style="light"
              translucent={false}
              />
             <Text style={styles.text}>Hello, World!</Text>
             <Text style={styles.description}>This is a sample app using custom fonts.</Text>
               <View>
             <Image source={{uri: 'myappimage.jpg'}} 
               style={styles.image} />
          </View>
            </View>
        
      </SafeAreaView>
    </SafeAreaProvider>
  );

 
}

