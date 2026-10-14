/**
 * Luz del Corán / Light of the Quran - Interactive Audio Player & Tajweed Guide
 * Supports both Spanish and English speakers with synchronized phonetics and authentic recitations.
 */

const quranPlaylists = [
    {
        id: 'fatihah',
        surahNumber: '001',
        titleAr: 'سُورَةُ الفَاتِحَة',
        titleEs: 'Surah Al-Fātiḥah (La Apertura)',
        titleEn: 'Surah Al-Fātiḥah (The Opening)',
        descEs: 'La base de todo rezo musulmán. Las 7 aleyas fundamentales.',
        descEn: 'The foundation of every Muslim prayer. The 7 fundamental verses.',
        verses: [
            {
                number: 1,
                ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                phonetic: 'Bismi Al-lāhi Ar-Rahmāni Ar-Rahīm',
                es: 'En el nombre de Dios, el Compasivo, el Misericordioso.',
                en: 'In the name of God, the Entirely Merciful, the Especially Merciful.',
                tajweedEs: 'Presta atención a la suavidad de la "Haa" (ح) en Rahmān y Rahīm, que sale del medio de la garganta.',
                tajweedEn: 'Notice the gentle articulation of the "Haa" (ح) in Rahmān and Rahīm, originating from the center of the throat.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3'
            },
            {
                number: 2,
                ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
                phonetic: 'Al-hamdu lil-lāhi Rabbi Al-‘Ālamīn',
                es: 'Todas las alabanzas son para Dios, Señor de todos los mundos.',
                en: '[All] praise is due to God, Lord of the worlds.',
                tajweedEs: 'La letra "‘Ayn" (ع) en Al-‘Ālamīn es un sonido profundo y gutural muy característico del árabe.',
                tajweedEn: 'The letter "‘Ayn" (ع) in Al-‘Ālamīn is a deep voiced pharyngeal fricative distinctive to Arabic.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/001002.mp3'
            },
            {
                number: 3,
                ar: 'الرَّحْمَٰنِ الرَّحِيمِ',
                phonetic: 'Ar-Rahmāni Ar-Rahīm',
                es: 'El Clemente, el Misericordioso.',
                en: 'The Entirely Merciful, the Especially Merciful.',
                tajweedEs: 'Regla de Madd (prolongación): alargar la "ī" de Ar-Rahīm de 2 a 4 tiempos al detenerse.',
                tajweedEn: 'Madd rule (prolongation): stretch the "ī" sound in Ar-Rahīm for 2 to 4 counts when stopping.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/001003.mp3'
            },
            {
                number: 4,
                ar: 'مَالِكِ يَوْمِ الدِّينِ',
                phonetic: 'Māliki Yawmi Ad-Dīn',
                es: 'Soberano Absoluto del Día del Juicio.',
                en: 'Sovereign of the Day of Recompense.',
                tajweedEs: 'Pronuncia la "Dāl" (د) con la punta de la lengua en la base de los dientes superiores, sin soplar.',
                tajweedEn: 'Articulate the "Dāl" (د) with the tip of the tongue touching the upper incisors without puffing air.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/001004.mp3'
            },
            {
                number: 5,
                ar: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
                phonetic: 'Iyyāka na‘budu wa-iyyāka nasta‘īn',
                es: 'Solo a Ti adoramos y solo de Ti imploramos ayuda.',
                en: 'It is You we worship and You we ask for help.',
                tajweedEs: 'Énfasis Shaddah en "Iyyāka" (acentúa la duplicación de la letra Yaa).',
                tajweedEn: 'Shaddah emphasis on "Iyyāka" (hold and emphasize the doubled Yaa consonant).',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/001005.mp3'
            },
            {
                number: 6,
                ar: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
                phonetic: 'Ihdinā As-Sirāta Al-Mustaqīm',
                es: 'Guíanos por el sendero recto,',
                en: 'Guide us to the straight path,',
                tajweedEs: 'La letra "Saad" (ص) y "Taa" (ط) son enfáticas y gruesas. La "Qaf" (ق) nace en la base del paladar.',
                tajweedEn: 'The letters "Saad" (ص) and "Taa" (ط) are full-mouthed emphatic letters. "Qaf" (ق) is articulated at the uvula.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/001006.mp3'
            },
            {
                number: 7,
                ar: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
                phonetic: 'Sirāta Al-ladhīna an‘amta ‘alayhim ghayril maghdūbi ‘alayhim walad-dāllīn',
                es: 'El sendero de aquellos a quienes has agraciado, no el de los que han incurrido en Tu ira, ni el de los extraviados.',
                en: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
                tajweedEs: 'Madd Lāzim (prolongación obligatoria de 6 tiempos) en "Walad-Dāllīn" con la letra "Dād" (ض).',
                tajweedEn: 'Madd Lāzim (obligatory 6-count prolongation) on "Walad-Dāllīn" with the lateral emphatic "Dād" (ض).',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/001007.mp3'
            }
        ]
    },
    {
        id: 'ikhlas',
        surahNumber: '112',
        titleAr: 'سُورَةُ الإِخْلَاص',
        titleEs: 'Surah Al-Ikhlāṣ (La Sinceridad)',
        titleEn: 'Surah Al-Ikhlāṣ (The Sincerity / Purity)',
        descEs: 'El corazón del monoteísmo puro (Tawheed). Equivale a un tercio del Corán.',
        descEn: 'The essence of pure monotheism (Tawheed). Equivalent to one-third of the Quran.',
        verses: [
            {
                number: 1,
                ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
                phonetic: 'Qul Huwa Allāhu Ahad',
                es: 'Di: «Él es Dios, el Único.',
                en: 'Say: "He is God, [who is] One.',
                tajweedEs: 'Regla de Qalqalah (eco resonante) en la letra "Dal" (د) al detenerse en Ahad.',
                tajweedEn: 'Qalqalah rule (bouncing acoustic echo) on the letter "Dal" (د) when stopping on Ahad.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/112001.mp3'
            },
            {
                number: 2,
                ar: 'اللَّهُ الصَّمَدُ',
                phonetic: 'Allāhu As-Samad',
                es: 'Dios, el Autosuficiente, de Quien todo depende.',
                en: 'God, the Eternal Refuge.',
                tajweedEs: 'As-Samad: el Señor Supremo. Letra Saad (ص) pronunciada con plenitud y firmeza.',
                tajweedEn: 'As-Samad: letter Saad (ص) pronounced with full oral resonance and depth.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/112002.mp3'
            },
            {
                number: 3,
                ar: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
                phonetic: 'Lam yalid walam yūlad',
                es: 'No engendró ni fue engendrado,',
                en: 'He neither begets nor is born,',
                tajweedEs: 'Doble Qalqalah: sonido de rebote rítmico en la "Dal" de yalid y yūlad.',
                tajweedEn: 'Double Qalqalah: crisp bounce on the "Dal" consonant in both yalid and yūlad.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/112003.mp3'
            },
            {
                number: 4,
                ar: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
                phonetic: 'Walam yakul-lahu kufuwan ahad',
                es: 'Y no hay nada ni nadie semejante o comparable a Él».',
                en: 'Nor is there to Him any equivalent."',
                tajweedEs: 'Idgham sin Ghunnah: la Nun de "yakun" se asimila directamente con la Lam de "lahu".',
                tajweedEn: 'Idgham without Ghunnah: the silent Nun in "yakun" merges smoothly into the Lam in "lahu".',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/112004.mp3'
            }
        ]
    },
    {
        id: 'falaq',
        surahNumber: '113',
        titleAr: 'سُورَةُ الفَلَق',
        titleEs: 'Surah Al-Falaq (El Alba)',
        titleEn: 'Surah Al-Falaq (The Daybreak)',
        descEs: 'Súplica de protección divina contra el mal de las criaturas y la envidia.',
        descEn: 'Divine invocation for protection from the evil of creation and envy.',
        verses: [
            {
                number: 1,
                ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
                phonetic: 'Qul a‘ūzhu bi-Rabbi al-falaq',
                es: 'Di: «Me refugio en el Señor del alba celestial,',
                en: 'Say: "I seek refuge in the Lord of daybreak,',
                tajweedEs: 'Qalqalah clara en la "Qaf" (ق) al final de al-Falaq.',
                tajweedEn: 'Crisp Qalqalah echo on "Qaf" (ق) at the pause on al-Falaq.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/113001.mp3'
            },
            {
                number: 2,
                ar: 'مِن شَرِّ مَا خَلَقَ',
                phonetic: 'Min sharri mā khalaq',
                es: 'del mal de cuanto ha creado,',
                en: 'From the evil of that which He created,',
                tajweedEs: 'Ikhfaa: ocultación nasal suave de la Nun antes de la Shin.',
                tajweedEn: 'Ikhfaa: subtle nasal hum concealing the Nun before Shin.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/113002.mp3'
            },
            {
                number: 3,
                ar: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
                phonetic: 'Wa min sharri ghāsiqin izhā waqab',
                es: 'del mal de la noche cuando oscurece,',
                en: 'And from the evil of darkness when it settles,',
                tajweedEs: 'Qalqalah en la "Baa" (ب) al pausar en waqab.',
                tajweedEn: 'Qalqalah on "Baa" (ب) upon pausing at waqab.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/113003.mp3'
            },
            {
                number: 4,
                ar: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
                phonetic: 'Wa min sharrin-naffāthāti fīl ‘uqad',
                es: 'del mal de quienes practican hechizos soplando nudos,',
                en: 'And from the evil of the blowers in knots,',
                tajweedEs: 'Ghunnah plena en la Nun con Shaddah (النَّـ) por 2 tiempos nasales.',
                tajweedEn: 'Full 2-count nasal Ghunnah on the Nun with Shaddah (النَّـ).',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/113004.mp3'
            },
            {
                number: 5,
                ar: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
                phonetic: 'Wa min sharri hāsidin izhā hasad',
                es: 'y del mal del envidioso cuando envidia».',
                en: 'And from the evil of an envier when he envies."',
                tajweedEs: 'Termina con Qalqalah en la letra Dal en "hasad".',
                tajweedEn: 'Concludes with rhythmic Qalqalah on Dal at "hasad".',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/113005.mp3'
            }
        ]
    },
    {
        id: 'nas',
        surahNumber: '114',
        titleAr: 'سُورَةُ النَّاس',
        titleEs: 'Surah An-Nās (La Humanidad)',
        titleEn: 'Surah An-Nās (Mankind)',
        descEs: 'La última Surah del Sagrado Corán. Refugio contra las insinuaciones negativas.',
        descEn: 'The final chapter of the Quran. Refuge from insidious whispering.',
        verses: [
            {
                number: 1,
                ar: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
                phonetic: 'Qul a‘ūdhu bi-Rabbi an-nās',
                es: 'Di: «Me refugio en el Señor de los seres humanos,',
                en: 'Say: "I seek refuge in the Lord of mankind,',
                tajweedEs: 'Ghunnah sostenida en "An-Nās" con prolongación suave.',
                tajweedEn: 'Sustained nasal Ghunnah on "An-Nās" with smooth vowel flow.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/114001.mp3'
            },
            {
                number: 2,
                ar: 'مَلِكِ النَّاسِ',
                phonetic: 'Maliki an-nās',
                es: 'el Soberano de los seres humanos,',
                en: 'The Sovereign of mankind,',
                tajweedEs: 'Articulación nítida de la letra Lam en Maliki sin alargar innecesariamente.',
                tajweedEn: 'Crisp articulation of Lam in Maliki without unnecessary elongation.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/114002.mp3'
            },
            {
                number: 3,
                ar: 'إِلَٰهِ النَّاسِ',
                phonetic: 'Ilāhi an-nās',
                es: 'el Dios de los seres humanos,',
                en: 'The God of mankind,',
                tajweedEs: 'Madd natural en la Lam con Dagger Alif (إِلَٰـ).',
                tajweedEn: 'Natural 2-count Madd on the Lam with Dagger Alif (إِلَٰـ).',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/114003.mp3'
            },
            {
                number: 4,
                ar: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
                phonetic: 'Min sharril waswāsil khannās',
                es: 'del mal del murmurador furtivo que susurra y luego huye,',
                en: 'From the evil of the retreating whisperer,',
                tajweedEs: 'Diferencia la "Khaa" (خ) áspera de garganta en al-Khannās.',
                tajweedEn: 'Distinguish the uvular fricative "Khaa" (خ) in al-Khannās.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/114004.mp3'
            },
            {
                number: 5,
                ar: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
                phonetic: 'Alladhī yuwaswisu fī sudūrin-nās',
                es: 'que susurra dudas en los corazones de los hombres,',
                en: 'Who whispers [evil] into the breasts of mankind,',
                tajweedEs: 'La letra "Saad" (ص) en sudūr es redonda y profunda.',
                tajweedEn: 'The emphatic "Saad" (ص) in sudūr is deep, rounded, and full.',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/114005.mp3'
            },
            {
                number: 6,
                ar: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
                phonetic: 'Minal jinnati wan-nās',
                es: 'tanto de entre los genios como de entre los hombres».',
                en: 'From among the jinn and mankind."',
                tajweedEs: 'Cierre con hermosa Ghunnah en "Jinnati" y "An-Nās".',
                tajweedEn: 'Final closure with beautiful Ghunnah on "Jinnati" and "An-Nās".',
                audioSrc: 'https://everyayah.com/data/Alafasy_128kbps/114006.mp3'
            }
        ]
    }
];

