import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, KeyboardAvoidingView, Keyboard } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { Item, Input, Header, Left, Right, Body, ListItem, List } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ToDoModal({ route, navigation }) {
    const { itemName, itemTodos } = route.params;
    const CompleteCount = itemTodos.filter(todo => todo.completed).length;
    const remainingcount = itemTodos.length - CompleteCount;

    const [initialRemaining, SetRemaining] = useState(remainingcount);
    const [initialCompleted, SetCompleted] = useState(CompleteCount);
    const [todo, Settodo] = useState("");
    const [initTodo,finalTodo] = useState(itemTodos);

    function SetToDo(todo) {
        itemTodos.push({
            index: initTodo.length+1,
            title: todo,
            completed: false,
        });
        Keyboard.dismiss();
        finalTodo(itemTodos)
        Settodo("");
    }

    function Todo(index){
        initTodo[index-1].completed = !initTodo[index-1].completed;
        finalTodo(initTodo)
        navigation.navigate("MyModal2",{
            itemName,
            itemTodos:initTodo
        });
    }
    

    return (
        <>
            <Header style={{ backgroundColor: "seashell" }}>
                <Left>
                    <Text style={styles.head}>{itemName}</Text>
                </Left>
                <Right>
                    <Button onPress={() => navigation.navigate("Home",{
                        initTodo
                    })} title="Dismiss" />
                </Right>
            </Header>
            <KeyboardAvoidingView style={{ flex: 3, alignItems: 'stretch', justifyContent: 'flex-start', marginTop: 20 }} behavior="padding">
                <View>
                    {/* <Text>{remainingcount}</Text> */}
                    <FlatList
                        data={initTodo}
                        keyExtractor={(item) => item.index}
                        renderItem={({ item }) => (
                            <>
                                <List>
                                    <ListItem>
                                        <TouchableOpacity
                                        onPress={() => {
                                            Todo(item.index)
                                        }}
                                        >
                                            <Ionicons name={item.completed ? "ios-square" : "ios-square-outline"}
                                                size={24} color="gray" 
                                                style={{ width: 32 }} />
                                        </TouchableOpacity>
                                        <Text style={{ marginLeft: 40, textDecorationLine: item.completed ? "line-through" : "none" ,
                                        color:item.completed ? "gray" : "black"
                                        }}>
                                            {item.title}
                                        </Text>
                                    </ListItem>
                                </List>
                            </>
                        )}
                    />
                </View>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView style={{ flex:1, alignItems: 'center',justifyContent:"flex-end", paddingHorizontal: 32 }} behavior="padding">
                <View style={{ alignSelf: "stretch",flexDirection:"row",marginBottom:20 }}>
                    <Item rounded style={{ flex:6,marginRight:15}}>
                        <Input placeholder='Add Item' name="input" value={todo} onChangeText={(value) => Settodo(value)} />
                    </Item>
                    <TouchableOpacity >
                        <AntDesign style={{borderWidth:2 ,borderRadius: 20,borderColor:"lightblue", padding: 8, alignItems: "center", justifyContent: "center" }} name="plus" size={30} color="lightseagreen"
                            onPress={() => SetToDo(todo)}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    head: {
        fontWeight: "bold",
        fontSize: 24,
        marginLeft: 10,
        color: "salmon"
    }
})