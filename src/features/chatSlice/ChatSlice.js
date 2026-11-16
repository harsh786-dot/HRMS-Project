
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// 1. Fetch employees
export const fetchChatUsers = createAsyncThunk(
  "chat/fetchChatUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("chat/users/");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// 2. Fetch conversations
export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("chat/conversations/");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// 3. Create conversation
export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async (receiver_id, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "chat/conversations/create/",
        { receiver_id }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// 4. Send message
export const sendChatMessage = createAsyncThunk(
  "chat/sendChatMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "chat/messages/send/",
        messageData
      );

      // Backend returns message inside response.data.data
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// 5. Fetch messages
export const fetchChatMessages = createAsyncThunk(
  "chat/fetchChatMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `chat/conversations/${conversationId}/messages/`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// 6. Mark messages as read
export const markMessagesRead = createAsyncThunk(
  "chat/markMessagesRead",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `chat/conversations/${conversationId}/read/`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// 7. Delete message
export const deleteChatMessage = createAsyncThunk(
  "chat/deleteChatMessage",
  async (messageId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `chat/messages/${messageId}/delete/`
      );

      return {
        messageId,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const initialState = {
  users: [],
  conversations: [],
  messages: [],
  currentConversationId: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    setCurrentConversation: (state, action) => {
      if (state.currentConversationId !== action.payload) {
        state.currentConversationId = action.payload;
        state.messages = [];
      }
    },

    clearChatError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch users
      .addCase(fetchChatUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
      })
      .addCase(fetchChatUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch conversations
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations =
          action.payload.conversations || [];
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create conversation
      .addCase(createConversation.fulfilled, (state, action) => {
        const conversation = action.payload.conversation;

        if (conversation) {
          const exists = state.conversations.some(
            (item) => item.id === conversation.id
          );

          if (!exists) {
            state.conversations.unshift(conversation);
          }

          state.currentConversationId = conversation.id;
          state.messages = [];
        }
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Send message
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        const newMessage = action.payload;

        if (
          newMessage &&
          !state.messages.some(
            (message) => message.id === newMessage.id
          )
        ) {
          state.messages.push(newMessage);
        }
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch messages
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading = false;

        state.messages = action.payload.messages || [];
        state.currentConversationId =
          action.payload.conversation_id;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Mark messages as read
      .addCase(markMessagesRead.fulfilled, (state) => {
  // Actual READ status will come from backend
  // through fetchChatMessages API.
})   
      .addCase(markMessagesRead.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete message
      .addCase(deleteChatMessage.fulfilled, (state, action) => {
        const deletedId = action.payload.messageId;

        state.messages = state.messages.map((message) =>
          message.id === deletedId
            ? {
                ...message,
                message: "This message was deleted",
                is_deleted_for_everyone: true,
              }
            : message
        );
      })
      .addCase(deleteChatMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentConversation,
  clearChatError,
} = chatSlice.actions;

export default chatSlice.reducer;
