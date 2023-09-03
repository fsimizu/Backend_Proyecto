class ChatController {

get = async (req, res) => {
    try {
        const { email } = req.session.user
        return res.status(201).render('chat', {email});
    } catch (error) {
        return res.status(500).render('error', {code: 500, msg: "Server error"});
        
    }
  }
}

export const chatController = new ChatController();