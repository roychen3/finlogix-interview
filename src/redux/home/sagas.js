import {
  all, put, takeLatest, call,
} from 'redux-saga/effects'

import {
  userLoginSuccess,
  userLoginFailure,

  userLogoutSuccess,
  userLogoutFailure,

  getPostListSuccess,
  getPostListFailure,
} from './actions'
import {
  USER_LOGIN,
  USER_LOGOUT,
  GET_POST_LIST,
} from '../../constants/actionTypes'

import { axiosNoAuth, axiosAuth } from '../../util/axios'
import { FAKE_POST_LIST_RESPONSE } from './fakeData'



const userLoginAPI = (payload) => {
  const postValues = {
    email: payload.email,
    password: payload.password,
  }
  // return FAKE_USER_LOGIN_RESPONSE
  return axiosNoAuth.post('/auth/email/login', postValues)
    .then((res) => res.data)
}
function* userLoginSaga({ payload }) {
  try {
    const response = yield call(userLoginAPI, payload)
    localStorage.setItem('token', response.token)
    yield put(userLoginSuccess(response))
  } catch (err) {
    yield put(userLoginFailure(err.message))
  }
}


const userLogoutAPI = () => {
  // return FAKE_USER_LOGOUY_RESPONSE
  return axiosAuth.post('/auth/logout')
    .then((res) => res.data)
}
function* userLogoutSaga() {
  try {
    const response = yield call(userLogoutAPI)
    localStorage.clear()
    yield put(userLogoutSuccess(response))
  } catch (err) {
    yield put(userLogoutFailure(err.message))
  }
}

const getPostListAPI = (perPage, page) => {
  return FAKE_POST_LIST_RESPONSE
  // return axiosNoAuth.get(`/posts?per_page=${perPage}&page=${page}`)
  //   .then((res) => res.data)
}
function* getPostListSaga({ payload }) {
  try {
    const { perPage, page } = payload
    const response = yield call(getPostListAPI, perPage, page)

    const postList = []
    let group = []
    response.data.forEach((item, index) => {
      group.push({
        id: item.id,
        title: item.title,
        content: item.content
          .replaceAll('<p>', '')
          .replaceAll('</p>', '')
          .replaceAll('\n', '')
          .replaceAll('<br>', '<br />')
          .replaceAll('&nbsp;', ' '),
        created_at: item.created_at,
      })
      if (index % 6 === 5) {
        postList.push({
          groupId: (index + 1) / 6 - 1,
          group
        })
        group = []
      }
    })

    if (group.length > 0) {
      postList.push({
        groupId: 1,
        group
      })
      group = []
    }
    const pagination = response.meta.pagination

    // use for fake data
    // const pagination = {
    //   ...response.meta.pagination,
    //   total_pages: response.meta.pagination.total_pages + 1,
    // }

    yield put(getPostListSuccess({ postList, pagination }))
  } catch (err) {
    yield put(getPostListFailure(err.message))
  }
}

function* homeSagas() {
  yield all([
    takeLatest(
      USER_LOGIN,
      userLoginSaga,
    ),
    takeLatest(
      USER_LOGOUT,
      userLogoutSaga,
    ),
    takeLatest(
      GET_POST_LIST,
      getPostListSaga,
    ),
  ])
}

export default homeSagas
