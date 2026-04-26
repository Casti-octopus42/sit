import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

/**
 * Initialize email transporter
 * Uses environment variables for configuration
 */
export async function initializeEmailTransporter() {
  if (transporter) return transporter;

  // For development/testing, use Ethereal Email (free test service)
  // For production, configure with your email provider
  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return transporter;
}

/**
 * Get email transporter instance
 */
export async function getEmailTransporter() {
  if (!transporter) {
    await initializeEmailTransporter();
  }
  return transporter;
}

/**
 * Email templates for reservations
 */
export const emailTemplates = {
  confirmationFr: (data: {
    fullName: string;
    email: string;
    date: string;
    time: string;
    serviceType: string;
    company?: string;
  }) => ({
    subject: 'Confirmation de votre consultation gratuite - CASTI OCTUPUS',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0B1730; color: #C8A84B; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .footer { background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
            .detail-box { background-color: #fff; border-left: 4px solid #C8A84B; padding: 15px; margin: 15px 0; }
            .label { font-weight: bold; color: #0B1730; }
            .button { background-color: #C8A84B; color: #0B1730; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🐙 CASTI OCTUPUS</h1>
              <p>Agence de Transformation Numérique</p>
            </div>
            
            <div class="content">
              <h2>Bonjour ${data.fullName},</h2>
              
              <p>Merci de votre intérêt pour nos services de transformation numérique. Votre consultation gratuite a été confirmée avec succès!</p>
              
              <div class="detail-box">
                <p><span class="label">📅 Date et heure:</span><br>${data.date} à ${data.time}</p>
                <p><span class="label">🎯 Type de service:</span><br>${getServiceLabel(data.serviceType, 'fr')}</p>
                ${data.company ? `<p><span class="label">🏢 Entreprise:</span><br>${data.company}</p>` : ''}
                <p><span class="label">📧 Email de confirmation:</span><br>${data.email}</p>
              </div>
              
              <p>Notre équipe d'experts vous contactera à l'heure prévue pour discuter de votre projet et explorer les meilleures solutions pour votre transformation numérique.</p>
              
              <p><strong>Conseils avant votre consultation:</strong></p>
              <ul>
                <li>Préparez une description de vos objectifs commerciaux</li>
                <li>Notez les défis actuels de votre présence numérique</li>
                <li>Pensez à vos questions pour nos experts</li>
              </ul>
              
              <p>Si vous devez reprogrammer ou annuler, veuillez nous contacter au <strong>+213 (0) 552438906</strong> ou via WhatsApp.</p>
              
              <p>Cordialement,<br><strong>L'équipe CASTI OCTUPUS</strong></p>
            </div>
            
            <div class="footer">
              <p>CASTI OCTUPUS - Agence de Transformation Numérique en Algérie</p>
              <p>📞 +213 (0) 552438906 | 📧 castignt42@outlook.com</p>
              <p>© 2026 CASTI OCTUPUS. Tous droits réservés.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  confirmationAr: (data: {
    fullName: string;
    email: string;
    date: string;
    time: string;
    serviceType: string;
    company?: string;
  }) => ({
    subject: 'تأكيد استشارتك المجانية - كاستي أوكتوبس',
    html: `
      <!DOCTYPE html>
      <html dir="rtl">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; direction: rtl; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0B1730; color: #C8A84B; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .footer { background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
            .detail-box { background-color: #fff; border-right: 4px solid #C8A84B; padding: 15px; margin: 15px 0; }
            .label { font-weight: bold; color: #0B1730; }
            .button { background-color: #C8A84B; color: #0B1730; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🐙 كاستي أوكتوبس</h1>
              <p>وكالة التحول الرقمي</p>
            </div>
            
            <div class="content">
              <h2>مرحبا ${data.fullName},</h2>
              
              <p>شكراً لاهتمامك بخدمات التحول الرقمي لدينا. تم تأكيد استشارتك المجانية بنجاح!</p>
              
              <div class="detail-box">
                <p><span class="label">📅 التاريخ والوقت:</span><br>${data.date} في ${data.time}</p>
                <p><span class="label">🎯 نوع الخدمة:</span><br>${getServiceLabel(data.serviceType, 'ar')}</p>
                ${data.company ? `<p><span class="label">🏢 الشركة:</span><br>${data.company}</p>` : ''}
                <p><span class="label">📧 بريد التأكيد:</span><br>${data.email}</p>
              </div>
              
              <p>سيتواصل معك فريقنا من الخبراء في الوقت المحدد لمناقشة مشروعك واستكشاف أفضل الحلول لتحول رقمي ناجح.</p>
              
              <p><strong>نصائح قبل استشارتك:</strong></p>
              <ul>
                <li>جهز وصفاً لأهدافك التجارية</li>
                <li>اكتب التحديات الحالية لحضورك الرقمي</li>
                <li>فكر في أسئلتك لخبرائنا</li>
              </ul>
              
              <p>إذا كنت بحاجة إلى إعادة جدولة أو إلغاء، يرجى التواصل معنا على <strong>+213 (0) 552438906</strong> أو عبر واتساب.</p>
              
              <p>مع أطيب التحيات،<br><strong>فريق كاستي أوكتوبس</strong></p>
            </div>
            
            <div class="footer">
              <p>كاستي أوكتوبس - وكالة التحول الرقمي في الجزائر</p>
              <p>📞 +213 (0) 552438906 | 📧 castignt42@outlook.com</p>
              <p>© 2026 كاستي أوكتوبس. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};

/**
 * Get service label in the specified language
 */
function getServiceLabel(serviceType: string, language: 'fr' | 'ar'): string {
  const labels: Record<string, Record<'fr' | 'ar', string>> = {
    website: {
      fr: 'Création de Site Web',
      ar: 'إنشاء موقع ويب',
    },
    ecommerce: {
      fr: 'Boutique en Ligne',
      ar: 'متجر إلكتروني',
    },
    chatbot: {
      fr: 'Chatbot IA',
      ar: 'روبوت دردشة ذكي',
    },
    training: {
      fr: 'Formation Numérique',
      ar: 'تدريب رقمي',
    },
  };

  return labels[serviceType]?.[language] || serviceType;
}

/**
 * Send confirmation email for reservation
 */
export async function sendReservationConfirmationEmail(data: {
  fullName: string;
  email: string;
  date: string;
  time: string;
  serviceType: string;
  company?: string;
  language: 'fr' | 'ar';
}) {
  try {
    const transporter = await getEmailTransporter();
    if (!transporter) {
      throw new Error('Email transporter not initialized');
    }

    const template = data.language === 'ar' ? emailTemplates.confirmationAr : emailTemplates.confirmationFr;
    const emailContent = template(data);

    const info = await transporter.sendMail({
      from: '"CASTI OCTUPUS" <noreply@casti-octupus.dz>',
      to: data.email,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    console.log('Email sent successfully:', info.messageId);

    // For testing with Ethereal Email, log the preview URL
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
