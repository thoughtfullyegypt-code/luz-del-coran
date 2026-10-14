/**
 * Luz del Corán / Light of the Quran - Main Application Logic
 * Initializes 3D scene, bilingual audio player, subscription engine, interactive UI widgets,
 * FAQ accordions, curriculum tabs, currency switchers, language toggle, and mobile navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle & Bilingual Initialization
    const initLanguage = () => {
        const savedLang = localStorage.getItem('quran_lang') || 'es';
        if (typeof window.setLanguage === 'function') {
            window.setLanguage(savedLang);
        }

        // Language toggle buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                if (typeof window.setLanguage === 'function') {
                    window.setLanguage(lang);
                }

                // Re-render audio player in the new language if active
                if (window.quranAudioPlayer) {
                    window.quranAudioPlayer.loadSurah(window.quranAudioPlayer.currentSurahIndex);
                }

                // Update 3D canvas textures and button text
                if (window.quran3DInstance) {
                    if (window.quran3DInstance.updateLanguageTextures) {
                        window.quran3DInstance.updateLanguageTextures();
                    }
                    const toggleBookBtn = document.getElementById('btn-toggle-3d-book');
                    if (toggleBookBtn) {
                        const isOpen = window.quran3DInstance.isOpen;
                        const isEn = lang === 'en';
                        if (isOpen) {
                            toggleBookBtn.innerHTML = isEn 
                                ? '<i class="fa-solid fa-book text-amber-400"></i><span>View Closed Book</span>'
                                : '<i class="fa-solid fa-book text-amber-400"></i><span>Ver Libro Cerrado</span>';
                        } else {
                            toggleBookBtn.innerHTML = isEn 
                                ? '<i class="fa-solid fa-book-open text-amber-400"></i><span>Open Quran (Al-Fātiḥah)</span>'
                                : '<i class="fa-solid fa-book-open text-amber-400"></i><span>Abrir Corán (Al-Fātiḥah)</span>';
                        }
                    }
                }
            });
        });
    };

    initLanguage();

    // 2. Initialize 3D WebGL Scene
    const sceneContainer = document.getElementById('quran-3d-canvas-container');
    if (sceneContainer && typeof window.initQuran3D === 'function') {
        window.quran3DInstance = window.initQuran3D('quran-3d-canvas-container');

        // Hook 3D interactive controls
        const toggleBookBtn = document.getElementById('btn-toggle-3d-book');
        const resetViewBtn = document.getElementById('btn-reset-3d-view');

        if (toggleBookBtn && window.quran3DInstance) {
            toggleBookBtn.addEventListener('click', () => {
                const isOpen = window.quran3DInstance.toggleBookState();
                const isEn = window.currentLanguage === 'en';
                toggleBookBtn.innerHTML = isOpen 
                    ? `<i class="fa-solid fa-book text-amber-400"></i><span>${isEn ? 'View Closed Book' : 'Ver Libro Cerrado'}</span>`
                    : `<i class="fa-solid fa-book-open text-amber-400"></i><span>${isEn ? 'Open Quran (Al-Fātiḥah)' : 'Abrir Corán (Al-Fātiḥah)'}</span>`;
            });
        }

        if (resetViewBtn && window.quran3DInstance) {
            resetViewBtn.addEventListener('click', () => {
                window.quran3DInstance.resetView();
            });
        }
    }

    // 3. Initialize Interactive Bilingual Audio Player
    if (typeof window.initQuranAudioPlayer === 'function') {
        window.quranAudioPlayer = window.initQuranAudioPlayer();
    }

    // 4. Initialize Subscription & Enrollment Engine
    if (typeof window.initSubscriptionEngine === 'function') {
        window.subscriptionEngine = window.initSubscriptionEngine();
    }

    // 5. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // 6. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answerEl = item.querySelector('.faq-answer');
        const iconEl = item.querySelector('.faq-icon');

        if (questionBtn && answerEl) {
            questionBtn.addEventListener('click', () => {
                const isOpen = !answerEl.classList.contains('hidden');

                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherAnswer && otherAnswer !== answerEl) {
                        otherAnswer.classList.add('hidden');
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                // Toggle current FAQ
                if (isOpen) {
                    answerEl.classList.add('hidden');
                    if (iconEl) iconEl.style.transform = 'rotate(0deg)';
                } else {
                    answerEl.classList.remove('hidden');
                    if (iconEl) iconEl.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

    // 7. Curriculum / Syllabus Tab Switcher
    const syllabusTabs = document.querySelectorAll('.syllabus-tab-btn');
    const syllabusCards = document.querySelectorAll('.syllabus-content-card');

    syllabusTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            // Update tab styles
            syllabusTabs.forEach(t => {
                t.classList.remove('bg-amber-400', 'text-emerald-950', 'shadow-lg');
                t.classList.add('bg-emerald-950/60', 'text-emerald-200', 'hover:bg-emerald-900/60');
            });
            tab.classList.remove('bg-emerald-950/60', 'text-emerald-200', 'hover:bg-emerald-900/60');
            tab.classList.add('bg-amber-400', 'text-emerald-950', 'shadow-lg');

            // Switch content card
            syllabusCards.forEach(card => {
                if (card.id === targetId) {
                    card.classList.remove('hidden');
                    card.classList.add('animate-fadeIn');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 8. Currency Toggle (USD $100 / EUR €92)
    const currencyButtons = document.querySelectorAll('.currency-toggle-btn');
    const priceAmountEl = document.getElementById('pricing-amount');
    const priceCurrencyEl = document.getElementById('pricing-currency-symbol');
    const priceEquivalentEl = document.getElementById('pricing-equivalent');

    currencyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cur = btn.getAttribute('data-currency');
            const isEn = window.currentLanguage === 'en';

            currencyButtons.forEach(b => {
                b.classList.remove('bg-amber-400', 'text-emerald-950', 'font-bold');
                b.classList.add('text-emerald-300', 'hover:text-white');
            });
            btn.classList.add('bg-amber-400', 'text-emerald-950', 'font-bold');
            btn.classList.remove('text-emerald-300', 'hover:text-white');

            if (cur === 'EUR') {
                if (priceAmountEl) priceAmountEl.textContent = '92';
                if (priceCurrencyEl) priceCurrencyEl.textContent = '€';
                if (priceEquivalentEl) {
                    priceEquivalentEl.textContent = isEn 
                        ? 'Approx. 11.50 € per 1-on-1 class hour' 
                        : 'Aprox. 11.50 € por hora de clase individual';
                }
                if (window.subscriptionEngine) {
                    window.subscriptionEngine.currency = 'EUR';
                }
            } else {
                if (priceAmountEl) priceAmountEl.textContent = '100';
                if (priceCurrencyEl) priceCurrencyEl.textContent = '$';
                if (priceEquivalentEl) {
                    priceEquivalentEl.textContent = isEn 
                        ? 'Approx. $12.50 USD per 1-on-1 class hour' 
                        : 'Aprox. $12.50 USD por hora de clase individual';
                }
                if (window.subscriptionEngine) {
                    window.subscriptionEngine.currency = 'USD';
                }
            }
        });
    });

    // 9. Lead Capture for "Free Diagnostic / Assessment Session (20 min)"
    const freeAssessmentForm = document.getElementById('free-assessment-form');
    if (freeAssessmentForm) {
        freeAssessmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('lead-name')?.value || '';
            const phone = document.getElementById('lead-phone')?.value || '';
            const level = document.getElementById('lead-level')?.value || '';
            const isEn = window.currentLanguage === 'en';

            let waMsg = '';
            if (isEn) {
                waMsg = encodeURIComponent(
                    `Salam Alaykum Ustadz. I would like to schedule my *Free 20-Minute Assessment Session* at Light of the Quran.\n\n` +
                    `👤 *Name:* ${name}\n` +
                    `📱 *WhatsApp:* ${phone}\n` +
                    `📖 *Current Level:* ${level}\n\n` +
                    `What days/times do you have available this week for our video call? Thank you so much!`
                );
            } else {
                waMsg = encodeURIComponent(
                    `Salam Alaykum Ustadz. Me gustaría agendar mi *Sesión de Diagnóstico Gratuita de 20 minutos* en Luz del Corán.\n\n` +
                    `👤 *Nombre:* ${name}\n` +
                    `📱 *WhatsApp:* ${phone}\n` +
                    `📖 *Nivel aproximado:* ${level}\n\n` +
                    `¿Qué día y hora tendrías disponible esta semana para coordinar la videollamada? ¡Muchas gracias!`
                );
            }

            // Confetti
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 80,
                    spread: 60,
                    origin: { y: 0.7 },
                    colors: ['#d4af37', '#10b981']
                });
            }

            const cfg = window.ACADEMY_CONFIG || {};
            const teacherNumber = (window.subscriptionEngine && window.subscriptionEngine.teacherWhatsAppNumber) || cfg.teacherWhatsAppNumber || '34600000000';
            window.open(`https://wa.me/${teacherNumber}?text=${waMsg}`, '_blank');
        });
    }

    // Dynamic WhatsApp Link Updater from config.js
    const cfg = window.ACADEMY_CONFIG || {};
    if (cfg.teacherWhatsAppNumber && cfg.teacherWhatsAppNumber !== '34600000000') {
        document.querySelectorAll('a[href*="wa.me/34600000000"]').forEach(link => {
            link.href = link.href.replace('34600000000', cfg.teacherWhatsAppNumber);
        });
    }

    // 10. Sticky Header Blur Effect on Scroll
    const header = document.getElementById('site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('bg-emerald-950/90', 'backdrop-blur-md', 'shadow-lg', 'shadow-black/20', 'border-b', 'border-emerald-800/40');
            } else {
                header.classList.remove('bg-emerald-950/90', 'backdrop-blur-md', 'shadow-lg', 'shadow-black/20', 'border-b', 'border-emerald-800/40');
            }
        });
    }

    console.log('Luz del Corán / Light of the Quran initialized successfully.');
});
