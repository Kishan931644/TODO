const removeTODO = async (id) => {
    try {
        let headerList = {
            authorization: localStorage.getItem("token")
        };

        let response = await fetch(`http://localhost:3000/todo/${id}`, {
            method: "DELETE",
            headers: headerList
        });

        const data = await response.json();

        if (data.code == 200) {
            return true;
        } else {
            console.log(data.msg);
        }
    } catch (e) {
        console.log(e);
    }
    return false;
}
export default removeTODO;