import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NOTES } from '../models/dummy-data';

const ManageLabelsScreen = ({ route, navigation }) => {
  const { noteId } = route.params;
  const noteIndex = NOTES.findIndex((note) => note.id === noteId);
  const note = NOTES[noteIndex];

  const toggleLabel = (labelId) => {
    const labelIndex = note.labelIds.indexOf(labelId);
    if (labelIndex === -1) {
      // Add label to note
      note.labelIds.push(labelId);
    } else {
      // Remove label from note
      note.labelIds.splice(labelIndex, 1);
    }
    NOTES[noteIndex] = { ...note };
    // Navigate back to EditNoteScreen
    navigation.goBack();
  };

  const renderLabelItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.labelButton, { backgroundColor: note.labelIds.includes(item.id) ? 'lightblue' : 'lightgray' }]}
      onPress={() => toggleLabel(item.id)}
    >
      <Text style={styles.labelText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={LABELS}
        keyExtractor={(item) => item.id}
        renderItem={renderLabelItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  labelButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  labelText: {
    textAlign: 'center',
  },
});

export default ManageLabelsScreen;
