<script setup lang="ts">
const posts = [
  {
    title: "从零搭建 VuePress 博客",
    description: "把一个想法变成可以持续更新的小站，记录这次搭建过程中的选择、踩坑和一点点心得。",
    date: "2026 年 9 月 9 日",
    reading: "约 2 分钟",
    category: "随笔",
    link: "/blog/posts/hello-vuepress/",
  },
];

const categories = ["技术", "学习", "生活", "随笔"];
</script>

<template>
  <main class="blog-home">
    <div class="blog-layout">
      <aside class="blog-profile" aria-label="个人资料">
        <div class="profile-sticky">
          <img class="profile-avatar" :src="'/blog/avatar.webp'" alt="BugAwake 的头像" />
          <h1>BugAwake</h1>
          <p class="profile-name">韩子阳</p>
          <p class="profile-bio">记录技术、学习与生活。</p>

          <nav class="profile-links" aria-label="站内导航">
            <a href="/blog/posts/">全部文章</a>
            <a href="/blog/category/">分类</a>
            <a href="/blog/tag/">标签</a>
            <a href="/blog/about/">关于</a>
          </nav>

          <a class="profile-github" href="https://github.com/dfghiyu/blog" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </aside>

      <section class="post-archive" aria-labelledby="archive-title">
        <header class="archive-header">
          <p>文章</p>
          <h2 id="archive-title">最近更新</h2>
          <span>把值得留下的东西写下来。</span>
        </header>

        <nav class="category-links" aria-label="文章分类">
          <a class="active" href="/blog/posts/">全部</a>
          <a v-for="category in categories" :key="category" href="/blog/category/">{{ category }}</a>
        </nav>

        <div class="post-list">
          <article v-for="post in posts" :key="post.title">
            <a class="post-item" :href="post.link">
              <div class="post-meta">
                <span>{{ post.category }}</span>
                <time>{{ post.date }}</time>
              </div>
              <h3>{{ post.title }}</h3>
              <p>{{ post.description }}</p>
              <span class="post-reading">{{ post.reading }} <b aria-hidden="true">→</b></span>
            </a>
          </article>
        </div>

        <p class="archive-empty">更多文章会在这里慢慢积累。</p>
      </section>
    </div>
  </main>
</template>
