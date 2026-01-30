import {useLocalSearchParams, Stack} from "expo-router";
import {View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, SafeAreaView} from "react-native";
import {useAppSelector} from "../../../store/store";
import {Product} from "../../../types/product";

const { height } = Dimensions.get('window');

export default function ProductDetails() {
    const {id} = useLocalSearchParams();
    const product:Product|undefined  = useAppSelector(state => state.products.products.find(product => product.id === Number(id)));

    if (!product) {
        return (
            <View style={styles.center}>
                <Text>Product not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: product.title }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image 
                    source={{ uri: product.thumbnail }} 
                    style={styles.coverImage}
                    resizeMode="cover"
                />
                <View style={styles.detailsContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.category}>{product.category}</Text>
                        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    </View>
                    
                    <Text style={styles.title}>{product.title}</Text>
                    
                    <View style={styles.divider} />
                    
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>✨ Premium Quality</Text>
                        <Text style={styles.infoText}>🚚 Fast Delivery</Text>
                        <Text style={styles.infoText}>🔄 30-Day Returns</Text>
                    </View>
                </View>
            </ScrollView>
            
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={() => alert('Added to cart!')}
                >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverImage: {
        width: '100%',
        height: height / 4,
        backgroundColor: '#f0f0f0',
    },
    detailsContainer: {
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    category: {
        fontSize: 14,
        color: '#888',
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 1,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 20,
    },
    infoBox: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    infoText: {
        fontSize: 12,
        color: '#555',
        fontWeight: '500',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    addToCartButton: {
        backgroundColor: '#000',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});