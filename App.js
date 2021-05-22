/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity
} from 'react-native';

import 'node-libs-react-native/globals';
import '@rn-matrix/core/shim.js';

import {polyfillGlobal} from 'react-native/Libraries/Utilities/PolyfillFunctions';
polyfillGlobal('URL', () => require('whatwg-url').URL);

import rnm, {useMatrix} from '@rn-matrix/core';
import {RoomList, MessageList} from '@rn-matrix/ui';
import NewMessageBox from './src/NewMessageBox';

import UserInfo from './UserInfo';

const deviceId = '1234';

const App = () => {
  const [room, setRoom] = useState(null);
  const { isReady, isSynced } = useMatrix();

  const [error, setError] = useState("");

  const handleRoomPress = (r) => {
    setRoom(r);
  };

  useEffect(async () => {
    /*
    rnm.createClient(UserInfo.baseUrl, UserInfo.accessToken, UserInfo.userId, deviceId);
    rnm.start(true);

    */
    const result = await rnm.loginWithPassword(
      UserInfo.username,
      UserInfo.password,
      UserInfo.baseUrl,
      true, // enable crypto? default false
    );
    console.log(result);
    if (result.error) {
     // setLoading(false);
      console.log('Error logging in: ', result);
      setError(result.message);
    }
  }, []);

  if (room) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity 
          onPress={()=>setRoom(null)} 
          styles={{
            margin: 5,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',}}
          >
            <Text>Back</Text>
        </TouchableOpacity>
        <MessageList room={room} enableComposer />
        <NewMessageBox rnm={rnm} room={room}/>
      </SafeAreaView>
    );
  } else if (isReady && isSynced) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <RoomList isFocused={true} onRowPress={handleRoomPress} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
};

export default App;
