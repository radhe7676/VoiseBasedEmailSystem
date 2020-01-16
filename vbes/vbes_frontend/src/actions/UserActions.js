import axios from 'axios';

export const register = newUser => {
  return axios.post('users/register', newUser).then(response => {
    console.log('Registered');
  });
};

export const login = user => {
  // debugger;
  return axios
    .post('users/login', user)
    .then(response => {
      const { token } = response.data;
      localStorage.setItem('usertoken', token);
      return token;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProfile = user => {
  return axios
    .get('users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
