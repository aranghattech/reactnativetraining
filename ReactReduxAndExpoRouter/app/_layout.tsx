import {Stack} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import {Provider} from "react-redux";
import store from "../store/store";
import {View} from "react-native";
import { UserContext } from "../contexts/UserContext";
import {User} from "../types/user";
import {useState} from "react";

export default function Layout() {
    const  [user, setUser] = useState<User | null>(null);
    function handleLogin(user: User) {
        setUser(user);
    }
    return(
        <Provider store={store}>
            <UserContext.Provider value={{user, setUser}}>
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
        </UserContext.Provider>
        </Provider>
        )
}