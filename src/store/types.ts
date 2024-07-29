export interface State {
  users: User[];
}

export const initialState: State = {
  users: [],
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
