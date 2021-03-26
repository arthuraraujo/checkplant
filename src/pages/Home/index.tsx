import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppContext } from '../../contexts/sync';

import {
  FAB,
  Button,
  Paragraph,
  Modal,
  Portal,
  Provider,
  Dialog,
  TextInput,
  Snackbar,
} from 'react-native-paper';
import styles from './styles';

const Home: React.FC = () => {
  const useAppContext = () => useContext(AppContext);

  const {
    markers,
    syncMarkers,
    insertMarker,
    position,
    visible,
    hideDialog,
    annotation,
    setAnnotation,
    storeData,
    snackBar1,
    snackBar2,
    dismissSnackBar1,
    dismissSnackBar2,
    handleFabClick,
  } = useAppContext();

  //  const [markers, setMarkers] = useContext(AppContext);

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        // followsUserLocation={true}
        // showsMyLocationButton={true}
        zoomEnabled={false}
        onDoublePress={e => insertMarker(e.nativeEvent)}
        onLongPress={e => insertMarker(e.nativeEvent)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {markers && markers.length > 0 ? (
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              // title={marker.title}
              description={marker.annotation}
            >
              <View>
                {marker.status ? (
                  <Icon name="map-marker" size={30} color="#868686" />
                ) : (
                  <Icon name="map-marker-off" size={30} color="#109146" />
                )}
              </View>

              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <View style={styles.dateView}>
                      <Text style={styles.dateText}>{marker.data}</Text>
                    </View>

                    <Text style={styles.name}>{marker.annotation}</Text>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          ))
        ) : (
          <View />
        )}
      </MapView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Anotações</Dialog.Title>
          <Dialog.Content>
            {/* <Paragraph>This is simple dialog</Paragraph> */}
            <TextInput
              label=""
              value={annotation}
              onChangeText={annotation => setAnnotation(annotation)}
              multiline={true}
              numberOfLines={10}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={storeData}>Salvar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar
        visible={snackBar2}
        onDismiss={dismissSnackBar2}
        duration={600}
        style={{ backgroundColor: '#00796B' }}
      >
        Sincronização concluída
      </Snackbar>
      <Snackbar visible={snackBar1} onDismiss={dismissSnackBar1} duration={400}>
        Sincronização em andamento
      </Snackbar>
      <FAB style={styles.fab} icon="plus" onPress={handleFabClick} />
    </View>
  );
};

export default Home;
