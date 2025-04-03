<template>
  <article class="group cursor-pointer">
    <div class="relative overflow-hidden mb-4">
      <img
        :src="article.imageUrl"
        :alt="article.title"
        class="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ article.title }}</h3>
    <p class="text-sm text-gray-600">{{ article.description }}</p>
  </article>
</template>

<script setup lang="ts">
interface Article {
  id: string
  title: string
  description: string
  imageUrl: string
}

defineProps<{
  article: Article
}>()
</script>
