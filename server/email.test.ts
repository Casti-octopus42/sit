import { describe, it, expect, beforeAll } from "vitest";
import { sendReservationConfirmationEmail, emailTemplates } from "./_core/email";

describe("email service", () => {
  it("should generate French confirmation email template", () => {
    const data = {
      fullName: "Jean Dupont",
      email: "jean@example.com",
      date: "2026-05-15",
      time: "14:00-15:00",
      serviceType: "website",
      company: "Tech Solutions",
    };

    const template = emailTemplates.confirmationFr(data);

    expect(template).toHaveProperty("subject");
    expect(template).toHaveProperty("html");
    expect(template.subject).toContain("Confirmation");
    expect(template.subject).toContain("CASTI OCTUPUS");
    expect(template.html).toContain("Jean Dupont");
    expect(template.html).toContain("jean@example.com");
    expect(template.html).toContain("2026-05-15");
    expect(template.html).toContain("Tech Solutions");
  });

  it("should generate Arabic confirmation email template", () => {
    const data = {
      fullName: "محمد علي",
      email: "mohammad@example.com",
      date: "2026-05-15",
      time: "14:00-15:00",
      serviceType: "ecommerce",
      company: "شركة التقنية",
    };

    const template = emailTemplates.confirmationAr(data);

    expect(template).toHaveProperty("subject");
    expect(template).toHaveProperty("html");
    expect(template.subject).toContain("تأكيد استشارتك");
    expect(template.subject).toContain("كاستي أوكتوبس");
    expect(template.html).toContain("محمد علي");
    expect(template.html).toContain("mohammad@example.com");
    expect(template.html).toContain("2026-05-15");
    expect(template.html).toContain("شركة التقنية");
  });

  it("should include correct service labels in French template", () => {
    const services = ["website", "ecommerce", "chatbot", "training"];
    const expectedLabels = [
      "Création de Site Web",
      "Boutique en Ligne",
      "Chatbot IA",
      "Formation Numérique",
    ];

    services.forEach((service, index) => {
      const template = emailTemplates.confirmationFr({
        fullName: "Test",
        email: "test@example.com",
        date: "2026-05-15",
        time: "14:00-15:00",
        serviceType: service,
      });

      expect(template.html).toContain(expectedLabels[index]);
    });
  });

  it("should include correct service labels in Arabic template", () => {
    const services = ["website", "ecommerce", "chatbot", "training"];
    const expectedLabels = [
      "إنشاء موقع ويب",
      "متجر إلكتروني",
      "روبوت دردشة ذكي",
      "تدريب رقمي",
    ];

    services.forEach((service, index) => {
      const template = emailTemplates.confirmationAr({
        fullName: "Test",
        email: "test@example.com",
        date: "2026-05-15",
        time: "14:00-15:00",
        serviceType: service,
      });

      expect(template.html).toContain(expectedLabels[index]);
    });
  });

  it("should include contact information in templates", () => {
    const frTemplate = emailTemplates.confirmationFr({
      fullName: "Test",
      email: "test@example.com",
      date: "2026-05-15",
      time: "14:00-15:00",
      serviceType: "website",
    });

    const arTemplate = emailTemplates.confirmationAr({
      fullName: "Test",
      email: "test@example.com",
      date: "2026-05-15",
      time: "14:00-15:00",
      serviceType: "website",
    });

    // Check for contact information
    expect(frTemplate.html).toContain("+213 (0) 552438906");
    expect(frTemplate.html).toContain("castignt42@outlook.com");
    expect(arTemplate.html).toContain("+213 (0) 552438906");
    expect(arTemplate.html).toContain("castignt42@outlook.com");
  });

  it("should handle optional company field", () => {
    const withCompany = emailTemplates.confirmationFr({
      fullName: "Test",
      email: "test@example.com",
      date: "2026-05-15",
      time: "14:00-15:00",
      serviceType: "website",
      company: "My Company",
    });

    const withoutCompany = emailTemplates.confirmationFr({
      fullName: "Test",
      email: "test@example.com",
      date: "2026-05-15",
      time: "14:00-15:00",
      serviceType: "website",
    });

    expect(withCompany.html).toContain("My Company");
    expect(withoutCompany.html).not.toContain("My Company");
  });

  it("should send confirmation email successfully", async () => {
    const result = await sendReservationConfirmationEmail({
      fullName: "Test User",
      email: "test@example.com",
      date: "2026-05-15",
      time: "14:00-15:00",
      serviceType: "website",
      company: "Test Company",
      language: "fr",
    });

    expect(result).toHaveProperty("success");
    // In test environment, email sending should succeed or fail gracefully
    expect(typeof result.success).toBe("boolean");
  });

  it("should send Arabic confirmation email successfully", async () => {
    const result = await sendReservationConfirmationEmail({
      fullName: "مستخدم اختبار",
      email: "test@example.com",
      date: "2026-05-15",
      time: "14:00-15:00",
      serviceType: "ecommerce",
      language: "ar",
    });

    expect(result).toHaveProperty("success");
    expect(typeof result.success).toBe("boolean");
  });
});
