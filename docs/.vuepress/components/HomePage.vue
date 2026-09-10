<script setup lang="ts">
import { computed, ref } from "vue";
import { withBase } from "vuepress/client";
import { categories, posts } from "../generated/posts";

const selectedCategory = ref("全部");
const categoryOptions = ["全部", ...categories];
const visiblePosts = computed(() =>
  selectedCategory.value === "全部"
    ? posts
    : posts.filter((post) => post.category === selectedCategory.value),
);
</script>

<template>
  <main class="blog-home">
    <div class="blog-layout">
      <header class="home-profile" aria-label="个人资料">
        <img
          class="profile-avatar"
          :src="withBase('/avatar.webp')"
          alt="BugAwake 的头像"
          width="68"
          height="68"
          decoding="async"
        />
        <div class="profile-copy">
          <div class="profile-title">
            <h1>BugAwake</h1>
            <span>韩子阳</span>
          </div>
          <p>记录技术、学习与生活。</p>
        </div>
        <a class="profile-github" href="https://github.com/dfghiyu/blog" target="_blank" rel="noopener noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section class="post-archive" aria-labelledby="archive-title">
        <header class="archive-header">
          <h2 id="archive-title">文章列表</h2>
          <p>按时间从早到晚，记录一路走过的事。</p>
        </header>

        <nav class="category-links" aria-label="文章分类筛选">
          <button
            v-for="category in categoryOptions"
            :key="category"
            type="button"
            :class="{ active: selectedCategory === category }"
            :aria-pressed="selectedCategory === category"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </nav>

        <div v-if="visiblePosts.length" class="post-list" aria-live="polite">
          <article v-for="post in visiblePosts" :key="post.path">
            <a class="post-item" :href="withBase(post.path)">
              <div class="post-meta">
                <span>{{ post.category }}</span>
                <time :datetime="post.date">{{ post.dateLabel }}</time>
              </div>
              <h3>{{ post.title }}</h3>
              <p>{{ post.description }}</p>
              <span class="post-reading">{{ post.reading }}</span>
            </a>
          </article>
        </div>
        <p v-else class="filter-empty">这个分类下暂时还没有文章。</p>
      </section>
    </div>
  </main>
</template>
