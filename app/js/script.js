// Очікуємо, поки DOM повністю завантажиться
document.addEventListener('DOMContentLoaded', () => {

  /**
   * ЗАВДАННЯ 1: Встановлення повного ім'я користувача
   * Реалізує функцію, що підставляє повне ім’я у елемент #personName.
   */
  function setUserName() {
    // Ваше повне ім'я
    const fullName = 'Noel Taylor'; // Вкажіть тут своє повне ім'я

    const nameElement = document.getElementById('personName');

    if (nameElement) {
      // Використовуємо .textContent, щоб безпечно вставити текст
      nameElement.textContent = fullName;
    } else {
      console.error('Елемент з ID "personName" не знайдено.');
    }
  }

  // Виклик функції для Завдання 1
  setUserName();

  /**
   * ЗАВДАННЯ 2: Перемикач видимості секцій (Акордеон)
   * Додає обробники подій 'click' до всіх заголовків секцій з класом .toggle-header.
   */
  function setupSectionToggles() {
    // Знаходимо всі заголовки, які мають функціонал перемикання
    const toggleHeaders = document.querySelectorAll('.toggle-header');

    toggleHeaders.forEach(header => {
      header.addEventListener('click', () => {
        // Знаходимо іконку-стрілку всередині заголовка
        const arrowIcon = header.querySelector('.toggle-arrow');

        // Знаходимо наступний елемент (це має бути наш .toggle-content)
        const content = header.nextElementSibling;

        if (arrowIcon && content && content.classList.contains('toggle-content')) {
          // Перемикаємо клас для обертання стрілки
          arrowIcon.classList.toggle('is-rotated');

          // Перемикаємо клас для приховування/показу контенту
          content.classList.toggle('is-hidden');
        }
      });
    });
  }

  // Виклик функції для Завдання 2
  setupSectionToggles();

  /**
   * ЗАВДАННЯ 3: Динамічна генерація списку навичок
   * Оголошує масив даних та генерує HTML-розмітку, вставляючи її в контейнер.
   */

    // 1. Масив даних (навички)
  const skillsData = [
      { name: 'Adobe Photoshop', level: 85 },
      { name: 'Adobe Illustrator', level: 80 },
      { name: 'Microsoft Word', level: 75 },
      { name: 'Microsoft PowerPoint', level: 70 },
      { name: 'HTML-5 / CSS-3', level: 90 },
      { name: 'JavaScript (ES6+)', level: 65 },
      { name: 'SASS/SCSS', level: 80 },
      { name: 'Gulp.js', level: 60 }
    ];

  // 2. Функція для генерації та вставки розмітки
  function generateSkills(skills, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(`Контейнер з ID "${containerId}" не знайдено.`);
      return;
    }

    // 3. Очищення вмісту контейнера
    container.innerHTML = '';

    // Створюємо HTML-рядки для кожної навички
    const skillsHTML = skills.map(skill => {
      return `
        <div class="skill-item">
          <p class="skill-label">${skill.name}</p>
          <div class="skill-line">
            <div class="skill-fill" style="width: ${skill.level}%"></div>
          </div>
        </div>
      `;
    }).join(''); // Об'єднуємо всі рядки в один

    // Вставляємо згенерований HTML у контейнер
    container.innerHTML = skillsHTML;
  }

  // Виклик функції для Завдання 3
  generateSkills(skillsData, 'skills-container');

});