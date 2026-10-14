/**
 * Luz del Corán / Light of the Quran - Subscription & Enrollment Flow
 * Handles student registration, schedule preferences, and monthly subscription ($100/mo).
 * Fully bilingual (Spanish & English).
 */

class SubscriptionEngine {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        const cfg = window.ACADEMY_CONFIG || {};
        this.planPriceUSD = (cfg.pricing && cfg.pricing.monthlyUSD) || 100;
        this.planPriceEUR = (cfg.pricing && cfg.pricing.monthlyEUR) || 92;
        this.currency = 'USD';
        this.teacherWhatsAppNumber = cfg.teacherWhatsAppNumber || '34600000000';

        this.formData = {
            studentName: '',
            studentEmail: '',
            countryCode: '+34',
            whatsappNumber: '',
            timezone: 'Europe/Madrid',
            studentLevel: 'principiante',
            scheduleDays: 'lun-mie',
            scheduleTimeOfDay: 'tarde',
            studentNotes: '',
            paymentMethod: 'card'
        };

        this.init();
    }

    getLang() {
        return window.currentLanguage || 'es';
    }

    init() {
        this.initModalTriggers();
        this.setupFormNavigation();
        this.setupInputFormatters();
        this.setupWhatsAppQuickAction();
        this.loadSavedLead();
    }

    initModalTriggers() {
        // Open modal buttons
        const openButtons = document.querySelectorAll('[data-open-subscribe]');
        openButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const levelPreset = btn.getAttribute('data-level');
                if (levelPreset) {
                    this.formData.studentLevel = levelPreset;
                    const levelRadio = document.querySelector(`input[name="studentLevel"][value="${levelPreset}"]`);
                    if (levelRadio) levelRadio.checked = true;
                }
                this.openModal();
            });
        });

        // Close modal buttons
        const closeBtn = document.getElementById('btn-close-sub-modal');
        const modalBackdrop = document.getElementById('sub-modal-backdrop');
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', (e) => {
                if (e.target === modalBackdrop) this.closeModal();
            });
        }

        // Escape key to close
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    openModal() {
        const modal = document.getElementById('subscription-modal');
        if (!modal) return;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.goToStep(1);
    }

    closeModal() {
        const modal = document.getElementById('subscription-modal');
        if (!modal) return;
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    setupFormNavigation() {
        const nextBtn1 = document.getElementById('btn-step-1-next');
        const nextBtn2 = document.getElementById('btn-step-2-next');
        const backBtn2 = document.getElementById('btn-step-2-back');
        const backBtn3 = document.getElementById('btn-step-3-back');
        const submitBtn = document.getElementById('btn-complete-subscription');

        if (nextBtn1) {
            nextBtn1.addEventListener('click', () => {
                if (this.validateStep1()) {
                    this.goToStep(2);
                }
            });
        }

        if (nextBtn2) {
            nextBtn2.addEventListener('click', () => {
                this.saveStep2();
                this.updateOrderSummary();
                this.goToStep(3);
            });
        }

        if (backBtn2) backBtn2.addEventListener('click', () => this.goToStep(1));
        if (backBtn3) backBtn3.addEventListener('click', () => this.goToStep(2));

        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFinalSubscription();
            });
        }

        // Payment method selector tabs
        const paymentRadioButtons = document.querySelectorAll('input[name="paymentMethod"]');
        paymentRadioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.formData.paymentMethod = e.target.value;
                this.togglePaymentMethodUI(e.target.value);
            });
        });
    }

    togglePaymentMethodUI(method) {
        const cardSection = document.getElementById('pay-card-section');
        const paypalSection = document.getElementById('pay-paypal-section');
        const whatsappSection = document.getElementById('pay-whatsapp-section');

        if (cardSection) cardSection.classList.toggle('hidden', method !== 'card');
        if (paypalSection) paypalSection.classList.toggle('hidden', method !== 'paypal');
        if (whatsappSection) whatsappSection.classList.toggle('hidden', method !== 'whatsapp');
    }

    validateStep1() {
        const nameInput = document.getElementById('input-student-name');
        const emailInput = document.getElementById('input-student-email');
        const phoneInput = document.getElementById('input-student-whatsapp');
        const codeInput = document.getElementById('input-country-code');
        const levelRadio = document.querySelector('input[name="studentLevel"]:checked');
        const isEn = this.getLang() === 'en';

        let isValid = true;

        if (!nameInput || !nameInput.value.trim()) {
            this.showInputError(nameInput, isEn ? 'Please enter your full name' : 'Por favor, escribe tu nombre completo');
            isValid = false;
        } else {
            this.clearInputError(nameInput);
            this.formData.studentName = nameInput.value.trim();
        }

        if (!emailInput || !emailInput.value.trim() || !this.isValidEmail(emailInput.value.trim())) {
            this.showInputError(emailInput, isEn ? 'Please enter a valid email address' : 'Introduce un correo electrónico válido');
            isValid = false;
        } else {
            this.clearInputError(emailInput);
            this.formData.studentEmail = emailInput.value.trim();
        }

        if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim().length < 6) {
            this.showInputError(phoneInput, isEn ? 'Please enter your WhatsApp number to coordinate classes' : 'Introduce tu número de WhatsApp para coordinar tus clases');
            isValid = false;
        } else {
            this.clearInputError(phoneInput);
            this.formData.whatsappNumber = phoneInput.value.trim();
        }

        if (codeInput) {
            this.formData.countryCode = codeInput.value;
        }

        if (levelRadio) {
            this.formData.studentLevel = levelRadio.value;
        }

        const tzSelect = document.getElementById('input-timezone');
        if (tzSelect) {
            this.formData.timezone = tzSelect.value;
        }

        return isValid;
    }

    saveStep2() {
        const daysRadio = document.querySelector('input[name="scheduleDays"]:checked');
        const timeRadio = document.querySelector('input[name="scheduleTime"]:checked');
        const notesInput = document.getElementById('input-student-notes');

        if (daysRadio) this.formData.scheduleDays = daysRadio.value;
        if (timeRadio) this.formData.scheduleTimeOfDay = timeRadio.value;
        if (notesInput) this.formData.studentNotes = notesInput.value.trim();
    }

    goToStep(stepNumber) {
        this.currentStep = stepNumber;

        // Hide all step panels
        document.querySelectorAll('.sub-step-panel').forEach(panel => {
            panel.classList.add('hidden');
        });

        // Show target step panel
        const targetPanel = document.getElementById(`sub-step-${stepNumber}`);
        if (targetPanel) {
            targetPanel.classList.remove('hidden');
        }

        // Update step indicators
        for (let i = 1; i <= this.totalSteps; i++) {
            const stepBadge = document.getElementById(`step-indicator-${i}`);
            const stepText = document.getElementById(`step-text-${i}`);
            if (stepBadge) {
                if (i === stepNumber) {
                    stepBadge.className = 'w-8 h-8 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-amber-400/20';
                    if (stepText) stepText.className = 'text-xs font-semibold text-amber-300';
                } else if (i < stepNumber) {
                    stepBadge.className = 'w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm';
                    stepBadge.innerHTML = '<i class="fa-solid fa-check text-xs"></i>';
                    if (stepText) stepText.className = 'text-xs font-medium text-emerald-300';
                } else {
                    stepBadge.className = 'w-8 h-8 rounded-full bg-emerald-900/60 text-emerald-400/60 border border-emerald-700/40 flex items-center justify-center font-bold text-sm';
                    stepBadge.textContent = `${i}`;
                    if (stepText) stepText.className = 'text-xs font-medium text-emerald-500';
                }
            }
        }
    }

    updateOrderSummary() {
        const namePreview = document.getElementById('summary-student-name');
        const schedulePreview = document.getElementById('summary-student-schedule');
        const levelPreview = document.getElementById('summary-student-level');
        const isEn = this.getLang() === 'en';

        if (namePreview) namePreview.textContent = this.formData.studentName;
        if (schedulePreview) {
            const daysMapEs = {
                'lun-mie': 'Lunes y Miércoles',
                'mar-jue': 'Martes y Jueves',
                'vie-dom': 'Viernes y Domingo',
                'flexible': 'Horario a convenir con el Maestro'
            };
            const daysMapEn = {
                'lun-mie': 'Monday & Wednesday',
                'mar-jue': 'Tuesday & Thursday',
                'vie-dom': 'Friday & Sunday',
                'flexible': 'Flexible schedule with Teacher'
            };
            const timeMapEs = {
                'manana': 'Por la mañana (09:00 - 13:00)',
                'tarde': 'Por la tarde (14:00 - 19:00)',
                'noche': 'Por la noche (20:00 - 23:00)'
            };
            const timeMapEn = {
                'manana': 'Mornings (09:00 - 13:00)',
                'tarde': 'Afternoons (14:00 - 19:00)',
                'noche': 'Evenings (20:00 - 23:00)'
            };
            const days = isEn ? daysMapEn[this.formData.scheduleDays] : daysMapEs[this.formData.scheduleDays];
            const time = isEn ? timeMapEn[this.formData.scheduleTimeOfDay] : timeMapEs[this.formData.scheduleTimeOfDay];
            schedulePreview.textContent = `${days || ''} · ${time || ''}`;
        }
        if (levelPreview) {
            const levelMapEs = {
                'principiante': 'Principiante (Desde cero)',
                'basico': 'Lectura básica (Fluidez)',
                'tajweed': 'Tajweed y Pronunciación',
                'hifz': 'Memorización y Recitación'
            };
            const levelMapEn = {
                'principiante': 'Beginner (From scratch)',
                'basico': 'Basic reading (Fluency)',
                'tajweed': 'Tajweed & Pronunciation',
                'hifz': 'Memorization & Recitation'
            };
            levelPreview.textContent = (isEn ? levelMapEn[this.formData.studentLevel] : levelMapEs[this.formData.studentLevel]) || 'Beginner';
        }
    }

    setupInputFormatters() {
        const cardNumInput = document.getElementById('input-card-number');
        if (cardNumInput) {
            cardNumInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\D/g, '').substring(0, 16);
                let formatted = '';
                for (let i = 0; i < val.length; i++) {
                    if (i > 0 && i % 4 === 0) formatted += ' ';
                    formatted += val[i];
                }
                e.target.value = formatted;
            });
        }

        const cardExpInput = document.getElementById('input-card-exp');
        if (cardExpInput) {
            cardExpInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\D/g, '').substring(0, 4);
                if (val.length >= 2) {
                    val = val.substring(0, 2) + '/' + val.substring(2);
                }
                e.target.value = val;
            });
        }

        const cardCvcInput = document.getElementById('input-card-cvc');
        if (cardCvcInput) {
            cardCvcInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
            });
        }
    }

    setupWhatsAppQuickAction() {
        const btnDirectWA = document.getElementById('btn-subscribe-whatsapp-direct');
        if (btnDirectWA) {
            btnDirectWA.addEventListener('click', () => {
                this.openWhatsAppWithStudentData();
            });
        }
    }

    openWhatsAppWithStudentData() {
        const isEn = this.getLang() === 'en';

        let text = '';
        if (isEn) {
            text = encodeURIComponent(
                `Salam Alaykum Ustadz. I would like to activate my monthly subscription to *Light of the Quran* ($100 USD/month - 2 weekly 1-hour sessions).\n\n` +
                `👤 *Student:* ${this.formData.studentName || 'Student'}\n` +
                `📧 *Email:* ${this.formData.studentEmail || 'Not specified'}\n` +
                `📱 *WhatsApp:* ${this.formData.countryCode} ${this.formData.whatsappNumber}\n` +
                `📍 *Timezone:* ${this.formData.timezone}\n` +
                `📖 *Level:* ${this.formData.studentLevel}\n` +
                `🗓️ *Preferred Schedule:* ${this.formData.scheduleDays} (${this.formData.scheduleTimeOfDay})\n` +
                `💬 *Notes:* ${this.formData.studentNotes || 'Ready to start as soon as possible'}\n\n` +
                `How do we finalize payment and coordinate our first session? Thank you very much!`
            );
        } else {
            text = encodeURIComponent(
                `Salam Alaykum Ustadz. Deseo formalizar mi suscripción mensual en *Luz del Corán* ($100 USD/mes - 2 clases semanales de 1 hora).\n\n` +
                `👤 *Nombre:* ${this.formData.studentName || 'Estudiante'}\n` +
                `📧 *Email:* ${this.formData.studentEmail || 'No especificado'}\n` +
                `📱 *WhatsApp:* ${this.formData.countryCode} ${this.formData.whatsappNumber}\n` +
                `📍 *Zona horaria:* ${this.formData.timezone}\n` +
                `📖 *Nivel:* ${this.formData.studentLevel}\n` +
                `🗓️ *Preferencia:* ${this.formData.scheduleDays} (${this.formData.scheduleTimeOfDay})\n` +
                `💬 *Notas adicionales:* ${this.formData.studentNotes || 'Deseo empezar cuanto antes'}\n\n` +
                `¿Cómo coordinamos el pago y nuestra primera sesión? ¡Muchas gracias!`
            );
        }

        const waUrl = `https://wa.me/${this.teacherWhatsAppNumber}?text=${text}`;
        window.open(waUrl, '_blank');
    }

    handleFinalSubscription() {
        const submitBtn = document.getElementById('btn-complete-subscription');
        const originalContent = submitBtn.innerHTML;
        const isEn = this.getLang() === 'en';

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <i class="fa-solid fa-circle-notch fa-spin"></i>
            <span>${isEn ? 'Processing secure subscription...' : 'Procesando suscripción segura...'}</span>
        `;

        setTimeout(() => {
            this.saveLeadToLocalStorage();

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#d4af37', '#10b981', '#fceda2', '#059669']
                });
            }

            this.showSuccessScreen();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }, 1400);
    }

    showSuccessScreen() {
        const enrollId = 'LC-' + Math.floor(100000 + Math.random() * 900000);
        const container = document.getElementById('sub-modal-content-wrapper');
        if (!container) return;

        const isEn = this.getLang() === 'en';
        const firstName = this.formData.studentName.split(' ')[0] || (isEn ? 'Student' : 'Estudiante');

        if (isEn) {
            container.innerHTML = `
                <div class="text-center py-6 px-4">
                    <div class="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/20 animate-bounce">
                        <i class="fa-solid fa-check text-3xl text-emerald-400"></i>
                    </div>

                    <span class="inline-block px-3 py-1 bg-amber-400/20 border border-amber-400/40 rounded-full text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
                        Enrollment Confirmed Successfully!
                    </span>

                    <h3 class="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                        Welcome to Light of the Quran, ${firstName}!
                    </h3>

                    <p class="text-emerald-200/90 text-sm max-w-lg mx-auto mb-6">
                        Your monthly subscription for <strong>$100 USD (2 weekly 1-hour sessions)</strong> has been recorded. The Teacher has received your enrollment file and will contact you directly via WhatsApp.
                    </p>

                    <!-- Receipt Card -->
                    <div class="bg-emerald-950/80 border border-emerald-800/60 rounded-2xl p-5 max-w-md mx-auto text-left mb-6 shadow-inner">
                        <div class="flex justify-between items-center border-b border-emerald-800/50 pb-3 mb-3 text-xs">
                            <span class="text-emerald-400 font-semibold uppercase">Enrollment ID:</span>
                            <span class="font-mono text-amber-300 font-bold">${enrollId}</span>
                        </div>
                        <div class="space-y-2 text-xs text-emerald-200/90">
                            <div class="flex justify-between">
                                <span class="text-emerald-400">Student:</span>
                                <span class="font-medium text-white">${this.formData.studentName}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-emerald-400">Contact WhatsApp:</span>
                                <span class="font-mono text-white">${this.formData.countryCode} ${this.formData.whatsappNumber}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-emerald-400">Class Plan:</span>
                                <span class="font-medium text-amber-300">2 weekly sessions (8h/month)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-emerald-400">Monthly Fee:</span>
                                <span class="font-bold text-white">$100.00 USD / month</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-emerald-400">Class Platform:</span>
                                <span class="text-white">Zoom / Google Meet (live)</span>
                            </div>
                        </div>
                    </div>

                    <!-- Action buttons -->
                    <div class="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
                        <button id="btn-success-connect-wa" class="w-full sm:w-auto flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5">
                            <i class="fa-brands fa-whatsapp text-xl"></i>
                            <span>Message Teacher on WhatsApp</span>
                        </button>
                        <button id="btn-success-close" class="w-full sm:w-auto bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 font-medium py-3.5 px-6 rounded-xl border border-emerald-700/50 transition-all">
                            Close Window
                        </button>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="text-center py-6 px-4">
                    <div class="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/20 animate-bounce">
                        <i class="fa-solid fa-check text-3xl text-emerald-400"></i>
                    </div>

                    <span class="inline-block px-3 py-1 bg-amber-400/20 border border-amber-400/40 rounded-full text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
                        ¡Matrícula Confirmada con Éxito!
                    </span>

                    <h3 class="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                        ¡Bienvenido a Luz del Corán, ${firstName}!
                    </h3>

                    <p class="text-emerald-200/90 text-sm max-w-lg mx-auto mb-6">
                        Tu suscripción mensual de <strong>$100 USD (2 sesiones de 1 hora por semana)</strong> ha sido registrada. El Maestro ha recibido tu ficha de inscripción y se pondrá en contacto contigo de inmediato por WhatsApp.
                    </p>

                    <!-- Receipt Card -->
                    <div class="bg-emerald-950/80 border border-emerald-800/60 rounded-2xl p-5 max-w-md mx-auto text-left mb-6 shadow-inner">
                        <div class="flex justify-between items-center border-b border-emerald-800/50 pb-3 mb-3 text-xs">
                            <span class="text-emerald-400 font-semibold uppercase">ID de Matrícula:</span>
                            <span class="font-mono text-amber-300 font-bold">${enrollId}</span>
                        </div>
                        <div class="space-y-2 text-xs text-emerald-200/90">
                            <div class="flex justify-between">
                                <span class="text-emerald-400">Estudiante:</span>
                                <span class="font-medium text-white">${this.formData.studentName}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-emerald-400">WhatsApp de contacto:</span>
                                <span class="font-mono text-white">${this.formData.countryCode} ${this.formData.whatsappNumber}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-emerald-400">Plan de Clases:</span>
                                <span class="font-medium text-amber-300">2 sesiones semanales (8h/mes)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-emerald-400">Cuota Mensual:</span>
                                <span class="font-bold text-white">$100.00 USD / mes</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-emerald-400">Plataforma de clase:</span>
                                <span class="text-white">Zoom / Google Meet (en vivo)</span>
                            </div>
                        </div>
                    </div>

                    <!-- Action buttons -->
                    <div class="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
                        <button id="btn-success-connect-wa" class="w-full sm:w-auto flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5">
                            <i class="fa-brands fa-whatsapp text-xl"></i>
                            <span>Contactar al Maestro ahora</span>
                        </button>
                        <button id="btn-success-close" class="w-full sm:w-auto bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 font-medium py-3.5 px-6 rounded-xl border border-emerald-700/50 transition-all">
                            Cerrar ventana
                        </button>
                    </div>
                </div>
            `;
        }

        const connectWaBtn = document.getElementById('btn-success-connect-wa');
        const successCloseBtn = document.getElementById('btn-success-close');

        if (connectWaBtn) {
            connectWaBtn.addEventListener('click', () => {
                this.openWhatsAppWithStudentData();
            });
        }
        if (successCloseBtn) {
            successCloseBtn.addEventListener('click', () => {
                this.closeModal();
                setTimeout(() => window.location.reload(), 300);
            });
        }
    }

    saveLeadToLocalStorage() {
        try {
            const leads = JSON.parse(localStorage.getItem('quran_leads') || '[]');
            leads.push({
                ...this.formData,
                date: new Date().toISOString(),
                status: 'subscribed_pending_first_class'
            });
            localStorage.setItem('quran_leads', JSON.stringify(leads));
        } catch (e) {
            console.warn('LocalStorage error:', e);
        }
    }

    loadSavedLead() {
        try {
            const lastLead = localStorage.getItem('quran_last_student_info');
            if (lastLead) {
                const parsed = JSON.parse(lastLead);
                if (parsed.studentName) {
                    const nameInput = document.getElementById('input-student-name');
                    if (nameInput) nameInput.value = parsed.studentName;
                }
            }
        } catch (e) {
            // ignore
        }
    }

    showInputError(inputEl, message) {
        inputEl.classList.add('border-red-500', 'bg-red-950/20');
        let errorEl = inputEl.parentElement.querySelector('.error-msg');
        if (!errorEl) {
            errorEl = document.createElement('p');
            errorEl.className = 'error-msg text-xs text-red-400 mt-1 font-medium flex items-center gap-1';
            inputEl.parentElement.appendChild(errorEl);
        }
        errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
    }

    clearInputError(inputEl) {
        inputEl.classList.remove('border-red-500', 'bg-red-950/20');
        const errorEl = inputEl.parentElement.querySelector('.error-msg');
        if (errorEl) errorEl.remove();
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// Global initialization
window.initSubscriptionEngine = function() {
    return new SubscriptionEngine();
};
