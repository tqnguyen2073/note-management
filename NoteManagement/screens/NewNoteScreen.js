import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const NewNoteScreen = ({ navigation }) => {
  const [content, setContent] = useState('');

  const addNoteHandler = () => {
    // Logic to add the note
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
      <Button title="Add Note" onPress={addNoteHandler} />
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
});

export default NewNoteScreen;
