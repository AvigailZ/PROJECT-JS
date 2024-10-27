const login = () => {

    fetch("./authorized.json")
        .then((res) => res.json())
        .then((res) => check(res))
        .catch((err) => console.log(err))



}
const check = (res) => {
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    const index = res.findIndex((item) =>
        item.name == name && item.password == password
    )
    if (index != -1) {
        window.location.href="./play.html"

    }
    else {
        alert("You are not allow to come in, 😒 Sorry...")
    }
}
