const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submitButton');
const togglePassword = document.getElementById('togglePassword');
const errorMessage = document.getElementById('errorMessage');

// Устанавливаем логин и пароль по умолчанию, если их нет в localStorage
function setDefaultCredentials() {
    const defaultUsername = 'admin'; // Логин по умолчанию
    const defaultPassword = '12345'; // Пароль по умолчанию

    // Проверяем, есть ли уже логин и пароль в localStorage
    if (!localStorage.getItem('username') || !localStorage.getItem('password')) {
        localStorage.setItem('username', defaultUsername);
        localStorage.setItem('password', defaultPassword);
        alert('Логин и пароль по умолчанию добавлены в localStorage.');
    }
}

// Проверяем заполненность полей
function checkFields() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    submitButton.disabled = !(username && password); // Активируем кнопку только если оба поля заполнены
}

// Показ/скрытие пароля
togglePassword.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = '🙈'; // Иконка для "открытого" пароля
    } else {
        passwordInput.type = 'password';
        togglePassword.textContent = '👁'; // Иконка для "скрытого" пароля
    }
});

// Проверка правильности логина и пароля
function validateCredentials(username, password) {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    return username === storedUsername && password === storedPassword;
}

// Обработка отправки формы
loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Останавливаем стандартное поведение формы

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (validateCredentials(username, password)) {
        // alert('Вы успешно вошли!');
        window.location.href = 'page.html'; // Переход на страницу пользователя
    } else {
        errorMessage.textContent = 'Логин или пароль неправильный!';
        errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
    }
});

// Устанавливаем логин и пароль по умолчанию при загрузке страницы
setDefaultCredentials();

// Проверяем заполненность полей при каждом вводе текста
usernameInput.addEventListener('input', checkFields);
passwordInput.addEventListener('input', checkFields);