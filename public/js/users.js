const removeUser = (userId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to permanently delete this user',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json())
                .then(data => {
                    Swal.fire(
                        data.status,
                        data.msg,
                        'success'
                    )
                        .then((result) => {
                            if (result.isConfirmed) {
                                location.href = "/users"
                            }
                        })
                        ;
                })
        }
    })
}

const editUser = (userId, firstName, lastName, email) => {
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save changes'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/users/${userId}`, {
                method: 'PUT',
                body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json())
                .then(data => {
                    Swal.fire(
                        data.status,
                        data.msg,
                        'Success'
                    )
                        .then((result) => {
                            if (result.isConfirmed) {
                                location.href = "/products"
                            }
                        })
                        ;
                })
        }
    })
}



const uploadProfile = (userId) => {

    const formData = new FormData();
    formData.append('profiles', document.querySelector('#profile').files[0]);

    fetch(`/api/users/${userId}/profiles`, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            Swal.fire(
                {
                    position: 'top-end',
                    icon: 'success',
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000
                }
            )
        })
        .then(setTimeout(()=>{location.reload()}, 1500) )
}


const switchPremium = (userId) => {
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Switch role'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/users/premium/${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json())
                .then(data => {
                    Swal.fire(
                        data.status,
                        data.msg,
                        'Success'
                    )
                        .then((result) => {
                            if (result.isConfirmed) {
                                location.href = `${userId}`
                            }
                        })
                        ;
                })
        }
    })


}

const removeInactiveUsers = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to permanently delete all inactive users',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/users/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json())
                .then(data => {
                    Swal.fire(
                        data.status,
                        data.msg,
                        'Success'
                    )
                        .then((result) => {
                            if (result.isConfirmed) {
                                location.href = `users`
                            }
                        })
                        ;
                })
        }
    })
}