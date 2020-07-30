export default {
    setUserInfo(state,payload){
        state.userInfo.userId=payload.id
        state.userInfo.username=payload.username
        state.userInfo.nickname=payload.nickname
    }
}
