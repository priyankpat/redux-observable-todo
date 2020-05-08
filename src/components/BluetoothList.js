import React from "react";
import { connect } from "react-redux";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Switch, Colors, Title } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { getTodos, completeTodo, addTodo } from "../store/actions";
import colors from "../colors";
import { white } from "ansi-colors";

class BluetoothList extends React.Component {
  state = {
    todo: "",
  };

  componentDidMount() {
    this.props.getTodos();
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Title>ON</Title>

        <Switch value={true} />
      </View>
    );
  }

  renderBluetoothResultItem() {
    return (
      <TouchableOpacity style={styles.bluetoothResultItem} activeOpacity={0.7}>
        <View style={styles.bluetoothResultItemIcon}>
          <Feather name="bluetooth" size={24} color="black" />
        </View>
        <View style={styles.bluetoothResultItemLabels}>
          <Text style={styles.bluetoothResultItemName}>BT SPEAKER</Text>
          <Text style={styles.bluetoothResultItemAddress}>
            Connected to media audio
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderBluetoothResultItems() {
    return (
      <View style={styles.bluetoothListContainer}>
        <View style={styles.bluetoothListHeader}>
          <Text styles={styles.bluetoothListLabel}>PAIRED DEVICES</Text>
        </View>
        {this.renderBluetoothResultItem()}
      </View>
    );
  }

  render() {
    const { style, todos } = this.props;
    return (
      <View style={[style, { padding: 16 }]}>
        {this.renderHeader()}
        <ScrollView style={styles.todoList}>
          <SafeAreaView>{this.renderBluetoothResultItems()}</SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return {
    getTodos: () => dispatch(getTodos()),
    completeTodo: (id) => dispatch(completeTodo(id)),
    addTodo: (text) => dispatch(addTodo(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothList);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  input: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  todoList: {
    flex: 1,
  },
  listItem: {
    padding: 16,
    flexDirection: "row",
  },
  listItemText: {
    flex: 1,
    color: "white",
    fontWeight: "300",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  bluetoothListContainer: {
    flexDirection: "column",
  },
  bluetoothListHeader: {
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  bluetoothListLabel: {
    fontSize: 25,
  },
  bluetoothResultItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  bluetoothResultItemIcon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  bluetoothResultItemLabels: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  bluetoothResultItemName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  bluetoothResultItemAddress: {
    fontSize: 13,
    fontWeight: "400",
    color: "#3498db",
  },
});
