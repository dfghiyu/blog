<script setup lang="ts">
type Post = {
  index: string;
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
    index: "01",
    title: "从零搭建 VuePress 博客",
    description: "把一个想法变成可以持续更新的小站，记录这次搭建过程中的选择、踩坑和一点点心得。",
    date: "2026/09/09",
    reading: "约 2 分钟",
    category: "随笔",
    link: "/blog/posts/hello-vuepress/",
  },
  {
    index: "02",
    title: "下一篇记录正在整理",
    description: "技术实践、学习方法和生活里值得回看的片段，会慢慢放在这里。",
    date: "Soon",
    reading: "准备中",
    category: "学习",
    draft: true,
  },
  {
    index: "03",
    title: "把问题写成自己的地图",
    description: "从一次次查资料、做实验开始，留下以后还能看懂的线索。",
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
    <header class="archive-header">
      <div>
        <p class="archive-kicker"><span class="kicker-mark" /> PERSONAL ARCHIVE / 2026</p>
        <h1>把问题写清楚，<br /><em>把生活留下来。</em></h1>
      </div>
      <div class="archive-header-note">
        <span class="note-label">BUGAWAKE / NOTES</span>
        <p>技术、学习与生活的<br />低频记录。</p>
      </div>
    </header>

    <div class="archive-layout">
      <section class="archive-panel" aria-labelledby="archive-title">
        <div class="archive-toolbar">
          <div>
            <p class="section-kicker">LATEST NOTES</p>
            <h2 id="archive-title">最近记录</h2>
          </div>
          <details class="category-menu">
            <summary>全部分类 <span aria-hidden="true">⌄</span></summary>
            <div class="category-dropdown">
              <a href="/blog/posts/">全部文章</a>
              <a v-for="category in categories" :key="category" href="/blog/category/">{{ category }}</a>
            </div>
          </details>
        </div>

        <div class="article-list" aria-label="文章列表">
          <template v-for="post in posts" :key="post.index">
            <a v-if="post.link" class="article-row article-row-featured" :href="post.link">
              <div class="article-index">{{ post.index }}</div>
              <div class="article-main">
                <div class="article-heading">
                  <span class="article-category">{{ post.category }}</span>
                  <span class="article-arrow" aria-hidden="true">↗</span>
                </div>
                <h3>{{ post.title }}</h3>
                <p>{{ post.description }}</p>
                <div class="article-meta">
                  <time>{{ post.date }}</time>
                  <span>{{ post.reading }}</span>
                  <span>BugAwake</span>
                </div>
              </div>
            </a>

            <div v-else class="article-row article-row-draft" aria-label="文章筹备中">
              <div class="article-index">{{ post.index }}</div>
              <div class="article-main">
                <div class="article-heading">
                  <span class="article-category">{{ post.category }}</span>
                  <span class="draft-label">筹备中</span>
                </div>
                <h3>{{ post.title }}</h3>
                <p>{{ post.description }}</p>
                <div class="article-meta">
                  <time>{{ post.date }}</time>
                  <span>{{ post.reading }}</span>
                  <span>BugAwake</span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <footer class="archive-footer">
          <span><strong>01</strong> 篇公开文章</span>
          <a href="/blog/posts/">进入文章目录 <span aria-hidden="true">→</span></a>
        </footer>
      </section>

      <aside class="profile-rail">
        <section class="profile-card">
          <div class="profile-card-topline"><span class="status-dot" /> PROFILE / BUGAWAKE</div>
          <div class="avatar-frame">
            <img :src="'/blog/avatar.webp'" alt="银灰发动漫头像" />
            <span class="avatar-stamp">静音模式</span>
          </div>
          <div class="profile-copy">
            <p class="profile-eyebrow">韩子阳，网名</p>
            <h2>BugAwake</h2>
            <p>一个记录技术、学习与生活的个人小站。</p>
            <a class="profile-link" href="/blog/about/">认识这个站点 <span aria-hidden="true">↗</span></a>
          </div>
          <div class="profile-links">
            <a href="https://github.com/dfghiyu/blog" target="_blank" rel="noreferrer">GitHub</a>
            <a href="/blog/tag/">标签</a>
          </div>
        </section>

        <section class="stats-card" aria-label="博客统计">
          <div class="card-label"><span>▦</span> 小站数据</div>
          <div class="stats-grid">
            <div><strong>01</strong><span>文章</span></div>
            <div><strong>04</strong><span>分类</span></div>
            <div><strong>04</strong><span>标签</span></div>
            <div><strong>01</strong><span>时间轴</span></div>
          </div>
        </section>

        <section class="now-card">
          <p class="card-label">NOW / 正在关注</p>
          <div class="tag-cloud">
            <a v-for="tag in tags" :key="tag" href="/blog/tag/">{{ tag }}</a>
          </div>
          <p>慢慢积累，持续更新。</p>
        </section>
      </aside>
    </div>
  </main>
</template>
