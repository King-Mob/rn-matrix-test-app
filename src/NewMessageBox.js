import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default NewMessageBox = (props) => {
    const {rnm, room} = props;
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        console.log(rnm)
        rnm.getClient().sendTextMessage(room.roomId, newMessage);
        setNewMessage("");
    }

    return <SafeAreaView style={styles.messageContainer}>
        <TextInput 
            onChangeText={text=>setNewMessage(text)} 
            value={newMessage}
            style={styles.input}
            placeholder={"enter message"}
        >    
        </TextInput>
        <TouchableOpacity 
            onPress={()=>sendMessage()}
            style={styles.send}
        >
            <Text>Send</Text>
        </TouchableOpacity>
    </SafeAreaView>
};

const styles = StyleSheet.create({
    messageContainer:{
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        flex: 6,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        padding: 5,
    },
    send:{
        flex: 1,
        margin: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})