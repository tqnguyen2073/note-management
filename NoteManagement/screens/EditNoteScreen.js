import React, { useState, useRef } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NOTES } from '../models/dummy-data';
import ActionSheet from 'react-native-actions-sheet'; // Import ActionSheet

const EditNoteScreen = ({ route, navigation }) => {
  const { noteId } = route.params;
  const noteIndex = NOTES.findIndex((note) => note.id === noteId);
  const note = NOTES[noteIndex];
  const [noteContent, setNoteContent] = useState(note.content);
  const [isBookmarked, setIsBookmarked] = useState(note.isBookmarked);
  const actionSheetRef = useRef(); // Use useRef for ActionSheet

  const saveNote = () => {
    // Update note in NOTES array (for demonstration, in a real app, use state management or database)
    NOTES[noteIndex].content = noteContent;
    NOTES[noteIndex].updateAt = new Date();

    // Navigate back to HomeScreen
    navigation.navigate('Notes');
  };

  const toggleBookmark = () => {
    // Toggle bookmark status
    setIsBookmarked(!isBookmarked);

    // Update note in NOTES array (for demonstration, in a real app, use state management or database)
    NOTES[noteIndex].isBookmarked = !isBookmarked;
  };

  const openBottomSheetMenu = () => {
    // Open ActionSheet
    actionSheetRef.current?.setModalVisible(); // Ensure ref is used properly
  };

  const changeNoteColor = (color) => {
    // Implement changing note color logic here
    NOTES[noteIndex].color = color;
    actionSheetRef.current?.setModalVisible(false); // Close ActionSheet
  };

  const manageLabels = () => {
    // Navigate to Manage Labels screen
    navigation.navigate('ManageLabels', { noteId });
    actionSheetRef.current?.setModalVisible(false); // Close ActionSheet after navigation
  };

  const moveToTrash = () => {
    // Move note to Trash
    // Implement logic to move note to Trash (you might need to update NOTES and TRASH arrays)
    actionSheetRef.current?.setModalVisible(false); // Close ActionSheet
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { backgroundColor: note.color || 'white' }]}
        multiline
        value={noteContent}
        onChangeText={setNoteContent}
      />
      <TouchableOpacity
        style={styles.bookmarkButton}
        onPress={toggleBookmark}
      >
        <Text style={styles.bookmarkText}>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomSheetButton}
        onPress={openBottomSheetMenu}
      >
        <Text style={styles.bottomSheetText}>Open Bottom Sheet Menu</Text>
      </TouchableOpacity>
      <Button
        title="Save Note"
        onPress={saveNote}
      />

      {/* ActionSheet Component */}
      <ActionSheet ref={actionSheetRef}>
        <TouchableOpacity style={styles.actionButton} onPress={() => changeNoteColor('lightseagreen')}>
          <Text>Change Color to Light Sea Green</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => changeNoteColor('skyblue')}>
          <Text>Change Color to Sky Blue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={manageLabels}>
          <Text>Manage Labels</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} onPress={moveToTrash}>
          <Text style={{ color: 'white' }}>Move to Trash</Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  bookmarkButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginBottom: 10,
  },
  bookmarkText: {
    color: 'white',
    textAlign: 'center',
  },
  bottomSheetButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  bottomSheetText: {
    color: 'black',
    textAlign: 'center',
  },
  actionButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
});

export default EditNoteScreen;
