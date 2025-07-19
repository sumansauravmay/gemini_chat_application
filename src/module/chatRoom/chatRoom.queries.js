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

const getAllChatRoomQuery = "SELECT * FROM chatrooms;";
const getChatRoomByIdQuery = "SELECT * FROM chatrooms WHERE id = $1;";

// message queue

const createMeesagesTable = `
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  chatroom_id INTEGER REFERENCES chatrooms(id),
  sender TEXT, -- 'user' or 'gemini'
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const insertMessageQuery = `
INSERT INTO messages (chatroom_id, sender, content) 
VALUES ($1, $2, $3)
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

  createMeesagesTable,
  insertMessageQuery,
  updateMessageQuery,
  getAllMessagesQuery,
  getMessageByIdQuery,
};
