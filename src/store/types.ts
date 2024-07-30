export interface State {
  users: User[];
  editingUser: User | null,
}

export const initialState: State = {
  users: [],
  editingUser: null,
};

// State data types definitions
// The data structure of User, Address and Company are from data used from
// https://jsonplaceholder.typicode.com/users
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;

  // The image is taken from https://picsum.photos/
  // So at the beggining the image WILL be null
  // But because we fetch all the information at the same time, it
  // SHOULDN'T be null
  image_url: string | null;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
