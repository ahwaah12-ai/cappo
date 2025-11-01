// main.js

document.addEventListener('DOMContentLoaded', () => {
  // ======= إعدادات =======
  const targetEmail = 'ah.wa.ah12@gmail.com'; // الايميل اللي عايز تبعتله

  // ======= فورم: إرسال عبر mailto (يفتح برنامج الإيميل على الجهاز) =======
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // نجيب القيم من الحقول (يتوافق لو ما عندهم name لأننا نبحث حسب النوع)
      const nameInput = form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('input[type="email"]');
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';

      // نحدد الموضوع والنص (تقدر تعدلهم)
      const subject = `رسالة من موقع Food Lover - ${name || 'زائر'}`;
      let body = `مرحباً،%0D%0A%0D%0Aلقد استلمت رسالة من نموذج التواصل في موقع Food Lover.%0D%0A`;
      if (name) body += `الاسم: ${name}%0D%0A`;
      if (email) body += `البريد الإلكتروني للمرسل: ${email}%0D%0A`;
      body += `%0D%0Aيمكنك كتابة هنا نص الرسالة (لو عايز تضيف حقل للملاحظة في الفورم، ضع <textarea> وأضف قيمته هنا).`;

      // إنشاء رابط mailto مع ترميز صحيح
      const mailto = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(decodeURIComponent(body))}`;

      // افتح برنامج الايميل (أو لو المستخدم ما عندوش عميل، ممكن يظهر رسالة)
      try {
        window.location.href = mailto;
        // رساله للمستخدم (اختياري)
        alert('تم فتح برنامج البريد الافتراضي لإرسال الرسالة. إذا لم يفتح، جرّب إعداد برنامج بريد أو استخدم بديل Backend.');
        // لو حبيت تمسح الحقول بعد الارسال:
        form.reset();
      } catch (err) {
        console.error(err);
        alert('حدث خطأ أثناء محاولة فتح برنامج البريد. إذا أردت إرسال الرسائل دون فتح برنامج البريد، تحتاج إلى خدمة Backend أو خدمة طرف ثالث مثل EmailJS.');
      }
    });
  }

  // ======= أزراار: إظهار حكمة عشوائية عند الضغط =======
  const proverbs = [
    'اطلب العلم من المهد إلى اللحد.',
    'العلم نور والجهل ظلام.',
  ];

  // نضيف مستمع لكل زر <button> على الصفحة ما عدا submit/reset input
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // إذا الزر هو داخل الفورم ويستخدم كـ submit أو reset، نتجاهل (لا نمنع السلوك الطبيعي)
      const typeAttr = btn.getAttribute('type');
      if (typeAttr === 'submit' || typeAttr === 'reset') {
        // لا نمنع الافتراضي لكي يعمل الإرسال أو إعادة الضبط
        return;
      }

      // نمنع الحدث الافتراضي لأن أزرارك العادية لا يجب أن تعيد تحميل الصفحة
      e.preventDefault();

      // نختار حكمة عشوائية
      const index = Math.floor(Math.random() * proverbs.length);
      const hokma = proverbs[index];

      // نعرضها في alert — إذا تريد نافذة مخصصة بدل alert أخبرني أعملك modal أو toast
      alert(hokma);
    });
  });

  // ======= ملاحظة عن بدائل الإرسال (اختياري للمطورين) =======
  // إذا أردت إرسال الإيميلات فعلياً من دون فتح برنامج البريد لدى المستخدم، تحتاج backend أو خدمة مثل EmailJS.
  // مثال سريع: EmailJS يتيح إرسال إيميل من الجهة العميلة (تحتاج تسجيل وService ID وTemplate ID وUser ID).
  // لو تحب أضيف لك مثال EmailJS مباشرة، أرسِل 'عايز EmailJS' وأنا أضيف الكود الجاهز.
});

