<script setup>
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const articleId = route.params.id

const { data: currentArticle, pending: isLoading, error } = useFetch(`https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts/${articleId}`)

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    <article v-else-if="currentArticle" class="article-detail space-y-8">
      <h1 class="text-[84px]">
        {{ currentArticle.title }}
      </h1>

      <div class="aspect-video w-full overflow-hidden rounded-lg">
        <img 
          :src="currentArticle.imageUrl" 
          :alt="currentArticle.title"
          class="w-full h-full object-cover"
        >
      </div>

      <div class="max-w-2xl">
        <p class="text-lg text-gray-700 leading-relaxed">
          {{ currentArticle.description }}
        </p>
        <div class="mt-6 text-sm text-gray-500">
          Published on {{ new Date(currentArticle.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) }}
        </div>
      </div>
      
      <div class="mt-12">
        <button 
          @click="goBack"
          class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
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
  