import axios from 'axios';

export const sendEmail = newEmail => {
  return axios.post('email/send', newEmail).then(response => {
    return response;
  });
};

export const getSentEmails = user => {
  return axios
    .get('email/sentEmail', user)
    .then(res => {
      return res;
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
