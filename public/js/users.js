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
