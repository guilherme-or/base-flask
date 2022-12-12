// API CALLS
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

async function apiGetUser(userId) {
    return new Promise((resolve, reject) => {
        $.post(`/api/get/${userId}`, {}, function (data) {
            if (data) {
                resolve(data)
            } else {
                reject('fail')
            }
        }, "json");
    })
}

async function apiAddUser(name, password) {
    return new Promise((resolve, reject) => {
        $.post(`/api/add`, { name, password }, function (data) {
            if (data) {
                resolve(data)
            } else {
                reject('fail')
            }
        }, "json");
    })
}

async function apiEditUser(id, new_name, new_password) {
    return new Promise((resolve, reject) => {
        $.post(`/api/update`, { id, new_name, new_password }, function (data) {
            if (data) {
                resolve(data)
            } else {
                reject('fail')
            }
        }, "json");
    })
}

async function apiRemoveUser(userId) {
    return new Promise((resolve, reject) => {
        $.post(`/api/delete/${userId}`, {}, function (data) {
            if (data) {
                resolve(data)
            } else {
                reject('fail')
            }
        }, "json");
    })
}

// CALLABLE ASYNC FUNCTIONS
async function editUser(userId) {
    $('#modal-user-title').html('Edit User');

    $('#add-user').addClass('d-none');    
    $('#save-user').removeClass('d-none');    
    
    const userInfo = await apiGetUser(userId);

    $('#form-user').data('user-id', userInfo.id);
    $('#user-name').val(userInfo.name);
    $('#user-password').val(userInfo.password);

    $('#modal-user').modal('show');
}

async function removeUser(userId) {
    const response = await apiRemoveUser(userId);

    console.log("Response: " + response);

    renderUserTable(await apiGetUsers());
}

// CALLABLE FUNCTIONS
function renderUserTable(users) {
    let table = createTable('users', 'table table-responsive table-striped');

    let headers = [
        'User Name',
        'User Password',
        'Actions'
    ];

    let action = (values) => {
        let userId = values.shift();

        let editButton = createButton(
            'btn btn-primary bg-gradient m-1 edit-user',
            '',
            `editUser(${userId})`,
            'Edit User',
            'Edit'
        );

        let removeButton = createButton(
            'btn btn-danger bg-gradient m-1 remove-user',
            '',
            `removeUser(${userId})`,
            'Remove User',
            'Remove'
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

$('#open-add-user').click(() => {
    $('#modal-user-title').html('New User');

    $('#save-user').addClass('d-none');    
    $('#add-user').removeClass('d-none');    

    $('#user-name').val('');
    $('#user-password').val('');

    $('#modal-user').modal('show');
});

$('#add-user').click(async () => {
    let name = $('#user-name').val();
    let password = $('#user-password').val();

    if (name == '' || password == '') {
        alert('Complete all fields before adding an user!');
        return false;
    }

    const response = await apiAddUser(name, password);

    console.log(response);
    
    $('#modal-user').modal('hide');

    renderUserTable(await apiGetUsers());

    return true;
});

$('#save-user').click(async () => {
    let id = $('#form-user').data('user-id');
    let name = $('#user-name').val();
    let password = $('#user-password').val();

    const response = await apiEditUser(id, name, password);

    console.log(response);

    $('#modal-user').modal('hide');

    renderUserTable(await apiGetUsers());
});

$(async () => {
    const users = await apiGetUsers();
    renderUserTable(users);
});