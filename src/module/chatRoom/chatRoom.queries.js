const createChatRoomTable = `
CREATE TABLE chatrooms (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const insertChatRoomQuery = `
INSERT INTO chatrooms (user_id, title)  
VALUES ($1, $2)
RETURNING *;
`;

const updateChatRoomQuery = `UPDATE chatrooms
SET  user_id =$2, title = $3
WHERE id = $1
RETURNING *;
`;

const getAllChatRoomQuery = "SELECT * FROM chatrooms WHERE user_id = $1;";
const getChatRoomByIdQuery = "SELECT * FROM chatrooms WHERE id = $1;";

// message queue

const createMessagesTable = `
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  chatroom_id INTEGER NOT NULL REFERENCES chatrooms(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'gemini')),
  sender_user_id INTEGER REFERENCES users(id), -- Nullable for Gemini
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;


const insertMessageQuery = `
INSERT INTO messages (chatroom_id, sender, sender_user_id, content) 
VALUES ($1, $2, $3, $4)
RETURNING *;
`;


const updateMessageQuery = `UPDATE messages
SET chatroom_id = $2, sender = $3, content = $4
WHERE id = $1
RETURNING *;
`;

const getAllMessagesQuery = "SELECT * FROM messages;";
const getMessageByIdQuery = "SELECT * FROM messages WHERE id = $1;";

module.exports = {
  createChatRoomTable,
  insertChatRoomQuery,
  updateChatRoomQuery,
  getAllChatRoomQuery,
  getChatRoomByIdQuery,

  createMessagesTable,
  insertMessageQuery,
  updateMessageQuery,
  getAllMessagesQuery,
  getMessageByIdQuery,
};
