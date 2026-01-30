import {FlatList, Text, View, StyleSheet, SafeAreaView} from "react-native";
import {useLocalSearchParams, Stack} from "expo-router";
import {Product} from "../../types/product";
import {useAppSelector} from "../../store/store";
import {ProductTile} from "../components/ProductTile";

export default function Products() {
    const {category} = useLocalSearchParams();
    const products : Product[] = useAppSelector(state => state.products.products)
                                                .filter(product => product.category === category);
  return (
    <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: category as string }} />
        <View style={styles.header}>
            <Text style={styles.headerText}>{category}</Text>
            <Text style={styles.countText}>{products.length} Items</Text>
        </View>
        <FlatList 
            data={products} 
            renderItem={({item}) => <ProductTile product={item}/>}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 14,
        color: '#1a1a1a',
        fontWeight: '700',
        textTransform: 'capitalize',
    },
    countText: {
        fontSize: 12,
        color: '#888',
        fontWeight: '500',
    },
    listContent: {
        paddingBottom: 16,
    },
});