export default class UserDTO {
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