const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');
const userAuth = document.getElementById('auth');
const userUnAuth = document.getElementById('unAuth');

passwordToggle.addEventListener('click', function() {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    document.getElementById("passwordIcon").src = "https://upload.wikimedia.org/wikipedia/commons/3/32/Simple_Icon_Eye.svg";
  } 
  else {
    passwordInput.type = 'password';
    document.getElementById("passwordIcon").src = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Eye_close_font_awesome.svg";
  }

});


function updateAuthState() {
  const currentUser = localStorage.getItem('currentUser');
    
  if (currentUser) {
    try {
      const user = JSON.parse(currentUser);
      showAuthMessage(`Вы вошли как ${user.userName || user.email}`, 'info');
      userUnAuth.style.display = 'block';
      userAuth.style.display = 'none';
    } 

    catch (e) {
      console.error('Ошибка при чтении данных пользователя:', e);
      userAuth.style.display = 'block';
      userUnAuth.style.display = 'none';
    }
  }

  else {
    userAuth.style.display = 'block';
    userUnAuth.style.display = 'none';
  }

}

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const savedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  
  if (savedUsers.length === 0) {
    showAuthMessage('Нет зарегистрированных пользователей! Для начала зарегестрируйтесь.', 'error');

    setTimeout(() => {
      window.location.href = 'signup.html';
    }, 2500);
    return;
  }
  
  let foundUser = null;
  
  for (const userArray of savedUsers) {
    let userID = '';
    let userEmail = '';
    let userPassword = '';
    let userName = '';
    
  for (const item of userArray) {
    if (item.key === "ID") userID = item.value;
    if (item.key === "email") userEmail = item.value;
    if (item.key === "password") userPassword = item.value;
    if (item.key === "userName") userName = item.value;
  }
    
  if (userEmail === email) {
      if (userPassword === password) {
        foundUser = {
          authMessage: "Successful Auth",
          ID: userID,
          email: userEmail,
          userName: userName,
          authTimestamp: new Date().toISOString()
        };
        break;
      } 

      else {
        showAuthMessage('Неверный пароль!', 'error');
        return;
      }
    }
  }
  
  if (foundUser) {
    localStorage.setItem('currentUser', JSON.stringify({
      authMessage: "Successful Auth",
      ID: foundUser.ID,
      email: foundUser.email,
      userName: foundUser.userName,
      authTimestamp: new Date().toISOString()
    }));
    
    console.info("Успешный вход. Данные пользователя:", foundUser);
    showAuthMessage(`Вход выполнен успешно! Добро пожаловать, ${foundUser.userName}.`, 'success');
    
    setTimeout(() => {
      window.location.href = 'summer_advent.html';
    }, 2500);

  } 
  
  else {
    showAuthMessage('Пользователь с таким email не найден!', 'error');
  }

});

document.getElementById('unAuth').addEventListener('click', function() {
  localStorage.removeItem('currentUser');
    
  updateAuthState();
    
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
    
  console.info(`Успешний выход: ${new Date().toISOString()}` );
  showAuthMessage('Вы успешно вышли из системы.', 'success');

});

document.addEventListener('DOMContentLoaded', function() {
  updateAuthState();

});

function showAuthMessage(message, type) {
  const messageElement = document.getElementById('authMessage');
  messageElement.textContent = message;
  messageElement.className = `auth-message ${type}`;
  messageElement.style.display = 'block';
    
  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 5000);

}