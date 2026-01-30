import {Text, StyleSheet, View, Image, Pressable} from "react-native";
import {Product} from "../../types/product";
import {Link} from "expo-router";

export function ProductTile({ product }: { product: Product }) {
    return (
        <Link href={{ pathname: `/products/details/${product.id}`, params: {id: product.id} }}
        asChild>
            <Pressable style={styles.card}>
                <Image 
                    source={{uri: product.thumbnail}}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.details}>
                    <View style={styles.headerRow}>
                        <Text style={styles.brand}>{product.brand}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>⭐ {product.rating}</Text>
                        </View>
                    </View>
                    <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                        {product.discountPercentage > 0 && (
                            <Text style={styles.discount}>-{product.discountPercentage}%</Text>
                        )}
                    </View>
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
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    brand: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    ratingContainer: {
        backgroundColor: '#fff9c4',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    rating: {
        fontSize: 10,
        fontWeight: '700',
        color: '#fbc02d',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2e7d32',
    },
    discount: {
        fontSize: 12,
        color: '#d32f2f',
        fontWeight: '600',
        marginLeft: 8,
        backgroundColor: '#ffebee',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});
