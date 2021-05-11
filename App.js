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
  Text
} from 'react-native';

import 'node-libs-react-native/globals';
import '@rn-matrix/core/shim.js';

import {polyfillGlobal} from 'react-native/Libraries/Utilities/PolyfillFunctions';
polyfillGlobal('URL', () => require('whatwg-url').URL);

import rnm, {useMatrix} from '@rn-matrix/core';
import {RoomList, MessageList} from '@rn-matrix/ui';

import UserInfo from './UserInfo';

const deviceId = '1234';

const App = () => {
  const [room, setRoom] = useState(null);
  const { isReady, isSynced } = useMatrix();

  const handleRoomPress = (r) => {
    setRoom(r);
  };

  useEffect(() => {
    rnm.createClient(UserInfo.baseUrl, UserInfo.accessToken, UserInfo.userId, deviceId);
    rnm.start(true);
  }, []);

  if (room) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <MessageList room={room} enableComposer />
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
