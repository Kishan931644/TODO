const addTODO = async (todo) => {
    try {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token")
        }

        let bodyContent = JSON.stringify({
            title: todo
        });

        let response = await fetch("http://localhost:3000/addTodo", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        const data = await response.json();

        if (data.code == 201) {
            return { "title": data.todo.title, "id": data.todo._id }

        } else {
            console.log(data.msg);
        }
    } catch (e) {
        console.log(e);
    }
}
export default addTODO;