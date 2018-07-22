import * as React from 'react';
import { Text, View, TouchableOpacity, CameraRoll } from 'react-native';
import { Camera, Permissions, CameraObject } from 'expo';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import PhotoRepo from '../repository/PhotoRepo';
import HomeScreen from './HomeScreen';

type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

interface Props {
  navigation: Navigation;
}

export default class CameraScreen extends React.Component<Props> {
  static routeName = '/CameraScreen';
  state = {
    hasCameraPermission: null,
    photoId: 1,
  };

  camera: CameraObject | null = null;

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            ref={(camera: any) => {
              this.camera = camera;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  flex: 1,
                  height: 80,
                  justifyContent: 'center',
                  alignContent: 'center',
                  backgroundColor: '#FF9933',
                }}
                onPress={async () => {
                  if (this.camera) {
                    const picture = await this.camera.takePictureAsync({
                      quality: 0.8,
                      base64: true,
                    } as any);
                    const photo = await PhotoRepo.post(picture);
                    const params = { photo };
                    this.props.navigation.navigate(HomeScreen.routeName, params);
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: 'white',
                  }}
                >
                  撮影する
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
