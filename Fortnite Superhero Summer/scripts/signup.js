const authMessage = document.getElementById('authMessage');
document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const region = document.getElementById('region-select').value;
  const firstName = document.getElementById('firstName').value;
  const secondName = document.getElementById('secondName').value;
  const userName = document.getElementById('userName').value;
  const email = document.getElementById('email').value;
  const confrimEmail = document.getElementById('confirmEmail').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if(email !== confrimEmail) {
    showAuthMessage('Адрес электронной почты не совпадает!', 'error');
    return;
  }

  if(password !== confirmPassword) {
    showAuthMessage('Пароли не совпадают!', 'error');
    return;
  }

  const errors = [];

   if (password.length < 5) {
    errors.push("пароль должен содержать не менее 5 символов");
  }
            
  if (!/[a-zA-Z]/.test(password)) {
    errors.push("пароль должен содержать хотя бы одну букву");
  }
            
  if (!/\d/.test(password)) {
    errors.push("пароль должен содержать хотя бы одну цифру");
  }
            
  if (/\s/.test(password)) {
    errors.push("пароль не должен содержать пробелов");
  }
            
  if (errors.length > 0) {
    showAuthMessage("Ошибки в пароле: " + errors.join(", "), 'error');
    return;
  }

 
  const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

  const emailExists = existingUsers.some(userArray => 
    userArray.some(item => item.key === "email" && item.value === email)
  );

  if (emailExists) {
    showAuthMessage('Пользователь с таким email уже зарегистрирован!', 'error');
    return;
  }

  const usernameExists = existingUsers.some(userArray => 
    userArray.some(item => item.key === "userName" && item.value === userName)
  );

  if (usernameExists) {
    showAuthMessage('Это имя пользователя уже занято!', 'error');
    return;
  }

  const newUser = [
    { key: "registrationMessage", value: "Successful registration" },
    { key: "ID", value: Math.floor(Math.random() * 1000) + 1 },
    { key: "region", value: region },
    { key: "firstName", value: firstName },
    { key: "secondName", value: secondName },
    { key: "userName", value: userName },
    { key: "email", value: email },
    { key: "password", value: password },
    { key: "registrationTimestamp", value: new Date().toISOString() }
  ];

  existingUsers.push(newUser);

  localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
  
  console.info("Успешная регистрация. Данные пользователя:", newUser);
  showAuthMessage('Регистрация успешна! Теперь вы можете войти.', 'success');
  
  setTimeout(() => {
    window.location.href = 'signin.html';
    this.reset();
  }, 2500);
});
const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
passwordToggle.addEventListener('click', function() {
  if (passwordInput.type === 'password' && confirmPasswordInput.type === 'password') {
    passwordInput.type = 'text';
    confirmPasswordInput.type = 'text';
    document.getElementById("passwordIcon").src = "https://upload.wikimedia.org/wikipedia/commons/3/32/Simple_Icon_Eye.svg";
  } 

  else {
    passwordInput.type = 'password';
    confirmPasswordInput.type = 'password';
    document.getElementById("passwordIcon").src = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Eye_close_font_awesome.svg";
  }

});

function showAuthMessage(message, type) {
  authMessage.textContent = message;
  authMessage.style.display = 'block';
  authMessage.className = 'auth-message ' + type;

  setTimeout(() => {
  authMessage.style.display = 'none';
  }, 5000);

};