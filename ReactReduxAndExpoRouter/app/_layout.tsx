import {Stack} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import {Provider} from "react-redux";
import store from "../store/store";
import Index from "./index";
import {View} from "react-native";

export default function Layout() {
    return(
        <Provider store={store}>
            <Stack
             
            >
                <Stack.Screen name="Home" options={{
                    title: "Home",
                    headerRight: () => <View>
                        <Ionicons name="cart" size={24} color="black" />
                    </View>
                }} />
                <Stack.Screen name="cart" options={{
                    title: "Cart"
                    }}/>
            </Stack>
        </Provider>
        )
}