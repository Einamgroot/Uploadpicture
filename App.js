import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false){
      alert('Permission to access camera roll is required!')
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync;
    if (pickerResult.cancelled === true){
      return;
    }

    setSelectedImage({localUrl: pickerResult.url});
  };

  if (selectedImage !== null){
      return (
        <View>
          <Image
            source={{ url: selectedImage.localUrl}}
            style={styles.thumbnail}
          />
        </View>
      );
  }

  return (
    <View style={styles.container}>
      <Image source = {logo} style={styles.logo}/>
      <Text style={styles.instructions}> To share a photo from your phone with a friend, just press the button below!</Text>
      <TouchableOpacity
        onPress = {openImagePickerAsync}
        style = {styles.botton}>
        <Text style= {styles.click}>Pick a photo</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10
  },
  instructions:{
    color: '#888',
    fontSize: 18,
    marginHorizontal: 0
  },
  botton:{
    backgroundColor: 'blue'
  },
  click:{
    fontSize:20,
    color: '#fff'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode:'contain'
  }
});
