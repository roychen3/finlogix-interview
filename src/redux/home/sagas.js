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

// const FAKE_USER_LOGIN_RESPONSE = {
//   user: {
//     id: 124,
//     name: 'yuntest@mailinator.com',
//     username: 'yuntestzhang',
//     email: 'yuntest@mailinator.com',
//     phone: null,
//     last_login: '2022-01-26 14:30:38',
//     created_at: '2019-03-27 12:52:09',
//     updated_at: '2022-01-26 14:30:38',
//     deleted_at: null,
//     last_logout: '2022-01-26 11:55:06',
//     login_count: 48,
//     logout_count: 13,
//     online_duration: 882080,
//     register_method: 'Email',
//     unread_notifications: 0,
//     beta_tester: 0,
//     broadcaster_admin: 0,
//     analysis_count: 0,
//     analysis_like_count: 0,
//     follower_count: 0,
//     analysis_view_count: 0,
//     nick_name: 'yuntest Zhang',
//     country: 'China',
//     city: '',
//     avatar: '',
//     background: '',
//     intro: '',
//     state: '',
//     language: 'en',
//     ui_language: 'en',
//     notification: '1',
//     notification_new_follower_email: '1',
//     notification_followee_new_analysis_email: '1',
//     notification_be_mentioned_in_analysis_comment_email: '1',
//     notification_be_invited_from_new_analysis_email: '1',
//     notification_analysis_strategy_update_email: '1',
//     notification_analysis_has_comment_email: '1',
//     notification_analysis_comment_has_reply_email: '1',
//     notification_analysis_be_picked_email: '1',
//     notification_analysis_be_liked_email: '1',
//     allow_recommend: '1',
//     allow_invited_comment: '1',
//     website: '',
//     first_name: 'yuntest',
//     last_name: 'Zhang',
//     company: '',
//     street: '',
//     zip_code: '',
//     username_last_modified: '',
//     nickname_last_modified: '',
//     hot_markets_theme_index: '3',
//     markets_theme_index: '1',
//     analysis_market_counts: [],
//     analysis_symbol_counts: [],
//     top_tags: [],
//     created_at_formatted: '27/03/19 23:52:09',
//     new_followeds: 0
//   },
//   token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmZpbmxvZ2l4LmNvbS92MS9hdXRoL2VtYWlsL2xvZ2luIiwiaWF0IjoxNjQzMjA3NDM4LCJleHAiOjE2NTkyNzc4MzgsIm5iZiI6MTY0MzIwNzQzOCwianRpIjoiQmt3OW02SjZDVHB4MHJjQSIsInN1YiI6MTI0LCJwcnYiOiJmNmI3MTU0OWRiOGMyYzQyYjc1ODI3YWE0NGYwMmI3ZWU1MjlkMjRkIn0.4v9H7yoaDd54HDFNytWaBTPvDf639L5IHPvSmwoGGmc',
// }
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

// const FAKE_USER_LOGOUY_RESPONSE = {
//   success: "logged out"
// }
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

