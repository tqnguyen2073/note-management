import React, { useState } from 'react';
import { View, Button, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import { searchTrash } from '../utils/search';
import { NOTES } from '../models/dummy-data';

import { useContext } from 'react';
import { appContext } from '../context';

const TrashScreen = () => {
  const [searchText, setSearchText] = useState('');

  const { state, dispatch } = useContext(appContext)


  const filteredTrash = searchTrash(state.trash, searchText);

  const restoreNote = (noteId, note) => {
    dispatch({
      type: 'RESTORE',
      payload: {
        id: noteId,
        note
      }
    })
  };

  const deleteNotePermanently = (noteId) => {
    dispatch({
      type: 'DELETE_PER',
      payload: {
        id: noteId,
      }
    })
  };

  const renderNoteItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.noteItem, { backgroundColor: item.color || 'white' }]}
      onPress={() => {/* Implement navigate to note details */ }}
    >
      <Text>{item.content}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Restore"
          onPress={() => restoreNote(item.id, item)}
          color="green"
        />
        <Button
          title="Delete Permanently"
          onPress={() => deleteNotePermanently(item.id)}
          color="red"
        />
      </View>
    </TouchableOpacity>
  );

  const restoreAllNotes = () => {
    dispatch({
      type: 'RESTORE_ALL',
    })
  };

  const emptyTrash = () => {
    dispatch({
      type: 'DELETE_ALL',
    })
  };

  return (
    <View style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FlatList
        data={filteredTrash}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Trash is not found</Text>}
      />

      <View style={styles.bottomButtons}>
        <Button
          title="Restore All"
          onPress={restoreAllNotes}
          disabled={state.trash.length === 0}
        />
        <Button
          title="Empty Trash"
          onPress={emptyTrash}
          disabled={state.trash.length === 0}
        />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default TrashScreen;
