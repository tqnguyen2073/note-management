import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <View style={styles.searchContainer}>
      <Icon name="search" size={20} color="gray" />
      <TextInput
        style={styles.input}
        placeholder="Looking for something ....?"
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
});

export default SearchBar;
