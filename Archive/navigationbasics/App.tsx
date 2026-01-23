import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {HomeScreen} from "./Screens/HomeScreen";
import {MovieDetailsScreen} from "./Screens/MovieDetailsScreen";

const RouterStack = createNativeStackNavigator({
  screens : {
    Home : {
      screen : HomeScreen,
      options : {title : "BookMyMovie"}
    },
    MovieDetails : {
      screen : MovieDetailsScreen,
      options : {title : "Movie Details"}
    }
  }
})


const Navigation = createStaticNavigation(RouterStack);

export default function App()  {
  return <Navigation />;
}


