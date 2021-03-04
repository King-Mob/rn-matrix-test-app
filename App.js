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
} from 'react-native';

import {polyfillGlobal} from 'react-native/Libraries/Utilities/PolyfillFunctions';
polyfillGlobal('URL', () => require('whatwg-url').URL);

import { matrix } from '@rn-matrix/core';
import {RoomList, MessageList} from '@rn-matrix/ui';

import UserInfo from './UserInfo';

const deviceId = '1234';

const App = () => {
  const [room, setRoom] = useState(null);

  const handleRoomPress = (r) => {
    setRoom(r);
  };

  useEffect(() => {
    matrix.createClient(UserInfo.baseUrl, UserInfo.accessToken, UserInfo.userId, deviceId);
    matrix.start(true);
  }, []);

  if (room) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <MessageList room={room} enableComposer />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <RoomList onRowPress={handleRoomPress} />
      </SafeAreaView>
    );
  }
};

export default App;
