import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LABELS } from '../models/dummy-data';

const LabelsScreen = ({ navigation }) => {
  const [keyword, setKeyword] = useState('');
  const [filteredLabels, setFilteredLabels] = useState(LABELS);

  const searchLabels = () => {
    const filtered = LABELS.filter(label => label.label.toLowerCase().includes(keyword.toLowerCase()));
    setFilteredLabels(filtered);
  };

  const renderLabelItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.labelButton}
      onPress={() => navigation.navigate('EditLabel', { labelId: item.id })}
    >
      <Text style={styles.labelText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search labels"        
        onChangeText={setKeyword}
        value={keyword}
        onSubmitEditing={searchLabels}
      />
      <FlatList
        data={filteredLabels}
        keyExtractor={(item) => item.id}
        renderItem={renderLabelItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No labels found</Text>}
      />
      <Button
        title="Create New Label"
        onPress={() => navigation.navigate('NewLabel')}
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  labelButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginBottom: 10,
  },
  labelText: {
    textAlign: 'center',
    color: 'white',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default LabelsScreen;

