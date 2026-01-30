import {useLocalSearchParams, Stack} from "expo-router";
import {View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, SafeAreaView, FlatList} from "react-native";
import {useAppSelector} from "../../../store/store";
import {Product, Review} from "../../../types/product";

const { width, height } = Dimensions.get('window');

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

    const renderReview = (review: Review) => (
        <View style={styles.reviewCard} key={review.reviewerEmail + review.date}>
            <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.reviewerName}</Text>
                <Text style={styles.reviewRating}>⭐ {review.rating}</Text>
            </View>
            <Text style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</Text>
            <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: product.title }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {product.images && product.images.length > 0 ? (
                    <FlatList
                        data={product.images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <Image 
                                source={{ uri: item }} 
                                style={styles.coverImage}
                                resizeMode="contain"
                            />
                        )}
                    />
                ) : (
                    <Image 
                        source={{ uri: product.thumbnail }} 
                        style={styles.coverImage}
                        resizeMode="cover"
                    />
                )}
                
                <View style={styles.detailsContainer}>
                    <View style={styles.brandRow}>
                        <Text style={styles.brand}>{product.brand}</Text>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingText}>⭐ {product.rating}</Text>
                        </View>
                    </View>

                    <Text style={styles.title}>{product.title}</Text>
                    
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                        {product.discountPercentage > 0 && (
                            <View style={styles.discountBadge}>
                                <Text style={styles.discountText}>{product.discountPercentage}% OFF</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.stockStatus}>
                        <View style={[styles.statusDot, { backgroundColor: product.stock > 0 ? '#4caf50' : '#f44336' }]} />
                        <Text style={styles.statusText}>{product.availabilityStatus} ({product.stock} left)</Text>
                    </View>
                    
                    <View style={styles.divider} />
                    
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <View style={styles.specsContainer}>
                        <View style={styles.specItem}>
                            <Text style={styles.specLabel}>SKU</Text>
                            <Text style={styles.specValue}>{product.sku}</Text>
                        </View>
                        <View style={styles.specItem}>
                            <Text style={styles.specLabel}>Weight</Text>
                            <Text style={styles.specValue}>{product.weight}g</Text>
                        </View>
                        <View style={styles.specItem}>
                            <Text style={styles.specLabel}>Dimensions</Text>
                            <Text style={styles.specValue}>{product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.infoBox}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>🛡️</Text>
                            <Text style={styles.infoText}>{product.warrantyInformation}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>🚚</Text>
                            <Text style={styles.infoText}>{product.shippingInformation}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>🔄</Text>
                            <Text style={styles.infoText}>{product.returnPolicy}</Text>
                        </View>
                    </View>

                    {product.reviews && product.reviews.length > 0 && (
                        <View style={styles.reviewsSection}>
                            <Text style={styles.sectionTitle}>Customer Reviews</Text>
                            {product.reviews.map(renderReview)}
                        </View>
                    )}
                </View>
            </ScrollView>
            
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={() => alert('Added to cart!')}
                >
                    <Text style={styles.addToCartText}>Add to Cart • ${product.price.toFixed(2)}</Text>
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
        width: width,
        height: height / 3,
        backgroundColor: '#f8f9fa',
    },
    detailsContainer: {
        padding: 20,
    },
    brandRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    brand: {
        fontSize: 14,
        color: '#888',
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: 1.2,
    },
    ratingBadge: {
        backgroundColor: '#fff9c4',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fbc02d',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    price: {
        fontSize: 28,
        fontWeight: '900',
        color: '#2e7d32',
    },
    discountBadge: {
        backgroundColor: '#ffebee',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginLeft: 12,
    },
    discountText: {
        color: '#d32f2f',
        fontSize: 12,
        fontWeight: '700',
    },
    stockStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: '#444',
        lineHeight: 24,
        marginBottom: 24,
    },
    specsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    specItem: {
        alignItems: 'center',
    },
    specLabel: {
        fontSize: 10,
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 4,
        fontWeight: '600',
    },
    specValue: {
        fontSize: 13,
        color: '#333',
        fontWeight: '700',
    },
    infoBox: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoIcon: {
        fontSize: 18,
        marginRight: 12,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    reviewsSection: {
        marginTop: 8,
    },
    reviewCard: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingVertical: 16,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    reviewerName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#333',
    },
    reviewRating: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fbc02d',
    },
    reviewDate: {
        fontSize: 12,
        color: '#999',
        marginBottom: 8,
    },
    reviewComment: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    addToCartButton: {
        backgroundColor: '#000',
        paddingVertical: 18,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
    },
});