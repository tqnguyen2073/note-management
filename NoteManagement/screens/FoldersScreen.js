import React, {useState} from 'react';
import { View, FlatList, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FOLDERS } from '../models/dummy-data';
import SearchBar from '../components/SearchBar';
import { searchFolders } from '../utils/search';

const FoldersScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const filteredFolders = searchFolders(FOLDERS, searchText);
  const renderFolderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.folderButton}
      onPress={() => {}}
    >
      <Text style={styles.folderText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FlatList
        data={filteredFolders}
        keyExtractor={(item) => item.id}
        renderItem={renderFolderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No folders found</Text>}
      />
      {/* <FlatList
        data={FOLDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderFolderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No folders found</Text>}
      /> */}
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
