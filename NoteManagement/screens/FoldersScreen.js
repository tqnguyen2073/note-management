import React from 'react';
import { View, FlatList, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FOLDERS } from '../models/dummy-data';

const FoldersScreen = ({ navigation }) => {

  const renderFolderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.folderButton}
      onPress={() => {/* Navigate to folder details */}}
    >
      <Text style={styles.folderText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={FOLDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderFolderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No folders found</Text>}
      />
      <Button
        title="Add Folder"
        onPress={() => {/* Navigate to add folder screen */}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  folderButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  folderText: {
    color: 'white',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default FoldersScreen;
