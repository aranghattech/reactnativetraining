import {Stack} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import {Provider} from "react-redux";
import store from "../store/store";
import Index from "./index";

export default function Layout() {
    return(
        <Provider store={store}>
            <Stack
             
            >
                <Stack.Screen name="Home" options={{
                    title: "Home"
                }} />
                <Stack.Screen name="cart" options={{
                    title: "Cart"
                    }}/>
            </Stack>
        </Provider>
        )
}