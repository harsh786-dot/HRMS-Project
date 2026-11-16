import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatUsers,
  fetchConversations,
  createConversation,
  fetchChatMessages,
  sendChatMessage,
  markMessagesRead,
  deleteChatMessage,
  setCurrentConversation,
} from "../../features/chatSlice/ChatSlice";

import "./Messages.css";

const Messages = () => {
  const dispatch = useDispatch();

  const {
    users,
    conversations,
    messages,
    currentConversationId,
    loading,
    error,
  } = useSelector((state) => state.chat);

  useEffect(() => {
    console.log("Chat Users:", users);
    console.log("Conversations:", conversations);
    console.log("Chat Loading:", loading);
    console.log("Chat Error:", error);
  }, [users, conversations, loading, error]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState("");
  const pollingRef = useRef(false);

  const loggedInUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  console.log("Logged In User:", loggedInUser);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === currentConversationId,
  );

  const currentEmployeeId = activeConversation?.participants?.find(
    (person) => person.email === loggedInUser.email,
  )?.id;

  useEffect(() => {
    dispatch(fetchChatUsers());
    dispatch(fetchConversations());
  }, [dispatch]);
// Automatic message refresh every 4 seconds
useEffect(() => {
  if (!currentConversationId) return;

  const interval = setInterval(async () => {
    if (
      document.visibilityState !== "visible" ||
      pollingRef.current
    ) {
      return;
    }

    pollingRef.current = true;

    try {
      // Mark incoming messages as read
      await dispatch(
        markMessagesRead(currentConversationId)
      );

      // Fetch latest messages
      await dispatch(
        fetchChatMessages(currentConversationId)
      );

      // Update recent conversations and unread count
      await dispatch(fetchConversations());

    } catch (error) {
      console.error("Chat auto-refresh error:", error);
    } finally {
      pollingRef.current = false;
    }
  }, 4000);

  return () => clearInterval(interval);

}, [currentConversationId, dispatch]);
  const openConversation = async (conversation) => {
    setSelectedUser(
      conversation.participants.find(
        (person) => person.email !== loggedInUser.email,
      ),
    );

    dispatch(setCurrentConversation(conversation.id));

    await dispatch(fetchChatMessages(conversation.id));
    await dispatch(markMessagesRead(conversation.id));

    // Fetch updated READ status
    await dispatch(fetchChatMessages(conversation.id));

    dispatch(fetchConversations());
  };

  const startChat = async (user) => {
    try {
      const result = await dispatch(createConversation(user.id)).unwrap();

      const conversation = result.conversation;

      setSelectedUser(user);

      await dispatch(fetchConversations());
      dispatch(setCurrentConversation(conversation.id));
      await dispatch(fetchChatMessages(conversation.id));
      await dispatch(markMessagesRead(conversation.id));
      await dispatch(fetchChatMessages(conversation.id));
    } catch (err) {
      console.error("Unable to start conversation:", err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageText.trim() || !currentConversationId) return;

    try {
      await dispatch(
        sendChatMessage({
          conversation_id: currentConversationId,
          message: messageText.trim(),
        }),
      ).unwrap();

      setMessageText("");
      dispatch(fetchConversations());
    } catch (err) {
      console.error("Message sending failed:", err);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      await dispatch(deleteChatMessage(messageId)).unwrap();
    } catch (err) {
      console.error("Message deletion failed:", err);
    }
  };

  const getOtherParticipant = (conversation) => {
    return conversation.participants.find(
      (person) => person.email !== loggedInUser.email,
    );
  };

  return (
    <div className="messages-page">
      {/* Left Sidebar */}
      <div className="messages-sidebar">
        <div className="messages-heading">
          <h2>Messages</h2>
        </div>

        <div className="chat-section-title">
          <h4>Employees</h4>
        </div>

        <div className="chat-users-list">
          {users.map((user) => (
            <div
              className={`chat-user ${
                selectedUser?.id === user.id ? "selected" : ""
              }`}
              key={user.id}
              onClick={() => startChat(user)}
            >
              <div className="chat-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div className="chat-user-info">
                <h4>{user.name}</h4>
                <p>{user.designation}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-section-title">
          <h4>Recent Conversations</h4>
        </div>

        <div className="chat-users-list">
          {conversations.map((conversation) => {
            const person = getOtherParticipant(conversation);

            if (!person) return null;

            return (
              <div
                className={`chat-user ${
                  currentConversationId === conversation.id ? "selected" : ""
                }`}
                key={conversation.id}
                onClick={() => openConversation(conversation)}
              >
                <div className="chat-avatar">
                  {person.name?.charAt(0).toUpperCase()}
                </div>

                <div className="chat-user-info">
                  <h4>{person.name}</h4>
                  <p>
                    {conversation.last_message?.message ||
                      "Start a conversation"}
                  </p>
                </div>

                {conversation.unread_count > 0 && (
                  <span className="unread-badge">
                    {conversation.unread_count}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="messages-chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <div className="chat-avatar">
                {selectedUser.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{selectedUser.name}</h3>
                <p>{selectedUser.designation}</p>
              </div>
            </div>

            <div className="chat-messages">
              {loading && messages.length === 0 && <p>Loading messages...</p>}

              {messages.map((msg) => {
                const isOwnMessage =
                  Number(msg.sender) === Number(currentEmployeeId);

                console.log("Message Data:", msg);
                return (
                  <div
                    className={`message-row ${
                      isOwnMessage ? "own-message" : "received-message"
                    }`}
                    key={msg.id}
                  >
                    <div className="message-bubble">
                      {!isOwnMessage && <small>{msg.sender_name}</small>}

                      <p>{msg.message}</p>

                      <div className="message-meta">
                        <span>
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>

                        {isOwnMessage && !msg.is_deleted_for_everyone && (
                          <span
                            className={`message-status ${msg.status?.toLowerCase() || "sent"}`}
                            title={msg.status || "SENT"}
                          >
                            {msg.status === "READ"
                              ? "\u2713\u2713"
                              : msg.status === "DELIVERED"
                                ? "\u2713\u2713"
                                : "\u2713"}
                          </span>
                        )}

                        {isOwnMessage && (
                          <button
                            type="button"
                            onClick={() => handleDeleteMessage(msg.id)}
                            title="Delete message"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <form className="chat-input-area" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />

              <button type="submit" disabled={!messageText.trim()}>
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="empty-chat">
            <h2>Welcome to Messages</h2>
            <p>Select an employee to start chatting.</p>
          </div>
        )}
      </div>

      {error && (
        <p className="chat-error">
          {typeof error === "string"
            ? error
            : error.message || error.detail || "Something went wrong"}
        </p>
      )}
    </div>
  );
};

export default Messages;
