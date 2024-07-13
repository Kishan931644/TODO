const getTODO = async () => {
    try {
        let headerList = {
            authorization: localStorage.getItem("token")
        };
        let response = await fetch("http://localhost:3000/todo", {
            method: "GET",
            headers: headerList
        });

        const data = await response.json();

        if (data.code == 201) {
            const todos = data.msg;
            return todos;
        } else {
            console.log(data.msg);
        }
    } catch (e) {
        console.log(e);
    }
}

export default getTODO;