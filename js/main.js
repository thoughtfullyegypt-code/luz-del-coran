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

                // Update Hero Interactive Showcase in new language
                if (typeof window.updateHeroShowcaseLang === 'function') {
                    window.updateHeroShowcaseLang();
                }
            });
        });
    };

    initLanguage();

    // 2. Initialize Modern Interactive Sacred Quran Showcase
    const initHeroInteractiveShowcase = () => {
        const showcase = document.getElementById('hero-interactive-showcase');
        if (!showcase) return;

        const heroSurahs = {
            fatihah: {
                id: 'fatihah',
                nameEs: 'SURAH AL-FĀTIḤAH (1:1-7)',
                nameEn: 'SURAH AL-FĀTIḤAH (1:1-7)',
                verses: [
                    {
                        num: 1,
                        ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                        phonetic: 'Bismi Al-lāhi Ar-Rahmāni Ar-Rahīm',
                        es: 'En el nombre de Dios, el Compasivo, el Misericordioso.',
                        en: 'In the name of God, the Entirely Merciful, the Especially Merciful.',
                        audio: 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3'
                    },
                    {
                        num: 2,
                        ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
                        phonetic: 'Al-hamdu lil-lāhi Rabbi Al-‘Ālamīn',
                        es: 'Todas las alabanzas son para Dios, Señor de todos los mundos.',
                        en: '[All] praise is due to God, Lord of the worlds.',
                        audio: 'https://everyayah.com/data/Alafasy_128kbps/001002.mp3'
                    },
                    {
                        num: 3,
                        ar: 'الرَّحْمَٰنِ الرَّحِيمِ',
                        phonetic: 'Ar-Rahmāni Ar-Rahīm',
                        es: 'El Clemente, el Misericordioso.',
                        en: 'The Entirely Merciful, the Especially Merciful.',
                        audio: 'https://everyayah.com/data/Alafasy_128kbps/001003.mp3'
                    },
                    {
                        num: 4,
                        ar: 'مَالِكِ يَوْمِ الدِّينِ',
                        phonetic: 'Māliki Yawmi Ad-Dīn',
                        es: 'Soberano Absoluto del Día del Juicio.',
                        en: 'Sovereign of the Day of Recompense.',
                        audio: 'https://everyayah.com/data/Alafasy_128kbps/001004.mp3'
                    },
                    {
                        num: 5,
                        ar: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
                        phonetic: 'Iyyāka na‘budu wa-iyyāka nasta‘īn',
                        es: 'Solo a Ti adoramos y solo de Ti imploramos ayuda.',
                        en: 'It is You we worship and You we ask for help.',
                        audio: 'https://everyayah.com/data/Alafasy_128kbps/001005.mp3'
                    },
                    {
                        num: 6,
                        ar: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
                        phonetic: 'Ihdinā As-Sirāta Al-Mustaqīm',
                        es: 'Guíanos por el sendero recto,',
                        en: 'Guide us to the straight path,',
                        audio: 'https://everyayah.com/data/Alafasy_128kbps/001006.mp3'
                    },
                    {
                        num: 7,
                        ar: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
                        phonetic: 'Sirāta Al-ladhīna an‘amta ‘alayhim ghayril maghdūbi ‘alayhim walad-dāllīn',
                        es: 'El sendero de aquellos a quienes has agraciado, no el de los que han incurrido en Tu ira, ni el de los extraviados.',
                        en: 'The path of those upon whom You have bestowed favor, not of those who have evoked anger or are astray.',
                        audio: 'https://everyayah.com/data/Alafasy_128kbps/001007.mp3'
                    }
                ]
            },
            kursi: {
                id: 'kursi',
                nameEs: 'AYAT AL-KURSĪ (2:255)',
                nameEn: 'AYAT AL-KURSĪ (2:255)',
                verses: [
                    {
                        num: 1,
                        ar: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
                        phonetic: 'Allāhu lā ilāha illā Huwa Al-Hayyu Al-Qayyūm, lā ta’khudhuhu sinatun walā nawm',
                        es: '¡Dios! No hay más divinidad que Él, el Viviente, el Subsistente. Ni el sueño ni la somnolencia se apoderan de Él.',
                        en: 'God! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep.',
                        audio: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3'
                    },
                    {
                        num: 2,
                        ar: 'لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ',
                        phonetic: 'Llahu mā fīs-samāwāti wamā fīl-ard, man dhal-ladhī yashfa‘u ‘indahū illā bi’idhnih',
                        es: 'Suyo es cuanto hay en los cielos y en la tierra. ¿Quién podrá interceder ante Él sin Su anuencia?',
                        en: 'To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission?',
                        audio: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3'
                    },
                    {
                        num: 3,
                        ar: 'يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ',
                        phonetic: 'Ya‘lamu mā bayna aydīhim wamā khalfahum, walā yuhītūna bishay’in min ‘ilmihī illā bimā shā’',
                        es: 'Conoce lo que fue y lo que será, y los seres humanos no abarcan de Su conocimiento sino lo que Él desea.',
                        en: 'He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills.',
                        audio: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3'
                    },
                    {
                        num: 4,
                        ar: 'وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
                        phonetic: 'Wasi‘a kursiyyuhus-samāwāti wal-arda, walā ya’ūduhū hifzuhumā, wa-Huwal ‘Aliyyul ‘Azīm',
                        es: 'Su Trono abarca los cielos y la tierra, y Su preservación no Le causa fatiga. Él es el Altísimo, el Sublime.',
                        en: 'His Kursī extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
                        audio: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3'
                    }
                ]
            }
        };

        let currentSurahKey = 'fatihah';
        let currentAyahIndex = 0;
        let isPlayingFull = false;
        let audioPlayer = new Audio();

        const elSurahName = document.getElementById('hero-surah-name');
        const elCalligraphy = document.getElementById('hero-arabic-calligraphy');
        const elPhonetic = document.getElementById('hero-verse-phonetic');
        const elTranslation = document.getElementById('hero-verse-translation');
        const elAyahNumBadge = document.getElementById('hero-active-ayah-num');
        const elPillsContainer = document.getElementById('hero-ayah-pills');
        const btnPlayAll = document.getElementById('hero-btn-play-all');
        const playIcon = document.getElementById('hero-play-icon');
        const playText = document.getElementById('hero-play-text');
        const soundwave = document.getElementById('hero-soundwave');
        const tabFatihah = document.getElementById('hero-tab-fatihah');
        const tabKursi = document.getElementById('hero-tab-kursi');
        const manuscriptCard = document.getElementById('hero-manuscript-card');

        // Set visual equalizer state
        const setEqualizerActive = (active) => {
            if (!soundwave) return;
            const bars = soundwave.querySelectorAll('.eq-bar');
            bars.forEach(b => {
                b.style.animationPlayState = active ? 'running' : 'paused';
            });
        };
        setEqualizerActive(false);

        // Render Ayah Pills
        const renderPills = () => {
            if (!elPillsContainer) return;
            const surah = heroSurahs[currentSurahKey];
            elPillsContainer.innerHTML = '';

            surah.verses.forEach((v, idx) => {
                const pill = document.createElement('button');
                pill.type = 'button';
                const isActive = idx === currentAyahIndex;
                pill.className = `w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center ${
                    isActive 
                        ? 'bg-amber-400 text-slate-950 shadow-lg scale-110 ring-2 ring-amber-400/50' 
                        : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/10 hover:border-amber-400/40'
                }`;
                pill.textContent = v.num;
                pill.title = `Aleya ${v.num}`;
                pill.addEventListener('click', () => {
                    selectAyah(idx, true);
                });
                elPillsContainer.appendChild(pill);
            });
        };

        // Select and display Ayah
        const selectAyah = (index, autoPlay = false) => {
            const surah = heroSurahs[currentSurahKey];
            if (index < 0 || index >= surah.verses.length) return;
            currentAyahIndex = index;
            const verse = surah.verses[index];
            const isEn = window.currentLanguage === 'en';

            if (elSurahName) {
                elSurahName.textContent = isEn ? surah.nameEn : surah.nameEs;
            }

            if (elCalligraphy) {
                elCalligraphy.style.opacity = '0';
                setTimeout(() => {
                    elCalligraphy.textContent = verse.ar;
                    elCalligraphy.style.opacity = '1';
                }, 120);
            }

            if (elPhonetic) elPhonetic.textContent = verse.phonetic;
            if (elTranslation) elTranslation.textContent = isEn ? verse.en : verse.es;
            if (elAyahNumBadge) {
                elAyahNumBadge.textContent = isEn ? `Verse ${verse.num}` : `Aleya ${verse.num}`;
            }

            // Update pills highlight
            renderPills();

            // Play single ayah audio
            if (autoPlay) {
                audioPlayer.pause();
                audioPlayer.src = verse.audio;
                audioPlayer.play().then(() => {
                    setEqualizerActive(true);
                }).catch(err => {
                    console.log('Autoplay prevented or network error:', err);
                });
            }
        };

        audioPlayer.addEventListener('ended', () => {
            if (isPlayingFull) {
                const surah = heroSurahs[currentSurahKey];
                if (currentAyahIndex + 1 < surah.verses.length) {
                    selectAyah(currentAyahIndex + 1, true);
                } else {
                    stopPlayAll();
                }
            } else {
                setEqualizerActive(false);
            }
        });

        audioPlayer.addEventListener('pause', () => {
            if (!isPlayingFull) setEqualizerActive(false);
        });

        const stopPlayAll = () => {
            isPlayingFull = false;
            audioPlayer.pause();
            setEqualizerActive(false);
            if (playIcon) playIcon.className = 'fa-solid fa-play text-xs';
            if (playText) {
                const isEn = window.currentLanguage === 'en';
                playText.textContent = isEn ? 'Play Full Surah' : 'Escuchar Completa';
            }
        };

        const startPlayAll = () => {
            isPlayingFull = true;
            if (playIcon) playIcon.className = 'fa-solid fa-pause text-xs';
            if (playText) {
                const isEn = window.currentLanguage === 'en';
                playText.textContent = isEn ? 'Pause' : 'Pausar';
            }
            selectAyah(0, true);
        };

        if (btnPlayAll) {
            btnPlayAll.addEventListener('click', () => {
                if (isPlayingFull) {
                    stopPlayAll();
                } else {
                    startPlayAll();
                }
            });
        }

        // Tab switches
        if (tabFatihah && tabKursi) {
            tabFatihah.addEventListener('click', () => {
                if (currentSurahKey === 'fatihah') return;
                stopPlayAll();
                currentSurahKey = 'fatihah';
                tabFatihah.className = 'hero-surah-tab active px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-amber-400 text-slate-950 shadow-md flex items-center gap-1.5';
                tabKursi.className = 'hero-surah-tab px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all bg-slate-900/80 text-slate-300 hover:text-white border border-white/10 hover:border-amber-400/40 flex items-center gap-1.5';
                selectAyah(0, false);
            });

            tabKursi.addEventListener('click', () => {
                if (currentSurahKey === 'kursi') return;
                stopPlayAll();
                currentSurahKey = 'kursi';
                tabKursi.className = 'hero-surah-tab active px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-amber-400 text-slate-950 shadow-md flex items-center gap-1.5';
                tabFatihah.className = 'hero-surah-tab px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all bg-slate-900/80 text-slate-300 hover:text-white border border-white/10 hover:border-amber-400/40 flex items-center gap-1.5';
                selectAyah(0, false);
            });
        }

        // 3D Tilt Interaction on Card
        if (manuscriptCard && window.matchMedia('(hover: hover)').matches) {
            manuscriptCard.addEventListener('mousemove', (e) => {
                const rect = manuscriptCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
                const rotateY = ((x - centerX) / centerX) * 6;  // max 6 deg
                manuscriptCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
            });

            manuscriptCard.addEventListener('mouseleave', () => {
                manuscriptCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        }

        // Language updater hook
        window.updateHeroShowcaseLang = () => {
            selectAyah(currentAyahIndex, false);
            if (!isPlayingFull && playText) {
                const isEn = window.currentLanguage === 'en';
                playText.textContent = isEn ? 'Play Full Surah' : 'Escuchar Completa';
            }
        };

        // Initial render
        selectAyah(0, false);
    };

    initHeroInteractiveShowcase();

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