class QuranAudioPlayer {
    constructor() {
        this.currentSurahIndex = 0;
        this.currentVerseIndex = 0;
        this.isPlaying = false;
        this.playbackRate = 1.0;
        this.audio = new Audio();

        this.initDomElements();
        this.setupAudioEvents();
        this.renderSurahTabs();
        this.loadSurah(0);
    }

    getLang() {
        return window.currentLanguage || 'es';
    }

    initDomElements() {
        this.tabsContainer = document.getElementById('audio-surah-tabs');
        this.surahTitleArEl = document.getElementById('player-surah-ar');
        this.surahTitleEsEl = document.getElementById('player-surah-es');
        this.surahDescEl = document.getElementById('player-surah-desc');
        this.verseListEl = document.getElementById('player-verse-list');

        this.playBtn = document.getElementById('btn-play-pause');
        this.prevBtn = document.getElementById('btn-prev-verse');
        this.nextBtn = document.getElementById('btn-next-verse');
        this.speedBtn = document.getElementById('btn-playback-speed');
        this.progressBar = document.getElementById('player-progress-bar');
        this.currentTimeEl = document.getElementById('player-current-time');
        this.totalTimeEl = document.getElementById('player-total-time');

        if (this.playBtn) {
            this.playBtn.addEventListener('click', () => this.togglePlay());
        }
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevVerse());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextVerse());
        }
        if (this.speedBtn) {
            this.speedBtn.addEventListener('click', () => this.toggleSpeed());
        }
    }

    setupAudioEvents() {
        this.audio.addEventListener('ended', () => {
            const surah = quranPlaylists[this.currentSurahIndex];
            if (this.currentVerseIndex < surah.verses.length - 1) {
                this.currentVerseIndex++;
                this.playCurrentVerse();
            } else {
                this.isPlaying = false;
                this.updatePlayBtnIcon();
            }
        });

        this.audio.addEventListener('timeupdate', () => {
            if (!this.audio.duration) return;
            const pct = (this.audio.currentTime / this.audio.duration) * 100;
            if (this.progressBar) {
                this.progressBar.style.width = `${pct}%`;
            }
            if (this.currentTimeEl) {
                this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
            }
            if (this.totalTimeEl && !isNaN(this.audio.duration)) {
                this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
            }
        });

        this.audio.addEventListener('error', (e) => {
            console.warn('Audio playback notice:', e);
            this.isPlaying = false;
            this.updatePlayBtnIcon();
        });
    }

    renderSurahTabs() {
        if (!this.tabsContainer) return;
        this.tabsContainer.innerHTML = '';
        const isEn = this.getLang() === 'en';

        quranPlaylists.forEach((surah, index) => {
            const btn = document.createElement('button');
            btn.className = `surah-tab-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                index === this.currentSurahIndex 
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-lg shadow-amber-500/10' 
                    : 'bg-emerald-950/60 text-emerald-200/80 hover:bg-emerald-900/60 border border-emerald-800/40'
            }`;
            const title = isEn ? surah.titleEn : surah.titleEs;
            btn.innerHTML = `
                <span class="w-6 h-6 rounded-full bg-emerald-800/80 flex items-center justify-center text-xs text-amber-300 font-mono">${index + 1}</span>
                <span>${title.split(' ')[1]}</span>
            `;
            btn.addEventListener('click', () => {
                this.loadSurah(index);
                this.playCurrentVerse();
            });
            this.tabsContainer.appendChild(btn);
        });
    }

    loadSurah(surahIdx) {
        this.currentSurahIndex = surahIdx;
        this.currentVerseIndex = 0;
        const surah = quranPlaylists[surahIdx];
        const isEn = this.getLang() === 'en';

        if (this.surahTitleArEl) this.surahTitleArEl.textContent = surah.titleAr;
        if (this.surahTitleEsEl) this.surahTitleEsEl.textContent = isEn ? surah.titleEn : surah.titleEs;
        if (this.surahDescEl) this.surahDescEl.textContent = isEn ? surah.descEn : surah.descEs;

        this.renderVersesList();
        this.renderSurahTabs();
        this.updateActiveVerseHighlight();
    }

    renderVersesList() {
        if (!this.verseListEl) return;
        const surah = quranPlaylists[this.currentSurahIndex];
        const isEn = this.getLang() === 'en';
        this.verseListEl.innerHTML = '';

        surah.verses.forEach((v, idx) => {
            const item = document.createElement('div');
            item.id = `verse-item-${idx}`;
            item.className = `verse-card p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                idx === this.currentVerseIndex
                    ? 'border-amber-400/60 bg-emerald-900/60 shadow-lg shadow-amber-500/10'
                    : 'border-emerald-800/30 bg-emerald-950/40 hover:bg-emerald-900/30 hover:border-emerald-700/40'
            }`;

            const practiceText = isEn ? 'Click to listen & practice' : 'Pulsa para escuchar y practicar';
            const phoneticTitle = isEn ? 'Guided phonetic pronunciation:' : 'Pronunciación fonética guiada:';
            const translationTitle = isEn ? 'Translation:' : 'Traducción:';
            const teacherNoteTitle = isEn ? "Teacher's Note:" : 'Nota del Maestro:';
            const translationText = isEn ? v.en : v.es;
            const tajweedText = isEn ? v.tajweedEn : v.tajweedEs;

            item.innerHTML = `
                <div class="flex items-start justify-between gap-4 mb-3">
                    <div class="flex items-center gap-3">
                        <span class="verse-badge w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                            idx === this.currentVerseIndex ? 'bg-amber-400 text-emerald-950 shadow-md' : 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/50'
                        }">
                            ${v.number}
                        </span>
                        <span class="text-xs uppercase tracking-wider font-semibold text-amber-300/80 flex items-center gap-1.5">
                            <i class="fa-solid fa-volume-high text-[10px]"></i> ${practiceText}
                        </span>
                    </div>
                    <button class="play-single-verse-btn w-8 h-8 rounded-full bg-emerald-800/60 hover:bg-amber-400 hover:text-emerald-950 text-amber-300 transition-colors flex items-center justify-center text-xs">
                        <i class="fa-solid fa-play"></i>
                    </button>
                </div>

                <!-- Arabic Recitation Line -->
                <p class="arabic-text text-right text-2xl sm:text-3xl text-emerald-50 leading-loose mb-3 font-arabic" dir="rtl">
                    ${v.ar}
                </p>

                <!-- Phonetics for Spanish & English Speakers -->
                <div class="mb-2">
                    <span class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">${phoneticTitle}</span>
                    <p class="text-sm font-medium text-amber-200/95 italic bg-black/20 px-3 py-1.5 rounded-lg border border-amber-500/15">
                        ${v.phonetic}
                    </p>
                </div>

                <!-- Meaning -->
                <div class="mb-2">
                    <span class="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block mb-0.5">${translationTitle}</span>
                    <p class="text-sm text-emerald-100/90 font-sans">
                        ${translationText}
                    </p>
                </div>

                <!-- Tajweed Pedagogy Note -->
                <div class="mt-3 pt-2.5 border-t border-emerald-800/40 flex items-start gap-2 text-xs text-amber-200/80">
                    <i class="fa-solid fa-lightbulb text-amber-400 mt-0.5"></i>
                    <div>
                        <strong class="text-amber-300">${teacherNoteTitle}</strong> ${tajweedText}
                    </div>
                </div>
            `;

            item.addEventListener('click', () => {
                this.currentVerseIndex = idx;
                this.playCurrentVerse();
            });

            this.verseListEl.appendChild(item);
        });
    }

    updateActiveVerseHighlight() {
        const surah = quranPlaylists[this.currentSurahIndex];
        surah.verses.forEach((_, idx) => {
            const el = document.getElementById(`verse-item-${idx}`);
            if (!el) return;
            const badge = el.querySelector('.verse-badge');

            if (idx === this.currentVerseIndex) {
                el.className = el.className.replace('border-emerald-800/30 bg-emerald-950/40', 'border-amber-400/60 bg-emerald-900/60 shadow-lg shadow-amber-500/10');
                if (badge) {
                    badge.className = 'verse-badge w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono bg-amber-400 text-emerald-950 shadow-md';
                }
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                el.className = el.className.replace('border-amber-400/60 bg-emerald-900/60 shadow-lg shadow-amber-500/10', 'border-emerald-800/30 bg-emerald-950/40');
                if (badge) {
                    badge.className = 'verse-badge w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono bg-emerald-900/80 text-emerald-300 border border-emerald-700/50';
                }
            }
        });
    }

    playCurrentVerse() {
        const surah = quranPlaylists[this.currentSurahIndex];
        const verse = surah.verses[this.currentVerseIndex];
        if (!verse) return;

        this.audio.src = verse.audioSrc;
        this.audio.playbackRate = this.playbackRate;
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayBtnIcon();
            this.updateActiveVerseHighlight();
        }).catch(err => {
            console.warn('Playback waiting user gesture:', err);
            this.isPlaying = false;
            this.updatePlayBtnIcon();
        });
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        } else {
            if (!this.audio.src) {
                this.playCurrentVerse();
            } else {
                this.audio.playbackRate = this.playbackRate;
                this.audio.play();
                this.isPlaying = true;
            }
        }
        this.updatePlayBtnIcon();
    }

    prevVerse() {
        if (this.currentVerseIndex > 0) {
            this.currentVerseIndex--;
            this.playCurrentVerse();
        }
    }

    nextVerse() {
        const surah = quranPlaylists[this.currentSurahIndex];
        if (this.currentVerseIndex < surah.verses.length - 1) {
            this.currentVerseIndex++;
            this.playCurrentVerse();
        }
    }

    toggleSpeed() {
        if (this.playbackRate === 1.0) {
            this.playbackRate = 0.75;
        } else if (this.playbackRate === 0.75) {
            this.playbackRate = 1.25;
        } else {
            this.playbackRate = 1.0;
        }
        this.audio.playbackRate = this.playbackRate;
        if (this.speedBtn) {
            this.speedBtn.textContent = `${this.playbackRate}x`;
        }
    }

    updatePlayBtnIcon() {
        if (!this.playBtn) return;
        const icon = this.playBtn.querySelector('i');
        if (icon) {
            icon.className = this.isPlaying ? 'fa-solid fa-pause text-xl' : 'fa-solid fa-play text-xl ml-0.5';
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}

// Global initialization
window.initQuranAudioPlayer = function() {
    window.quranAudioPlayer = new QuranAudioPlayer();
    return window.quranAudioPlayer;
};
