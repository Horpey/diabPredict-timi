import axios from 'axios';
const baseURL = 'https://diab-predict.herokuapp.com/api';

export const actions = {
  login({
    commit,
    dispatch
  }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request');
      let userData = new FormData();
      userData.append('email', user.email);
      userData.append('password', user.password);

      axios({
          url: baseURL + '/auth/login',
          data: userData,
          method: 'POST'
        })
        .then(resp => {
          const token = resp.data.data.token;
          const user = resp.data.data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('user', token);
          axios.defaults.headers.common['Authorization'] = token;
          commit('auth_success', token, user);
          dispatch('getUser');
          commit('loading', false);
          resolve(resp);
        })
        .catch(err => {
          commit('auth_error');
          commit('loading', false);
          localStorage.removeItem('token');
          reject(err);
        });
    });
  },
  signup({
    commit,
    dispatch
  }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request');
      let userData = new FormData();
      userData.append('firstname', user.firstname);
      userData.append('lastname', user.lastname);
      userData.append('email', user.email);
      userData.append('password', user.password);
      userData.append('password_confirmation', user.password_confirmation);

      axios({
          url: baseURL + '/auth/register',
          data: userData,
          method: 'POST'
        })
        .then(resp => {
          const token = resp.data.data.token;
          const user = resp.data.data.user;
          localStorage.setItem('token', token);
          axios.defaults.headers.common['Authorization'] = token;
          commit('auth_success', token, user);
          dispatch('getUser');
          commit('loading', false);
          resolve(resp);
        })
        .catch(err => {
          commit('auth_error');
          commit('loading', false);
          localStorage.removeItem('token');
          reject(err);
        });
    });
  },
  getUser({
    commit
  }) {
    return new Promise((resolve, reject) => {
      commit('loading', true);
      let userToken = localStorage.getItem('token');
      axios({
          url: baseURL + '/profile',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken
          }
        })
        .then(resp => {
          localStorage.setItem('user', JSON.stringify(resp.data.data));
          commit('loading', false);
          resolve(resp.data.data);
        })
        .catch(err => {
          commit('loading', false);
          reject(err);
        });
    });
  },
  getPatients({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let userToken = localStorage.getItem('token');
      axios({
          url: baseURL + '/patient',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken
          }
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getStatistic({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let userToken = localStorage.getItem('token');
      axios({
          url: baseURL + '/stats',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken
          }
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  senttoDB({
    commit,
  }, reportdata) {
    return new Promise((resolve, reject) => {
      commit('auth_request');
      let patientData = new FormData();
      patientData.append('blood_sugar_before', reportdata.bl1);
      patientData.append('blood_sugar_after', reportdata.bl2);
      patientData.append('plasma_glucose', reportdata.pl1);
      patientData.append('plasma_glucose_morning', reportdata.bl2);
      patientData.append('hba1c', reportdata.hba1c);
      patientData.append('status', reportdata.ds)
      patientData.append('type', reportdata.dt)

      let userToken = localStorage.getItem('token');
      axios({
          url: baseURL + '/patient/' + reportdata.patientID + '/diagnose',
          data: patientData,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken
          }
        })
        .then(resp => {

          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  addPatient({
    commit,
    dispatch
  }, patient) {
    return new Promise((resolve, reject) => {
      commit('auth_request');
      let patientData = new FormData();
      patientData.append('name', patient.name);
      patientData.append('gender', patient.gender);
      patientData.append('dob', patient.dob);
      let userToken = localStorage.getItem('token');
      axios({
          url: baseURL + '/patient',
          data: patientData,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken
          }
        })
        .then(resp => {
          dispatch('getPatients');
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  sendPatientData({
    commit,
  }, id) {
    return new Promise((resolve, reject) => {

      commit('auth_request');
      let userToken = localStorage.getItem('token');
      axios({
          url: baseURL + '/patient/' + id,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken
          }
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  makeDiagnosis({
    commit,
    dispatch
  }, patient) {
    return new Promise((resolve, reject) => {
      commit('auth_request');
      let patientData = new FormData();
      patientData.append('age', parseInt(patient.age));
      patientData.append('bs_fast', parseFloat(patient.bs_fast));
      patientData.append('bs_pp', parseFloat(patient.bs_pp));
      patientData.append('plasma_r', parseFloat(patient.plasma_r));
      patientData.append('plasma_f', parseFloat(patient.plasma_f));
      patientData.append('hbA1c', parseFloat(patient.hbA1c));



      axios({
          url: 'https://diabetiespred.herokuapp.com/predict',
          data: patientData,
          method: 'POST',
        })
        .then(resp => {
          // dispatch('getPatients');
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  logout({
    commit
  }) {
    return new Promise((resolve, reject) => {
      commit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      resolve();
    });
  }
};