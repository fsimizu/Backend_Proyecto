export class UserDTO {
    constructor(session) {
        this.cookie = session.cookie;
        this.user = {
            _id: session.user?._id,
            firstName: session.user?.firstName,
            email: session.user?.email,
            isAdmin: session.user?.isAdmin,
            cart: session.user?.cart,
        }
    }
}

export class GetUsersDTO {
    constructor(users) {
        this.users = users.map((user) => {
            return {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                lastConnection: user.lastConnection,
                cart: user.cart,
                role: user.role,
            };
        });
    }
}