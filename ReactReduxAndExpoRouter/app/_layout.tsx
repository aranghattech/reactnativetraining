import {Stack, Tabs} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import {Provider} from "react-redux";
import store from "../store/store";
import Index from "./index";

export default function Layout() {
    return(
        <Provider store={store}>
            <Tabs
             screenOptions={{
                 tabBarActiveTintColor: 'tomato',
                 
                 tabBarStyle: 
                     {backgroundColor: 'white',
                     }
             }}
            >
                <Tabs.Screen name="Home" options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={24} />
                }} />
                <Tabs.Screen name="cart" options={{
                    title: "Cart",
                    tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={24} />
                }} />
            </Tabs>
        </Provider>
        )
}