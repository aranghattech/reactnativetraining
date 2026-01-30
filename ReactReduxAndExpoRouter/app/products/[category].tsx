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
            <Text style={styles.headerText}>Total {products.length} found for {category}</Text>
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
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    listContent: {
        paddingBottom: 16,
    },
});