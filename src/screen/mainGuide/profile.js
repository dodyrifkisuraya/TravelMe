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
import {Gap} from '../../components/atom';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {withFirebase} from '../../config/firebase/firebaseContext';

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
        <View style={styles.settingContainer}>
          <TouchableOpacity onPress={() => navigation.push('setting')}>
            <MaterialIcon size={24} name="settings" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              firebase.doLogout();
              dispatch({type: 'LOGOUTADMINUSER'});
            }}>
            <MaterialIcon size={24} name="logout" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: 260,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
            backgroundColor: 'black',
          }}
        />
        <Gap height={7} />
        <Text style={{color: '#767676', fontSize: 14}}>Guide</Text>
        <Gap height={7} />
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Raden Shohih</Text>
        <Gap height={7} />
        <Text style={{fontSize: 14}}>0811918948</Text>
        <Gap height={7} />
        <Text>Rating User</Text>
      </View>
      <Gap height={30} />

      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Wilayah Kerja Saya
        </Text>
        <Gap height={15} />
        <View
          style={{
            backgroundColor: '#fff',
            left: 0,
            right: 0,
            height: 100,
            paddingHorizontal: 7,
            paddingVertical: 15,
            elevation: 3,
            marginVertical: 5,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/png/blackScreen.jpg')}
            style={{height: 60, width: 60}}
          />
          <View>
            <Text></Text>
            <Text></Text>
          </View>
        </View>
      </View>

      <Gap height={30} />

      <View style={styles.reviewContainer}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Review</Text>
        <Gap height={15} />
        <View
          style={{
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            paddingHorizontal: 7,
            paddingVertical: 15,
            elevation: 3,
            marginVertical: 5,
            borderRadius: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Nama pereview
            </Text>
            <Text>20/10/2020</Text>
          </View>
          <Text>Rating rating</Text>
          <Gap height={15} />
          <Text style={{letterSpacing: 1, fontSize: 16}} adjustsFontSizeToFit>
            Lorem ipsum dolor sit amet.
          </Text>
        </View>

        <View
          style={{
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            paddingHorizontal: 7,
            paddingVertical: 15,
            elevation: 3,
            borderRadius: 10,
            marginVertical: 5,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Nama pereview 2
            </Text>
            <Text>20/10/2020</Text>
          </View>
          <Text>Rating rating</Text>
          <Gap height={15} />
          <Text style={{letterSpacing: 1, fontSize: 16}} adjustsFontSizeToFit>
            lorem 20
          </Text>
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
