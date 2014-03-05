$(document).ready(function(){
    var formSubmitButton = $("#form_submit");

    formSubmitButton.on("click", function(event) {
        event.preventDefault(); // prevent the browser form submission from happening
        $.ajax({
            url: "/",
            method: "POST",
            data: $("form#todo_list_form").serialize(),
        }).done(function(responseData){
            // var listElements = document.getElementById('todo-list');
            // listElements.innerHTML = responseData;
            console.log(responseData);
        }).fail(function(){
            console.log('fail!!!');
        });
    });

    var getListsFromServer = function() {
        $.ajax({
            url: '/todo_lists/poll',
            method: "GET"
        }).done(function(data){
            var toDoList = document.getElementById("todo-list");
            var newList = data;
            toDoList.innerHTML = newList;
            console.log(data);
        });
    };

    setInterval(getListsFromServer, 2000);



// select * from todo_lists;
// delete from todo_lists;




});