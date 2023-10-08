import {Document} from 'mongoose';
interface User extends Document {
  user_name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  profile_image: string;
  favourite_games: string[];
}

interface OutputUser {
  id: string;
  user_name: string;
  email: string;
  profile_image: string;
  favourite_games: string[];
}

export {User, OutputUser};
