<script setup lang="ts">
import { computed } from "vue";
import { withBase } from "vuepress/client";
import { posts } from "../generated/posts";

const props = defineProps<{
  category?: string;
  tag?: string;
}>();

const visiblePosts = computed(() =>
  posts.filter((post) => {
    const matchesCategory = !props.category || post.category === props.category;
    const matchesTag = !props.tag || post.tags.includes(props.tag);
    return matchesCategory && matchesTag;
  }),
);
</script>

<template>
  <section class="catalog-block" aria-label="文章列表">
    <div class="catalog-summary">
      <span>{{ visiblePosts.length }} 篇文章</span>
      <span v-if="props.category">分类：{{ props.category }}</span>
      <span v-if="props.tag">标签：{{ props.tag }}</span>
    </div>

    <div v-if="visiblePosts.length" class="catalog-list">
      <article v-for="post in visiblePosts" :key="post.path" class="catalog-card">
        <div class="catalog-meta">
          <span class="catalog-category">{{ post.category }}</span>
          <time :datetime="post.date">{{ post.dateLabel }}</time>
          <span>{{ post.reading }}</span>
        </div>
        <h2><a :href="withBase(post.path)">{{ post.title }}</a></h2>
        <p>{{ post.description }}</p>
        <div v-if="post.tags.length" class="catalog-tags" aria-label="文章标签">
          <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
        </div>
      </article>
    </div>

    <p v-else class="catalog-empty">这里还没有文章，等你写下第一篇。</p>
  </section>
</template>
