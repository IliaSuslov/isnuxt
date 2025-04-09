<template>
  <section>
    <h2 class="text-[84px] font-medium mb-[39px]">Articles</h2>
    <div v-if="status === 'pending'" class="flex justify-center items-center min-h-[400px]">
      <div class="w-12 h-12 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin" />
    </div>
    <template v-else>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ArticleCard
          v-for="article in paginatedArticles"
          :key="article.id"
          :article="article"
          @click="handleArticleClick(article)"
        />
      </div>
      <div v-if="error" class="mt-4 text-center text-red-500">
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
          <img src="/icons/arrow.svg" alt="arrow" class="w-4 h-4 rotate-180">
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
          <img src="/icons/arrow.svg" alt="arrow" class="w-4 h-4">
        </VButton>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import type { Article } from '@/types/article'

const {
  data: articles,
  status,
  error,
} = await useFetch<Article[], string | null>(
  'https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts/'
)

const currentPage = ref(1)
const itemsPerPage = 8
const totalPages = computed(() =>
  articles.value ? Math.ceil(articles.value.length / itemsPerPage) : 0
)

const paginatedArticles = computed(() => {
  if (!articles.value) return []
  const start = (currentPage.value - 1) * itemsPerPage
  return articles.value.slice(start, start + itemsPerPage)
})

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
    currentPage.value = Math.min(currentPage.value + 1, totalPages.value)
    goToPage(currentPage.value)
  }
}

const showPreviousPages = () => {
  if (hasPreviousPages.value) {
    startPage.value -= 1
    currentPage.value = Math.max(currentPage.value - 1, 1)
    goToPage(currentPage.value)
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
  if (page > startPage.value + pagesPerGroup - 1) {
    startPage.value = page
  } else if (page < startPage.value) {
    startPage.value = Math.max(page - pagesPerGroup + 1, 1)
  }
}

const handleArticleClick = (article: Article) => {
  navigateTo(`/articles/${article.id}`)
}
</script>
