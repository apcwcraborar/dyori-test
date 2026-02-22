<template>
  <div id="app">
    <header class="app-header">
      <h1>My Portfolio</h1>
    </header>

    <Profile v-if="profileId" />
    <Comments v-if="profileId" :profile-id="profileId" />

    <footer class="app-footer">
      <p>&copy; 2026. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Profile from './components/Profile.vue';
import Comments from './components/Comments.vue';
import { profileAPI } from './services/api';

const profileId = ref('');

onMounted(async () => {
  try {
    const response = await profileAPI.getProfile();
    profileId.value = response.data.id;
  } catch (error) {
    console.error('Failed to load profile:', error);
  }
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  color: #333;
  font-size: 32px;
}

.app-footer {
  background: white;
  padding: 20px;
  text-align: center;
  color: #999;
  margin-top: auto;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 600px) {
  .app-header h1 {
    font-size: 24px;
  }
}
</style>