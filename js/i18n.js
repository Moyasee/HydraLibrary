import en from '../i18n/en.js';
import ru from '../i18n/ru.js';
import ptBr from '../i18n/pt-br.js';

const translations = {
    en,
    ru,
    'pt-br': ptBr
};

let currentLanguage = localStorage.getItem('language') || 'en';

export function translate(key) {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (const k of keys) {
        translation = translation?.[k];
    }
    
    return translation || key;
}

export function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translate(key);
    });

    // Update all elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = translate(key);
    });

    // Update language switcher button text
    const languageSwitcher = document.getElementById('language-switcher');
    if (languageSwitcher) {
        const span = languageSwitcher.querySelector('span');
        if (span) {
            span.textContent = lang === 'ru' ? 'Русский' :
                             lang === 'pt-br' ? 'Português' :
                             'English';
        }
    }
}

export function initializeLanguageSwitcher() {
    const languageSwitcher = document.getElementById('language-switcher');
    const languageDropdown = document.getElementById('language-dropdown');

    if (languageSwitcher && languageDropdown) {
        // Toggle dropdown
        languageSwitcher.addEventListener('click', () => {
            languageDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageSwitcher.contains(e.target)) {
                languageDropdown.classList.add('hidden');
            }
        });

        // Handle language selection
        languageDropdown.querySelectorAll('[data-lang]').forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                setLanguage(lang);
                languageDropdown.classList.add('hidden');
            });
        });
    }

    // Set initial language
    setLanguage(currentLanguage);
} 