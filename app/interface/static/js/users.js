async function apiGetUsers() {
    return new Promise((resolve, reject) => {
        $.post('/api/get', {}, function (data) {
            if (data) {
                resolve(data)
            } else {
                reject('fail')
            }
        }, "json");
    })
}

async function apiAddUser() {

}

async function apiRemoveUser(userId) {
    return userId;
}



async function removeUser(userId) {
    const response = await apiRemoveUser(userId);
    console.log(response);
}

async function addUser() {

}



function renderUserTable(users) {
    let table = createTable('users', 'table table-responsive table-striped');

    let headers = [
        'User Name',
        'User Password',
        'Actions'
    ];

    let action = (values) => {
        let userId = values.shift();

        let removeButton = createButton(
            'btn btn-danger bg-gradient m-1',
            'remove-user',
            `removeUser(${userId})`,
            'Remove User',
            'Remove'
        );

        let editButton = createButton(
            'btn btn-primary bg-gradient m-1',
            'edit-user',
            `editUser(${userId})`,
            'Edit User',
            'Edit'
        );

        let buttons = $(document.createElement('div'))
            .append(editButton)
            .append(removeButton);

        values.push(buttons);
    };

    const options =
    {
        customHeaders: headers,
        customAction: action
    };

    fillTable(table, users, options);

    $('#render-users').html('');
    $('#render-users').append(table);
}

$(async () => {
    const users = await apiGetUsers();
    renderUserTable(users);
});