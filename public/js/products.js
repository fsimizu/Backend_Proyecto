// let cartId = localStorage.getItem('cartId')

const myCart = (cartId) => {
    window.location.href = `/carts/${cartId}`
}

// if (!localStorage.getItem('cartId')) {
//     fetch('/api/carts', {
//         method: 'POST',
//         headers: {
//                    'Content-Type': 'application/json'
//         },
//     })
//     .then(response => response.json())
//     .then(data => {
//         cartId = data.payload._id;
//         localStorage.setItem('cartId', cartId);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
//     }


const addProductToCart = (prodId, cartId) => {
    fetch(`api/carts/${cartId}/product/${prodId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    .then(() => {
        Swal.fire({
            title: 'The product has been added to the cart',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Checkout',
            cancelButtonText: `Continue shopping`,
          })
          .then((result) => {
            if (result.isConfirmed) {
                                
                window.location.href = `/carts/${cartId}`

            }})
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const removeFromCart = (prodId, cartId) => {
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove!'
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/carts/${cartId}/product/${prodId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            })
            .then(response => response.json())
            .then(data => {
                Swal.fire(
                    data.status,
                    data.msg,
                    'success'
                    );
                location.reload();
            })
        }
      })
}

const updateQuery = (key, value) => {
    let newUri = window.location.href;
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = window.location.href.indexOf('?') !== -1 ? "&" : "?";
    newUri = clearQuery(newUri, "page");
    if (newUri.match(re)) {
        return newUri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return newUri + separator + key + "=" + value;
    }}


const clearQuery = (uri, key) => {
    const separator = window.location.href.indexOf('?') !== -1 ? "&" : "?";
    const re = new RegExp("([?])" + key + "=.*?(&|$)", "i");
    const re2 = new RegExp("([&])" + key + "=.*?(&|$)", "i");
    if (uri.match(re)) {
        return uri.replace(re, '?');
    }
    if (uri.match(re2)) {
        return uri.replace(re2, '');
    }
    else return uri
}
    
if (window.location.href.includes('/products')) {

    const categories = document.getElementById("category_selection");
    categories.addEventListener("change",
        function (e, key, value) {
            e.preventDefault();

            if (categories.value === "all") {
                window.location.href = clearQuery(window.location.href, "category")
            } else {
                window.location.href = updateQuery("category", categories.value);
            }
        })

    const sortBy = document.getElementById("sortBy");
    sortBy.addEventListener("change",
        function (e, key, value) {
            e.preventDefault();
            window.location.href = updateQuery("sort", sortBy.value);
        })

    const available = document.getElementById("availability_selection");
    available.addEventListener("change",
        function (e, key, value) {
            e.preventDefault();
            if (available.value === "true") {
                window.location.href = updateQuery("available", available.value);
            }
            else {
                window.location.href = clearQuery(window.location.href, "available")
            }
        });
}

function buyNow(cartId) {
    
    Swal.fire({
    title: 'Are you sure?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: `Don't save`,
    })
    .then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your order has been submitted',
                showConfirmButton: false,
                timer: 1500
            })

            fetch(`/api/carts/${cartId}/purchase`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })

            // .then(response => response.json())
            // .then(data => {console.log(data)});// {status: 'success', msg: 'Order completed', productsOutOfStock: true, payload: {…}}

            // .then(response => response.json())
            // .then(data => {      
            //     if (data.productsOutOfStock) {
            //         Swal.fire(
                // 'The Internet?',
                // 'That thing is still around?',
                // 'question'
            //             );
            //     }
            // })

              
              setTimeout( () => window.location.href = '/products'
              , 1500 );
        }
    })
}
