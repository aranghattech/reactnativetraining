import {View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Alert} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CartItem } from "../../types/cart";
import { Product } from "../../types/product";
import {useContext} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useRouter} from "expo-router";
import {getFirestore, addDoc, collection,query, where,getDoc} from "firebase/firestore";
import app from '../../firebaseconfig'

export default function Cart() {
    
    const userContext = useContext(UserContext);
    const router = useRouter();
    const cart = useSelector((state: RootState) => state.cart.cartItems);       
    
    function handleOnOrderPress()
    {
        if (userContext.user)
        {
            if (cart.length === 0)
            {
                
                Alert.alert("Error", "Cart is empty");
                return;
            }

            const db = getFirestore(app);
            const ordersCollection = collection(db, "orders");
            const orderRef = addDoc(ordersCollection, {
                userId: userContext.user.id,
                items: cart,
                status: "pending",
                address: "No 56, 2nd Street, New Delhi, India",
                timestamp: Date.now(),
            });
            
           const getMyOrders = query(ordersCollection, where("userId", "==", userContext.user.id));
           const orders =  getDoc(getMyOrders);
            
            orderRef.then(() => {
                Alert.alert("Success", "Order placed successfully");
                router.replace("/");
            })
        }
        else
            router.replace("/login");
    }
    
    const { cartItems } = useSelector((state: RootState) => state.cart);
    const { products } = useSelector((state: RootState) => state.products);

    const getProductDetails = (productId: number) => {
        return products.find((p: Product) => p.id === productId);
    };

    const cartData = cartItems.map((item: CartItem) => {
        const product = getProductDetails(item.productId);
        return {
            ...item,
            name: product?.title || "Unknown Product",
            price: product?.price || 0,
            total: (product?.price || 0) * item.quantity,
        };
    });

    const subTotal = cartData.reduce((acc, item) => acc + item.total, 0);
    const gst = subTotal * 0.18; // Assuming 18% GST
    const netTotal = subTotal + gst;

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.itemTotal}>${item.total.toFixed(2)}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>
            
            <FlatList
                data={cartData}
                renderItem={renderItem}
                keyExtractor={(item) => (item.productId || item.id || Math.random()).toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
            />

            <View style={styles.footer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total:</Text>
                    <Text style={styles.summaryValue}>${subTotal.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>GST (18%):</Text>
                    <Text style={styles.summaryValue}>${gst.toFixed(2)}</Text>
                </View>
                <View style={[styles.summaryRow, styles.netTotalRow]}>
                    <Text style={styles.netTotalLabel}>Net Total:</Text>
                    <Text style={styles.netTotalValue}>${netTotal.toFixed(2)}</Text>
                </View>

                <TouchableOpacity style={styles.orderButton} onPress={handleOnOrderPress}>
                    <Text style={styles.orderButtonText}>Add Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemQty: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    itemTotal: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    },
    footer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '500',
    },
    netTotalRow: {
        marginTop: 5,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    netTotalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    netTotalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    orderButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});