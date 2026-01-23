import { useState } from "react";
import { Alert, Button, FlatList, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { ToDoItemView } from "./ToDoItemView";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'center',
      padding: 10,
      rowGap: 20,
      color: 'black',
      width: '100%',
    },
    content : {
      fontSize: 16,
      color: 'black',
      flex : 1
    },
    heading : {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'blue',
    }
  })

export interface ToDoItem {
    id: number;
    title: string;
    completed: boolean;
}

export default function HomeScreen() {

    const [todo,setToDo] = useState("");
    const [todoList,setToDoList] = useState<ToDoItem[]>([]);

    const a = [1,2,3,4,5];
    const c = [...a,3,4,5]; /// spread operator in javascript

   function onAddToDoItem() {
     if(todo.trim().length === 0) {
        Alert.alert("Error","Todo cannot be empty");
        return;
     }

      
      setToDoList([...todoList, { id: todoList.length + 1, title: todo, completed: false }]);
      setToDo("");
   }

    return (
          <SafeAreaView style={styles.container}>
            <View style={styles.content}>
            <FlatList 
                data={todoList}
                renderItem={({item}) => (
                  <ToDoItemView item={item} />
                )}
                keyExtractor={(item,index) => item.id.toString()} />
             <TextInput
              placeholder="Enter a todo"
              value={todo}
              onChangeText={(text) => setToDo(text)}
            />
            <Button title="Add Todo" onPress={onAddToDoItem} />
              </View>
          </SafeAreaView>
  );

  
}
