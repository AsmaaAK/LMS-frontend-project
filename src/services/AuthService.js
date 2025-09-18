import api from './api';

const AuthService = {

  login(credentials) {
    return api.post('/api/login', credentials);
  },


  register(userData) {
    return api.post('/api/register', userData);
  },

  // getUser() {
  //   return api.post("/api/user")
  // }


};

export default AuthService;