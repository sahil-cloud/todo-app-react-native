import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,FlatList,Button, KeyboardAvoidingView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tempData  from "./tempData";
import TodoList from "./components/todoList";
import ToDoModal from "./components/todoModal";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';
import { Item, Input } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';



function HomeScreen({route,navigation}) {

  // if(route.params.initTodo != undefined){
  // const {initTodo} = route.params;
  // }

  // if (initTodo === undefined){
  //   initTodo = "";
  // // }
  // const [user,SetUser] = useState("");
  // const [tempData,SetData] = useState([]);


   

    // setStringValue("sahil");
  
//     getMyStringValue = async () => {
//       try {
//          await AsyncStorage.getItem("key")
//          .then(res => {})
//          .then(r => {
//            return r
//          })
//       } catch (e) {
//         // read error
//       }

//       console.log("Done.");
//     };

// console.log(getMyStringValue())

  const {data] = route.params;
  console.log(data.name);

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={{ fontSize: 20, color: "black", fontWeight: "bold", paddingLeft: 10, paddingRight: 10 }}>TODO
          <Text style={{ fontSize: 20, color: "lightseagreen", fontWeight: "bold" }}>  List</Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 40 }}>
          <TouchableOpacity style={styles.addList}>
            <AntDesign name="plus" size={30} color="lightseagreen"
            onPress={() => navigation.navigate('MyModal')}
            />
          </TouchableOpacity>

          <Text style={styles.add}>Add List</Text>
        </View>
        <View style={{height:275,paddingLeft:32}}>
          <FlatList
          data={data}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <>
            <TouchableOpacity 
            onPress={() => {
              navigation.navigate("MyModal2",{
                itemName:item.name,
                itemTodos: item.todos,
              })
            }}
            >
                <TodoList list={item} />
            </TouchableOpacity>
            </>
          )}
          />
        </View>
      </View>
    </>
  );
}

 
//  console.log(setStringValue())

function ModalScreen({ navigation }) {
  const [name,Setname] = useState("");
  const [res2,setres] = useState("");

  setStringValue = async (tempData) => {
    console.log("Dojnjnne.");

    try {
      await AsyncStorage.setItem("key", JSON.stringify(tempData));
      const res = JSON.parse(await AsyncStorage.getItem("key"));
      // console.log(res);
      setres(res);
    } catch (e) {
      // save error
    }

    console.log("Done.");
  };

  const bColor = ["lightblue","lightsteelblue","burlywood","bisque","lightpink","lightgreen"];
  var item = bColor[Math.floor(Math.random() * bColor.length)];

  // const windowWidth = useWindowDimensions().width;
  // const windowHeight = useWindowDimensions().height;

  createTODO = async () =>{
    tempData.push({
      name,
      color:item,
      todos:[],
    });
    // console.log(tempData)

      // const jsonValue = JSON.stringify(tempData);
      // await AsyncStorage.setItem("key", jsonValue);
      setStringValue(tempData);


    Setname("");
    navigation.navigate("Home",{
      data:res2
    });
  }

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} behavior="padding">
    <View style={{alignSelf:"stretch" ,marginHorizontal:32}}>
      <Text style={styles.title}>Create TODO</Text>
          <Item rounded style={{marginTop:20,marginBottom:15}}>
            <Input placeholder='List Name' name="input" onChangeText={(value) => Setname(value)} />
          </Item>
  {/* <Text style={styles.title}>{name}</Text> for debug */}

          <Button onPress={createTODO} title="Create!" />
    </View>
    </KeyboardAvoidingView>

      {/* close button */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end",marginBottom:10}}>
      <Button style={{}} onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
      </>
  );
}

// function DetailsScreen() {
//   return (
//     <View>
//       <Text>Details</Text>
//     </View>
//   );
// }

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} initialParams={[]} headerMode="none" options={{headerShown:false}}/>
      {/* <MainStack.Screen name="Details" component={DetailsScreen} /> */}
    </MainStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreen} headerMode="none" />
        <RootStack.Screen name="MyModal" component={ModalScreen} />
        <RootStack.Screen name="MyModal2" component={ToDoModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: "lightblue",
    alignSelf: "center"
  },
  addList: {
    borderWidth: 2,
    borderColor: "lightblue",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 5
  },
  add: {
    color: "lightseagreen",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 5
  },
  title: {
    fontSize:28,
    fontWeight:"bold",
    alignSelf:"center",
    color: "burlywood",
    marginBottom:16,
    marginTop:120
  }
});
