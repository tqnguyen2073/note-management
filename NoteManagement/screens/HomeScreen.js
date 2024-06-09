import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NOTES } from '../models/dummy-data';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {NOTES.length === 0 ? (
        <Text>Please add a new note</Text>
      ) : (
        <FlatList
          data={NOTES}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
              <View style={[styles.note, { backgroundColor: item.color || 'white' }]}>
                <Text>{item.content}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewNote')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  note: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
  },
});

export default HomeScreen;
