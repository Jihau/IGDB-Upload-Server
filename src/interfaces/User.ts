import {Document} from 'mongoose';
interface User extends Document {
  user_name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
}

interface OutputUser {
  id: string;
  user_name: string;
  email: string;
}

export {User, OutputUser};
