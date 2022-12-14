import React, {useState,useRef} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Keyboard,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [task, setTask] = useState();
  const [newTask, setNewTask] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState();

  const handleSubmit = value => {
    value != null
      ? setNewTask([...newTask, value])
      : alert('Please Enter Some Text...');

    setTask(null);
    Keyboard.dismiss();
  };

  const handleDelete = value => {
    setNewTask(newTask.filter((v, i) => i != value));
  };
  const editTextInput = useRef();
  const handleEdit = async value => {
    setTask(value.title);
    setCurrentTodo(value);
    setEditing(true);
    editTextInput.current.focus();
  };

  const updateEdit = async val => {
    setEditing(false);
    setTask(null);
    newTask[newTask.indexOf(currentTodo.title)] = val;
  };

  const deleteAll = () => {
    setNewTask([]);
  };

  const Item = ({title, id}) => (
    <View style={styles.bodyContainer}>
      <View style={styles.box}>
        <View>
          <Text style={styles.itemtext}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => handleEdit({title, id})}>
            <MaterialIcon
              name="edit"
              color={'#55BCF6'}
              size={22}></MaterialIcon>
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => handleDelete(id)}>
            <MaterialIcon
              name="delete"
              color={'#55BCF6'}
              size={22}></MaterialIcon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  

  const renderItem = ({item, index}) => <Item title={item} id={index} />;

  return (
    <View style={styles.body}>
      <View style={styles.headingDiv}>
        <Text style={styles.heading}>TODO TASKS</Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: 110,
            padding: 3,
            justifyContent: 'space-around',
            // backgroundColor: '#fff',
          }}
          onPress={deleteAll}>
          <Text style={styles.deleteAllBtn}>Delete All</Text>
          <MaterialIcon
            onPress={deleteAll}
            name="delete-forever"
            color={'#55BCF6'}
            size={22}></MaterialIcon>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.8}}>
        <View style={styles.taskItems}>
          <FlatList
            data={newTask}
            renderItem={renderItem}
            // keyExtractor={item => item.id}
          />
        </View>
      </View>

      <View style={styles.inpDiv}>
        <TextInput
      ref={editTextInput}
      //      onLayout={()=> inputRef.current.focus()}
          placeholder="type something..."
          keyboardType="default"
          style={styles.textInput}
          multiline={true}
          blurOnSubmit={true}
          maxLength={200}
          onChangeText={text => setTask(text.trim())}
          value={task}
          returnKeyType="none"
        />
        {editing == false ? (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => handleSubmit(task)}>
            <MaterialIcon
              name="add"
              style={styles.addIcon}
              size={30}></MaterialIcon>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => updateEdit(task)}>
            <MaterialIcon
              name="update"
              style={styles.addIcon}
              size={30}></MaterialIcon>
          </TouchableOpacity>
        )}
      </View>

      <StatusBar />
    </View>
  );
};

// STYLE SHEET

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#E8EAED',
    width: '100%',
    justifyContent: 'space-around',
  },
  heading: {
    flexWrap: 'wrap',
    fontSize: 26,
    color: '#55BCF6',
    fontWeight: 'bold',
  },
  headingDiv: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor: '#55BCF6',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    padding: 5,
  },
  deleteAllBtn: {
    fontSize: 16,
    color: '#55BCF6',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inpDiv: {
    flex: 0.175,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textInput: {
    marginLeft: 10,
    borderColor: '#55BCF6',
    borderRadius: 8,
    width: 270,
    height: 43,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  addBtn: {
    borderWidth: 1,
    borderColor: '#55BCF6',
    borderRadius: 100,
    width: 35,
    height: 35,
    marginRight: 9,
    padding: 1,
  },
  addIcon: {
    color: '#55BCF6',
  },

  bodyContainer: {
    flex: 1,
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

export default App;
