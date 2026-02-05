import {View, Text, Button, Image} from "react-native";
import {useEffect, useState} from "react";
import *  as ImagePicker from 'expo-image-picker';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import firebase from "firebase/compat/app";
import { storage} from "../../firebaseconfig";

export default function Index(){
    
   const [image, setImage] = useState<string | undefined>();
    
    async function takePicture(){
        console.log("Taking picture");
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 1,
        });
        
        if (!result.canceled)
        {
            console.log("Picture taken:");
            console.log(result.assets[0].uri);
            setImage(result.assets[0].uri);
            
            //Upload the image to the firebase storage
            const path = "images/" + Date.now() + ".jpg";
            const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();
            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);
            console.log(url);
        }
        else {
            console.log("Picture canceled");
        }
    }
    
    
    return <View>
        {image && <Image source={{uri: image}} style={{width: 200, height: 200}} />}
        <Button title="Launch Camera" onPress={takePicture} />
    </View>
}