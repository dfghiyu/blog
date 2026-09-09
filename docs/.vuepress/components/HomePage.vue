<script setup lang="ts">
type Post = {
  title: string;
  description: string;
  date: string;
  reading: string;
  category: string;
  link?: string;
  draft?: boolean;
};

const posts: Post[] = [
  {
    title: "从零搭建 VuePress 博客",
    description: "把一个想法变成可以持续更新的小站，记录这次搭建过程中的选择、踩坑和一点点心得。",
    date: "2026 年 9 月 9 日",
    reading: "约 2 分钟",
    category: "随笔",
    link: "/blog/posts/hello-vuepress/",
  },
  {
    title: "下一篇记录正在整理",
    description: "技术实践、学习方法和生活里值得回看的片段，会慢慢放在这里。",
    date: "准备中",
    reading: "",
    category: "学习",
    draft: true,
  },
  {
    title: "把问题写成自己的地图",
    description: "从一次次查资料、做实验开始，留下以后还能看懂的线索。",
    date: "准备中",
    reading: "",
    category: "技术",
    draft: true,
  },
];

const categories = ["全部文章", "技术", "学习", "生活", "随笔"];
</script>

<template>
  <main class="quiet-home">
    <div class="quiet-layout">
      <section class="article-column" aria-labelledby="article-column-title">
        <div class="article-column-inner">
          <header class="column-intro">
            <p class="quiet-label">文章</p>
            <h1 id="article-column-title">最近的记录</h1>
            <p>关于技术、学习和生活的随笔。</p>
          </header>

          <details class="article-filter">
            <summary>筛选文章 <span aria-hidden="true">⌄</span></summary>
            <div class="article-filter-menu">
              <a v-for="category in categories" :key="category" href="/blog/posts/">{{ category }}</a>
            </div>
          </details>

          <div class="article-list">
            <template v-for="post in posts" :key="post.title">
              <a v-if="post.link" class="article-row" :href="post.link">
                <span class="article-category">{{ post.category }}</span>
                <div class="article-copy">
                  <h2>{{ post.title }}</h2>
                  <p>{{ post.description }}</p>
                  <time>{{ post.date }}<span aria-hidden="true"> · </span>{{ post.reading }}</time>
                </div>
                <span class="article-arrow" aria-hidden="true">→</span>
              </a>

              <div v-else class="article-row article-row-draft" aria-label="文章筹备中">
                <span class="article-category">{{ post.category }}</span>
                <div class="article-copy">
                  <h2>{{ post.title }}</h2>
                  <p>{{ post.description }}</p>
                  <time>{{ post.date }}</time>
                </div>
                <span class="article-status">筹备中</span>
              </div>
            </template>
          </div>

          <p class="article-end">先写到这里，之后慢慢更新。</p>
        </div>
      </section>

      <aside class="profile-rail" aria-label="个人资料">
        <div class="profile-rail-inner">
          <div class="profile-heading">
            <img :src="'/blog/avatar.webp'" alt="银灰发动漫头像" />
            <div>
              <h2>BugAwake</h2>
              <p>韩子阳</p>
            </div>
          </div>

          <p class="profile-intro">
            记录技术、学习与生活。把遇到的问题写下来，也留下以后愿意重新读一遍的东西。
          </p>

          <nav class="profile-nav" aria-label="站点导航">
            <a href="/blog/posts/">文章</a>
            <a href="/blog/about/">关于</a>
            <a href="/blog/tag/">标签</a>
          </nav>

          <div class="profile-bottom">
            <a href="https://github.com/dfghiyu/blog" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <p>保持好奇，慢慢积累。</p>
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>
