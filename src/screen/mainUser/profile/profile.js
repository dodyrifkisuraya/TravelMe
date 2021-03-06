import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Gap} from '../../../components/atom';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {withFirebase} from '../../../config/firebase/firebaseContext';
import {G} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

function profile({navigation, firebase}) {
  const [Name, setName] = useState('');
  const [Contact, setContact] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [Rating, setRating] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.doGetCurrentUserInfo().then((a) => {
      setName(a.name);
      setContact(a.contact);
      setProfileImage(a.profileImage);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>Profile</Text>
      </View>
      <View
        style={{
          height: 260,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../assets/png/userDefault.png')}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
          }}
        />

        <Gap height={7} />
        <Text style={{color: '#767676', fontSize: 14}}>Traveler</Text>
        <Gap height={7} />
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Fachrul Faathirullah</Text>
        <Gap height={7} />
        <Text style={{fontSize: 14}}>ffaathirullah@yahoo.co.id</Text>
        <Gap height={9} />
        <View style={{height: 70, width: 225, backgroundColor: '#F7F7F7', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 24, fontWeight:'bold'}}>8</Text>
        <Text style={{fontSize: 14}}>Tempat Yang dikunjungi</Text>
        </View>

      </View>
      <Gap height={30} />

      <View style={{paddingHorizontal: 20}}>
        <Gap height={15} />
        <View
          style={{
            backgroundColor: '#fff',
            left: 0,
            right: 0,
            height: 52,
            paddingHorizontal: 7,
            paddingVertical: 15,
            elevation: 3,
            marginVertical: 5,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Gap width={10} />
          <View>
            <TouchableOpacity>
              <Text style={{ fontSize: 16}}>
                Setel Ulang Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={5} />
          <View
            style={{
              backgroundColor: '#fff',
              left: 0,
              right: 0,
              height: 52,
              paddingHorizontal: 7,
              paddingVertical: 15,
              elevation: 3,
              marginVertical: 5,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Gap width={10} />
            <View>
              <TouchableOpacity>
                <Text style={{ fontSize: 16}}>
                  Tentang Aplikasi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        <Gap height={5} />
          <View
            style={{
              backgroundColor: '#FA4F4F',
              left: 0,
              right: 0,
              height: 52,
              width: 109,
              paddingHorizontal: 7,
              paddingVertical: 15,
              elevation: 3,
              marginVertical: 5,
              borderRadius: 10,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 32
            }}>
            <Gap width={32} />
            <View>
              <TouchableOpacity   onPress={() => {
                  firebase.doLogout();
                  dispatch({type: 'LOGOUTADMINUSER'});
                }}>
                <Text style={{ fontSize: 16, color: 'white', justifyContent: 'center', alignItems: 'center'}}>
                Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    </ScrollView>
  );
}

export default withFirebase(profile);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    height: 110,
    width,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewContainer: {paddingHorizontal: 20},
  settingContainer: {
    position: 'absolute',
    top: 10,
    right: 5,
    height: 40,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
