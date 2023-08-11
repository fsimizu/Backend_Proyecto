class ChatController {

get = async (_, res) => {
    try {
        return res.status(201).render('chat', {});
    } catch (error) {
        return res.status(500).render('error', {code: 500, msg: "Server error"});
        
    }
  }
}

export const chatController = new ChatController();