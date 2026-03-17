<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <div class="header__inner">
        <div class="header__top">
          <span class="header__logo">AL / AI</span>
          <h1 class="header__title">Квиз — AI-инфраструктура Альфа-Лизинга</h1>
        </div>

        <SearchBar v-model="search" />
        <FilterTabs v-model="activeModule" :modules="modules" />
      </div>
    </header>

    <!-- Banner -->
    <div class="app__banner">
      <QuizBanner />
    </div>

    <!-- Content -->
    <main class="app__content">
      <!-- Stats -->
      <p v-if="totalVisible > 0" class="app__stats">
        Найдено
        <strong>{{ totalVisible }}</strong>
        вопрос{{ pluralize(totalVisible) }}
        <template v-if="search.trim()">
          по запросу «<strong>{{ search.trim() }}</strong>»
        </template>
      </p>

      <!-- Modules -->
      <template v-if="totalVisible > 0">
        <ModuleGroup
          v-for="module in filteredModules"
          :key="module.id"
          :module="module"
          :open-cards="openCards"
          :highlight-text="highlightText"
          @toggle="toggleCard"
        />
      </template>

      <!-- Empty state -->
      <div v-else class="app__empty">
        <p class="app__empty-icon">🔍</p>
        <p>По запросу «<strong>{{ search }}</strong>» ничего не найдено</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import FilterTabs from '@/components/FilterTabs.vue'
import QuizBanner from '@/components/QuizBanner.vue'
import ModuleGroup from '@/components/ModuleGroup.vue'
import { useQuizSearch } from '@/composables/useQuizSearch'

const {
  search,
  activeModule,
  modules,
  filteredModules,
  totalVisible,
  highlightText,
  pluralize,
} = useQuizSearch()

const openCards = reactive(new Set<string>())

function toggleCard(moduleId: string, questionNum: number): void {
  const key = `${moduleId}-${questionNum}`
  if (openCards.has(key)) {
    openCards.delete(key)
  } else {
    openCards.add(key)
  }
}
</script>

<style>
/* ── Global reset & tokens ── */
:root {
  --bg: #0d0f14;
  --surface: #161920;
  --surface2: #1e2230;
  --border: #2a2f40;
  --accent: #ff5c35;
  --text: #e8ecf4;
  --text-muted: #7a8299;
  --font-mono: 'JetBrains Mono', monospace;
  --font-sans: 'Manrope', sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
</style>

<style scoped>
/* ── Header ── */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(13, 15, 20, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 16px 24px;
}

.header__inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header__top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__logo {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 13px;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

.header__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
}

/* ── Banner ── */
.app__banner {
  max-width: 900px;
  margin: 20px auto 0;
  padding: 0 24px;
}

/* ── Content ── */
.app__content {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 24px 60px;
}

/* ── Stats ── */
.app__stats {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.app__stats strong {
  color: var(--text);
  font-weight: 600;
}

/* ── Empty ── */
.app__empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
  font-size: 14px;
}

.app__empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.app__empty strong {
  color: var(--text);
}
</style>
