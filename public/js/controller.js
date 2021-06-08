get_todos()

function get_todos() {
  var request = new XMLHttpRequest();
  var requestURL = '/get_todos'
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var todos = request.response;
    printTodos(todos);
  }
}

function printTodos(todos) {
  var tablePending = document.getElementById("pending_table")
  var tableComplete = document.getElementById("completed_table")

  for (var i in todos) {
    const task = todos[i]
    const todo_id = task.id
    const todo = task.text
    let row = document.createElement("tr")
    row.innerHTML = `<td>${todo} 
                      <nav class='buttons'>
                        <button class='edit-button'>Editar</button>
                        <button class='delete-button'>Borrar</button>
                        <button class='detail-button'>Detalle</button>
                      </nav>
                    </td>`;
    row.addEventListener("click", event => {
      if(event.target.className == 'edit-button'){
        editTask(todo_id)
      }else if(event.target.className == 'delete-button'){
        deleteTask(todo_id)
      }else if(event.target.className == 'detail-button'){
        detailView(task) 
      }else{
        changeStateTask(task)
      }
    });   

    if(todos[i].complete === 0){
      tablePending.append(row)
    }else{
      tableComplete.append(row)
    }
  }
}

function editTask(todo_id) {
  let nuevoTexto = prompt("¿Por qué desea editar la tarea?");
  if(nuevoTexto){
    var form = document.getElementById("edit_todo_form")
    form.action = form.action + todo_id + `/${nuevoTexto}`;
    form.submit()
  }

}

function changeStateTask(todo) {
  var form = document.getElementById("complete_todo_form")
  form.action = form.action + todo.id + `/${todo.complete}`;
  form.submit()
}

function deleteTask(todo_id){
  var form = document.getElementById("delete_todo_form")
  form.action = form.action + todo_id;
  form.submit()
}

function deletePending(){
  var form = document.getElementById("delete_all_todo_form")
  form.submit()
}
function detailView(task){
  detail_view.innerHTML = `<span id="close_button" class="close" onclick="closeDetail()">x</span><p>Nombre de la tarea: ${task.text}</p><p>Creada el: ${task.createdat}</p>`;
  detail_view.style.display = "block";
}
function closeDetail(){   
  detail_view.style.display = "none";
}