// const FAKE_POST_LIST_RESPONSE = {
//   data: [
//     {
//       id: 4652,
//       title: 'Australian Budget tonight 7:30pm AEST',
//       content: '<p>I am long on the expectation that tonight\'s budget will be stimulus friendly for Australia with the goal of minimising and escaping recession as quickly as possible.</p>\n<p><br></p>\n<p>I will be long on the ASX200 Index, and am currently holding a number of other equities, with my CFD entries as a way of \'doubling up\'</p>\n<p><br></p>\n<p>Should less than expected support for the Australian economy occur then I will revaluate positions at the time.</p>',
//       view_count: 0,
//       like_count: 0,
//       comment_count: 0,
//       share_count: 0,
//       favourite_count: 1,
//       liked: false,
//       favourited: false,
//       picked: false,
//       hotpicked: true,
//       picked_reason: 'Great idea',
//       created_at: '2020-10-06 01:29:28',
//       updated_at: '2020-10-06 01:29:28',
//       symbols: [
//         'AUD/USD'
//       ],
//       symbol_id: 5,
//       tags: [
//         'AUD/USD'
//       ],
//       strategies: [
//         {
//           id: 3363,
//           post_id: 4652,
//           symbol_id: 5,
//           direction: 'long',
//           entry: '0.71882',
//           stop_lost: '0.71284',
//           take_profit: '0.73080',
//           risk_return: '2.00334',
//           created_at: '2020-10-06 01:29:28',
//           updated_at: '2020-10-06 01:29:28',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '0.71800'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4652/raw.jpg',
//       analysis_snapshot_code: 'analysis_310e0d8e5255ba7b55525b4b47e91049_04652',
//       customized_data: '{"currOhlcv":0.71888,"currSell":0.71891,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[889,0]},"realtime":{"config":{},"range":[889,0]},"candlestickAxis":{"config":{},"range":[889,0]},"volume-0":{"config":{},"range":[889,0]},"line-0":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"ext":false,"arrow":0},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":39,"y1":0.7004167913385826,"x2":-17,"y2":0.725705531496063},"range":[889,0]},"long-0":{"config":{"color":"0,0,0,1","stop":"177,207,143","target":"239,165,156","x3":-29,"x2":0,"y2":0.7188162401574802,"y1":0.730803187007874,"y4":0.7128364192913386,"y5":0.71884},"range":[889,0]}},"product":{"id":"5","desc_zh":"澳大利亚元/美元","desc_en":"Australian Dollar/US Dollar","decimal_place":5,"symbol":"AUD/USD","spread_precision":0.0001,"platform_time":[["mon_fri","00:00-24:00"]],"category":"Forex"},"theme":"white","resolution":"H4","domain":{"latestU":1601946000,"latestI":0,"earliestI":113,"numPerTick":10,"extent":500},"buy":0.71888,"sell":0.71891,"k":11,"timezone":"Australia/Sydney*36000"}}',
//       post_language: 'en',
//       slug: null,
//       title_url: 'Australian-Budget-tonight-730pm-AEST',
//       time_type: 'H4',
//       posts_directions: 'long',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 1002,
//         name: 'alistair.schultz@acy.com',
//         username: 'alistairschultz',
//         email: 'alistair.schultz@acy.com',
//         phone: null,
//         last_login: '2020-09-22 09:47:02',
//         created_at: '2020-02-09 23:10:21',
//         updated_at: '2020-11-03 06:10:09',
//         deleted_at: null,
//         last_logout: null,
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 600,
//         register_method: 'Email',
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 59,
//         analysis_like_count: 123,
//         follower_count: 40,
//         analysis_view_count: '1439',
//         nick_name: 'Alistair Schultz',
//         country: 'Australia',
//         city: '',
//         avatar: '/v1/resource/avatar/1002/raw.jpg?1130439916',
//         background: '/v1/resource/background/1002/raw.jpg',
//         intro: '',
//         state: '',
//         language: 'en',
//         ui_language: 'en',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: 'Alistair',
//         last_name: 'Schultz',
//         company: 'ACY Securities',
//         street: '',
//         zip_code: '',
//         username_last_modified: '',
//         nickname_last_modified: '',
//         analysis_market_counts: {
//           COMMODITY: 7,
//           CRYPTO: 1,
//           FOREX: 33,
//           INDICE: 17
//         },
//         analysis_symbol_counts: {
//           'AUD/JPY': 1,
//           'AUD/NZD': 1,
//           'AUD/USD': 10,
//           'EUR/JPY': 4,
//           'EUR/USD': 3,
//           'GBP/JPY': 1,
//           'GBP/USD': 3,
//           'NZD/USD': 1,
//           'USD/CAD': 3,
//           'USD/CHF': 1,
//           'USD/CNH': 1,
//           'USD/JPY': 4,
//           'XAG/USD': 1,
//           'XAU/USD': 2,
//           WTI: 4,
//           NAS100: 4,
//           DJ30: 1,
//           SP500: 5,
//           JP225: 2,
//           'BTC/USD': 1,
//           AUS200: 5
//         },
//         analysis_market_symbol_counts: {
//           COMMODITY: {
//             'XAG/USD': 1,
//             'XAU/USD': 2,
//             WTI: 4
//           },
//           CRYPTO: {
//             'BTC/USD': 1
//           },
//           FOREX: {
//             'AUD/JPY': 1,
//             'AUD/NZD': 1,
//             'AUD/USD': 10,
//             'EUR/JPY': 4,
//             'EUR/USD': 3,
//             'GBP/JPY': 1,
//             'GBP/USD': 3,
//             'NZD/USD': 1,
//             'USD/CAD': 3,
//             'USD/CHF': 1,
//             'USD/CNH': 1,
//             'USD/JPY': 4
//           },
//           INDICE: {
//             NAS100: 4,
//             DJ30: 1,
//             SP500: 5,
//             JP225: 2,
//             AUS200: 5
//           }
//         },
//         top_tags: [
//           {
//             name: 'short',
//             user_count: 31
//           },
//           {
//             name: 'long',
//             user_count: 21
//           },
//           {
//             name: 'H1',
//             user_count: 19
//           }
//         ],
//         created_at_formatted: '10/02/20 10:10:21',
//         following: false
//       },
//       comments: [],
//       post_strategy_direction: 'long',
//       post_strategy_status: 0
//     },
//     {
//       id: 4651,
//       title: 'DJ30 MARKET BUY RR1.42 POTENTIAL 450PROFIT',
//       content: '<p>ENTRY 27740</p>\n<p>TP 28196</p>\n<p>SL 27419</p>',
//       view_count: 12,
//       like_count: 0,
//       comment_count: 0,
//       share_count: 0,
//       favourite_count: 1,
//       liked: false,
//       favourited: false,
//       picked: false,
//       hotpicked: true,
//       picked_reason: 'Looks good',
//       created_at: '2020-09-29 05:07:18',
//       updated_at: '2020-11-03 06:10:06',
//       symbols: [
//         'DJ30',
//         'NAS100'
//       ],
//       symbol_id: 51,
//       tags: [
//         'DJ30'
//       ],
//       strategies: [
//         {
//           id: 3362,
//           post_id: 4651,
//           symbol_id: 51,
//           direction: 'long',
//           entry: '27740.39',
//           stop_lost: '27419.71',
//           take_profit: '28196.38',
//           risk_return: '1.42',
//           created_at: '2020-09-29 05:07:18',
//           updated_at: '2020-09-29 05:07:18',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '27644.77000'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4651/raw.jpg',
//       analysis_snapshot_code: 'analysis_fd13e56e5adf9759c6b94e0da17018e2_04651',
//       customized_data: '{"currOhlcv":27743.58,"currSell":27748.68,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[1131,0]},"realtime":{"config":{},"range":[1131,0]},"candlestickAxis":{"config":{},"range":[1131,0]},"volume-0":{"config":{},"range":[1131,0]},"hLine-0":{"config":{"color":"220,40,40,1","extend":false,"thickness":1,"dash":0,"text":true,"x":81,"y":27555.074898624007},"range":[1131,0]},"hLine-1":{"config":{"color":"220,40,40,1","extend":false,"thickness":1,"dash":0,"text":true,"x":5,"y":26539.874491904287},"range":[1131,0]},"long-0":{"config":{"color":"0,0,0,1","stop":"177,207,143","target":"239,165,156","x3":-20,"x2":0,"y2":27740.38904462312,"y1":28196.377716771658,"y4":27419.70951482648,"y5":27744.58},"range":[1131,0]}},"product":{"id":"51","desc_zh":"美国道琼斯30指数","desc_en":"Dow Jones 30","decimal_place":2,"symbol":"DJ30","spread_precision":0.1,"platform_time":[["mon_fri","01:05-23:15 23:35-24:00"]],"category":"Indices"},"theme":"white","resolution":"H4","domain":{"latestU":1601344800,"latestI":0,"earliestI":243,"numPerTick":10,"extent":500},"buy":27743.58,"sell":27748.68,"k":14,"timezone":"Australia/Sydney*36000"}}',
//       post_language: 'en',
//       slug: null,
//       title_url: 'DJ30-MARKET-BUY-RR142-POTENTIAL-450PROFIT',
//       time_type: 'H4',
//       posts_directions: 'long',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 1657,
//         name: 'mark.tsang1@gmail.com',
//         username: 'marktsang8738',
//         email: 'mark.tsang1@gmail.com',
//         phone: null,
//         last_login: '2020-09-29 05:00:14',
//         created_at: '2020-03-22 23:42:20',
//         updated_at: '2020-11-03 06:10:08',
//         deleted_at: null,
//         last_logout: '2020-09-28 23:20:17',
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 69960,
//         register_method: 'Email',
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 56,
//         analysis_like_count: 88,
//         follower_count: 27,
//         analysis_view_count: '1477',
//         nick_name: 'Mark Tsang',
//         country: 'Australia',
//         city: '',
//         avatar: '/v1/resource/avatar/1657/raw.jpg?313698831',
//         background: '/v1/resource/background/1657/raw.jpg',
//         intro: 'acysecurities.com\nwhatsapp: +61412330538\nwebchat: a0412330538\nemail: mark.tsang@acy.com',
//         state: '',
//         language: 'en',
//         ui_language: 'en',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: 'Mark',
//         last_name: 'Tsang',
//         company: '',
//         street: '',
//         zip_code: '',
//         username_last_modified: '',
//         nickname_last_modified: '',
//         analysis_market_counts: {
//           COMMODITY: 9,
//           CRYPTO: 2,
//           FOREX: 29,
//           INDICE: 14
//         },
//         analysis_symbol_counts: {
//           'AUD/CAD': 1,
//           'AUD/NZD': 5,
//           'AUD/USD': 5,
//           'EUR/CAD': 1,
//           'EUR/CHF': 4,
//           'EUR/GBP': 3,
//           'GBP/JPY': 1,
//           'GBP/USD': 2,
//           'NZD/USD': 1,
//           'USD/CAD': 3,
//           'USD/CHF': 2,
//           'USD/JPY': 1,
//           'XAG/USD': 3,
//           'XAU/USD': 4,
//           WTI: 2,
//           NAS100: 1,
//           DJ30: 2,
//           SP500: 2,
//           GER30: 2,
//           'BTC/USD': 2,
//           AUS200: 4,
//           HK50: 2,
//           UK100: 1
//         },
//         analysis_market_symbol_counts: {
//           COMMODITY: {
//             'XAG/USD': 3,
//             'XAU/USD': 4,
//             WTI: 2
//           },
//           CRYPTO: {
//             'BTC/USD': 2
//           },
//           FOREX: {
//             'AUD/NZD': 5,
//             'AUD/USD': 5,
//             'GBP/JPY': 1,
//             'GBP/USD': 2,
//             'NZD/USD': 1,
//             'USD/CAD': 3,
//             'USD/CHF': 2,
//             'USD/JPY': 1
//           },
//           INDICE: {
//             NAS100: 1,
//             DJ30: 2,
//             SP500: 2,
//             AUS200: 4
//           }
//         },
//         top_tags: [
//           {
//             name: 'long',
//             user_count: 31
//           },
//           {
//             name: 'D1',
//             user_count: 24
//           },
//           {
//             name: 'H1',
//             user_count: 17
//           }
//         ],
//         created_at_formatted: '23/03/20 10:42:20',
//         following: false
//       },
//       comments: [],
//       post_strategy_direction: 'long',
//       post_strategy_status: 0
//     },
//     {
//       id: 4649,
//       title: 'USDCHF Short term analysis',
//       content: '<p><br></p>',
//       view_count: 4,
//       like_count: 1,
//       comment_count: 1,
//       share_count: 0,
//       favourite_count: 0,
//       liked: false,
//       favourited: false,
//       picked: false,
//       hotpicked: false,
//       picked_reason: null,
//       created_at: '2020-09-28 04:33:48',
//       updated_at: '2020-11-03 06:10:05',
//       symbols: [
//         'USD/CHF'
//       ],
//       symbol_id: 32,
//       tags: [
//         'USD/CHF'
//       ],
//       strategies: [
//         {
//           id: 3361,
//           post_id: 4649,
//           symbol_id: 32,
//           direction: 'short',
//           entry: '0.93114',
//           stop_lost: '0.93619',
//           take_profit: '0.91998',
//           risk_return: '2.20990',
//           created_at: '2020-09-28 04:33:48',
//           updated_at: '2020-09-28 04:33:48',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '0.92814'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4649/raw.jpg',
//       analysis_snapshot_code: 'analysis_be30a1097f98af1e42371a35ff711fd7_04649',
//       customized_data: '{"currOhlcv":0.92842,"currSell":0.92845,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[709,0]},"realtime":{"config":{},"range":[709,0]},"candlestickAxis":{"config":{},"range":[709,0]},"volume-0":{"config":{},"range":[709,0]},"rectangle-0":{"config":{"color":"120,40,40,1","thickness":1,"dash":0,"background":{"display":true,"color":"255,153,51,0.3"},"x1":257,"y1":0.9199697313117067,"x2":-20,"y2":0.9199697313117067},"range":[709,0]},"rectangle-1":{"config":{"color":"120,40,40,1","thickness":1,"dash":0,"background":{"display":true,"color":"255,153,51,0.3"},"x1":267,"y1":0.9231174069111425,"x2":-24,"y2":0.9200525648801129},"range":[709,0]},"line-0":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"ext":false,"arrow":0},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":119,"y1":0.8995523392101551,"x2":-92,"y2":0.9166556325811},"range":[709,0]},"line-1":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"arrow":1},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":0,"y1":0.928300428067701,"x2":-4,"y2":0.9317938667136813},"range":[709,0]},"line-2":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"arrow":1},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":-4,"y1":0.9320849866008463,"x2":-17,"y2":0.9203674111424541},"range":[709,0]},"short-0":{"config":{"color":"0,0,0,1","stop":"177,207,143","target":"239,165,156","x3":-85,"x2":0,"y2":0.9311388469675599,"y1":0.9361861380112835,"y4":0.919978038293371,"y5":0.92837},"range":[709,0]}},"product":{"id":"32","desc_zh":"美元/瑞士法郎","desc_en":"US Dollar/Swiss Franc","decimal_place":5,"symbol":"USD/CHF","spread_precision":0.0001,"platform_time":[["mon_fri","00:00-24:00"]],"category":"Forex"},"theme":"white","resolution":"H4","domain":{"latestU":1601254800,"latestI":0,"earliestI":326,"numPerTick":30,"extent":500},"buy":0.92842,"sell":0.92845,"k":20,"timezone":"Asia/Karachi*18000"}}',
//       post_language: 'en',
//       slug: null,
//       title_url: 'USDCHF-Short-term-analysis',
//       time_type: 'H4',
//       posts_directions: 'short',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 2886,
//         name: 'sarmadsultanSST@gmail.com',
//         username: 'ranasarmad',
//         email: 'sarmadsultanSST@gmail.com',
//         phone: null,
//         last_login: '2020-09-04 11:24:49',
//         created_at: '2020-09-04 11:24:49',
//         updated_at: '2021-12-15 02:27:28',
//         deleted_at: null,
//         last_logout: '2020-11-04 21:13:17',
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 787848,
//         register_method: 'Email',
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 3,
//         analysis_like_count: 4,
//         follower_count: 0,
//         analysis_view_count: '10',
//         nick_name: 'Rana SarmadSultan',
//         country: 'Pakistan',
//         city: 'Rahim Yar Khan',
//         avatar: '/v1/resource/avatar/2886/raw.jpg?1618862014',
//         background: '/v1/resource/background/2886/raw.jpg',
//         intro: 'Doing Trading Since 2015.\nFund manager with FTMO.',
//         state: 'Punjab',
//         language: 'en',
//         ui_language: 'en',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: 'Rana',
//         last_name: 'Sarmad',
//         company: 'Markets Research Center',
//         street: 'House no. 658 Street no 5, Mohalla Hussain abad rahim yar khan',
//         zip_code: '64200',
//         username_last_modified: '2020-09-25',
//         nickname_last_modified: '2020-09-25',
//         analysis_market_counts: {
//           COMMODITY: 1,
//           FOREX: 2
//         },
//         analysis_symbol_counts: {
//           'USD/CHF': 1,
//           'USD/JPY': 1,
//           'XAU/USD': 1
//         },
//         analysis_market_symbol_counts: {
//           COMMODITY: {
//             'XAU/USD': 1
//           },
//           FOREX: {
//             'USD/CHF': 1,
//             'USD/JPY': 1
//           }
//         },
//         top_tags: [
//           {
//             name: 'short',
//             user_count: 2
//           },
//           {
//             name: 'USD/CHF',
//             user_count: 1
//           },
//           {
//             name: 'H4',
//             user_count: 1
//           }
//         ],
//         created_at_formatted: '04/09/20 21:24:49',
//         following: false
//       },
//       comments: [
//         {
//           id: 4650,
//           content: '<p>Totaly going Perfect</p>',
//           parent_title: 'USDCHF Short term analysis',
//           parent_id: 4649,
//           like_count: 0,
//           liked: false,
//           created_at: '2020-09-28 17:33:21',
//           updated_at: '2020-09-28 17:33:21',
//           creator: {
//             id: 2886,
//             name: 'sarmadsultanSST@gmail.com',
//             username: 'ranasarmad',
//             email: 'sarmadsultanSST@gmail.com',
//             phone: null,
//             last_login: '2020-09-04 11:24:49',
//             created_at: '2020-09-04 11:24:49',
//             updated_at: '2021-12-15 02:27:28',
//             deleted_at: null,
//             last_logout: '2020-11-04 21:13:17',
//             login_count: 0,
//             logout_count: 0,
//             online_duration: 787848,
//             register_method: 'Email',
//             beta_tester: 0,
//             broadcaster_admin: 0,
//             analysis_count: 3,
//             analysis_like_count: 4,
//             follower_count: 0,
//             analysis_view_count: '10',
//             nick_name: 'Rana SarmadSultan',
//             country: 'Pakistan',
//             city: 'Rahim Yar Khan',
//             avatar: '/v1/resource/avatar/2886/raw.jpg?1618862014',
//             background: '/v1/resource/background/2886/raw.jpg',
//             intro: 'Doing Trading Since 2015.\nFund manager with FTMO.',
//             state: 'Punjab',
//             language: 'en',
//             ui_language: 'en',
//             notification: '1',
//             notification_new_follower_email: '1',
//             notification_followee_new_analysis_email: '1',
//             notification_be_mentioned_in_analysis_comment_email: '1',
//             notification_be_invited_from_new_analysis_email: '1',
//             notification_analysis_strategy_update_email: '1',
//             notification_analysis_has_comment_email: '1',
//             notification_analysis_comment_has_reply_email: '1',
//             notification_analysis_be_picked_email: '1',
//             notification_analysis_be_liked_email: '1',
//             allow_recommend: '1',
//             allow_invited_comment: '1',
//             website: '',
//             first_name: 'Rana',
//             last_name: 'Sarmad',
//             company: 'Markets Research Center',
//             street: 'House no. 658 Street no 5, Mohalla Hussain abad rahim yar khan',
//             zip_code: '64200',
//             username_last_modified: '2020-09-25',
//             nickname_last_modified: '2020-09-25',
//             analysis_market_counts: {
//               COMMODITY: 1,
//               FOREX: 2
//             },
//             analysis_symbol_counts: {
//               'USD/CHF': 1,
//               'USD/JPY': 1,
//               'XAU/USD': 1
//             },
//             analysis_market_symbol_counts: {
//               COMMODITY: {
//                 'XAU/USD': 1
//               },
//               FOREX: {
//                 'USD/CHF': 1,
//                 'USD/JPY': 1
//               }
//             },
//             top_tags: [
//               {
//                 name: 'short',
//                 user_count: 2
//               },
//               {
//                 name: 'USD/CHF',
//                 user_count: 1
//               },
//               {
//                 name: 'H4',
//                 user_count: 1
//               }
//             ],
//             created_at_formatted: '04/09/20 21:24:49'
//           },
//           replies: []
//         }
//       ],
//       post_strategy_direction: 'short',
//       post_strategy_status: 0
//     },
//     {
//       id: 4648,
//       title: 'USDJPY Short',
//       content: '<p>I am watching USDJPY Short after one small up side wave.</p>',
//       view_count: 2,
//       like_count: 2,
//       comment_count: 0,
//       share_count: 0,
//       favourite_count: 0,
//       liked: false,
//       favourited: false,
//       picked: false,
//       hotpicked: false,
//       picked_reason: null,
//       created_at: '2020-09-28 04:20:59',
//       updated_at: '2020-11-03 06:10:08',
//       symbols: [
//         'USD/JPY'
//       ],
//       symbol_id: 36,
//       tags: [
//         'USD/JPY'
//       ],
//       strategies: [
//         {
//           id: 3360,
//           post_id: 4648,
//           symbol_id: 36,
//           direction: 'short',
//           entry: '105.836',
//           stop_lost: '106.022',
//           take_profit: '104.859',
//           risk_return: '5.253',
//           created_at: '2020-09-28 04:21:00',
//           updated_at: '2020-09-28 04:21:00',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '105.54600'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4648/raw.jpg',
//       analysis_snapshot_code: 'analysis_999a4c74d1ba428b3b19f6e2ea8f6ee2_04648',
//       customized_data: '{"currOhlcv":105.343,"currSell":105.345,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[709,0]},"realtime":{"config":{},"range":[709,0]},"candlestickAxis":{"config":{},"range":[709,0]},"volume-0":{"config":{},"range":[709,0]},"hLine-0":{"config":{"color":"220,40,40,1","extend":false,"thickness":1,"dash":0,"text":true,"x":72,"y":105.20095211565587},"range":[709,0]},"line-3":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"ext":false,"arrow":0},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":57,"y1":105.50328053596616,"x2":-37,"y2":105.93566897038082},"range":[709,0]},"line-4":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"arrow":1},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":0,"y1":105.34436854724964,"x2":-5,"y2":105.22241283497885},"range":[709,0]},"line-5":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"arrow":1},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":-5,"y1":105.22610846262342,"x2":-23,"y2":105.84697390691115},"range":[709,0]},"line-6":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"arrow":1},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":-23,"y1":105.85436516220028,"x2":-46,"y2":104.82328504936531},"range":[709,0]},"hLine-3":{"config":{"color":"220,40,40,1","extend":false,"thickness":1,"dash":0,"text":true,"x":316,"y":105.8284957686883},"range":[709,0]},"hLine-4":{"config":{"color":"220,40,40,1","extend":false,"thickness":1,"dash":0,"text":true,"x":317,"y":105.79523511988717},"range":[709,0]},"short-0":{"config":{"color":"0,0,0,1","stop":"177,207,143","target":"239,165,156","x3":-79,"x2":-18,"y2":105.83588702397742,"y1":106.02196187588153,"y4":104.8589478561354,"y5":105.347},"range":[709,0]},"hLine-5":{"config":{"color":"220,40,40,1","extend":false,"thickness":1,"dash":0,"text":true,"x":147,"y":104.87871946403385},"range":[709,0]},"hLine-6":{"config":{"color":"220,40,40,1","extend":false,"thickness":1,"dash":0,"text":true,"x":156,"y":104.84915444287729},"range":[709,0]}},"product":{"id":"36","desc_zh":"美元/日元","desc_en":"US Dollar/Japanese Yen","decimal_place":3,"symbol":"USD/JPY","spread_precision":0.01,"platform_time":[["mon_fri","00:00-24:00"]],"category":"Forex"},"theme":"white","resolution":"H1","domain":{"latestU":1601265600,"latestI":0,"earliestI":331,"numPerTick":30,"extent":500},"buy":105.343,"sell":105.345,"k":20,"timezone":"Asia/Karachi*18000"}}',
//       post_language: 'en',
//       slug: null,
//       title_url: 'USDJPY-Short',
//       time_type: 'H1',
//       posts_directions: 'short',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 2886,
//         name: 'sarmadsultanSST@gmail.com',
//         username: 'ranasarmad',
//         email: 'sarmadsultanSST@gmail.com',
//         phone: null,
//         last_login: '2020-09-04 11:24:49',
//         created_at: '2020-09-04 11:24:49',
//         updated_at: '2021-12-15 02:27:28',
//         deleted_at: null,
//         last_logout: '2020-11-04 21:13:17',
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 787848,
//         register_method: 'Email',
//         user_labels: [],
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 3,
//         analysis_like_count: 4,
//         follower_count: 0,
//         analysis_view_count: '10',
//         nick_name: 'Rana SarmadSultan',
//         country: 'Pakistan',
//         city: 'Rahim Yar Khan',
//         avatar: '/v1/resource/avatar/2886/raw.jpg?1618862014',
//         background: '/v1/resource/background/2886/raw.jpg',
//         intro: 'Doing Trading Since 2015.\nFund manager with FTMO.',
//         state: 'Punjab',
//         language: 'en',
//         ui_language: 'en',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: 'Rana',
//         last_name: 'Sarmad',
//         company: 'Markets Research Center',
//         street: 'House no. 658 Street no 5, Mohalla Hussain abad rahim yar khan',
//         zip_code: '64200',
//         username_last_modified: '2020-09-25',
//         nickname_last_modified: '2020-09-25',
//         analysis_market_counts: {
//           COMMODITY: 1,
//           FOREX: 2
//         },
//         analysis_symbol_counts: {
//           'USD/CHF': 1,
//           'USD/JPY': 1,
//           'XAU/USD': 1
//         },
//         analysis_market_symbol_counts: {
//           COMMODITY: {
//             'XAU/USD': 1
//           },
//           FOREX: {
//             'USD/CHF': 1,
//             'USD/JPY': 1
//           }
//         },
//         top_tags: [
//           {
//             name: 'short',
//             user_count: 2
//           },
//           {
//             name: 'USD/CHF',
//             user_count: 1
//           },
//           {
//             name: 'H4',
//             user_count: 1
//           }
//         ],
//         created_at_formatted: '04/09/20 21:24:49',
//         following: false
//       },
//       comments: [],
//       post_strategy_direction: 'short',
//       post_strategy_status: 0
//     },
//     {
//       id: 4647,
//       title: 'Xauusd D1 Analysis',
//       content: '<p><br></p>',
//       view_count: 4,
//       like_count: 1,
//       comment_count: 0,
//       share_count: 0,
//       favourite_count: 0,
//       liked: false,
//       favourited: false,
//       picked: false,
//       hotpicked: false,
//       picked_reason: null,
//       created_at: '2020-09-25 20:12:51',
//       updated_at: '2020-11-03 06:10:06',
//       symbols: [
//         'XAU/USD',
//         'XAG/USD'
//       ],
//       symbol_id: 44,
//       tags: [
//         'XAU/USD'
//       ],
//       strategies: [
//         {
//           id: 3359,
//           post_id: 4647,
//           symbol_id: 44,
//           direction: 'short',
//           entry: '1928.741',
//           stop_lost: '2031.830',
//           take_profit: '1694.792',
//           risk_return: '2.269',
//           created_at: '2020-09-25 20:12:51',
//           updated_at: '2020-09-25 20:12:51',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '1867.25000'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4647/raw.jpg',
//       analysis_snapshot_code: 'analysis_4b1cf4c6eb9a95d8fdeab7d5d394d259_04647',
//       customized_data: '{"currOhlcv":1862.86,"currSell":1863.04,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[709,0]},"realtime":{"config":{},"range":[709,0]},"candlestickAxis":{"config":{},"range":[709,0]},"line-0":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"ext":false,"arrow":0},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":30,"y1":2020.4278194640337,"x2":-14,"y2":1915.9686544428773},"range":[709,0]},"hLine-0":{"config":{"color":"220,40,40,1","extend":false,"thickness":1,"dash":0,"text":true,"x":44,"y":1909.1487165021156},"range":[709,0]},"trace-0":{"config":{"entries":[{"display":true,"color":"204,204,204,1","level":0},{"display":false,"color":"255,245,108,1","level":2.618},{"color":"40,149,204,1","level":3},{"display":false,"color":"242,143,123,1","level":0.236},{"display":false,"color":"179,217,135,1","level":3.618},{"color":"128,128,128,1","level":3.272},{"display":true,"color":"255,245,108,1","level":0.382},{"display":false,"color":"148,181,212,1","level":4.236},{"color":"40,40,204,1","level":3.414},{"display":false,"color":"179,217,135,1","level":0.5},{"color":"149,204,40,1","level":1.272},{"color":"204,40,40,1","level":4},{"display":true,"color":"148,181,212,1","level":0.618},{"color":"28,69,135,1","level":1.414},{"color":"149,40,204,1","level":4.272},{"display":false,"color":"197,166,225,1","level":0.786},{"color":"149,204,40,1","level":2.272},{"color":"204,40,149,1","level":4.414},{"display":true,"color":"204,204,204,1","level":1},{"color":"40,204,40,1","level":2.414},{"color":"149,204,40,1","level":4.618},{"display":false,"color":"242,143,123,1","level":1.618},{"color":"40,204,149,1","level":2},{"color":"40,204,149,1","level":4.764}],"trend":{"display":true,"color":"101,101,101,1","dash":0,"thickness":1},"level":{"dash":0,"thickness":1},"text":{"level":true,"price":false,"percent":false},"background":false,"right":{"extend":false},"left":{"extend":false},"reverse":false,"alpha":0.2,"x1":137,"y1":1450.3093935119887,"x2":-27,"y2":2075.111875881523},"range":[709,0]},"trace-1":{"config":{"entries":[{"display":true,"color":"204,204,204,1","level":0},{"display":false,"color":"255,245,108,1","level":2.618},{"color":"40,149,204,1","level":3},{"display":false,"color":"242,143,123,1","level":0.236},{"display":false,"color":"179,217,135,1","level":3.618},{"color":"128,128,128,1","level":3.272},{"display":true,"color":"255,245,108,1","level":0.382},{"display":false,"color":"148,181,212,1","level":4.236},{"color":"40,40,204,1","level":3.414},{"display":false,"color":"179,217,135,1","level":0.5},{"color":"149,204,40,1","level":1.272},{"color":"204,40,40,1","level":4},{"display":true,"color":"148,181,212,1","level":0.618},{"color":"28,69,135,1","level":1.414},{"color":"149,40,204,1","level":4.272},{"display":false,"color":"197,166,225,1","level":0.786},{"color":"149,204,40,1","level":2.272},{"color":"204,40,149,1","level":4.414},{"display":true,"color":"204,204,204,1","level":1},{"color":"40,204,40,1","level":2.414},{"color":"149,204,40,1","level":4.618},{"display":false,"color":"242,143,123,1","level":1.618},{"color":"40,204,149,1","level":2},{"color":"40,204,149,1","level":4.764}],"trend":{"display":true,"color":"101,101,101,1","dash":0,"thickness":1},"level":{"dash":0,"thickness":1},"text":{"level":true,"price":false,"percent":false},"background":false,"right":{"extend":false},"left":{"extend":false},"reverse":false,"alpha":0.2,"x1":81,"y1":1674.8339464033847,"x2":-27,"y2":2078.026798307475},"range":[709,0]},"rectangle-0":{"config":{"color":"120,40,40,1","thickness":1,"dash":0,"background":{"display":true,"color":"255,153,51,0.3"},"x1":140,"y1":1835.9296755994358,"x2":-56,"y2":1826.1671368124119},"range":[709,0]},"line-1":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"arrow":1},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":0,"y1":1863.2647842031029,"x2":-2,"y2":1841.7871988716502},"range":[709,0]},"line-2":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"arrow":1},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":-4,"y1":1851.549737658674,"x2":-13,"y2":1919.887509167842},"range":[709,0]},"line-3":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"arrow":1},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":-14,"y1":1903.2911932299012,"x2":-25,"y2":1712.9216868829337},"range":[709,0]},"short-1":{"config":{"color":"0,0,0,1","stop":"177,207,143","target":"239,165,156","x3":-63,"x2":6,"y2":1928.7408279266572,"y1":2031.8295279266572,"y4":1694.792000987306,"y5":1862.5},"range":[709,0]}},"product":{"id":"44","desc_zh":"黄金/美元","desc_en":"Gold","decimal_place":3,"symbol":"XAU/USD","spread_precision":0.01,"platform_time":[["mon_fri","01:00-24:00"]],"category":"Commodities"},"theme":"white","resolution":"D1","domain":{"latestU":1600981200,"latestI":0,"earliestI":270,"numPerTick":30,"extent":500},"buy":1862.86,"sell":1863.04,"k":18,"timezone":"Asia/Karachi*18000"}}',
//       post_language: 'en',
//       slug: null,
//       title_url: 'Xauusd-D1-Analysis',
//       time_type: 'D1',
//       posts_directions: 'long',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 2886,
//         name: 'sarmadsultanSST@gmail.com',
//         username: 'ranasarmad',
//         email: 'sarmadsultanSST@gmail.com',
//         phone: null,
//         last_login: '2020-09-04 11:24:49',
//         created_at: '2020-09-04 11:24:49',
//         updated_at: '2021-12-15 02:27:28',
//         deleted_at: null,
//         last_logout: '2020-11-04 21:13:17',
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 787848,
//         register_method: 'Email',
//         user_labels: [],
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 3,
//         analysis_like_count: 4,
//         follower_count: 0,
//         analysis_view_count: '10',
//         nick_name: 'Rana SarmadSultan',
//         country: 'Pakistan',
//         city: 'Rahim Yar Khan',
//         avatar: '/v1/resource/avatar/2886/raw.jpg?1618862014',
//         background: '/v1/resource/background/2886/raw.jpg',
//         intro: 'Doing Trading Since 2015.\nFund manager with FTMO.',
//         state: 'Punjab',
//         language: 'en',
//         ui_language: 'en',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: 'Rana',
//         last_name: 'Sarmad',
//         company: 'Markets Research Center',
//         street: 'House no. 658 Street no 5, Mohalla Hussain abad rahim yar khan',
//         zip_code: '64200',
//         username_last_modified: '2020-09-25',
//         nickname_last_modified: '2020-09-25',
//         analysis_market_counts: {
//           COMMODITY: 1,
//           FOREX: 2
//         },
//         analysis_symbol_counts: {
//           'USD/CHF': 1,
//           'USD/JPY': 1,
//           'XAU/USD': 1
//         },
//         analysis_market_symbol_counts: {
//           COMMODITY: {
//             'XAU/USD': 1
//           },
//           FOREX: {
//             'USD/CHF': 1,
//             'USD/JPY': 1
//           }
//         },
//         top_tags: [
//           {
//             name: 'short',
//             user_count: 2
//           },
//           {
//             name: 'USD/CHF',
//             user_count: 1
//           },
//           {
//             name: 'H4',
//             user_count: 1
//           }
//         ],
//         created_at_formatted: '04/09/20 21:24:49',
//         following: false
//       },
//       comments: [],
//       post_strategy_direction: 'short',
//       post_strategy_status: 0
//     },
//     {
//       id: 4646,
//       title: 'AUDUSD Price nearing resistance',
//       content: '<p>Price is nearing a resistance point that may provide a tidy opportunity for a short position with an attractive risk-reward</p>',
//       view_count: 10,
//       like_count: 1,
//       comment_count: 0,
//       share_count: 0,
//       favourite_count: 0,
//       liked: false,
//       favourited: false,
//       picked: false,
//       hotpicked: true,
//       picked_reason: 'Excellent idea.',
//       created_at: '2020-09-22 09:49:09',
//       updated_at: '2020-11-03 06:10:06',
//       symbols: [
//         'AUD/USD'
//       ],
//       symbol_id: 5,
//       tags: [
//         'AUD/USD'
//       ],
//       strategies: [
//         {
//           id: 3358,
//           post_id: 4646,
//           symbol_id: 5,
//           direction: 'short',
//           entry: '0.72116',
//           stop_lost: '0.72293',
//           take_profit: '0.71759',
//           risk_return: '2.01695',
//           created_at: '2020-09-22 09:49:09',
//           updated_at: '2020-09-22 09:49:09',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '0.72224'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4646/raw.jpg',
//       analysis_snapshot_code: 'analysis_16ba8f30132040ad018646aaeb7c9624_04646',
//       customized_data: '{"currOhlcv":0.72113,"currSell":0.72116,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[887,0]},"realtime":{"config":{},"range":[887,0]},"candlestickAxis":{"config":{},"range":[887,0]},"volume-0":{"config":{},"range":[887,0]},"short-0":{"config":{"color":"0,0,0,1","stop":"177,207,143","target":"239,165,156","x3":-26,"x2":0,"y2":0.7211612795941376,"y1":0.7229266109357384,"y4":0.7175911793686585,"y5":0.72115},"range":[887,0]}},"product":{"id":"5","desc_zh":"澳大利亚元/美元","desc_en":"Australian Dollar/US Dollar","decimal_place":5,"symbol":"AUD/USD","spread_precision":0.0001,"platform_time":[["mon_fri","00:00-24:00"]],"category":"Forex"},"theme":"white","resolution":"M15","domain":{"latestU":1600767900,"latestI":0,"earliestI":101,"numPerTick":10,"extent":500},"buy":0.72113,"sell":0.72116,"k":11,"timezone":"Australia/Sydney*36000"}}',
//       post_language: 'en',
//       slug: null,
//       title_url: 'AUDUSD-Price-nearing-resistance',
//       time_type: 'M15',
//       posts_directions: 'short',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 1002,
//         name: 'alistair.schultz@acy.com',
//         username: 'alistairschultz',
//         email: 'alistair.schultz@acy.com',
//         phone: null,
//         last_login: '2020-09-22 09:47:02',
//         created_at: '2020-02-09 23:10:21',
//         updated_at: '2020-11-03 06:10:09',
//         deleted_at: null,
//         last_logout: null,
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 600,
//         register_method: 'Email',
//         user_labels: [],
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 59,
//         analysis_like_count: 123,
//         follower_count: 40,
//         analysis_view_count: '1439',
//         nick_name: 'Alistair Schultz',
//         country: 'Australia',
//         city: '',
//         avatar: '/v1/resource/avatar/1002/raw.jpg?1130439916',
//         background: '/v1/resource/background/1002/raw.jpg',
//         intro: '',
//         state: '',
//         language: 'en',
//         ui_language: 'en',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: 'Alistair',
//         last_name: 'Schultz',
//         company: 'ACY Securities',
//         street: '',
//         zip_code: '',
//         username_last_modified: '',
//         nickname_last_modified: '',
//         analysis_market_counts: {
//           COMMODITY: 7,
//           CRYPTO: 1,
//           FOREX: 33,
//           INDICE: 17
//         },
//         analysis_symbol_counts: {
//           'AUD/JPY': 1,
//           'AUD/NZD': 1,
//           'AUD/USD': 10,
//           'EUR/JPY': 4,
//           'EUR/USD': 3,
//           'GBP/JPY': 1,
//           'GBP/USD': 3,
//           'NZD/USD': 1,
//           'USD/CAD': 3,
//           'USD/CHF': 1,
//           'USD/CNH': 1,
//           'USD/JPY': 4,
//           'XAG/USD': 1,
//           'XAU/USD': 2,
//           WTI: 4,
//           NAS100: 4,
//           DJ30: 1,
//           SP500: 5,
//           JP225: 2,
//           'BTC/USD': 1,
//           AUS200: 5
//         },
//         analysis_market_symbol_counts: {
//           COMMODITY: {
//             'XAG/USD': 1,
//             'XAU/USD': 2,
//             WTI: 4
//           },
//           CRYPTO: {
//             'BTC/USD': 1
//           },
//           FOREX: {
//             'AUD/JPY': 1,
//             'AUD/NZD': 1,
//             'AUD/USD': 10,
//             'EUR/JPY': 4,
//             'EUR/USD': 3,
//             'GBP/JPY': 1,
//             'GBP/USD': 3,
//             'NZD/USD': 1,
//             'USD/CAD': 3,
//             'USD/CHF': 1,
//             'USD/CNH': 1,
//             'USD/JPY': 4
//           },
//           INDICE: {
//             NAS100: 4,
//             DJ30: 1,
//             SP500: 5,
//             JP225: 2,
//             AUS200: 5
//           }
//         },
//         top_tags: [
//           {
//             name: 'short',
//             user_count: 31
//           },
//           {
//             name: 'long',
//             user_count: 21
//           },
//           {
//             name: 'H1',
//             user_count: 19
//           }
//         ],
//         created_at_formatted: '10/02/20 10:10:21',
//         following: false
//       },
//       comments: [],
//       post_strategy_direction: 'short',
//       post_strategy_status: 0
//     },
//     {
//       id: 4645,
//       title: '9.22美加日内多头交易机会',
//       content: '<p>目前小时图还缺少一个诱空的动作 &nbsp;&nbsp;在诱空之后快速拉升 &nbsp;15MIN收线在水平压力位上方时介入 &nbsp;&nbsp;&nbsp;止损日内低点 &nbsp;第一目标位1.34 &nbsp;&nbsp;第二目标位1.345 &nbsp;&nbsp;&nbsp;注意盈亏比 &nbsp;&nbsp;没1：1放弃</p>',
//       view_count: 3,
//       like_count: 1,
//       comment_count: 0,
//       share_count: 0,
//       favourite_count: 0,
//       liked: false,
//       favourited: false,
//       picked: false,
//       hotpicked: false,
//       picked_reason: null,
//       created_at: '2020-09-22 02:11:03',
//       updated_at: '2020-11-03 06:10:03',
//       symbols: [
//         'USD/CAD'
//       ],
//       symbol_id: 31,
//       tags: [
//         'USD/CAD'
//       ],
//       strategies: [
//         {
//           id: 3357,
//           post_id: 4645,
//           symbol_id: 31,
//           direction: 'long',
//           entry: '1.33250',
//           stop_lost: '1.32900',
//           take_profit: '1.33900',
//           risk_return: '1.85714',
//           created_at: '2020-09-22 02:11:03',
//           updated_at: '2020-09-22 02:11:03',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '1.33054'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4645/raw.jpg',
//       analysis_snapshot_code: 'analysis_32eda0224cbe9a4f2d852739793614dc_04645',
//       customized_data: '{"currOhlcv":1.33123,"currSell":1.33127,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[829,0]},"realtime":{"config":{},"range":[829,0]},"candlestickAxis":{"config":{},"range":[829,0]},"volume-1":{"config":{},"range":[829,0]},"hLine-1":{"config":{"color":"220,40,40,1","extend":true,"thickness":1,"dash":0,"text":true,"x":56,"y":1.3323224360675514},"range":[829,0]},"hLine-2":{"config":{"color":"220,40,40,1","extend":true,"thickness":1,"dash":0,"text":true,"x":55,"y":1.3397412394451147},"range":[829,0]},"hLine-3":{"config":{"color":"220,40,40,1","extend":true,"thickness":1,"dash":0,"text":true,"x":68,"y":1.3449681236429434},"range":[829,0]},"hLine-4":{"config":{"color":"220,40,40,1","extend":true,"thickness":1,"dash":0,"text":true,"x":73,"y":1.3259152876960194},"range":[829,0]}},"product":{"id":"31","desc_zh":"美元/加拿大元","desc_en":"US Dollar/Canadian Dollar","decimal_place":5,"symbol":"USD/CAD","spread_precision":0.0001,"platform_time":[["mon_fri","00:00-24:00"]],"category":"Forex"},"theme":"white","resolution":"D1","domain":{"latestU":1600722000,"latestI":0,"earliestI":130,"numPerTick":10,"extent":500},"buy":1.33123,"sell":1.33127,"k":12,"timezone":"Asia/Beijing*28800"}}',
//       post_language: 'zh',
//       slug: 'UrBjkfh9',
//       title_url: null,
//       time_type: 'D1',
//       posts_directions: 'long',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 2858,
//         name: 'hubo1184ad008@163.com',
//         username: 'hubo',
//         email: 'hubo1184ad008@163.com',
//         phone: null,
//         last_login: '2020-08-31 10:09:31',
//         created_at: '2020-08-31 10:09:31',
//         updated_at: '2020-11-03 06:10:08',
//         deleted_at: null,
//         last_logout: '2020-09-22 06:27:15',
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 123587,
//         register_method: 'Email',
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 3,
//         analysis_like_count: 2,
//         follower_count: 2,
//         analysis_view_count: '12',
//         nick_name: '胡波',
//         country: 'China',
//         city: '',
//         avatar: '',
//         background: '',
//         intro: '个人交易计划    实际做单有一些偏差  各位看看就好',
//         state: '',
//         language: 'zh',
//         ui_language: 'zh',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: '波',
//         last_name: '胡',
//         company: '',
//         street: '',
//         zip_code: '',
//         username_last_modified: '',
//         nickname_last_modified: '',
//         analysis_market_counts: {
//           FOREX: 3
//         },
//         analysis_symbol_counts: {
//           'CAD/JPY': 1,
//           'EUR/NZD': 1,
//           'USD/CAD': 1
//         },
//         analysis_market_symbol_counts: {
//           FOREX: {
//             'USD/CAD': 1
//           }
//         },
//         top_tags: [],
//         created_at_formatted: '31/08/20 20:09:31',
//         following: false
//       },
//       comments: [],
//       post_strategy_direction: 'long',
//       post_strategy_status: 0
//     },
//     {
//       id: 4642,
//       title: '9.21加日关注空头破位',
//       content: '<p>日元最近种种原因表现强劲 &nbsp;&nbsp;上周加日收出巨幅阴线 &nbsp;&nbsp;这周继续关注空头破位 &nbsp;&nbsp;在79.05上方诱多后的快速下破的空头机会值得关注 &nbsp;止损在79.5下方回调高点 &nbsp;超过79.5回调盈亏比不合适 &nbsp;放弃入场 &nbsp;&nbsp;第一目标位78.5 &nbsp;第二目标位78 &nbsp;&nbsp;今天日元的多头都能关注 &nbsp;&nbsp;注意破位形态</p>',
//       view_count: 6,
//       like_count: 1,
//       comment_count: 2,
//       share_count: 0,
//       favourite_count: 0,
//       liked: false,
//       favourited: false,
//       picked: false,
//       hotpicked: false,
//       picked_reason: null,
//       created_at: '2020-09-21 01:22:58',
//       updated_at: '2020-11-03 06:10:04',
//       symbols: [
//         'CAD/JPY'
//       ],
//       symbol_id: 7,
//       tags: [
//         'CAD/JPY'
//       ],
//       strategies: [
//         {
//           id: 3356,
//           post_id: 4642,
//           symbol_id: 7,
//           direction: 'short',
//           entry: '79.0000',
//           stop_lost: '79.5000',
//           take_profit: '78.5000',
//           risk_return: '1.0000',
//           created_at: '2020-09-21 01:22:58',
//           updated_at: '2020-09-21 01:22:58',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '79.16700'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4642/raw.jpg',
//       analysis_snapshot_code: 'analysis_e2c765041d957fae7717b5b3a6cfea57_04642',
//       customized_data: '{"currOhlcv":79.178,"currSell":79.185,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[829,0]},"realtime":{"config":{},"range":[829,0]},"candlestickAxis":{"config":{},"range":[829,0]},"volume-1":{"config":{},"range":[829,0]},"brush-0":{"config":{"color":"120,40,40,1","thickness":1,"dash":0,"points":[[0.12988123598348977,79.04177098914354],[0.12988123598348977,79.06068992762364],[0.29810553504890436,79.06068992762364],[0.5504419836470476,79.04177098914354],[1.4756756285068633,79.00393311218335],[2.148572824768536,78.98501417370325],[4.419600862151711,78.90933841978287],[4.756049460282554,78.89987895054283],[5.092498058413398,78.89041948130277],[5.76539525467507,78.86204107358263],[6.774741049067586,78.81474372738239],[8.12053544159096,78.78636531966224],[8.456984039721803,78.7769058504222],[9.12988123598349,78.7769058504222],[9.466329834114319,78.7769058504222],[10.139227030376006,78.7769058504222],[10.812124226637692,78.7769058504222],[11.148572824768536,78.7769058504222],[11.148572824768536,78.7958247889023],[10.728012077104978,78.85258160434257],[10.139227030376006,78.89987895054283],[9.802778432245162,78.90933841978287],[9.634554133179748,78.93771682750301],[9.718666282712462,78.94717629674307]],"background":{"display":true,"color":"255,153,51,0.3"},"x1":0.12988123598348977,"y1":79.04177098914354,"x2":9.718666282712462,"y2":78.94717629674307},"range":[829,0]},"rectangle-0":{"config":{"color":"120,40,40,1","thickness":1,"dash":0,"background":{"display":true,"color":"255,153,51,0.3"},"x1":143,"y1":78.36056405307599,"x2":-18,"y2":78.18662340168878},"range":[829,0]},"hLine-1":{"config":{"color":"220,40,40,1","extend":true,"thickness":1,"dash":0,"text":true,"x":77,"y":79.04183160434258},"range":[829,0]}},"product":{"id":"7","desc_zh":"加拿大元/日元","desc_en":"Canadian Dollar/Japanese Yen","decimal_place":4,"symbol":"CAD/JPY","spread_precision":0.001,"platform_time":[["mon_fri","00:00-24:00"]],"category":"Forex"},"theme":"white","resolution":"H1","domain":{"latestU":1600650000,"latestI":0,"earliestI":156,"numPerTick":10,"extent":500},"buy":79.178,"sell":79.185,"k":13,"timezone":"Asia/Beijing*28800"}}',
//       post_language: 'zh',
//       slug: 'NRvTNbCj',
//       title_url: null,
//       time_type: 'H1',
//       posts_directions: 'short',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 2858,
//         name: 'hubo1184ad008@163.com',
//         username: 'hubo',
//         email: 'hubo1184ad008@163.com',
//         phone: null,
//         last_login: '2020-08-31 10:09:31',
//         created_at: '2020-08-31 10:09:31',
//         updated_at: '2020-11-03 06:10:08',
//         deleted_at: null,
//         last_logout: '2020-09-22 06:27:15',
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 123587,
//         register_method: 'Email',
//         user_labels: [],
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 3,
//         analysis_like_count: 2,
//         follower_count: 2,
//         analysis_view_count: '12',
//         nick_name: '胡波',
//         country: 'China',
//         city: '',
//         avatar: '',
//         background: '',
//         intro: '个人交易计划    实际做单有一些偏差  各位看看就好',
//         state: '',
//         language: 'zh',
//         ui_language: 'zh',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: '波',
//         last_name: '胡',
//         company: '',
//         street: '',
//         zip_code: '',
//         username_last_modified: '',
//         nickname_last_modified: '',
//         analysis_market_counts: {
//           FOREX: 3
//         },
//         analysis_symbol_counts: {
//           'CAD/JPY': 1,
//           'EUR/NZD': 1,
//           'USD/CAD': 1
//         },
//         analysis_market_symbol_counts: {
//           FOREX: {
//             'USD/CAD': 1
//           }
//         },
//         top_tags: [],
//         created_at_formatted: '31/08/20 20:09:31',
//         following: false
//       },
//       comments: [
//         {
//           id: 4643,
//           content: '<p>79.04已入场 &nbsp;止损79.32 &nbsp;</p>',
//           parent_title: '9.21加日关注空头破位',
//           parent_id: 4642,
//           like_count: 0,
//           liked: false,
//           created_at: '2020-09-21 07:14:00',
//           updated_at: '2020-09-21 07:14:00',
//           creator: {
//             id: 2858,
//             name: 'hubo1184ad008@163.com',
//             username: 'hubo',
//             email: 'hubo1184ad008@163.com',
//             phone: null,
//             last_login: '2020-08-31 10:09:31',
//             created_at: '2020-08-31 10:09:31',
//             updated_at: '2020-11-03 06:10:08',
//             deleted_at: null,
//             last_logout: '2020-09-22 06:27:15',
//             login_count: 0,
//             logout_count: 0,
//             online_duration: 123587,
//             register_method: 'Email',
//             beta_tester: 0,
//             broadcaster_admin: 0,
//             analysis_count: 3,
//             analysis_like_count: 2,
//             follower_count: 2,
//             analysis_view_count: '12',
//             nick_name: '胡波',
//             country: 'China',
//             city: '',
//             avatar: '',
//             background: '',
//             intro: '个人交易计划    实际做单有一些偏差  各位看看就好',
//             state: '',
//             language: 'zh',
//             ui_language: 'zh',
//             notification: '1',
//             notification_new_follower_email: '1',
//             notification_followee_new_analysis_email: '1',
//             notification_be_mentioned_in_analysis_comment_email: '1',
//             notification_be_invited_from_new_analysis_email: '1',
//             notification_analysis_strategy_update_email: '1',
//             notification_analysis_has_comment_email: '1',
//             notification_analysis_comment_has_reply_email: '1',
//             notification_analysis_be_picked_email: '1',
//             notification_analysis_be_liked_email: '1',
//             allow_recommend: '1',
//             allow_invited_comment: '1',
//             website: '',
//             first_name: '波',
//             last_name: '胡',
//             company: '',
//             street: '',
//             zip_code: '',
//             username_last_modified: '',
//             nickname_last_modified: '',
//             analysis_market_counts: {
//               FOREX: 3
//             },
//             analysis_symbol_counts: {
//               'CAD/JPY': 1,
//               'EUR/NZD': 1,
//               'USD/CAD': 1
//             },
//             analysis_market_symbol_counts: {
//               FOREX: {
//                 'USD/CAD': 1
//               }
//             },
//             top_tags: [],
//             created_at_formatted: '31/08/20 20:09:31'
//           },
//           replies: []
//         },
//         {
//           id: 4644,
//           content: '在盈亏比到1：1的时候已出大部分仓位  剩下的保护到入场位',
//           parent_title: '9.21加日关注空头破位',
//           parent_id: 4642,
//           like_count: 0,
//           liked: false,
//           created_at: '2020-09-21 09:06:36',
//           updated_at: '2020-09-21 09:06:36',
//           creator: {
//             id: 2858,
//             name: 'hubo1184ad008@163.com',
//             username: 'hubo',
//             email: 'hubo1184ad008@163.com',
//             phone: null,
//             last_login: '2020-08-31 10:09:31',
//             created_at: '2020-08-31 10:09:31',
//             updated_at: '2020-11-03 06:10:08',
//             deleted_at: null,
//             last_logout: '2020-09-22 06:27:15',
//             login_count: 0,
//             logout_count: 0,
//             online_duration: 123587,
//             register_method: 'Email',
//             user_labels: [],
//             beta_tester: 0,
//             broadcaster_admin: 0,
//             analysis_count: 3,
//             analysis_like_count: 2,
//             follower_count: 2,
//             analysis_view_count: '12',
//             nick_name: '胡波',
//             country: 'China',
//             city: '',
//             avatar: '',
//             background: '',
//             intro: '个人交易计划    实际做单有一些偏差  各位看看就好',
//             state: '',
//             language: 'zh',
//             ui_language: 'zh',
//             notification: '1',
//             notification_new_follower_email: '1',
//             notification_followee_new_analysis_email: '1',
//             notification_be_mentioned_in_analysis_comment_email: '1',
//             notification_be_invited_from_new_analysis_email: '1',
//             notification_analysis_strategy_update_email: '1',
//             notification_analysis_has_comment_email: '1',
//             notification_analysis_comment_has_reply_email: '1',
//             notification_analysis_be_picked_email: '1',
//             notification_analysis_be_liked_email: '1',
//             allow_recommend: '1',
//             allow_invited_comment: '1',
//             website: '',
//             first_name: '波',
//             last_name: '胡',
//             company: '',
//             street: '',
//             zip_code: '',
//             username_last_modified: '',
//             nickname_last_modified: '',
//             analysis_market_counts: {
//               FOREX: 3
//             },
//             analysis_symbol_counts: {
//               'CAD/JPY': 1,
//               'EUR/NZD': 1,
//               'USD/CAD': 1
//             },
//             analysis_market_symbol_counts: {
//               FOREX: {
//                 'USD/CAD': 1
//               }
//             },
//             top_tags: [],
//             created_at_formatted: '31/08/20 20:09:31'
//           },
//           replies: []
//         }
//       ],
//       post_strategy_direction: 'short',
//       post_strategy_status: 0
//     },
//     {
//       id: 4640,
//       title: '关注欧纽空头破位短线交易机会',
//       content: '<p>欧纽日线空头流向 &nbsp;&nbsp;日内寻找空头交易机会 &nbsp;在1.7446附近调整诱多后 &nbsp;15MIN坚决阴线跌破1.7446可入场追空 &nbsp;&nbsp;止损1.7474 &nbsp;止盈1.7415 &nbsp;&nbsp;入场注意形态 &nbsp;&nbsp;非坚决阴线跌破不入场</p>',
//       view_count: 3,
//       like_count: 0,
//       comment_count: 1,
//       share_count: 0,
//       favourite_count: 1,
//       liked: false,
//       favourited: false,
//       picked: false,
//       hotpicked: false,
//       picked_reason: null,
//       created_at: '2020-09-18 07:10:08',
//       updated_at: '2020-11-03 06:10:07',
//       symbols: [
//         'EUR/NZD'
//       ],
//       symbol_id: 16,
//       tags: [
//         'EUR/NZD'
//       ],
//       strategies: [
//         {
//           id: 3355,
//           post_id: 4640,
//           symbol_id: 16,
//           direction: 'short',
//           entry: '1.74450',
//           stop_lost: '1.74740',
//           take_profit: '1.74150',
//           risk_return: '1.03448',
//           created_at: '2020-09-18 07:10:08',
//           updated_at: '2020-09-18 07:10:08',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '1.75297'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4640/raw.jpg',
//       analysis_snapshot_code: 'analysis_64bd203bba0fd0de74077a335aed7512_04640',
//       customized_data: '{"currOhlcv":1.74574,"currSell":1.74581,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[789,0]},"realtime":{"config":{},"range":[789,0]},"candlestickAxis":{"config":{},"range":[789,0]},"volume-0":{"config":{},"range":[789,0]}},"product":{"id":"16","desc_zh":"欧元/新西兰元","desc_en":"Euro/New Zealand Dollar","decimal_place":5,"symbol":"EUR/NZD","spread_precision":0.0001,"platform_time":[["mon_fri","00:00-24:00"]],"category":"Forex"},"theme":"white","resolution":"M15","domain":{"latestU":1600411500,"latestI":0,"earliestI":115,"numPerTick":10,"extent":500},"buy":1.74574,"sell":1.74581,"k":11,"timezone":"Asia/Beijing*28800"}}',
//       post_language: 'zh',
//       slug: 'vtPHjGl0',
//       title_url: null,
//       time_type: 'M15',
//       posts_directions: 'short',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 2858,
//         name: 'hubo1184ad008@163.com',
//         username: 'hubo',
//         email: 'hubo1184ad008@163.com',
//         phone: null,
//         last_login: '2020-08-31 10:09:31',
//         created_at: '2020-08-31 10:09:31',
//         updated_at: '2020-11-03 06:10:08',
//         deleted_at: null,
//         last_logout: '2020-09-22 06:27:15',
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 123587,
//         register_method: 'Email',
//         user_labels: [],
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 3,
//         analysis_like_count: 2,
//         follower_count: 2,
//         analysis_view_count: '12',
//         nick_name: '胡波',
//         country: 'China',
//         city: '',
//         avatar: '',
//         background: '',
//         intro: '个人交易计划    实际做单有一些偏差  各位看看就好',
//         state: '',
//         language: 'zh',
//         ui_language: 'zh',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: '波',
//         last_name: '胡',
//         company: '',
//         street: '',
//         zip_code: '',
//         username_last_modified: '',
//         nickname_last_modified: '',
//         analysis_market_counts: {
//           FOREX: 3
//         },
//         analysis_symbol_counts: {
//           'CAD/JPY': 1,
//           'EUR/NZD': 1,
//           'USD/CAD': 1
//         },
//         analysis_market_symbol_counts: {
//           FOREX: {
//             'USD/CAD': 1
//           }
//         },
//         top_tags: [],
//         created_at_formatted: '31/08/20 20:09:31',
//         following: false
//       },
//       comments: [
//         {
//           id: 4641,
//           content: '<p>反弹过多 &nbsp;形态已破坏</p>',
//           parent_title: '关注欧纽空头破位短线交易机会',
//           parent_id: 4640,
//           like_count: 0,
//           liked: false,
//           created_at: '2020-09-18 09:36:13',
//           updated_at: '2020-09-18 09:36:13',
//           creator: {
//             id: 2858,
//             name: 'hubo1184ad008@163.com',
//             username: 'hubo',
//             email: 'hubo1184ad008@163.com',
//             phone: null,
//             last_login: '2020-08-31 10:09:31',
//             created_at: '2020-08-31 10:09:31',
//             updated_at: '2020-11-03 06:10:08',
//             deleted_at: null,
//             last_logout: '2020-09-22 06:27:15',
//             login_count: 0,
//             logout_count: 0,
//             online_duration: 123587,
//             register_method: 'Email',
//             user_labels: [],
//             beta_tester: 0,
//             broadcaster_admin: 0,
//             analysis_count: 3,
//             analysis_like_count: 2,
//             follower_count: 2,
//             analysis_view_count: '12',
//             nick_name: '胡波',
//             country: 'China',
//             city: '',
//             avatar: '',
//             background: '',
//             intro: '个人交易计划    实际做单有一些偏差  各位看看就好',
//             state: '',
//             language: 'zh',
//             ui_language: 'zh',
//             notification: '1',
//             notification_new_follower_email: '1',
//             notification_followee_new_analysis_email: '1',
//             notification_be_mentioned_in_analysis_comment_email: '1',
//             notification_be_invited_from_new_analysis_email: '1',
//             notification_analysis_strategy_update_email: '1',
//             notification_analysis_has_comment_email: '1',
//             notification_analysis_comment_has_reply_email: '1',
//             notification_analysis_be_picked_email: '1',
//             notification_analysis_be_liked_email: '1',
//             allow_recommend: '1',
//             allow_invited_comment: '1',
//             website: '',
//             first_name: '波',
//             last_name: '胡',
//             company: '',
//             street: '',
//             zip_code: '',
//             username_last_modified: '',
//             nickname_last_modified: '',
//             analysis_market_counts: {
//               FOREX: 3
//             },
//             analysis_symbol_counts: {
//               'CAD/JPY': 1,
//               'EUR/NZD': 1,
//               'USD/CAD': 1
//             },
//             analysis_market_symbol_counts: {
//               FOREX: {
//                 'USD/CAD': 1
//               }
//             },
//             top_tags: [],
//             created_at_formatted: '31/08/20 20:09:31'
//           },
//           replies: []
//         }
//       ],
//       post_strategy_direction: 'short',
//       post_strategy_status: 0
//     },
//     {
//       id: 4639,
//       title: 'EURCHF BUY LIMIT 1:3.97RR',
//       content: '<p>BUY LIMIT 1.07291</p>\n<p>SL 1.07063</p>\n<p>TP 1.08197</p>',
//       view_count: 30,
//       like_count: 0,
//       comment_count: 0,
//       share_count: 0,
//       favourite_count: 1,
//       liked: false,
//       favourited: false,
//       picked: false,
//       hotpicked: true,
//       picked_reason: 'Excellent idea!',
//       created_at: '2020-09-17 02:55:21',
//       updated_at: '2020-11-03 06:10:05',
//       symbols: [
//         'EUR/CHF'
//       ],
//       symbol_id: 11,
//       tags: [
//         'EUR/CHF'
//       ],
//       strategies: [
//         {
//           id: 3354,
//           post_id: 4639,
//           symbol_id: 11,
//           direction: 'long',
//           entry: '1.07291',
//           stop_lost: '1.07063',
//           take_profit: '1.08197',
//           risk_return: '3.97368',
//           created_at: '2020-09-17 02:55:21',
//           updated_at: '2020-09-17 02:55:21',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '1.07439'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4639/raw.jpg',
//       analysis_snapshot_code: 'analysis_8f8ba603f1c920445216235c6f9971fe_04639',
//       customized_data: '{"currOhlcv":1.07353,"currSell":1.07356,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[1131,0]},"realtime":{"config":{},"range":[1131,0]},"candlestickAxis":{"config":{},"range":[1131,0]},"volume-0":{"config":{},"range":[1131,0]},"line-0":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"ext":false,"arrow":0},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":344,"y1":1.1480208426724139,"x2":35,"y2":1.0552041070402298},"range":[1131,0]},"long-0":{"config":{"color":"0,0,0,1","stop":"177,207,143","target":"239,165,156","x3":-23,"x2":-1,"y2":1.0729068914539124,"y1":1.0819718747430371,"y4":1.0706333140003317,"y5":1.07354},"range":[1131,0]}},"product":{"id":"11","desc_zh":"欧元/瑞士法郎","desc_en":"Euro/Swiss Franc","decimal_place":5,"symbol":"EUR/CHF","spread_precision":0.0001,"platform_time":[["mon_fri","00:00-24:00"]],"category":"Forex"},"theme":"white","resolution":"D1","domain":{"latestU":1600290000,"latestI":0,"earliestI":75,"numPerTick":5,"extent":500},"buy":1.07353,"sell":1.07356,"k":10,"timezone":"Australia/Sydney*36000"}}',
//       post_language: 'en',
//       slug: null,
//       title_url: 'EURCHF-BUY-LIMIT-1397RR',
//       time_type: 'D1',
//       posts_directions: 'long',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 1657,
//         name: 'mark.tsang1@gmail.com',
//         username: 'marktsang8738',
//         email: 'mark.tsang1@gmail.com',
//         phone: null,
//         last_login: '2020-09-29 05:00:14',
//         created_at: '2020-03-22 23:42:20',
//         updated_at: '2020-11-03 06:10:08',
//         deleted_at: null,
//         last_logout: '2020-09-28 23:20:17',
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 69960,
//         register_method: 'Email',
//         user_labels: [],
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 56,
//         analysis_like_count: 88,
//         follower_count: 27,
//         analysis_view_count: '1477',
//         nick_name: 'Mark Tsang',
//         country: 'Australia',
//         city: '',
//         avatar: '/v1/resource/avatar/1657/raw.jpg?313698831',
//         background: '/v1/resource/background/1657/raw.jpg',
//         intro: 'acysecurities.com\nwhatsapp: +61412330538\nwebchat: a0412330538\nemail: mark.tsang@acy.com',
//         state: '',
//         language: 'en',
//         ui_language: 'en',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: 'Mark',
//         last_name: 'Tsang',
//         company: '',
//         street: '',
//         zip_code: '',
//         username_last_modified: '',
//         nickname_last_modified: '',
//         analysis_market_counts: {
//           COMMODITY: 9,
//           CRYPTO: 2,
//           FOREX: 29,
//           INDICE: 14
//         },
//         analysis_symbol_counts: {
//           'AUD/CAD': 1,
//           'AUD/NZD': 5,
//           'AUD/USD': 5,
//           'EUR/CAD': 1,
//           'EUR/CHF': 4,
//           'EUR/GBP': 3,
//           'GBP/JPY': 1,
//           'GBP/USD': 2,
//           'NZD/USD': 1,
//           'USD/CAD': 3,
//           'USD/CHF': 2,
//           'USD/JPY': 1,
//           'XAG/USD': 3,
//           'XAU/USD': 4,
//           WTI: 2,
//           NAS100: 1,
//           DJ30: 2,
//           SP500: 2,
//           GER30: 2,
//           'BTC/USD': 2,
//           AUS200: 4,
//           HK50: 2,
//           UK100: 1
//         },
//         analysis_market_symbol_counts: {
//           COMMODITY: {
//             'XAG/USD': 3,
//             'XAU/USD': 4,
//             WTI: 2
//           },
//           CRYPTO: {
//             'BTC/USD': 2
//           },
//           FOREX: {
//             'AUD/NZD': 5,
//             'AUD/USD': 5,
//             'GBP/JPY': 1,
//             'GBP/USD': 2,
//             'NZD/USD': 1,
//             'USD/CAD': 3,
//             'USD/CHF': 2,
//             'USD/JPY': 1
//           },
//           INDICE: {
//             NAS100: 1,
//             DJ30: 2,
//             SP500: 2,
//             AUS200: 4
//           }
//         },
//         top_tags: [
//           {
//             name: 'long',
//             user_count: 31
//           },
//           {
//             name: 'D1',
//             user_count: 24
//           },
//           {
//             name: 'H1',
//             user_count: 17
//           }
//         ],
//         created_at_formatted: '23/03/20 10:42:20',
//         following: false
//       },
//       comments: [],
//       post_strategy_direction: 'long',
//       post_strategy_status: 0
//     },
//     {
//       id: 4638,
//       title: 'HK50 RR2.26 POTENTIAL 930 PROFIT BUY LIMIT',
//       content: '<p>HK50</p>\n<p>BUY LIMIT 24511.4</p>\n<p>SL 24084.4</p>\n<p>TP 25474.5</p>',
//       view_count: 46,
//       like_count: 1,
//       comment_count: 0,
//       share_count: 0,
//       favourite_count: 1,
//       liked: false,
//       favourited: false,
//       picked: true,
//       hotpicked: false,
//       picked_reason: 'Sensible trade',
//       created_at: '2020-09-14 23:10:21',
//       updated_at: '2020-11-03 06:10:08',
//       symbols: [
//         'HK50',
//         null
//       ],
//       symbol_id: 74,
//       tags: [
//         'HK50'
//       ],
//       strategies: [
//         {
//           id: 3353,
//           post_id: 4638,
//           symbol_id: 74,
//           direction: 'long',
//           entry: '24511.4',
//           stop_lost: '24084.4',
//           take_profit: '25474.5',
//           risk_return: '2.3',
//           created_at: '2020-09-14 23:10:21',
//           updated_at: '2020-09-14 23:10:21',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '24542.68000'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4638/raw.jpg',
//       analysis_snapshot_code: 'analysis_3ac8966bc42f3dd1f16b6b0159c0b51f_04638',
//       customized_data: '{"currOhlcv":24542.68,"currSell":24542.45,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[1131,0]},"realtime":{"config":{},"range":[1131,0]},"candlestickAxis":{"config":{},"range":[1131,0]},"volume-0":{"config":{},"range":[1131,0]},"hLine-0":{"config":{"color":"220,40,40,1","extend":false,"thickness":1,"dash":0,"text":true,"x":57,"y":24155.54142683466},"range":[1131,0]},"long-0":{"config":{"color":"0,0,0,1","stop":"177,207,143","target":"239,165,156","x3":-38,"x2":-1,"y2":24511.390356984968,"y1":25474.54008642794,"y4":24084.438593943414,"y5":24542.68},"range":[1131,0]}},"product":{"id":"74","desc_zh":"香港恒生指数","desc_en":"Hong Kong Hang Seng","decimal_place":1,"symbol":"HK50","spread_precision":1,"platform_time":[["mon_fri","04:15-06:55 08:00-11:25 12:15-18:40"]],"category":"Indices"},"theme":"white","resolution":"D1","domain":{"latestU":1600030800,"latestI":0,"earliestI":148,"numPerTick":10,"extent":500},"buy":24542.68,"sell":24542.45,"k":11,"timezone":"Australia/Sydney*36000"}}',
//       post_language: 'en',
//       slug: null,
//       title_url: 'HK50-RR226-POTENTIAL-930-PROFIT-BUY-LIMIT',
//       time_type: 'D1',
//       posts_directions: 'long',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 1657,
//         name: 'mark.tsang1@gmail.com',
//         username: 'marktsang8738',
//         email: 'mark.tsang1@gmail.com',
//         phone: null,
//         last_login: '2020-09-29 05:00:14',
//         created_at: '2020-03-22 23:42:20',
//         updated_at: '2020-11-03 06:10:08',
//         deleted_at: null,
//         last_logout: '2020-09-28 23:20:17',
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 69960,
//         register_method: 'Email',
//         user_labels: [],
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 56,
//         analysis_like_count: 88,
//         follower_count: 27,
//         analysis_view_count: '1477',
//         nick_name: 'Mark Tsang',
//         country: 'Australia',
//         city: '',
//         avatar: '/v1/resource/avatar/1657/raw.jpg?313698831',
//         background: '/v1/resource/background/1657/raw.jpg',
//         intro: 'acysecurities.com\nwhatsapp: +61412330538\nwebchat: a0412330538\nemail: mark.tsang@acy.com',
//         state: '',
//         language: 'en',
//         ui_language: 'en',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: 'Mark',
//         last_name: 'Tsang',
//         company: '',
//         street: '',
//         zip_code: '',
//         username_last_modified: '',
//         nickname_last_modified: '',
//         analysis_market_counts: {
//           COMMODITY: 9,
//           CRYPTO: 2,
//           FOREX: 29,
//           INDICE: 14
//         },
//         analysis_symbol_counts: {
//           'AUD/CAD': 1,
//           'AUD/NZD': 5,
//           'AUD/USD': 5,
//           'EUR/CAD': 1,
//           'EUR/CHF': 4,
//           'EUR/GBP': 3,
//           'GBP/JPY': 1,
//           'GBP/USD': 2,
//           'NZD/USD': 1,
//           'USD/CAD': 3,
//           'USD/CHF': 2,
//           'USD/JPY': 1,
//           'XAG/USD': 3,
//           'XAU/USD': 4,
//           WTI: 2,
//           NAS100: 1,
//           DJ30: 2,
//           SP500: 2,
//           GER30: 2,
//           'BTC/USD': 2,
//           AUS200: 4,
//           HK50: 2,
//           UK100: 1
//         },
//         analysis_market_symbol_counts: {
//           COMMODITY: {
//             'XAG/USD': 3,
//             'XAU/USD': 4,
//             WTI: 2
//           },
//           CRYPTO: {
//             'BTC/USD': 2
//           },
//           FOREX: {
//             'AUD/NZD': 5,
//             'AUD/USD': 5,
//             'GBP/JPY': 1,
//             'GBP/USD': 2,
//             'NZD/USD': 1,
//             'USD/CAD': 3,
//             'USD/CHF': 2,
//             'USD/JPY': 1
//           },
//           INDICE: {
//             NAS100: 1,
//             DJ30: 2,
//             SP500: 2,
//             AUS200: 4
//           }
//         },
//         top_tags: [
//           {
//             name: 'long',
//             user_count: 31
//           },
//           {
//             name: 'D1',
//             user_count: 24
//           },
//           {
//             name: 'H1',
//             user_count: 17
//           }
//         ],
//         created_at_formatted: '23/03/20 10:42:20',
//         following: false
//       },
//       comments: [],
//       post_strategy_direction: 'long',
//       post_strategy_status: 0
//     },
//     {
//       id: 4636,
//       title: 'DJ30 SELL LIMIT RR2.13 530$ Potential Profit',
//       content: '<p>Entry 27985.21</p>\n<p>SL 28233.48</p>\n<p>Tp 27456.41</p>',
//       view_count: 12,
//       like_count: 1,
//       comment_count: 0,
//       share_count: 0,
//       favourite_count: 1,
//       liked: false,
//       favourited: false,
//       picked: false,
//       hotpicked: true,
//       picked_reason: 'Smart trade',
//       created_at: '2020-09-11 05:38:51',
//       updated_at: '2020-11-03 06:10:05',
//       symbols: [
//         'DJ30',
//         'NAS100'
//       ],
//       symbol_id: 51,
//       tags: [
//         'DJ30'
//       ],
//       strategies: [
//         {
//           id: 3352,
//           post_id: 4636,
//           symbol_id: 51,
//           direction: 'short',
//           entry: '27985.21',
//           stop_lost: '28233.48',
//           take_profit: '27456.41',
//           risk_return: '2.13',
//           created_at: '2020-09-11 05:38:52',
//           updated_at: '2020-09-11 05:38:52',
//           deleted_at: null,
//           open_at: null,
//           closed_at: null,
//           closed_key: null,
//           closed_pip: 0,
//           status: 0,
//           publish_price: '27568.28000'
//         }
//       ],
//       analysis_snapshot: '/v1/resource/analysis/4636/raw.jpg',
//       analysis_snapshot_code: 'analysis_66b2e76467f5a7af96ef3dbf373b873c_04636',
//       customized_data: '{"currOhlcv":27749.78,"currSell":27755.88,"chartData":{"serieData":{"guidewire":{"config":{},"range":""},"background":{"config":{},"range":""},"backgroundColor":{"config":{},"range":""},"candleStick":{"config":{},"range":[1131,0]},"realtime":{"config":{},"range":[1131,0]},"candlestickAxis":{"config":{},"range":[1131,0]},"volume-0":{"config":{},"range":[1131,0]},"hLine-0":{"config":{"color":"220,40,40,1","extend":false,"thickness":1,"dash":0,"text":true,"x":219,"y":27488.03927173132},"range":[1131,0]},"line-0":{"config":{"color":"220,40,40,1","left":{"ext":false,"arrow":0},"right":{"ext":false,"arrow":0},"angle":true,"text":"0,0,0,1","thickness":1,"dash":0,"price":true,"bar":true,"x1":108,"y1":28611.731633275307,"x2":-72,"y2":27757.66903026912},"range":[1131,0]},"short-0":{"config":{"color":"0,0,0,1","stop":"177,207,143","target":"239,165,156","x3":-127,"x2":-17,"y2":27985.211256617484,"y1":28233.481644681142,"y4":27456.409356617485,"y5":27751.28},"range":[1131,0]}},"product":{"id":"51","desc_zh":"美国道琼斯30指数","desc_en":"Dow Jones 30","decimal_place":2,"symbol":"DJ30","spread_precision":0.1,"platform_time":[["mon_fri","01:05-23:15 23:35-24:00"]],"category":"Indices"},"theme":"white","resolution":"H1","domain":{"latestU":1599800400,"latestI":0,"earliestI":391,"numPerTick":30,"extent":500},"buy":27749.78,"sell":27755.88,"k":17,"timezone":"Australia/Sydney*36000"}}',
//       post_language: 'en',
//       slug: null,
//       title_url: 'DJ30-SELL-LIMIT-RR213-530-Potential-Profit',
//       time_type: 'H1',
//       posts_directions: 'short',
//       approved: 1,
//       livestream: null,
//       creator: {
//         id: 1657,
//         name: 'mark.tsang1@gmail.com',
//         username: 'marktsang8738',
//         email: 'mark.tsang1@gmail.com',
//         phone: null,
//         last_login: '2020-09-29 05:00:14',
//         created_at: '2020-03-22 23:42:20',
//         updated_at: '2020-11-03 06:10:08',
//         deleted_at: null,
//         last_logout: '2020-09-28 23:20:17',
//         login_count: 0,
//         logout_count: 0,
//         online_duration: 69960,
//         register_method: 'Email',
//         user_labels: [],
//         beta_tester: 0,
//         broadcaster_admin: 0,
//         analysis_count: 56,
//         analysis_like_count: 88,
//         follower_count: 27,
//         analysis_view_count: '1477',
//         nick_name: 'Mark Tsang',
//         country: 'Australia',
//         city: '',
//         avatar: '/v1/resource/avatar/1657/raw.jpg?313698831',
//         background: '/v1/resource/background/1657/raw.jpg',
//         intro: 'acysecurities.com\nwhatsapp: +61412330538\nwebchat: a0412330538\nemail: mark.tsang@acy.com',
//         state: '',
//         language: 'en',
//         ui_language: 'en',
//         notification: '1',
//         notification_new_follower_email: '1',
//         notification_followee_new_analysis_email: '1',
//         notification_be_mentioned_in_analysis_comment_email: '1',
//         notification_be_invited_from_new_analysis_email: '1',
//         notification_analysis_strategy_update_email: '1',
//         notification_analysis_has_comment_email: '1',
//         notification_analysis_comment_has_reply_email: '1',
//         notification_analysis_be_picked_email: '1',
//         notification_analysis_be_liked_email: '1',
//         allow_recommend: '1',
//         allow_invited_comment: '1',
//         website: '',
//         first_name: 'Mark',
//         last_name: 'Tsang',
//         company: '',
//         street: '',
//         zip_code: '',
//         username_last_modified: '',
//         nickname_last_modified: '',
//         analysis_market_counts: {
//           COMMODITY: 9,
//           CRYPTO: 2,
//           FOREX: 29,
//           INDICE: 14
//         },
//         analysis_symbol_counts: {
//           'AUD/CAD': 1,
//           'AUD/NZD': 5,
//           'AUD/USD': 5,
//           'EUR/CAD': 1,
//           'EUR/CHF': 4,
//           'EUR/GBP': 3,
//           'GBP/JPY': 1,
//           'GBP/USD': 2,
//           'NZD/USD': 1,
//           'USD/CAD': 3,
//           'USD/CHF': 2,
//           'USD/JPY': 1,
//           'XAG/USD': 3,
//           'XAU/USD': 4,
//           WTI: 2,
//           NAS100: 1,
//           DJ30: 2,
//           SP500: 2,
//           GER30: 2,
//           'BTC/USD': 2,
//           AUS200: 4,
//           HK50: 2,
//           UK100: 1
//         },
//         analysis_market_symbol_counts: {
//           COMMODITY: {
//             'XAG/USD': 3,
//             'XAU/USD': 4,
//             WTI: 2
//           },
//           CRYPTO: {
//             'BTC/USD': 2
//           },
//           FOREX: {
//             'AUD/NZD': 5,
//             'AUD/USD': 5,
//             'GBP/JPY': 1,
//             'GBP/USD': 2,
//             'NZD/USD': 1,
//             'USD/CAD': 3,
//             'USD/CHF': 2,
//             'USD/JPY': 1
//           },
//           INDICE: {
//             NAS100: 1,
//             DJ30: 2,
//             SP500: 2,
//             AUS200: 4
//           }
//         },
//         top_tags: [
//           {
//             name: 'long',
//             user_count: 31
//           },
//           {
//             name: 'D1',
//             user_count: 24
//           },
//           {
//             name: 'H1',
//             user_count: 17
//           }
//         ],
//         created_at_formatted: '23/03/20 10:42:20',
//         following: false
//       },
//       comments: [],
//       post_strategy_direction: 'short',
//       post_strategy_status: 0
//     }
//   ],
//   meta: {
//     pagination: {
//       total: 4114,
//       count: 12,
//       per_page: 12,
//       current_page: 1,
//       total_pages: 343,
//       links: {
//         next: 'http://api.finlogix.com/v1/posts?per_page=12&page=2'
//       }
//     }
//   }
// }
const getPostListAPI = () => {
  // return FAKE_POST_LIST_RESPONSE
  return axiosNoAuth.get('/posts?per_page=12&page=1')
    .then((res) => res.data)
}
function* getPostListSaga() {
  try {
    const response = yield call(getPostListAPI)
    localStorage.clear()
    yield put(getPostListSuccess(response))
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
