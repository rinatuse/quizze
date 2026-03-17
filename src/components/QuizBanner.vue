<template>
  <div class="banner">
    <span class="banner__icon">⚠️</span>
    <p class="banner__text">
      <strong>Модуль T10 отсутствует.</strong>
      В текущей версии квиза представлены модули T1–T9.
    </p>
  </div>
</template>

<style scoped>
.banner {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #2a1810 0%, #1e1508 100%);
  border: 1px solid #5a3020;
  border-radius: 10px;
}

.banner__icon {
  font-size: 18px;
  flex-shrink: 0;
  line-height: 1.4;
}

.banner__text {
  font-size: 13px;
  line-height: 1.6;
  color: #e8ecf4;
}

.banner__text strong {
  color: #ff9a20;
  font-weight: 700;
}
</style>
