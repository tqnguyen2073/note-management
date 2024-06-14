import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LabelsScreen from '../screens/LabelsScreen';
import FoldersScreen from '../screens/FoldersScreen';
import TrashScreen from '../screens/TrashScreen';
import NewNoteScreen from '../screens/NewNoteScreen';
import EditNoteScreen from '../screens/EditNoteScreen';
import ManageLabelsScreen from '../screens/ManageLabelsScreen';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Notes" component={HomeScreen} />
    <Stack.Screen name="NewNote" component={NewNoteScreen} />
    <Stack.Screen name="EditNote" component={EditNoteScreen} />
    <Stack.Screen name="ManageLabels" component={ManageLabelsScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Labels" component={LabelsScreen} />
      <Drawer.Screen name="Folders" component={FoldersScreen} />
      <Drawer.Screen name="Trash" component={TrashScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
