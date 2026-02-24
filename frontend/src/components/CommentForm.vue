<template>
  <form @submit.prevent="submitComment" class="comment-form">
    <h3>Leave a Comment</h3>

    <div v-if="error" class="error-message">{{ error }}</div>

    <div class="form-group">
      <input
        v-model="formData.author_name"
        type="text"
        placeholder="Your Name"
        required
      />
    </div>

    <div class="form-group">
      <input
        v-model="formData.author_email"
        type="email"
        placeholder="Your Email"
        required
      />
    </div>

    <div class="form-group">
      <textarea
        v-model="formData.message"
        placeholder="Your Message"
        rows="4"
        required
      ></textarea>
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Submitting...' : 'Post Comment' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { profileAPI } from '../services/api';

const props = defineProps<{
  profileId: string;
}>();

const emit = defineEmits<{
  'comment-added': [comment: any];
}>();

const formData = ref({
  author_name: '',
  author_email: '',
  message: '',
});

const loading = ref(false);
const error = ref('');

const submitComment = async () => {
  error.value = '';
  loading.value = true;

  try {
    console.log('Sending comment data:', formData.value);
    const response = await profileAPI.createComment(formData.value);
    console.log('Comment response:', response);

    emit('comment-added', response.data[0]);
    formData.value = { author_name: '', author_email: '', message: '' };
  } catch (err: any) {
    console.error('Comment error:', err.response?.data || err.message);
    error.value = 'Failed to post comment. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.comment-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 30px;
}

.comment-form h3 {
  margin-top: 0;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

button {
  background: #667eea;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

button:hover:not(:disabled) {
  background: #5568d3;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  background: #ffe0e0;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
}

@media (max-width: 600px) {
  .comment-form {
    padding: 15px;
  }
}
</style>