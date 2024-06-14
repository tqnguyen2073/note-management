import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NOTES } from '../models/dummy-data';
import SearchBar from '../components/SearchBar';
import { searchNotes } from '../utils/search';

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const filteredNotes = searchNotes(NOTES, searchText);

  const renderNoteItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.noteItem, { backgroundColor: item.color || 'white' }]}
      onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
    >
      <Text>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Please add a new note</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NewNote')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noteItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: 'lightblue',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
});

export default HomeScreen;
