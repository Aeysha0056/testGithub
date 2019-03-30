import React from 'react';
import { StyleSheet, Text, View ,Button,StatusBar,FlatList,TextInput ,TouchableOpacity,Dimensions} from 'react-native';
import {Header} from "react-native-elements";
import Icon from 'react-native-vector-icons/Feather';
import firebase from './firebase';

export default class App extends React.Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('List');
    this.unsubscribe = null;
    this.state = {
    isLoading: true,
    todoList: [],
    taskName:"",
    key:""
  }
  }

  addTask (id,taskName){
   this.ref.add({
      taskId:id,
      task:taskName,
     })
     .catch((error) => {
       console.error("Error adding document: ", error);
       this.setState({
        isLoading: false,
      });
     });
   }

   onCollectionUpdate = (querySnapshot) => {
    const todoList = [];
    querySnapshot.forEach((doc) => {
      const { taskId, task } = doc.data();
      todoList.push({
        key: doc.id,
        doc, // DocumentSnapshot
        taskId,
        task,
      });
    });
    this.setState({
      todoList,
      isLoading: false,

   });
  }

   componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  deleteTask(key) {
    this.setState({
      isLoading: true
    });
    this.ref.doc(key).delete().then(() => {
      console.log("Document successfully deleted!");
      this.setState({
        isLoading: false
      });
    }).catch((error) => {
      console.error("Error removing document: ", error);
      this.setState({
        isLoading: false
      });
    });
  }

  editTask(key,taskName){
    this.setState({
      isLoading: true
    });
    this.ref.doc(key)
    .update({
      'task':taskName
    })
    .then(() => {
      console.log("Document successfully updated!");
      this.setState({
        isLoading: false
      });
    }).catch((error) => {
      console.error("Error updating document: ", error);
      this.setState({
        isLoading: false
      });
    });

    

  }

  onChangeInputHandler = (value) => {
    this.setState({
      taskName: value
      });    
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.appTitle}> Todo App</Text>
        <View style = { styles.inputContainer }>
        <TextInput
           placeholder = "Enter the Task here ..."
           style = { styles.placeInput }
           value = { this.state.taskName }
           onChangeText = { this.onChangeInputHandler }
           returnKeyType={'done'}
           autoCorrect={false}
        ></TextInput>
        
        <Icon name='plus-square' color='#fff'size={30}
        onPress={() => this.addTask("7",this.state.taskName)}
        style={{paddingRight:30}}
        />
        </View>

        <FlatList
        style = {{paddingTop:20}}
        data={this.state.todoList}
        renderItem={({item}) => 
        <TouchableOpacity >
            <View style = { styles.listItem }>
              <View style={{flex:2,justifyContent: 'space-between',flexDirection:'row',alignItems: 'center',paddingLft:20,paddingRight:20}}>
                <Text style={{color:'#f23657',fontWeight: '500',fontSize: 18,marginVertical: 10}}>{ item.task }</Text>
                <View style={{justifyContent: 'space-evenly',flexDirection:'row',alignItems: 'flex-end'}}>
                <Icon name='edit-2' color='#9599B3'size={23}
                 onPress={() => this.editTask(item.key)}
                 style={{padding:5}}
                />
                <Icon name='trash-2' color='#9599B3'size={23}
                 onPress={() => this.deleteTask(item.key)}
                 style={{padding:5}}
                />
                </View>
                
                  </View>
            </View>
        </TouchableOpacity> 
      
        }
        keyExtractor={(item, index) => index.toString()}
        />
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f23657',
    padding: 8,
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  inputContainer: {
    justifyContent: 'space-between',
    flexDirection:'row',
    alignItems: 'center',
    width: '100%'
    },
    placeInput: {
    width: '70%',
    padding: 15,
    borderBottomColor: '#bbb',
    fontSize: 18,
    color:'white'
    },

    listItem: {
        width: Dimensions.get('window').width,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#eee',
        borderTopLeftRadius: 10,
        borderTopRightRadius:50,
        borderBottomRightRadius:50,
        borderBottomLeftRadius: 10,


    },
    appTitle: {
      color: '#fff',
      fontSize: 36,
      marginTop: 60,
      marginBottom: 30,
      fontWeight: '300'
    },

    card: {
      backgroundColor: '#fff',
      flex: 1,
      width: '90%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    input: {
      padding: 20,
      borderBottomColor: '#bbb',
      borderBottomWidth: 1,
      fontSize: 24
    },
    Flatcontainer:{
    width: '90%',
    borderBottomColor: '#bbb',
    borderBottomWidth: 10,
    flexDirection: 'row',
    alignItems: 'center'
    }


});
