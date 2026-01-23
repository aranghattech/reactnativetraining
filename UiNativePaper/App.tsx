import {Appbar, Badge, Card, Drawer, FAB, Portal, Snackbar, Avatar, Icon, ActivityIndicator} from "react-native-paper";
import {Alert, View, StyleSheet, Text, Modal, Image, FlatList} from "react-native";
import { SafeAreaProvider} from "react-native-safe-area-context";
import {useState, useEffect} from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}


export default function App() {
  
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  function onBackButtonPress() {
    Alert.alert("Back button pressed");
  }
  
  function onDeletePress() {
    setVisible(true);
  }

  const renderUser = ({ item }: { item: User }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={item.email}
        left={(props) => <Avatar.Text {...props} label={item.name.substring(0, 2).toUpperCase()} />}
      />
      <Card.Content>
        <Text variant="bodyMedium">Username: {item.username}</Text>
        <Text variant="bodyMedium">Phone: {item.phone}</Text>
        <Text variant="bodyMedium">Website: {item.website}</Text>
        <Text variant="bodyMedium">Company: {item.company.name}</Text>
        <Text variant="bodyMedium">City: {item.address.city}</Text>
      </Card.Content>
    </Card>
  );
  
  return (
  <>
    <SafeAreaProvider>
       <View style={styles.container}>
         <Appbar.Header>
           <Appbar.BackAction onPress={onBackButtonPress} />
           <Appbar.Content title="User Directory" />
           <Appbar.Action icon="delete"  onPress={onDeletePress} />
           <Appbar.Action icon="dots-vertical" />
         </Appbar.Header>
         
         {loading ? (
           <View style={styles.center}>
             <ActivityIndicator animating={true} size="large" />
           </View>
         ) : error ? (
           <View style={styles.center}>
             <Text style={{ color: "red" }}>{error}</Text>
           </View>
         ) : (
           <FlatList
             data={users}
             keyExtractor={(item) => item.id.toString()}
             renderItem={renderUser}
             contentContainerStyle={styles.listContent}
           />
         )}

         <FAB 
            icon="send"
            rippleColor={"blue"}
            animated={true}
            size={"medium"}
            onPress={() => setModalVisible(true)}
            style={styles.floatingActionButton}
            />
         
         <Snackbar visible={visible} onDismiss={() => setVisible(false)} >
           <View>
           <Text style={{color : "white"}}>Item deleted</Text>
            <Text style={{color: "red"}}>Undo</Text>
            </View>
         </Snackbar>
         
       </View>
      </SafeAreaProvider>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 16,
    paddingBottom: 80, // Space for FAB
  },
  card: {
    marginBottom: 16,
  },
  floatingActionButton: {
    position: "absolute",
    backgroundColor : "aquamarine",
    margin: 16,
    right: 0,
    bottom: 16,
    borderRadius: 50,
  },
})


