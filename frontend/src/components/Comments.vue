<template>
  <div class="comments-section">
    <h2>Comments & Messages</h2>

    <CommentForm :profile-id="profileId" @comment-added="addComment" />

    <div class="comments-list">
      <div v-if="comments.length === 0" class="no-comments">
        No comments yet. Be the first to comment!
      </div>

      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <strong>{{ comment.author_name }}</strong>
          <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
        </div>
        <p class="comment-message">{{ comment.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { profileAPI } from '../services/api';
import CommentForm from './CommentForm.vue';

const props = defineProps<{
  profileId: string;
}>();

const comments = ref<any[]>([]);

onMounted(async () => {
  await loadComments();
});

const loadComments = async () => {
  try {
    const response = await profileAPI.getComments();
    comments.value = response.data;
  } catch (error) {
    console.error('Failed to load comments:', error);
  }
};

const addComment = (newComment: any) => {
  comments.value.unshift(newComment);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
</script>

<style scoped>
.comments-section {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
}

.comments-section h2 {
  margin-top: 0;
  color: #333;
  font-size: 24px;
}

.comments-list {
  margin-top: 30px;
}

.no-comments {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-style: italic;
}

.comment-item {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  border-left: 4px solid #667eea;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.comment-header strong {
  color: #333;
  font-size: 15px;
}

.comment-date {
  color: #999;
  font-size: 12px;
}

.comment-message {
  margin: 10px 0;
  color: #555;
  line-height: 1.5;
}

.delete-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-btn:hover {
  background: #ee5a52;
}

@media (max-width: 600px) {
  .comments-section {
    padding: 10px;
  }

  .comment-item {
    padding: 15px;
  }

  .comment-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .comment-date {
    margin-top: 5px;
  }
}
</style>