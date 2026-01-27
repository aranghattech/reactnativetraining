import { StatusBar } from 'expo-status-bar';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {useRef, useState} from "react";
import {CameraType, CameraView, useCameraPermissions} from "expo-camera";
import  * as MediaLibrary from 'expo-media-library';
import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  
  const [cameraType,setCameraType] = useState<CameraType>('front');
  const [permission, setPermission] = useCameraPermissions();
  const [mediaPermission, requestLibraryPermission] = MediaLibrary.usePermissions();
  const useCameraRef = useRef(null);
  
  if (!permission || !mediaPermission) // Ensure that both camera and media permissions are loaded
  {
     return  <View />
  }
  
  if (!permission.granted || !mediaPermission.granted)
  {
     return  <View style={styles.container}>
       <Text>Please provide permission to use the camera</Text>
       <Button title="Grant Permission" onPress={() => { 
           setPermission(); 
           requestLibraryPermission();
       }} />
     </View>
  }
  
  async function takePicture()
  {
      if (useCameraRef.current)
      {
         const photo = await useCameraRef.current.takePictureAsync();
         if (photo)
             await MediaLibrary.saveToLibraryAsync(photo.uri);
      }
  }
  
  return (
      <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
       <CameraView style={styles.camera} facing={cameraType} ref={useCameraRef}>
           <View style={styles.container}>
           </View>
       </CameraView>
       <View style={styles.toolBarContainer}>
         <Button title="Flip Camera" 
                 onPress={() => setCameraType(cameraType === 'front' ? 'back' : 'front')} />
         <Button title="Take Picture" onPress={takePicture} />
       </View>
    </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  toolBarContainer: {
     flexDirection: 'row',
     flex: 1,
     justifyContent: 'space-around',
    maxHeight : 48
  }
});
