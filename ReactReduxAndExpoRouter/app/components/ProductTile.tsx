import {Text, StyleSheet, View, Image, Pressable} from "react-native";
import {Product} from "../../types/product";
import {Link} from "expo-router";

export function ProductTile({ product }: { product: Product }) {
    return (
        <Link href={`/products/details/${product.id}`} asChild>
            <Pressable style={styles.card}>
                <Image 
                    source={{uri: product.thumbnail}}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.details}>
                    <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
                </View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: 120,
        height: 120,
        backgroundColor: '#f0f0f0',
    },
    details: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2e7d32',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});
