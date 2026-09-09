<script setup lang="ts">
import { computed, ref } from "vue";
import { withBase } from "vuepress/client";
import { posts, tags } from "../generated/posts";

const selectedTag = ref<string | null>(null);
const visiblePosts = computed(() =>
  selectedTag.value ? posts.filter((post) => post.tags.includes(selectedTag.value as string)) : posts,
);
</script>

<template>
  <section class="tag-index" aria-label="标签筛选">
    <div class="tag-filter" role="group" aria-label="选择标签">
      <button
        type="button"
        :class="{ active: selectedTag === null }"
        :aria-pressed="selectedTag === null"
        @click="selectedTag = null"
      >
        全部
      </button>
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        :class="{ active: selectedTag === tag }"
        :aria-pressed="selectedTag === tag"
        @click="selectedTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <div class="tag-results" aria-live="polite">
      <p class="tag-results-summary">
        {{ selectedTag ? `“${selectedTag}” 下有 ${visiblePosts.length} 篇文章` : `共有 ${visiblePosts.length} 篇文章` }}
      </p>
      <ul v-if="visiblePosts.length" class="tag-results-list">
        <li v-for="post in visiblePosts" :key="post.path">
          <a :href="withBase(post.path)">{{ post.title }}</a>
          <span>{{ post.category }} · {{ post.dateLabel }}</span>
        </li>
      </ul>
      <p v-else class="catalog-empty">这个标签下暂时还没有文章。</p>
    </div>
  </section>
</template>
