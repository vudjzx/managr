import {IUser} from '../users/IUser';
import {Schema} from 'mongoose';
import {Document} from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  deadline: Date;
  client: string;
  owner: IUser['_id'];
  collaborators: IUser['_id'][];
}
