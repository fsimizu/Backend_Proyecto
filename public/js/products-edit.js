const removeProduct = (prodId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to permanently delete this product',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/products/${prodId}`, {
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
                                location.href = "/products"
                            }
                        })
                        ;
                })
        }
    })
}

const addProductPhoto = (prodId) => {
    const formData = new FormData();
    formData.append('products', document.querySelector('#photo').files[0]);

    fetch(`/api/products/${prodId}/photo`, {
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
        .then(setTimeout(() => { location.reload() }, 1500))
}