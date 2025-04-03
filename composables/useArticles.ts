import { ref, computed } from 'vue'
import type { Article } from '@/types/article'

export const useArticles = () => {
    const articles = ref<Article[]>([])
    const currentArticle = ref<Article | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const currentPage = useState<number>('currentArticlePage', () => 1)
    const totalPages = ref(1)
    const itemsPerPage = 8

    const fetchArticles = async () => {
        isLoading.value = true
        error.value = null

        try {
            const response = await fetch('https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts/')
            if (!response.ok) {
                throw new Error('Failed to fetch articles')
            }
            const data = await response.json()
            articles.value = data.map((item: any) => ({
                id: item.id,
                title: item.title,
                description: item.preview || '',
                imageUrl: item.image,
                publishedAt: new Date(item.createdAt),
            }))

            totalPages.value = Math.ceil(articles.value.length / itemsPerPage)

            if (currentPage.value > totalPages.value) {
                currentPage.value = totalPages.value
            }
        } catch (e) {
            error.value = 'Failed to fetch articles'
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    const fetchArticleById = async (id: string) => {
        isLoading.value = true
        error.value = null
        currentArticle.value = null

        try {
            const response = await fetch(`https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts/${id}`)
            if (!response.ok) {
                throw new Error('Error')
            }
            const data = await response.json()
            currentArticle.value = {
                id: data.id,
                title: data.title,
                description: data.preview || '',
                imageUrl: data.image,
                publishedAt: new Date(data.createdAt),
            }
        } catch (e) {
            error.value = 'Failed to fetch article'
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    const paginatedArticles = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage
        const end = start + itemsPerPage
        return articles.value.slice(start, end)
    })

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
        }
    }

    return {
        articles: paginatedArticles,
        currentArticle,
        isLoading,
        error,
        currentPage,
        totalPages,
        fetchArticles,
        fetchArticleById,
        goToPage,
    }
} 