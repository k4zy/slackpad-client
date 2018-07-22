import ApiClient from './ApiClient';
import { PictureResponse } from 'expo';

export interface Photo {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export default class PhotoRepo {
  static post = async (picture: PictureResponse): Promise<Photo> => {
    const data = { data: picture.base64, filename: 'image.jpg' };
    return await ApiClient.post<Photo>('images', JSON.stringify(data));
  };
}
