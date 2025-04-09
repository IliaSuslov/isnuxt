<script setup lang="ts">
import type { Article } from '@/types/article'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const articleId = route.params.id

const {
  data: article,
  status,
  error,
} = await useFetch<Article, string | null>(`https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts/${articleId}`)

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="max-w-5xl px-4 py-12 mx-auto">
    <div v-if="status === 'pending'" class="flex justify-center items-center min-h-[400px]">
      <div class="w-12 h-12 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin" />
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <article v-else-if="article" class="space-y-8 article-detail">
      <h1 class="text-[84px]">
        {{ article.title }}
      </h1>

      <div class="w-full overflow-hidden rounded-lg aspect-video">
        <img
          :src="article.imageUrl"
          :alt="article.title"
          class="object-cover w-full h-full"
        >
      </div>

      <div class="max-w-2xl">
        <p class="text-lg leading-relaxed text-gray-700">
          {{ article.description }}
        </p>
        <div class="mt-6 text-sm text-gray-500">
          Published on
          {{
            new Date(article.publishedAt as Date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </div>
      </div>

      <div class="mt-12">
        <button
          class="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
          @click="goBack"
        >
          <span class="mr-2">←</span>
          Back to articles
        </button>
      </div>
    </article>
  </div>
</template>

<style scoped>
.article-detail {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
