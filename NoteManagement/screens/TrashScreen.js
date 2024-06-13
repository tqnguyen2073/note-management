import React from 'react';
import { View, Button, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TRASH } from '../models/dummy-data';

const TrashScreen = () => {

  const restoreNote = (noteId) => {
    const noteIndex = TRASH.findIndex((note) => note.id === noteId);
    const restoredNote = TRASH[noteIndex];

    // Remove from TRASH
    TRASH.splice(noteIndex, 1);

    // Update NOTES array (for demonstration, in a real app, use state management or database)
    // Here, assuming restored notes go back to NOTES array (you may need to adjust this based on your app logic)
    NOTES.push(restoredNote);
  };

  const deleteNotePermanently = (noteId) => {
    const noteIndex = TRASH.findIndex((note) => note.id === noteId);

    // Remove from TRASH
    TRASH.splice(noteIndex, 1);
  };

  const renderNoteItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.noteItem, { backgroundColor: item.color || 'white' }]}
      onPress={() => {/* Implement navigate to note details */}}
    >
      <Text>{item.content}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Restore"
          onPress={() => restoreNote(item.id)}
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
    // Restore all notes logic
    NOTES.push(...TRASH);
    TRASH.length = 0; // Clear TRASH array
  };

  const emptyTrash = () => {
    // Clear TRASH array
    TRASH.length = 0;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={TRASH}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Trash is empty</Text>}
      />
      <View style={styles.bottomButtons}>
        <Button
          title="Restore All"
          onPress={restoreAllNotes}
          disabled={TRASH.length === 0}
        />
        <Button
          title="Empty Trash"
          onPress={emptyTrash}
          disabled={TRASH.length === 0}
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
