import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function BottomBar() {  
  const navigation = useNavigation();

  function handleIconHome(){
    navigation.navigate('Home');
  }
  function handleIconUser(){
    navigation.navigate('User');
  }

    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity 
              style={styles.bottomBarButton}
              onPress={handleIconHome}
            >
                <Ionicons name="home" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.bottomBarButton}
              onPress={handleIconUser}
            >
                <Ionicons name="person" size={40} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = {
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#12082F',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default BottomBar;



