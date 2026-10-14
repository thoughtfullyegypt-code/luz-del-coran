/**
 * =========================================================================
 * Luz del Corán - Panel de Configuración General
 * Personaliza los datos de contacto del Maestro, precios y enlaces aquí.
 * =========================================================================
 */

window.ACADEMY_CONFIG = {
    // Nombre del Maestro / Academia
    brandName: "Luz del Corán",
    teacherTitle: "El Ustadz",
    teacherSubtitle: "Especialista en Fonética Coránica y Tajweed para Hispanohablantes",

    // Número de WhatsApp para recibir a los nuevos alumnos (con código de país, sin espacios ni '+')
    // Ejemplo para España: "34612345678" | México: "5215512345678" | EE.UU.: "13051234567"
    teacherWhatsAppNumber: "34600000000",

    // Correo de contacto
    contactEmail: "contacto@luzdelcoran.com",

    // Planes y Precios
    pricing: {
        monthlyUSD: 100,
        monthlyEUR: 92,
        sessionsPerWeek: 2,
        sessionHours: 1, // 1 hora por sesión
        totalMonthlyHours: 8,
        currencySymbolUSD: "$",
        currencySymbolEUR: "€"
    },

    // Enlaces de Pago Opcionales (Integración directa)
    payments: {
        stripePaymentLink: "https://buy.stripe.com/demo_link", // Reemplazar con tu enlace de Stripe Payment Links
        paypalMeUrl: "https://paypal.me/tuusuario/100usd",    // Reemplazar con tu enlace de PayPal.me
        bizumPhone: "+34 600 000 000"                         // Para alumnos de España
    },

    // Plataformas de clase
    classPlatforms: ["Zoom", "Google Meet"]
};
