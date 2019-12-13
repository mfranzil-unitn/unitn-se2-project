const Chats = require('@app/models/chats');
const ChatMembers = require('@app/models/chatMembers');
const Messages = require('@app/models/messages');
const crypto = require('crypto');

async function create(query) {
    if (!query || !query.user_id || !query.chat_name) {
        throw Error("UserID parameter required.");
    }

    if (query.user_id !== query.logged_user_id) {
        throw Error("Please supply the user_id as you logged in with.");
    }

    let newChatID = await Chats.insert({
        chat_name: query.chat_name
    });

    if (newChatID <= 0) {
        throw Error("Failed to create a new chat. Please try again.");
    }

    let result = await ChatMembers.insert({
        chat_member_chat_id: newChatID,
        chat_member_user_id: query.user_id
    });

    if (result != 1) {
        Chats.delete(newChatID);
        throw Error("Failed to insert the user into the newly created chat. Please try again.");
    }

    return {
        chat_id: newChatID
    };
}

async function join(query) {
    if (!query || !query.user_id || !query.chat_id) {
        throw Error("UserID and ChatID parameters required.");
    }

    if (query.user_id !== query.logged_user_id) {
        throw Error("Please supply the user_id as you logged in with.");
    }

    let result = await ChatMembers.insert({
        chat_member_chat_id: query.chat_id,
        chat_member_user_id: query.user_id
    });

    if (result != 1) {
        throw Error("Failed to insert the user into this chat. Please try again.");
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
    if (!query || !query.chat_id || !query.user_id || !query.count) {
        throw Error("UserID, ChatID, count parameters required.");
    }

    if (query.user_id !== query.logged_user_id) {
        throw Error("Please supply the user_id as you logged in with.");
    }

    let isInChat = await ChatMembers.getByPrimaryKey({
        chat_member_chat_id: query.chat_id,
        chat_member_user_id: query.user_id
    });

    if (typeof isInChat === 'undefined') {
        throw Error("User is not in the chat, please join it first.");
    }

    let messages = await Messages.getByChat(query.chat_id, query.count, 0);
    let totalCount = await Messages.getCount();

    return {
        results: messages,
        metadata: {
            total: totalCount[0].count
        }
    };
}

async function sendMessage(query) {
    if (!query || !query.message_text || !query.message_chat_id || !query.message_user_id) {
        throw Error("Message parameter required.");
    }

    if (query.message_user_id !== query.logged_user_id) {
        throw Error("Please supply the user_id as you logged in with.");
    }

    let isInChat = await ChatMembers.getByPrimaryKey({
        chat_member_chat_id: query.message_chat_id,
        chat_member_user_id: query.message_user_id
    });

    if (typeof isInChat === 'undefined') {
        throw Error("User is not in the chat, please join it first.");
    }

    let newMessageID = await Messages.insert({
        message_datetime: new Date(),
        message_text: query.message_text,
        message_chat_id: query.message_chat_id,
        message_user_id: query.message_user_id
    });

    if (newMessageID <= 0) {
        throw Error("Failed to send message, please try again.");
    }

    return {
        message_id: newMessageID
    };
}

async function leave(query) {
    if (!query || !query.chat_id || !query.user_id) {
        throw Error("ChatID and UserID parameter required.");
    }

    if (query.user_id !== query.logged_user_id) {
        throw Error("Please supply the user_id as you logged in with.");
    }

    let result = await ChatMembers.delete({
        chat_member_chat_id: query.chat_id,
        chat_member_user_id: query.user_id
    });

    if (result != 1) {
        throw Error("Failed to delete the user from this chat. Please try again.");
    }

    if (parseInt(res[0].count) === 0) {
        let chatMessages = await Messages.getByChat(query.chat_id);
        for (message of chatMessages) {
            await Messages.delete(message.message_chat_id);
        }
        await Chats.delete(query.chat_id);

        return 2; // 2 === Utente rimosso e chat rimossa per assenza di persone;
    }

    return 1; // 1 === Utente rimosso
}

module.exports = {
    create, join, getMessages, sendMessage, leave
}