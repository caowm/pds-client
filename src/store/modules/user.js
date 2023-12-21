import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  user: null,
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ identifier: username.trim(), password: password }).then(response => {
        const { jwt, user } = response
        // roles must be a non-empty array
        if (!user.role) {
          reject('角色沒有配置!')
        }

        commit('SET_TOKEN', jwt)
        setToken(jwt)
        commit('SET_USER', user)

        resolve()
      }).catch(error => {
        console.log('login error', error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      // const { data } = response
      // console.log('getInfo', data)
      // if (!data) {
      //   reject('Verification failed, please Login again.')
      // }

      // const { roles, name, avatar, introduction } = data
      //
      // // roles must be a non-empty array
      // if (!roles || roles.length <= 0) {
      //   reject('getInfo: roles must be a non-null array!')
      // }
      //
      // commit('SET_ROLES', roles)
      // commit('SET_NAME', name)
      // commit('SET_AVATAR', avatar)
      // // commit('SET_INTRODUCTION', introduction)
      // resolve(data)
      if (state.user) {
        commit('SET_ROLES', [state.user.role.name])
        commit('SET_NAME', state.user.username)
        commit('SET_AVATAR', state.user.avatar ? process.env.VUE_APP_BASE_API + state.user.avatar.url : '')
        commit('SET_INTRODUCTION', state.user.role.description)
        resolve({ roles: state.roles, name: state.name, avatar: state.avatar })
      } else {
        reject('请登录')
      }
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_USER', null)
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
