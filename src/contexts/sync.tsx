import React, { useState, useEffect, createContext } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import api from '../services/api';
import { Alert } from 'react-native';

interface markerInterface {
  id?: string;
  request_id?: string;
  attempt?: string;
  status?: string | null;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  annotation?: string;
  datetime?: string;
  arrayIndex?: number;
  data?: string;
}

interface MapContextData {
  markers: [markerInterface];
  syncMarkers(): Promise<void>;
  insertMarker(): Promise<void>;
  position: {
    longitude: number;
    latitude: number;
  };
  visible: boolean;
  hideDialog(): Promise<void>;
  annotation: string;
  setAnnotation(): Promise<void>;
  storeData(): Promise<void>;
  snackBar1: boolean;
  snackBar2: boolean;
  dismissSnackBar1(): void;
  dismissSnackBar2(): void;
  handleFabClick(): void;
}

export const AppContext = createContext<MapContextData>({} as MapContextData);

export const Provider = props => {
  const [markers, setMarkers] = useState<markerInterface[]>([]);
  const [newMarkerCoordinates, setNewMarkerCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  // const [markers, setMarkers] = useState([]);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [annotation, setAnnotation] = useState('');
  const [visible, setVisible] = useState(false);
  const [useUserLocation, setUseUserLocation] = useState(false);
  const [snackBar1, setSnackBar1] = useState(false);
  const [snackBar2, setSnackBar2] = useState(false);
  const [error, setError] = useState('');

  const getDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();

    const dd = date.toString().padStart(2, '0');
    const mm = month.toString().padStart(2, '0');
    const yyyy = year;
    const mi = min.toString().padStart(2, '0');
    const hh = hours.toString().padStart(2, '0');
    const ss = sec.toString().padStart(2, '0');

    const timestamp = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;

    const data = `${dd}/${mm}/${yyyy} às ${hh}:${mi}`;

    return { timestamp, data };
  };

  const dismissSnackBar1 = () => {
    setSnackBar1(false);
  };
  const dismissSnackBar2 = () => {
    setSnackBar2(false);
  };

  const handleFabClick = async () => {
    const position = getPosition();
    setUseUserLocation(true);
    showDialog();
  };

  const syncMarkers = async () => {
    let markersToSyncIndex: markerInterface[] = [];
    let newMarkers: markerInterface[] = [];

    markers.map((marker: markerInterface, index) => {
      newMarkers.push({ ...marker, arrayIndex: index });
      if (!marker.status) {
        markersToSyncIndex.push({ ...marker, arrayIndex: index });
      }
    });

    // const markersToSync = markers.filter(
    //   (marker: markerInterface) => !marker.status,
    // );
    if (markersToSyncIndex.length > 0) {
      setSnackBar1(true);
    }
    await Promise.all(
      markersToSyncIndex.map(async (marker: markerInterface) => {
        const {
          arrayIndex,
          coordinate: { latitude, longitude },
          annotation,
          datetime,
        } = marker;

        try {
          const response = await api.post('', {
            latitude,
            longitude,
            annotation,
            datetime,
          });

          const { id, request_id, attempt, status } = response.data;

          newMarkers = newMarkers.map((marker: markerInterface, index) => {
            if (index === arrayIndex) {
              return { ...marker, id, request_id, attempt, status };
            } else return marker;
          });
        } catch (e) {
          // console.log(e);
        }
      }),
    );
    setSnackBar1(false);
    storeData(newMarkers);
    setSnackBar2(true);
  };

  const getMarkers = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@rnCheckPlant');
      if (jsonValue != null) {
        console.log({ JSONvalue: JSON.parse(jsonValue) });
        setMarkers(JSON.parse(jsonValue));
        console.log({ STATUS: 'SUCCESS', Markers: { ...markers } });
      }
    } catch (e) {
      console.log({ STATUS: 'FAILLURE', e, Markers: markers });
    } finally {
    }
  };

  const insertMarker = ({ coordinate }) => {
    const { latitude, longitude } = coordinate;
    setNewMarkerCoordinates({ latitude, longitude });
    setUseUserLocation(false);
    showDialog();
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const storeData = async (newMarker?: markerInterface[]) => {
    // Caso seja passado um array de marcadores, salva na asyncStorage
    // caso contrário, só adiciona um marcador
    const { timestamp, data } = getDate();

    const newMarkData = {
      id: '',
      request_id: '',
      attempt: '',
      status: null,
      coordinate: useUserLocation ? position : newMarkerCoordinates,
      annotation: annotation,
      datetime: timestamp,
      data,
    };

    const markData: markerInterface[] =
      newMarker && newMarker.length > 0 ? newMarker : [...markers, newMarkData];
    console.log({ newMarker: !!newMarker, markData });
    try {
      const jsonValue = JSON.stringify(markData);
      await AsyncStorage.setItem('@rnCheckPlant', jsonValue);
      getMarkers();
      setAnnotation('');
    } catch (e) {
      getMarkers();
      setAnnotation('');
      // saving error
      // console.log(e);
    } finally {
      hideDialog();
      setAnnotation('');
    }
  };

  const getPosition = (showDialog: boolean = false) => {
    Geolocation.getCurrentPosition(
      pos => {
        setError('');

        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        // console.log({ latitude, longitude });
        setPosition({
          latitude,
          longitude,
        });
      },
      e => setError(e.message),
    );
  };

  useEffect(() => {
    getPosition();
    getMarkers();
  }, []);

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
