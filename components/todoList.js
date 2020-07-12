import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

export default TodoList = ({ list }) => {

    const CompleteCount = list.todos.filter(todo => todo.completed).length;
    const remainingcount = list.todos.length - CompleteCount;

    return (
        <View style={[styles.listContainer, { backgroundColor: list.color }]}>
            <Text style={styles.listtitle} numberOfLines={1}>{list.name}</Text>

            <View>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.count}>{remainingcount}</Text>
                    <Text style={styles.subtitle}>Remaining</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.count}>{CompleteCount}</Text>
                    <Text style={styles.subtitle}>Completed</Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        marginHorizontal: 12,
        borderRadius: 8,
        alignItems: "center",
        width: 200,
    },
    listtitle: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold",
        marginBottom: 18
    },
    count: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }

})