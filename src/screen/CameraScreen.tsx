import * as React from 'react';
import { Text, View, TouchableOpacity, CameraRoll } from 'react-native';
import { Camera, Permissions, CameraObject } from 'expo';

export default class CameraScreen extends React.Component {
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
            // ref={this.camera}
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
                  backgroundColor: '#62b5a5',
                }}
                onPress={async () => {
                  if (this.camera) {
                    const picture = await this.camera.takePictureAsync({});
                    const imageUri = await CameraRoll.saveToCameraRoll(picture.uri, 'photo');
                    console.log(imageUri);
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
                  Shoot
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
