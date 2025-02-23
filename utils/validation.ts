import { z } from "zod";

// E-posta doğrulama
export const emailSchema = z
  .string()
  .email("Lütfen geçerli bir e-posta adresi girin")
  .min(1, "E-posta gereklidir")
  .max(255, "E-posta çok uzun");

// Kapsamlı kurallarla parola doğrulama
export const passwordSchema = z
  .string()
  .min(8, "Parola en az 8 karakter olmalıdır")
  .max(100, "Parola çok uzun")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Parola en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir",
  );

// Varsayılan parola doğrulama (daha az katı)
export const defaultPasswordSchema = z
  .string()
  .min(1, "Varsayılan parola alanı boş olamaz");

// Parolaların eşleştiğini doğrulamak için yardımcı fonksiyon
export const createPasswordMatchSchema = (
  passwordField: string = "password",
  confirmField: string = "confirmPassword",
) => {
  return z
    .object({
      [passwordField]: passwordSchema,
      [confirmField]: z.string(),
    })
    .refine((data) => data[passwordField] === data[confirmField], {
      message: "Parolalar eşleşmiyor",
      path: [confirmField],
    });
};

// Giriş formu şeması
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Parola en az 6 karakter olmalıdır"),
});

// Parola oluşturma formu şeması
export const createPasswordSchema = z
  .object({
    defaultPassword: defaultPasswordSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Parolalar eşleşmiyor",
    path: ["confirmPassword"],
  });

// Yaygın doğrulama tipleri
export type LoginFormData = z.infer<typeof loginSchema>;
export type CreatePasswordFormData = z.infer<typeof createPasswordSchema>;

// Kullanıcı adı doğrulama
export const usernameSchema = z
  .string()
  .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
  .max(50, "Kullanıcı adı çok uzun")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Kullanıcı adı sadece harfler, rakamlar, alt çizgi ve tire içerebilir",
  );

// Telefon numarası doğrulama (Türkiye özelinde, cep telefonu)
// Türk cep telefonu numaraları +90 ile başlayıp, ardından 5 ve 9 rakam gelir.
export const phoneSchema = z
  .string()
  .regex(
    /^\+90(5\d{9})$/,
    "Lütfen geçerli bir Türk cep telefonu numarası girin (örneğin, +905XXXXXXXXX)",
  )
  .optional();

// Tarih doğrulama (GG-AA-YYYY formatında)
// İlk olarak regex ile format kontrolü yapılır, ardından gerçek bir tarih olup olmadığı kontrol edilir.
export const dateSchema = z
  .string()
  .regex(
    /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
    "Lütfen GG-AA-YYYY formatında geçerli bir tarih girin",
  )
  .refine(
    (dateStr) => {
      const [day, month, year] = dateStr.split("-").map(Number);
      const dateObj = new Date(year, month - 1, day);
      return (
        dateObj.getFullYear() === year &&
        dateObj.getMonth() === month - 1 &&
        dateObj.getDate() === day
      );
    },
    {
      message: "Lütfen geçerli bir tarih girin",
    },
  );

// URL doğrulama
export const urlSchema = z
  .string()
  .url("Lütfen geçerli bir URL girin")
  .optional();
