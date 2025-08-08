import en from './en.js';
import ru from './ru.js';
import ptBr from './pt-br.js';

class I18n {
    constructor() {
        this.translations = {
            en,
            ru,
            'pt-br': ptBr
        };
        this.currentLocale = localStorage.getItem('locale') || 'en';
        console.log('I18n initialized with locale:', this.currentLocale);
    }

    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.translations[this.currentLocale];
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        console.log('Translating key:', key, 'Result:', value);
        if (!value) return key;
        
        return value.replace(/\{(\w+)\}/g, (_, key) => params[key] || '');
    }

    setLocale(locale) {
        console.log('Setting locale to:', locale);
        if (this.translations[locale]) {
            this.currentLocale = locale;
            localStorage.setItem('locale', locale);
            this.updatePageContent();
            document.dispatchEvent(new Event('languageChanged'));
            console.log('Locale updated successfully');
        }
    }

    getCurrentLocale() {
        return this.currentLocale;
    }

    updatePageContent() {
        console.log('Updating page content for locale:', this.currentLocale);
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            const params = element.dataset.i18nParams ? JSON.parse(element.dataset.i18nParams) : {};
            element.textContent = this.t(key, params);
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.dataset.i18nPlaceholder;
            const params = element.dataset.i18nParams ? JSON.parse(element.dataset.i18nParams) : {};
            element.placeholder = this.t(key, params);
        });
        console.log('Page content updated');
    }
}

export const i18n = new I18n();

// Make i18n available globally
window.i18n = i18n;