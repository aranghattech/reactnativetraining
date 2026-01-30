
import {View, Text, FlatList, StyleSheet} from "react-native";
import {Link} from "expo-router";
import {useAppDispatch, useAppSelector} from "../store/store";
import {useEffect} from "react";
import {fetchProduct, getDistinctCategories} from "../store/productSlice";
import {CategoryTile} from "./components/CategoryTile";

export default function Index() {
    
    const {distinctCategories, error, loading} = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchProduct("https://dummyjson.com/products"));
        dispatch(getDistinctCategories);
    },[])
    
    return (<View style={styles.container}>
        {loading ? <Text>Loading...</Text> : 
         <FlatList style={styles.list} data={distinctCategories} renderItem={(item) => (
             <CategoryTile category={item.item}/>
         )} keyExtractor={(item) => item.toString()}
        />
        }
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: '100%',
    }
})