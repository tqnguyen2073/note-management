import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const EditNoteScreen = ({ route, navigation }) => {
  const { noteId } = route.params;
  const note = NOTES.find((n) => n.id === noteId);

  const [content, setContent] = useState(note.content);

  const updateNoteHandler = () => {
    // Logic to update the note
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter note content"
        value={content}
        onChangeText={setContent}
      />
      <Button title="Update Note" onPress={updateNoteHandler} />
      <TouchableOpacity style={styles.bookmarkButton} onPress={() => { /* Logic to toggle bookmark */ }}>
        <Text style={styles.bookmarkButtonText}>{note.isBookmarked ? 'Unbookmark' : 'Bookmark'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  bookmarkButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  bookmarkButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EditNoteScreen;
