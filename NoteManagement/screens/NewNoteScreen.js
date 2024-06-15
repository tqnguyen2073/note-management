import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { NOTES } from '../models/dummy-data';
import { useContext } from 'react';
import { appContext } from '../context';

const NewNoteScreen = ({ navigation }) => {
  const [noteContent, setNoteContent] = useState('');

  const { state, dispatch } = useContext(appContext);


  const saveNote = () => {
    const newNote = {
      id: `n${NOTES.length + 1}`,
      color: null,
      labelIds: [],
      content: noteContent,
      updateAt: new Date(),
      isBookmarked: false,
    };


    dispatch({
      type: 'ADD',
      payload: {
        note: newNote
      }
    })

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
