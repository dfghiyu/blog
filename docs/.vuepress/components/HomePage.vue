<script setup lang="ts">
type Post = {
  title: string;
  description: string;
  date: string;
  reading: string;
  category: string;
  link: string;
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
    title: "欢迎来到技术笔记",
    description: "从可复现的小问题开始，建立自己的技术记录。",
    date: "2026 年 9 月 9 日",
    reading: "约 1 分钟",
    category: "技术",
    link: "/blog/posts/welcome-technology/",
  },
  {
    title: "欢迎来到学习记录",
    description: "把学习过程拆成可以回看的小段落。",
    date: "2026 年 9 月 9 日",
    reading: "约 1 分钟",
    category: "学习",
    link: "/blog/posts/welcome-learning/",
  },
  {
    title: "欢迎来到生活随笔",
    description: "留下日常里值得回头看的片段。",
    date: "2026 年 9 月 9 日",
    reading: "约 1 分钟",
    category: "生活",
    link: "/blog/posts/welcome-life/",
  },
];

const categories = ["技术", "学习", "生活", "随笔"];
</script>

<template>
  <main class="blog-home">
    <div class="blog-layout">
      <header class="home-profile" aria-label="个人资料">
        <img class="profile-avatar" :src="'/blog/avatar.webp'" alt="BugAwake 的头像" />
        <div class="profile-copy">
          <div class="profile-title">
            <h1>BugAwake</h1>
            <span>韩子阳</span>
          </div>
          <p>记录技术、学习与生活。</p>
        </div>
        <a class="profile-github" href="https://github.com/dfghiyu/blog" target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section class="post-archive" aria-labelledby="archive-title">
        <header class="archive-header">
          <h2 id="archive-title">最新文章</h2>
          <p>留下一些正在发生的事。</p>
        </header>

        <nav class="category-links" aria-label="文章分类">
          <a class="active" href="/blog/posts/">全部</a>
          <a v-for="category in categories" :key="category" href="/blog/category/">{{ category }}</a>
        </nav>

        <div class="post-list">
          <article v-for="post in posts" :key="post.link">
            <a class="post-item" :href="post.link">
              <div class="post-meta">
                <span>{{ post.category }}</span>
                <time>{{ post.date }}</time>
              </div>
              <h3>{{ post.title }}</h3>
              <p>{{ post.description }}</p>
              <span class="post-reading">{{ post.reading }}</span>
            </a>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>
