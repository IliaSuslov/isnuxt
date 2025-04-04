<template>
  <section>
    <h2 class="text-[84px] font-medium mb-[39px]">Articles</h2>
    <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
          @click="handleArticleClick(article)"
        />
      </div>
      <div v-if="error" class="text-red-500 text-center mt-4">
        {{ error }}
      </div>
      <div class="flex mt-8 mb-[140px] gap-2">
        <VButton
          v-if="hasPreviousPages"
          variant="pagination"
          class="bg-white"
          size="sm"
          @click="showPreviousPages"
        >
          <img src="/icons/arrow.svg" alt="arrow" class="w-4 h-4 rotate-180" />
        </VButton>
        <VButton
          v-for="page in visiblePages"
          :key="page"
          variant="pagination"
          size="sm"
          :active="currentPage === page"
          @click="goToPage(page)"
        >
          {{ page }}
        </VButton>
        <VButton
          v-if="hasNextPages"
          variant="pagination"
          class="bg-white"
          size="sm"
          @click="showNextPages"
        >
          <img src="/icons/arrow.svg" alt="arrow" class="w-4 h-4" />
        </VButton>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import type { Article } from '@/types/article'

const { articles, isLoading, error, currentPage, totalPages, fetchArticles, goToPage } =
  useArticles()
const pagesPerGroup = 5
const startPage = ref(1)

const visiblePages = computed(() => {
  const pages = []
  for (let i = startPage.value; i < startPage.value + pagesPerGroup && i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

const hasNextPages = computed(() => {
  return startPage.value + pagesPerGroup <= totalPages.value
})

const hasPreviousPages = computed(() => {
  return startPage.value > 1
})

const showNextPages = () => {
  if (hasNextPages.value) {
    startPage.value += 1
    currentPage.value += 1
    goToPage(currentPage.value)
  }
}

const showPreviousPages = () => {
  if (hasPreviousPages.value) {
    currentPage.value -= 1
    startPage.value -= 1
    goToPage(currentPage.value)
  }
}

const handleArticleClick = (article: Article) => {
  navigateTo(`/articles/${article.id}`)
}

onMounted(() => {
  fetchArticles()
})

watch(totalPages, () => {
  startPage.value = 1
})
</script>
