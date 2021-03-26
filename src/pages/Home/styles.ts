import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    // height: 400,
    // width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  dateView: {
    backgroundColor: '#e3e3e3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 10,
    margin: 2,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
});

export default styles;
