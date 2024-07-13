const checkLogin = () => {
    if (localStorage.getItem("token") !== null) {
        return true;
    }
    return false;
}
export default checkLogin;