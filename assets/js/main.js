/**
 * إعدادات التواصل والتحميل — عدّلها قبل نشر الموقع.
 * أي قيمة فارغة تُخفي الزر المرتبط بها.
 */
const SITE = {
  /** رقم واتساب بالصيغة الدولية بدون + أو أصفار بادئة، مثال: 967771234567 */
  whatsapp: '',
  /** بريد التواصل، مثال: sales@example.com */
  email: '',
  /** ملف المثبت؛ ارفعه في نفس مجلد الموقع على الاستضافة بنفس الاسم */
  downloadUrl: 'MrSystem-Setup-0.1.0.exe',
  /** نص رسالة واتساب الافتراضية */
  whatsappText: 'مرحبًا، أريد الاستفسار عن نظام Mr.System',
};

(() => {
  document.documentElement.classList.remove('no-js');

  // أزرار التواصل
  const wa = document.getElementById('whatsapp-btn');
  const mail = document.getElementById('email-btn');
  const dl = document.getElementById('download-btn');
  if (SITE.whatsapp && wa) {
    wa.href = `https://wa.me/${encodeURIComponent(SITE.whatsapp)}?text=${encodeURIComponent(SITE.whatsappText)}`;
    wa.hidden = false;
  }
  if (SITE.email && mail) {
    mail.href = `mailto:${SITE.email}`;
    mail.hidden = false;
  }
  // كل أزرار التحميل تشير إلى ملف المثبت
  if (SITE.downloadUrl) {
    document.querySelectorAll('[data-download]').forEach((a) => {
      a.setAttribute('href', SITE.downloadUrl);
      a.setAttribute('download', '');
    });
  } else if (dl) {
    dl.hidden = true;
  }
  // أزرار الدعوة تفتح واتساب مباشرة إن كان مضبوطًا
  if (SITE.whatsapp) {
    document.querySelectorAll('[data-cta]').forEach((a) => {
      a.setAttribute('href', wa.href);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  // الشريط العلوي
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // قائمة الجوال
  const menuBtn = document.querySelector('.menu-btn');
  const links = document.getElementById('nav-links');
  menuBtn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }),
  );

  // جولة الشاشات
  const captions = {
    pos: 'ابحث بالاسم أو امسح الباركود، وأتمم البيع بضغطة F9. الضريبة والإجمالي يُحسبان تلقائيًا.',
    reports: 'تقارير المبيعات والأرباح والمخزون وأعمار الديون والضريبة، مع تصدير Excel وPDF.',
    'invoice-designer': 'صمّم فاتورتك: الشعار واللون والتخطيط والعناصر الظاهرة، بمعاينة مباشرة.',
    employees: 'موظفون برموز سرية وصلاحيات دقيقة، وتقرير أداء المبيعات لكل موظف.',
    appointments: 'تقويم أسبوعي للمواعيد مع حالة كل موعد وتذكير عبر واتساب.',
    health: 'فحص صحة النظام: سلامة البيانات ومطابقة الأرصدة والنسخ الاحتياطي في شاشة واحدة.',
    'dashboard-dark': 'وضع داكن مريح للعين في كل الشاشات.',
  };
  const img = document.getElementById('tour-img');
  const caption = document.getElementById('tour-caption');
  const tabs = document.querySelectorAll('.tabs [role="tab"]');
  tabs.forEach((tab) =>
    tab.addEventListener('click', () => {
      const key = tab.dataset.shot;
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = `assets/screens/${key}.png`;
        img.alt = `شاشة ${tab.textContent.trim()} في Mr.System`;
        caption.textContent = captions[key] ?? '';
        img.onload = () => (img.style.opacity = '1');
      }, 180);
    }),
  );

  // الظهور عند التمرير
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
