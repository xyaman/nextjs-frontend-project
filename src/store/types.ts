export interface State {
  users: User[];
  editingUser: User | null;
  fetchError: string | null;
}

export const initialState: State = {
  users: [],
  editingUser: null,
  fetchError: null,
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
  image_url: string;
}

// For this project, we are going to ignore the rest of the address
// null values are ignored. They are just showed here for reference
export interface Address {
  street: string;
  city: string;
  suite: string | null;
  zipcode: string | null;
  geo: {
    lat: string;
    lng: string;
  } | null;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
