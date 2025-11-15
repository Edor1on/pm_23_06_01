// Очікуємо, поки DOM повністю завантажиться
document.addEventListener('DOMContentLoaded', () => {

  /**
   * =============================================
   * ЛАБОРАТОРНА РОБОТА 5: AJAX (Fetch API)
   * =============================================
   */

  /**
   * Головна асинхронна функція для завантаження та відображення даних
   */
  async function loadCVData() {
    try {
      // 1. Завантажуємо дані з data.json
      const response = await fetch('data.json');

      // 2. Перевіряємо, чи успішний запит
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 3. Перетворюємо відповідь у JSON
      const data = await response.json();

      // 4. Викликаємо функції для наповнення сторінки
      populateCV(data);

    } catch (error) {
      // 5. Обробка помилок
      console.error('Could not load CV data:', error);
      displayError('Не вдалося завантажити дані резюме. Будь ласка, спробуйте оновити сторінку.');
    }
  }

  /**
   * Головна функція, що розподіляє дані по рендер-функціях
   * @param {object} data - Об'єкт даних з data.json
   */
  function populateCV(data) {
    // Профіль та Контакти
    renderProfile(data.profile);
    renderContact(data.contact);

    // Секції лівої колонки
    renderEducation(data.education, 'education-container');
    renderReferences(data.references, 'references-container');

    // Секції правої колонки
    renderAbout(data.profile.about, 'about-me-container');
    renderExperience(data.experience, 'experience-container');
    renderSkills(data.skills, 'skills-container'); // Використання функції з ЛР4
    renderSimpleList(data.languages, 'language-list');
    renderSimpleList(data.hobbies, 'hobby-list');
  }

  // === Render-функції ===

  function renderProfile(profile) {
    document.getElementById('personName').textContent = `${profile.firstName} ${profile.lastName}`;
    document.getElementById('personRole').textContent = profile.role;
    document.getElementById('profilePic').src = profile.profilePic;
    document.getElementById('profilePic').alt = `${profile.firstName} ${profile.lastName} profile picture`;
  }

  function renderContact(contact) {
    document.getElementById('contactPhone').textContent = contact.phone;
    document.getElementById('contactWebsite').textContent = contact.website;
    document.getElementById('contactAddress').textContent = contact.address;
  }

  function renderAbout(aboutText, containerId) {
    document.getElementById(containerId).textContent = aboutText;
  }

  function renderEducation(educationItems, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = educationItems.map(item => `
      <p class="fw-bold mb-0">${item.university}</p>
      <p class="small text-muted mb-1">${item.degree}</p>
      <p class="small text-muted mb-2">${item.years}</p>
    `).join('');
  }

  function renderReferences(referenceItems, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = referenceItems.map(item => `
      <p class="fw-bold mb-0">${item.name}</p>
      ${item.lines.map(line => `<p class="small text-muted mb-0 no-wrap">${line}</p>`).join('')}
      <br> `).join('').replace(/<br>$/, ''); // Видаляємо останній <br>
  }

  function renderExperience(jobItems, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = jobItems.map((job, index) => `
      <div class="job-item ${index === jobItems.length - 1 ? '' : 'mb-3'}">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h6 class="job-title fw-bold text-uppercase mb-1">${job.title}</h6>
            <p class="job-company fst-italic text-muted mb-2">${job.company}</p>
          </div>
          <div class="job-years text-divider-dark-color">${job.years}</div>
        </div>
        <p class="right-text mb-0">${job.description}</p>
      </div>
    `).join('');
  }

  function renderSimpleList(items, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = items.map(item =>
      `<li><span class="dot">•</span>${item}</li>`
    ).join('');
  }

  /**
   * Відображення помилки на сторінці
   * @param {string} message - Текст помилки
   */
  function displayError(message) {
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
      errorContainer.textContent = message;
      errorContainer.style.display = 'block';
    }
  }


  /**
   * =============================================
   * ЗАВДАННЯ З ПОПЕРЕДНІХ ЛАБ (залишаємо без змін)
   * =============================================
   */

  /**
   * ЗАВДАННЯ 2 (ЛР4): Перемикач видимості секцій (Акордеон)
   */
  function setupSectionToggles() {
    const toggleHeaders = document.querySelectorAll('.toggle-header');

    toggleHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const arrowIcon = header.querySelector('.toggle-arrow');
        const content = header.nextElementSibling;

        if (arrowIcon && content && content.classList.contains('toggle-content')) {
          arrowIcon.classList.toggle('is-rotated');
          content.classList.toggle('is-hidden');
        }
      });
    });
  }

  /**
   * ЗАВДАННЯ 3 (ЛР4): Динамічна генерація списку навичок
   * (Тепер ця функція викликається з populateCV)
   */
  function renderSkills(skills, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(`Контейнер з ID "${containerId}" не знайдено.`);
      return;
    }

    container.innerHTML = skills.map(skill => `
      <div class="skill-item">
        <p class="skill-label">${skill.name}</p>
        <div class="skill-line">
          <div class="skill-fill" style="width: ${skill.level}%"></div>
        </div>
      </div>
    `).join('');
  }


  // === ЗАПУСК УСІХ ФУНКЦІЙ ===

  // 1. Запускаємо завантаження даних
  loadCVData();

  // 2. Налаштовуємо акордеон (незалежно від даних)
  setupSectionToggles();

});