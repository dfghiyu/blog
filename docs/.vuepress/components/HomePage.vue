<script setup lang="ts">
type Post = {
  index: string;
  title: string;
  description: string;
  author: string;
  date: string;
  reading: string;
  category: string;
  link?: string;
  draft?: boolean;
};

const posts: Post[] = [
  {
    index: "01",
    title: "从零搭建 VuePress 博客",
    description: "把一个想法变成可以持续更新的小站，记录这次搭建过程中的选择、踩坑和一点点心得。",
    author: "BugAwake",
    date: "2026/09/09",
    reading: "约 2 分钟",
    category: "随笔",
    link: "/blog/posts/hello-vuepress/",
  },
  {
    index: "02",
    title: "下一篇记录正在整理",
    description: "技术实践、学习方法和生活里值得回看的片段，会慢慢放在这里。",
    author: "BugAwake",
    date: "Soon",
    reading: "准备中",
    category: "学习",
    draft: true,
  },
  {
    index: "03",
    title: "把问题写成自己的地图",
    description: "从一次次查资料、做实验开始，留下以后还能看懂的线索。",
    author: "BugAwake",
    date: "Soon",
    reading: "准备中",
    category: "技术",
    draft: true,
  },
];

const categories = ["技术", "学习", "生活", "随笔"];
const tags = ["VuePress", "前端", "学习方法", "生活记录"];
</script>

<template>
  <main class="blog-home">
    <div class="blog-grid">
      <section class="feed-panel" aria-labelledby="feed-title">
        <header class="feed-header">
          <div>
            <p class="section-kicker">BUGAWAKE / NOTES</p>
            <h1 id="feed-title">博文</h1>
            <p class="feed-intro">把解决问题的过程，写成以后还能看懂的记录。</p>
          </div>

          <details class="category-menu">
            <summary>全部分类 <span aria-hidden="true">⌄</span></summary>
            <div class="category-dropdown">
              <a href="/blog/posts/">全部文章</a>
              <a v-for="category in categories" :key="category" href="/blog/category/">{{ category }}</a>
            </div>
          </details>
        </header>

        <div class="post-list" aria-label="文章列表">
          <template v-for="post in posts" :key="post.index">
            <a v-if="post.link" class="article-row" :href="post.link">
              <span class="article-index">{{ post.index }}</span>
              <div class="article-content">
                <div class="article-title-line">
                  <h2>{{ post.title }}</h2>
                  <span class="article-arrow" aria-hidden="true">↗</span>
                </div>
                <p>{{ post.description }}</p>
                <div class="article-meta">
                  <span>● {{ post.author }}</span>
                  <time>{{ post.date }}</time>
                  <span>◷ {{ post.reading }}</span>
                  <span class="meta-category">▦ {{ post.category }}</span>
                </div>
              </div>
            </a>

            <div v-else class="article-row article-row-draft" aria-label="文章筹备中">
              <span class="article-index">{{ post.index }}</span>
              <div class="article-content">
                <div class="article-title-line">
                  <h2>{{ post.title }}</h2>
                  <span class="draft-label">筹备中</span>
                </div>
                <p>{{ post.description }}</p>
                <div class="article-meta">
                  <span>● {{ post.author }}</span>
                  <time>{{ post.date }}</time>
                  <span>◷ {{ post.reading }}</span>
                  <span class="meta-category">▦ {{ post.category }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <footer class="feed-footer">
          <span>目前公开 {{ posts.filter((post) => !post.draft).length }} 篇文章</span>
          <a href="/blog/posts/">查看全部文章 <span aria-hidden="true">→</span></a>
        </footer>
      </section>

      <aside class="profile-column">
        <section class="profile-card">
          <div class="profile-topline"><span class="status-dot" /> ONLINE / QUIET MODE</div>
          <div class="avatar-frame">
            <img :src="'/blog/avatar.svg'" alt="原创银灰发像素风头像" />
          </div>
          <h2>BugAwake</h2>
          <p class="profile-subtitle">韩子阳的博客</p>
          <p class="profile-bio">记录技术、学习与生活。保持清醒，也保持好奇。</p>
          <a class="profile-link" href="/blog/about/">查看关于 <span aria-hidden="true">↗</span></a>
          <div class="profile-links">
            <a href="https://github.com/dfghiyu/blog" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
            <a href="/blog/tag/" aria-label="标签">#</a>
            <a href="/blog/posts/" aria-label="文章">▤</a>
          </div>
        </section>

        <section class="stats-card" aria-label="博客统计">
          <div class="stats-heading"><span class="blue-mark">▦</span> 小站数据</div>
          <div class="stats-grid">
            <div><strong>1</strong><span>文章</span></div>
            <div><strong>4</strong><span>分类</span></div>
            <div><strong>4</strong><span>标签</span></div>
            <div><strong>1</strong><span>时间轴</span></div>
          </div>
        </section>

        <section class="side-card">
          <p class="side-card-label">正在关注</p>
          <div class="tag-cloud">
            <a v-for="tag in tags" :key="tag" href="/blog/tag/">{{ tag }}</a>
          </div>
          <p class="side-note">新的文章和想法，会从这里慢慢长出来。</p>
        </section>
      </aside>
    </div>
  </main>
</template>
