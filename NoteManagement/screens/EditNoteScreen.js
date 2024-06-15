import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ActionSheet from 'react-native-actions-sheet'; // Import ActionSheet
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon from react-native-vector-icons
import { useContext } from 'react';
import { appContext } from '../context';

const EditNoteScreen = ({ route, navigation }) => {
  const { noteId } = route.params;
  const { state, dispatch } = useContext(appContext)
  const note = state.notes.find(n => n.id === noteId)
  const isBookmarked = note?.isBookmarked;

  if (!note) {
    return (<View><Text>No</Text></View>)
  }

  const [noteContent, setNoteContent] = useState(note?.content);
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const actionSheetRef = useRef(); // Use useRef for ActionSheet


  const handleSaveNote = ({ navigate = true }) => {
    // Update note in NOTES array (for demonstration, in a real app, use state management or database)
    dispatch({
      type: 'UPDATE',
      payload: {
        id: noteId,
        note: {
          content: noteContent,
          isBookmarked: !isBookmarked,
        }
      }
    })
    // Navigate back to HomeScreen
    if (navigate) {
      navigation.navigate('Notes');
    }
  };

  const openBottomSheetMenu = () => {
    // Open ActionSheet
    actionSheetRef.current?.setModalVisible(); // Ensure ref is used properly
  };

  const changeNoteColor = (color) => {
    // Implement changing note color logic here
    actionSheetRef.current?.setModalVisible(false); // Close ActionSheet
  };

  const manageLabels = () => {
    // Navigate to Manage Labels screen
    navigation.navigate('ManageLabels', { noteId });
    actionSheetRef.current?.setModalVisible(false); // Close ActionSheet after navigation
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const deleteNote = () => {
    dispatch({
      type: 'DELETE',
      payload: {
        id: noteId,
        note,
      }
    })

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { backgroundColor: note.color || 'white' }]}
        multiline
        editable={isEditing}
        value={noteContent}
        onChangeText={setNoteContent}
      />
      <TouchableOpacity
        style={styles.bookmarkButton}
        onPress={() => handleSaveNote({ navigate: false })}
      >
        <Icon name={isBookmarked ? 'star' : 'star-border'} size={30} color={isBookmarked ? 'gold' : 'gray'} />
        <Text style={styles.bookmarkText}>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomSheetButton}
        onPress={openBottomSheetMenu}
      >
        <Text style={styles.bottomSheetText}>Open Bottom Sheet Menu</Text>
      </TouchableOpacity>
      <Button
        title={isEditing ? "Save Changes" : "Edit Note"}
        onPress={isEditing ? handleSaveNote : toggleEditMode}
      />
      <Button
        title="Delete Note"
        color="red"
        onPress={deleteNote}
      />

      {/* ActionSheet Component */}
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContent}>
          <TouchableOpacity style={styles.actionButton} onPress={() => changeNoteColor('lightseagreen')}>
            <Text>Change Color to Light Sea Green</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => changeNoteColor('skyblue')}>
            <Text>Change Color to Sky Blue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={manageLabels}>
            <Text>Manage Labels</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} onPress={null}>
            <Text style={{ color: 'white' }}>Move to Trash</Text>
          </TouchableOpacity>
        </View>
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
  actionSheetContent: {
    padding: 20,
  },
  actionButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
});

export default EditNoteScreen;
