
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {Link, Stack} from "expo-router";
import {useAppDispatch, useAppSelector} from "../store/store";
import {useEffect, useContext} from "react";
import {fetchProduct, getDistinctCategories} from "../store/productSlice";
import {CategoryTile} from "./components/CategoryTile";
import {Ionicons} from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContext";

export default function Index() {
    
    const {distinctCategories, error, loading} = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();
    const cart = useAppSelector(d => d.cart);
    const { user, setUser } = useContext(UserContext);
    
    useEffect(() => {
        dispatch(fetchProduct("https://dummyjson.com/products"));
        dispatch(getDistinctCategories);
    },[])
    
    return (<View style={styles.container}>
        <Stack.Screen options={{ title: 'E-Commerce App', 
            headerLeft: () => (
                user ? (
                    <TouchableOpacity onPress={() => setUser(null)} style={{ marginLeft : 10 }}>
                        <Text style={{ color: '#007bff' }}>Logout</Text>
                    </TouchableOpacity>
                ) : (
                    <Link href="/login" asChild>
                        <TouchableOpacity style={{ marginLeft : 10 }}>
                            <Text style={{ color: '#007bff' }}>Login</Text>
                        </TouchableOpacity>
                    </Link>
                )
            ),
            headerRight: () => <Link 
                href={{
                    pathname : "/cart"
                }}
                style={{ flexDirection : "row", marginRight: 10}}>
            <Ionicons name="cart" size={24} color="black" />
                <Text style={{ backgroundColor : "red", padding : 5, borderRadius : 10, color: 'white', fontSize: 10, position: 'absolute', right: -10, top: -10}}>{cart.cartItems.length}</Text>
        </Link>  }} />
        {user && (
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
            </View>
        )}
        {loading ? <View style={styles.center}><Text>Loading...</Text></View> : 
         <FlatList 
            style={styles.list} 
            data={distinctCategories} 
            renderItem={(item) => (
                <CategoryTile category={item.item}/>
            )} 
            keyExtractor={(item) => item.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContent}
        />
        }
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        flex: 1,
    },
    listContent: {
        padding: 8,
    },
    welcomeContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    }
})