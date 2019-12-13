const Chats = require('@app/models/chats');
const ChatMembers = require('@app/models/chatMembers');
const Messages = require('@app/models/messages');

const { HTTPError } = require('@app/errors');

async function create(query) {
    if (!query || !query.user_id || !query.chat_name) {
        throw new HTTPError("UserID parameter required.", 400);
    }

    if (query.user_id !== query.logged_user_id) {
        throw new HTTPError("Please supply the user_id as you logged in with.", 401);
    }

    let newChatID = await Chats.insert({
        chat_name: query.chat_name
    });

    if (newChatID <= 0) {
        throw new HTTPError("Failed to create a new chat. Please try again.", 500);
    }

    let result = await ChatMembers.insert({
        chat_member_chat_id: newChatID,
        chat_member_user_id: query.user_id
    });

    if (result != 1) {
        Chats.delete(newChatID);
        throw new HTTPError("Failed to insert the user into the newly created chat. Please try again.", 500);
    }

    return {
        chat_id: newChatID
    };
}

async function join(query) {
    if (!query || !query.user_id || !query.chat_id) {
        throw new HTTPError("UserID and ChatID parameters required.", 400);
    }

    if (query.user_id !== query.logged_user_id) {
        throw new HTTPError("Please supply the user_id as you logged in with.", 401);
    }

    let result = await ChatMembers.insert({
        chat_member_chat_id: query.chat_id,
        chat_member_user_id: query.user_id
    });

    if (result != 1) {
        throw new HTTPError("Failed to insert the user into this chat. Please try again.", 500);
    }

    let users = await ChatMembers.getByChat(query.chat_id);
    let chat = await Chats.getByPrimaryKey(query.chat_id);

    let userArray = [];
    users.forEach(element => userArray.push(element.chat_member_user_id));

    return {
        chat_id: query.chat_id,
        chat_name: chat.chat_name,
        users: userArray
    };
}

async function getMessages(query) {
    if (!query || !query.chat_id || !query.user_id || !query.offset || !query.limit) {
        throw new HTTPError("UserID, ChatID, limit, offset parameters required.", 400);
    }

    if (query.user_id !== query.logged_user_id) {
        throw new HTTPError("Please supply the user_id as you logged in with.", 401);
    }

    let isInChat = await ChatMembers.getByPrimaryKey({
        chat_member_chat_id: query.chat_id,
        chat_member_user_id: query.user_id
    });

    if (typeof isInChat === 'undefined') {
        throw new HTTPError("User is not in the chat, please join it first.", 401);
    }

    let messages = await Messages.getByChat(query.chat_id, query.limit, query.offset);
    let totalCount = await Messages.getCountByChat();

    return {
        results: messages,
        metadata: {
            total: totalCount[0].count
        }
    };
}

async function sendMessage(query) {
    if (!query || !query.message_text || !query.chat_id || !query.user_id) {
        throw new HTTPError("Message parameter required.", 400);
    }

    if (query.user_id !== query.logged_user_id) {
        throw new HTTPError("Please supply the user_id as you logged in with.", 401);
    }

    let isInChat = await ChatMembers.getByPrimaryKey({
        chat_member_chat_id: query.chat_id,
        chat_member_user_id: query.user_id
    });

    if (typeof isInChat === 'undefined') {
        throw new HTTPError("User is not in the chat, please join it first.", 401);
    }

    let newMessageID = await Messages.insert({
        message_datetime: new Date(),
        message_text: query.message_text,
        message_chat_id: query.chat_id,
        message_user_id: query.user_id
    });

    if (newMessageID <= 0) {
        throw new HTTPError("Failed to send message, please try again.", 500);
    }

    return {
        message_id: newMessageID
    };
}

async function leave(query) {
    if (!query || !query.chat_id || !query.user_id) {
        throw new HTTPError("ChatID and UserID parameter required.", 400);
    }

    if (query.user_id !== query.logged_user_id) {
        throw new HTTPError("Please supply the user_id as you logged in with.", 401);
    }

    let result = await ChatMembers.delete({
        chat_member_chat_id: query.chat_id,
        chat_member_user_id: query.user_id
    });

    if (result != 1) {
        throw new HTTPError("Failed to delete the user from this chat. Please try again.", 500);
    }

    if (parseInt(res[0].count) === 0) {
        let chatMessages = await Messages.getByChat(query.chat_id);
        for (message of chatMessages) {
            await Messages.delete(message.message_chat_id);
        }
        await Chats.delete(query.chat_id);

        return {
            message: "Chat left succesfully and destroyed (last remaining member left)"
        }
    }

    return {
        message: "Chat left succesfully"
    }
}

module.exports = {
    create, join, getMessages, sendMessage, leave
}