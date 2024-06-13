import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { NOTES } from '../models/dummy-data';

const NewNoteScreen = ({ navigation }) => {
  const [noteContent, setNoteContent] = useState('');

  const saveNote = () => {
    const newNote = {
      id: `n${NOTES.length + 1}`,
      color: null,
      labelIds: [],
      content: noteContent,
      updateAt: new Date(),
      isBookmarked: false,
    };

    // Update NOTES array (for demonstration, in a real app, use state management or database)
    NOTES.push(newNote);

    // Navigate back to HomeScreen
    navigation.navigate('Notes');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Enter note content"
        value={noteContent}
        onChangeText={setNoteContent}
      />
      <Button
        title="Save Note"
        onPress={saveNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default NewNoteScreen;
