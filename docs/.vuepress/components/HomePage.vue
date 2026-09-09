<script setup lang="ts">
const posts = [
  {
    date: "2026-09-09",
    category: "随笔",
    title: "从零搭建 VuePress 博客",
    description: "把想法整理成页面，也把一路走过的脚印留下来。",
    link: "/blog/posts/hello-vuepress/",
  },
];

const topics = ["VuePress", "前端", "学习方法", "生活记录"];
</script>

<template>
  <main class="home-shell">
    <section class="hero-panel" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="signal-dot" /> PERSONAL LOG / 01</p>
        <h1 id="hero-title">记录技术、学习<br /><em>与生活。</em></h1>
        <p class="hero-intro">
          你好，我是韩子阳。这里是我的小小工作台，收集正在学习的技术、偶尔冒出的想法，以及生活里值得回看的片段。
        </p>
        <div class="hero-actions">
          <a class="button button-primary" href="/blog/posts/">浏览文章 <span>↗</span></a>
          <a class="button button-quiet" href="/blog/about/">认识我</a>
        </div>
      </div>

      <div class="portrait-card" aria-label="原创银灰发吉他手头像占位">
        <div class="portrait-orbit orbit-one" />
        <div class="portrait-orbit orbit-two" />
        <img :src="'/blog/avatar.svg'" alt="银灰发原创吉他手插画" />
        <span class="portrait-caption">quiet notes / 02</span>
      </div>
    </section>

    <section class="section-block" aria-labelledby="latest-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">LATEST NOTES</p>
          <h2 id="latest-title">最近写了什么</h2>
        </div>
        <a class="text-link" href="/blog/posts/">查看全部 <span>→</span></a>
      </div>

      <div class="post-grid">
        <a v-for="post in posts" :key="post.link" class="post-card" :href="post.link">
          <div class="post-meta"><span>{{ post.category }}</span><time>{{ post.date }}</time></div>
          <h3>{{ post.title }}</h3>
          <p>{{ post.description }}</p>
          <span class="card-arrow">↗</span>
        </a>
        <div class="post-card post-card-muted" aria-label="更多文章即将发布">
          <span class="mini-label">IN THE MAKING</span>
          <p>下一篇文章正在路上，先去翻翻旧笔记吧。</p>
          <span class="card-arrow">✦</span>
        </div>
      </div>
    </section>

    <section class="lower-grid">
      <div class="section-block topic-block">
        <p class="eyebrow">INDEX</p>
        <h2>按主题逛逛</h2>
        <div class="topic-list">
          <a v-for="topic in topics" :key="topic" href="/blog/tag/">#{{ topic }}</a>
        </div>
      </div>
      <div class="quote-card">
        <span class="quote-mark">“</span>
        <p>把复杂的事情讲清楚，把微小的进步记录下来。</p>
        <span class="quote-sign">— 这里的写作原则</span>
      </div>
    </section>
  </main>
</template>
