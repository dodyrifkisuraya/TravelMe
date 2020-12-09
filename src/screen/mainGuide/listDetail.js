import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {Gap} from '../../components';
import MapView, {Marker} from 'react-native-maps';
import {withFirebase} from '../../config/firebase/firebaseContext';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');

function listDetail({route, navigation, firebase}) {
  const {data, id} = route.params;

  const userInfo = useSelector((state) => state.userInfo);
  const workPlace = useSelector((state) => state.workPlace);

  const addFunc = () => {
    if (workPlace.length > 2) {
      Alert.alert(
        'Permintaan ditolak',
        'Tempat kerja yang didaftarkan tidak bisa lebih dari tiga',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: true},
      );
    } else {
      firebase.doGuideAddPlaceWork(userInfo.prov, userInfo.city, id);
    }
  };

  const OpenMap = (lat, lng) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
      style={{backgroundColor: 'white'}}>
      <View>
        <View>
          <Image
            source={require('../../assets/png/dummyPemandangan.png')}
            style={{height: 350, width}}
          />
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: '#ff6da0',
                opacity: 0.8,
                flex: 1,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                firebase.doGuideMinPlaceWork(userInfo.prov, userInfo.city, id)
              }>
              <FeatherIcon name="minus" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#a5faf0',
                opacity: 0.8,
                flex: 1,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => addFunc()}>
              <FeatherIcon name="plus" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginVertical: 24, marginHorizontal: 16}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.name}</Text>
          <Gap height={17} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/png/iconClock.png')}
              style={{height: 14, width: 14, marginRight: 10}}
            />
            <Text>
              {data.openTime} - {data.closeTime}
            </Text>
          </View>
          <Gap height={13} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/png/iconLocation.png')}
              style={{height: 14, width: 14, marginRight: 10}}
            />
            <Text style={{textTransform: 'capitalize'}}>
              {data.prov}, {data.city}
            </Text>
          </View>
        </View>

        <View style={{marginHorizontal: 16}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Deskripsi Singkat
          </Text>
          <Gap height={8} />
          <Text>{data.desc}</Text>
        </View>
        <Gap height={15} />
        <View style={{marginHorizontal: 16}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            ulasan(10 orang)
          </Text>
          {[...Array(4)].map((item, idx) => (
            <View key={idx}>
              <Gap height={8} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  elevation: 3,
                  backgroundColor: '#fff',
                  height: 80,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}>
                <Image
                  source={require('../../assets/png/userDefault.png')}
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'cover',
                    borderRadius: 20,
                    marginHorizontal: 10,
                  }}
                />
                <View>
                  <Text>nama review</Text>
                  <Text>rating</Text>
                  <Text>pesan</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          width,
          height: 60,
          // elevation: 2,
          // borderTopColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          // borderTopWidth: 0.1,
          paddingHorizontal: 10,
          paddingVertical: 3,
        }}>
        <TouchableOpacity
          // onPress={() => navigation.push('guideMap')}
          onPress={() => OpenMap(-6.974027994937152, 107.63036776461826)}
          style={styles.bottomMapContainer}>
          <Image
            source={require('../../assets/png/iconMap.png')}
            style={{height: 20, width: 20, marginHorizontal: 10}}
          />
          <Text style={{color: '#2D929A'}}>Lihat Peta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default withFirebase(listDetail);

const styles = StyleSheet.create({
  bottomMapContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: width - 20,
    borderColor: '#2D929A',
    height: 37,
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  optionContainer: {
    backgroundColor: 'white',
    height: 50,
    width: 150,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 1,
    overflow: 'hidden',
  },
});
