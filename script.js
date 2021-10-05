var input = document.getElementById("item");
input.addEventListener("keyup", function(event) {
    if (event.keycode == 13) {
        event.preventDefault();
        document.getElementById("add").click();
    }
});
function addTodo(string) {
    var table = document.getElementById("todo");
    var row = todo.insertRow();
    var cell1 = row.insertCell(0);
    var data = document.getElementById("item").value;
    cell1.innerHTML = data;
    erase();
}
function erase() {
    document.getElementById("item").value = "";
}
