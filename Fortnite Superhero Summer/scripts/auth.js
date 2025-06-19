// auth.js - общий скрипт для всех страниц

// Функция проверки авторизации (универсальная)
function updateAuthState() {
  const currentUser = localStorage.getItem('currentUser');
  const isAuthenticated = currentUser !== null;
  
  // Обновляем элементы на ЛЮБОЙ странице
  const authElements = document.querySelectorAll('[data-auth-state]');
  
  authElements.forEach(element => {
    const state = element.getAttribute('data-auth-state');
    element.style.display = (state === 'authenticated') === isAuthenticated 
      ? 'block'
      : 'none';
  });
}

// Глобальный выход из системы
document.addEventListener('click', function(e) {
  if (e.target.closest('[data-action="logout"]')) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    updateAuthState();
  }
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
  updateAuthState();
  
  // Синхронизация между вкладками
  window.addEventListener('storage', updateAuthState);
});