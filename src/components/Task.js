import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

function TaskItem(props) {
    return (
    <View style={styles.bodyContainer}>
      <View style={styles.box}>
        <View>
          <Text style={styles.itemtext}>{props.text}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <MaterialIcon
              name="edit"
              color={'#55BCF6'}
              size={20}></MaterialIcon>
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => deleteTask(id)}>
            <MaterialIcon
              name="delete"
              color={'#55BCF6'}
              size={20}></MaterialIcon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default TaskItem;

const styles = StyleSheet.create({
  bodyContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  box: {
    marginTop: 10,
    height: 'auto',
    width: '90%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 12,
    borderRadius: 10,
  },
  itemtext: {
    width: 250,
  },
});
