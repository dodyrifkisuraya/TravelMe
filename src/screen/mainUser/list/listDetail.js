import React, {Component, useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import {BackgroundCarousel, Gap} from '../../../components';
import {
  Icon_Flag,
  Icon_Waktu,
  Icon_Bawah,
  Icon_Tambah_ulasan,
  Icon_Bukit,
  Icon_Bintang,
  Icon_Peta,
} from '../../../assets';
import {withFirebase} from '../../../config/firebase/firebaseContext';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');

function listDetail({route, firebase, navigation}) {
  const {data} = route.params;
  const [guideList, setGuideList] = useState([]);
  const [state, setState] = useState({
    selectedIndex: 0,
  });
  scrollRef = React.createRef();
  const {selectedIndex} = state;

  const areaDest = useSelector((state) => state.areaDestReducer);

  setSelectedIndex = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    setState({selectedIndex});
  };

  useEffect(() => {
    firebase
      .doGetListGuide(areaDest.prov, areaDest.city, data.id)
      .then((data) => {
        setGuideList(data);
      });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}
      style={{backgroundColor: 'white'}}>
      <View>
        <View>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={setSelectedIndex}
            ref={scrollRef}
            data={data.photo}
            keyExtractor={(item) => item}
            renderItem={({item}) => (
              <Image style={{height: 350, width}} source={{uri: item}} />
            )}
          />
          <View style={styles.circleDiv}>
            {data.photo.map((image, i) => (
              <View
                style={[
                  styles.whiteCircle,
                  {opacity: i === selectedIndex ? 1 : 0.5},
                ]}
                key={image}
                active={i === selectedIndex}
              />
            ))}
          </View>
        </View>
        <View style={{marginVertical: 24, marginHorizontal: 16}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.name}</Text>
          <Gap height={17} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon_Waktu />

            <Text style={styles.txtWaktu}>
              {data.openTime} - {data.closeTime}
            </Text>
          </View>
          <Gap height={13} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../../assets/png/iconLocation.png')}
              style={{height: 14, width: 14, marginRight: 10}}
            />
            <Text style={{textTransform: 'capitalize'}}>
              {data.prov}, {data.city}
            </Text>
          </View>

          <Gap height={13} />
          <View style={styles.waktu}>
            <Icon_Flag />
            <Text style={styles.txtFlag}>
              {guideList.length > 0
                ? 'Tersedia Tour Guide'
                : 'Tour Guide Tidak Tersedia'}
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
                  source={require('../../../assets/png/userDefault.png')}
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

      <View style={styles.containerMapandGuide}>
        <TouchableOpacity style={styles.peta}>
          <Icon_Peta />
          <Text style={styles.txtPeta}>Peta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('listGuide', {data: guideList})}
          style={styles.jasaTour}>
          <Text style={styles.txtJasaTour}>Pesan Jasa Tour Guide</Text>
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
  containerMapandGuide: {
    marginTop: 10,
    width,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.3,
    elevation: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
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
  bawahCarousel: {
    marginLeft: 16,
    marginRight: 22,
  },
  container: {
    backgroundColor: 'red',
  },
  txtDetail: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  waktu: {
    flexDirection: 'row',
  },
  txtWaktu: {
    marginTop: -4,
    marginLeft: 8,
  },
  txtFlag: {
    marginLeft: 6,
  },
  deskripsi: {
    marginTop: 20,
  },
  txtDeskripsi: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  selengkapnya: {
    marginTop: 8,
    backgroundColor: '#EBEFEF',
    width: 343,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ulasan: {
    marginTop: 16,
    backgroundColor: '#EBEFEF',
    width: 343,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtUlasan: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 19,
  },
  hasilUlasan: {
    marginTop: 16,
    flex: 1,
    flexDirection: 'row',
  },
  dataUlasan: {
    alignSelf: 'center',
    marginLeft: 21,
  },

  txtJasaTour: {
    color: 'white',
  },
  txtPeta: {
    color: '#2D929A',
  },
  palingBawah: {
    flexDirection: 'row',
    marginTop: 19,
  },
  circleDiv: {
    position: 'absolute',
    bottom: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 10,
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderColor: '#000',
    borderWidth: 0.1,
    margin: 5,
    backgroundColor: '#fff',
    elevation: 3,
  },
  peta: {
    borderStyle: 'solid',
    borderWidth: 2,
    width: 89,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#2D929A',
    borderRadius: 10,
  },
  jasaTour: {
    borderRadius: 10,
    width: 238,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D929A',
    marginLeft: 16,
  },
});
