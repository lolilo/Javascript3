$(document).ready(function(){
    var listSubmitButton = $("#list_form_submit");

    if (listSubmitButton !== null) {
    }

    formSubmitButton.on("click", function(event) {
        event.preventDefault(); // prevent the browser form submission from happening
        $.ajax({
            url: "/",
            method: "POST",
            data: $("form#todo_list_form").serialize(),
        }).done(function(responseData){
            // lists
            var formElement = document.getElementById("todo_list_id");
            formElement.value = '';
            document.getElementById("todo-list").innerHTML = responseData;
            console.log(responseData);
        }).fail(function(){
            console.log('fail!!!');
        });


    var itemSubmitButton = $("#item_form_submit");
    itemSubmitButton.on("click", function(event) {
        event.preventDefault();
        $.ajax({
            url: "/todo_lists/<int:id>",
            method: "POST",
            data: $("form#todo-item-form").serialize(),
        }).done(function(responseData){
            // list to-do items -- will these overlap/be the same as above?
            // var formElement = document.getElementById("todo_list_id");
            // formElement.value = '';
            // document.getElementById("todo-list").innerHTML = responseData;

            console.log(responseData);
            
        }).fail(function(){
            console.log('item ajax failed!!!');
        });
    });




    });

    // var getListsFromServer = function() {
    //     $.ajax({
    //         url: '/todo_lists/poll',
    //         method: "GET"
    //     }).done(function(data){
    //         // reset "Create New List" field to a blank value
    //         var formElement = document.getElementById("todo_list_id");
    //         formElement.value = '';
    //         // update displayed HTML
    //         var toDoList = document.getElementById("todo-list");
    //         var newList = data;
    //         toDoList.innerHTML = newList;
    //         console.log(data);
    //     });
    // };

    // polling the server
    // setInterval(getListsFromServer, 5000);



// select * from todo_lists;
// delete from todo_lists;




});