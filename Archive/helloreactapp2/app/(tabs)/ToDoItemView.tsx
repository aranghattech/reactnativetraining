import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  TextInput,
  StatusBar,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { Plus, Trash2, Check, Calendar, Bell, Menu, Search, X } from 'lucide-react-native';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Morning meditation', completed: true, category: 'Personal' },
    { id: 2, text: 'Review project proposal', completed: false, category: 'Work' },
    { id: 3, text: 'Buy groceries', completed: false, category: 'Home' },
    { id: 4, text: 'Call mom', completed: false, category: 'Personal' },
    { id: 5, text: 'Dentist appointment', completed: false, category: 'Health' },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All');
  const [isAdding, setIsAdding] = useState(false);

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      category: 'Personal'
    };
    setTodos([newItem, ...todos]);
    setNewTodo('');
    setIsAdding(false);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const activeCount = todos.filter(t => !t.completed).length;
  const progress = todos.length > 0 ? (todos.filter(t => t.completed).length / todos.length) * 100 : 0;

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.todoItem} 
      onPress={() => toggleTodo(item.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
        {item.completed && <Check size={16} color="#fff" strokeWidth={3} />}
      </View>
      <View style={styles.todoTextContainer}>
        <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>
          {item.text}
        </Text>
        <Text style={styles.categoryTag}>{item.category}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.deleteButton}>
        <Trash2 size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.iconButton}>
              <Menu size={24} color="#4B5563" />
            </TouchableOpacity>
            <View style={styles.topIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Search size={24} color="#4B5563" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Bell size={24} color="#4B5563" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.greeting}>Hello, Alex</Text>
          <View style={styles.dateContainer}>
            <Calendar size={14} color="#6B7280" />
            <Text style={styles.dateText}>{dateString}</Text>
          </View>

          {/* Progress Card */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View>
                <Text style={styles.progressLabel}>Your Progress</Text>
                <Text style={styles.progressCount}>{activeCount} tasks left</Text>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
              </View>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
          </View>
        </View>

        {/* Todo List */}
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Add Button & Input Area */}
        {isAdding ? (
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Add a new task..."
              value={newTodo}
              onChangeText={setNewTodo}
              autoFocus
              onSubmitEditing={addTodo}
            />
            <View style={styles.inputActions}>
              <TouchableOpacity onPress={addTodo} style={styles.addButtonSmall}>
                <Check size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsAdding(false)} style={styles.cancelButton}>
                <X size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.fab} 
            onPress={() => setIsAdding(true)}
            activeOpacity={0.8}
          >
            <Plus size={32} color="#fff" />
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  flexContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
    backgroundColor: '#F3F4F6',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  topIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginLeft: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dateText: {
    marginLeft: 6,
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  progressCard: {
    backgroundColor: '#4F46E5', // Indigo-600
    borderRadius: 24,
    padding: 24,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  progressLabel: {
    color: '#E0E7FF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  progressCount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercent: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 100,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 2,
  },
  todoTextCompleted: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  categoryTag: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  deleteButton: {
    padding: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 24,
    paddingBottom: 40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    marginRight: 12,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});