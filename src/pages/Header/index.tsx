import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../contexts/sync';

const Header = () => {
  const useAppContext = () => useContext(AppContext);

  const { syncMarkers } = useAppContext();

  return (
    <Appbar.Header>
      <Appbar.Content title="RN CheckPlant" subtitle="React Native Code Test" />

      <Appbar.Action
        icon={() => <Icon name="cloud-sync" size={25} color="#fff" />}
        onPress={syncMarkers}
      />
    </Appbar.Header>
  );
};

export default Header;
