import {
  Stethoscope, Wrench, Scissors, Scale, Camera, Dumbbell,
  Building2, Sparkles, UtensilsCrossed, GraduationCap, Briefcase,
  type LucideIcon,
} from 'lucide-react';

export interface Sphere {
  icon: LucideIcon;
  label: string;
  image: string;
}

export const spheres: Sphere[] = [
  { icon: Stethoscope, label: 'Медицина', image: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Wrench, label: 'Автосервис', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Scissors, label: 'Салоны и студии', image: 'https://images.pexels.com/photos/13068377/pexels-photo-13068377.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Scale, label: 'Юристы', image: 'https://images.pexels.com/photos/7876154/pexels-photo-7876154.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Camera, label: 'Фотографы', image: 'https://images.pexels.com/photos/11234300/pexels-photo-11234300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Dumbbell, label: 'Фитнес', image: 'https://images.pexels.com/photos/39219674/pexels-photo-39219674.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Building2, label: 'Строительство', image: 'https://images.pexels.com/photos/417279/pexels-photo-417279.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Sparkles, label: 'Клининг', image: 'https://images.pexels.com/photos/7546322/pexels-photo-7546322.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: UtensilsCrossed, label: 'Рестораны', image: 'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: GraduationCap, label: 'Обучение', image: 'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Briefcase, label: 'Консультации', image: 'https://images.pexels.com/photos/6285113/pexels-photo-6285113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

export interface DesignVariant {
  id: string;
  name: string;
  description: string;
  image: string;
  accent: string;
}

export const designVariants: DesignVariant[] = [
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Светлый, воздушный дизайн с крупной типографикой и мягкими карточками',
    image: 'https://images.pexels.com/photos/13068377/pexels-photo-13068377.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-brand-500',
  },
  {
    id: 'monolith',
    name: 'Monolith',
    description: 'Жёсткая сетка, тёмные акценты и контрастные блоки для серьёзного бизнеса',
    image: 'https://images.pexels.com/photos/417279/pexels-photo-417279.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-ink-900',
  },
  {
    id: 'atelier',
    name: 'Atelier',
    description: 'Тёплая палитра, фокус на фотографиях и портфолио',
    image: 'https://images.pexels.com/photos/11234300/pexels-photo-11234300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-accent-500',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Динамичный макет с акцентом на онлайн-запись и календарь',
    image: 'https://images.pexels.com/photos/39219674/pexels-photo-39219674.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-brand-600',
  },
  {
    id: 'prism',
    name: 'Prism',
    description: 'Минималистичный стеклянный интерфейс с плавными переходами',
    image: 'https://images.pexels.com/photos/7546322/pexels-photo-7546322.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-ink-700',
  },
];

export interface BeautyDesign {
  id: string;
  name: string;
  sphere: string;
  description: string;
  image: string;
  accent: string;
  themeColor: string;
}

export const beautyDesigns: BeautyDesign[] = [
  {
    id: 'bloom',
    name: 'Bloom',
    sphere: 'Салоны красоты',
    description: 'Нежный дизайн с пастельными тонами, цветочными акцентами и плавными переходами',
    image: 'https://images.pexels.com/photos/7750114/pexels-photo-7750114.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-pink-500',
    themeColor: 'pink',
  },
  {
    id: 'serenity',
    name: 'Serenity',
    sphere: 'Массаж и спа',
    description: 'Расслабляющая палитра с акцентом на спокойствие, природные текстуры и мягкий свет',
    image: 'https://images.pexels.com/photos/9146381/pexels-photo-9146381.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-teal-500',
    themeColor: 'teal',
  },
  {
    id: 'lacquer',
    name: 'Lacquer',
    sphere: 'Маникюр и ногти',
    description: 'Яркий, дерзкий дизайн с акцентом на цвета лак, геометрией и крупными фото работ',
    image: 'https://images.pexels.com/photos/4965824/pexels-photo-4965824.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-fuchsia-500',
    themeColor: 'fuchsia',
  },
  {
    id: 'arch',
    name: 'Arch',
    sphere: 'Брови и архитектура',
    description: 'Минималистичный дизайн с фокусом на точность, чистые линии и до/после galleries',
    image: 'https://images.pexels.com/photos/5177990/pexels-photo-5177990.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-amber-600',
    themeColor: 'amber',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    sphere: 'Ресницы и ламинация',
    description: 'Элегантный дизайн с акцентом на детали, крупными портретами и эффектом глубины',
    image: 'https://images.pexels.com/photos/8554941/pexels-photo-8554941.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-violet-500',
    themeColor: 'violet',
  },
  {
    id: 'ivory',
    name: 'Ivory',
    sphere: 'Люксовый сервис',
    description: 'Элегантный кремовый минимализм с мягкой типографикой для премиальных услуг',
    image: 'https://images.pexels.com/photos/7046160/pexels-photo-7046160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-stone-800',
    themeColor: 'ivory',
  },
  {
    id: 'carbon',
    name: 'Carbon',
    sphere: 'Барбершоп и авто',
    description: 'Тёмный современный дизайн с контрастными акцентами для мужских сервисов',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-zinc-900',
    themeColor: 'carbon',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    sphere: 'Медицина и клиники',
    description: 'Профессиональный синий дизайн с чёткими формами для медицинских учреждений',
    image: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-blue-600',
    themeColor: 'ocean',
  },
  {
    id: 'sage',
    name: 'Sage',
    sphere: 'Велнес и эко',
    description: 'Природный зелёный дизайн с органичными формами для студий здоровья',
    image: 'https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-emerald-700',
    themeColor: 'sage',
  },
  {
    id: 'copper',
    name: 'Copper',
    sphere: 'Кафе и рестораны',
    description: 'Тёплый медный дизайн с уютной эстетикой для гастрономии и кулинарии',
    image: 'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-orange-700',
    themeColor: 'copper',
  },
  {
    id: 'slate',
    name: 'Slate',
    sphere: 'Юриспруденция и финансы',
    description: 'Строгий серый дизайн с корпоративной эстетикой для профессиональных услуг',
    image: 'https://images.pexels.com/photos/7876154/pexels-photo-7876154.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-slate-700',
    themeColor: 'slate',
  },
  {
    id: 'coral',
    name: 'Coral',
    sphere: 'Фотография и творчество',
    description: 'Яркий коралловый дизайн с акцентом на визуальный контент и портфолио',
    image: 'https://images.pexels.com/photos/11234300/pexels-photo-11234300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-rose-500',
    themeColor: 'coral',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    sphere: 'Премиум-сервис',
    description: 'Тёмно-синий премиальный дизайн с золотистыми акцентами для элитных услуг',
    image: 'https://images.pexels.com/photos/417279/pexels-photo-417279.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-indigo-900',
    themeColor: 'midnight',
  },
  {
    id: 'forest',
    name: 'Forest',
    sphere: 'Фитнес и спорт',
    description: 'Насыщенный зелёный дизайн с энергичной эстетикой для спортивных студий',
    image: 'https://images.pexels.com/photos/39219674/pexels-photo-39219674.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-green-800',
    themeColor: 'forest',
  },
  {
    id: 'sand',
    name: 'Sand',
    sphere: 'Обучение и коучинг',
    description: 'Тёплый песочный дизайн с уютной эстетикой для образовательных услуг',
    image: 'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    accent: 'bg-yellow-700',
    themeColor: 'sand',
  },
];

export interface DemoBusiness {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  cover: string;
  photos: string[];
  services: { name: string; price: string; duration: string; image: string }[];
  team: { name: string; role: string; avatar: string }[];
  address: string;
  hours: string;
  phone: string;
  socials: { label: string; url: string }[];
  reviews: { name: string; text: string; rating: number }[];
}

export const demoBusiness: DemoBusiness = {
  name: 'Стоматология Aurora',
  tagline: 'Безболезненное лечение в комфортной обстановке',
  description: 'Современная стоматологическая клиника с командой опытных специалистов. Мы используем новейшее оборудование и доказательные методики лечения.',
  logo: 'https://images.pexels.com/photos/6812463/pexels-photo-6812463.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  cover: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  photos: [
    'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6502543/pexels-photo-6502543.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6812463/pexels-photo-6812463.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  services: [
    { name: 'Консультация и осмотр', price: '0 ₽', duration: '30 мин', image: 'https://images.pexels.com/photos/6812463/pexels-photo-6812463.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
    { name: 'Профессиональная чистка', price: '3 500 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/6502543/pexels-photo-6502543.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
    { name: 'Лечение кариеса', price: 'от 4 500 ₽', duration: '60–90 мин', image: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
    { name: 'Отбеливание зубов', price: '12 000 ₽', duration: '90 мин', image: 'https://images.pexels.com/photos/6502543/pexels-photo-6502543.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  ],
  team: [
    { name: 'Анна Воронова', role: 'Главный врач, терапевт', avatar: 'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
    { name: 'Дмитрий Соколов', role: 'Хирург-имплантолог', avatar: 'https://images.pexels.com/photos/28442318/pexels-photo-28442318.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
    { name: 'Елена Кузнецова', role: 'Ортодонт', avatar: 'https://images.pexels.com/photos/37273005/pexels-photo-37273005.png?auto=compress&cs=tinysrgb&h=200&w=200' },
  ],
  address: 'ул. Тверская, 18, Москва',
  hours: 'Пн–Сб: 09:00 – 21:00, Вс: 10:00 – 18:00',
  phone: '+7 (495) 123-45-67',
  socials: [
    { label: 'Telegram', url: '#' },
    { label: 'WhatsApp', url: '#' },
    { label: 'Телефон', url: '#' },
  ],
  reviews: [
    { name: 'Мария К.', text: 'Очень внимательный персонал, всё объяснили и показали. Лечение прошло комфортно.', rating: 5 },
    { name: 'Игорь П.', text: 'Современная клиника, новое оборудование. Цены адекватные, качество отличное.', rating: 5 },
    { name: 'Ольга С.', text: 'Хожу сюда всей семьёй. Детям тоже комфортно, врачи находят подход.', rating: 5 },
  ],
};

export interface BeautyDemo {
  designId: string;
  business: DemoBusiness;
}

export const beautyDemos: BeautyDemo[] = [
  {
    designId: 'bloom',
    business: {
      name: 'Салон красоты Bloom',
      tagline: 'Цветочная эстетика в каждой детали',
      description: 'Премиальный салон красоты с атмосферой цветущего сада. Наши мастера создают образы, которые подчёркивают вашу естественную красоту. Стрижки, окрашивание, укладки и уходовые процедуры в нежном интерьере.',
      logo: 'https://images.pexels.com/photos/6899538/pexels-photo-6899538.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/6899544/pexels-photo-6899544.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/6899544/pexels-photo-6899544.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6899542/pexels-photo-6899542.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6899554/pexels-photo-6899554.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6899538/pexels-photo-6899538.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Женская стрижка', price: 'от 1 500 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/3993470/pexels-photo-3993470.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Окрашивание Airtouch', price: 'от 6 500 ₽', duration: '180 мин', image: 'https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Укладка на выход', price: '2 000 ₽', duration: '45 мин', image: 'https://images.pexels.com/photos/7755518/pexels-photo-7755518.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Уход для волос Olaplex', price: '3 000 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/3992879/pexels-photo-3992879.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Викория Лоза', role: 'Топ-стилист', avatar: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Алина Шарипова', role: 'Колорист', avatar: 'https://images.pexels.com/photos/3993455/pexels-photo-3993455.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Мария Орехова', role: 'Стилист-универсал', avatar: 'https://images.pexels.com/photos/3993452/pexels-photo-3993452.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'ул. Малая Бронная, 12, Москва',
      hours: 'Ежедневно: 10:00 – 22:00',
      phone: '+7 (495) 234-56-78',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'WhatsApp', url: '#' }, { label: 'Instagram', url: '#' }],
      reviews: [
        { name: 'Елена', text: 'Лучший салон в городе! Сделали окрашивание мечты. Атмосфера невероятная.', rating: 5 },
        { name: 'Дарья', text: 'Хожу к Виктории уже год. Каждый раз идеальный результат. Рекомендую всем!', rating: 5 },
        { name: 'Ольга', text: 'Очень приятный интерьер, кофе и цветы. Стрижка отличная, вернусь снова.', rating: 5 },
      ],
    },
  },
  {
    designId: 'serenity',
    business: {
      name: 'Serenity Spa & Massage',
      tagline: 'Путь к гармонии и спокойствию',
      description: 'Студия массажа и спа-ухода, созданная для вашего восстановления. Тёплый свет, ароматические масла и руки профессиональных терапевтов снимут напряжение и вернут спокойствие.',
      logo: 'https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/35884499/pexels-photo-35884499.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/35884499/pexels-photo-35884499.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6187418/pexels-photo-6187418.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6187652/pexels-photo-6187652.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Релакс-массаж 60 мин', price: '3 500 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/6628701/pexels-photo-6628701.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Горячие камни', price: '4 500 ₽', duration: '90 мин', image: 'https://images.pexels.com/photos/6628601/pexels-photo-6628601.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Стоун-терапия для спины', price: '3 000 ₽', duration: '45 мин', image: 'https://images.pexels.com/photos/37719545/pexels-photo-37719545.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Арома-спа ритуал', price: '5 500 ₽', duration: '120 мин', image: 'https://images.pexels.com/photos/37719629/pexels-photo-37719629.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Алексей Тихонов', role: 'Массажист, 12 лет опыта', avatar: 'https://images.pexels.com/photos/6187418/pexels-photo-6187418.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Ирина Волкова', role: 'Спа-терапевт', avatar: 'https://images.pexels.com/photos/6187652/pexels-photo-6187652.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Наталья Громова', role: 'Массажист', avatar: 'https://images.pexels.com/photos/9146381/pexels-photo-9146381.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'Пресненская наб., 10, Москва',
      hours: 'Пн–Вс: 09:00 – 22:00',
      phone: '+7 (495) 345-67-89',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'WhatsApp', url: '#' }, { label: 'Телефон', url: '#' }],
      reviews: [
        { name: 'Сергей', text: 'После массажа у Алексея чувствую себя новым человеком. Лучший релакс в Москве.', rating: 5 },
        { name: 'Анна', text: 'Атмосфера студии потрясающая. Арома-спа ритуал — то, что нужно после рабочей недели.', rating: 5 },
        { name: 'Михаил', text: 'Хожу регулярно на массаж спины. Профессионалы своего дела.', rating: 5 },
      ],
    },
  },
  {
    designId: 'lacquer',
    business: {
      name: 'Lacquer Nail Bar',
      tagline: 'Искусство на кончиках пальцев',
      description: 'Студия маникюра и нейл-арта для тех, кто ценит стиль и качество. Дизайнерские ногти, трендовые покрытия и уход за руками в яркой творческой обстановке.',
      logo: 'https://images.pexels.com/photos/4965824/pexels-photo-4965824.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/13068379/pexels-photo-13068379.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/13068379/pexels-photo-13068379.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/4965824/pexels-photo-4965824.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/7446912/pexels-photo-7446912.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/7446915/pexels-photo-7446915.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Маникюр + гель-лак', price: '2 000 ₽', duration: '90 мин', image: 'https://images.pexels.com/photos/34885844/pexels-photo-34885844.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Дизайн ногтей (френч/втирка)', price: 'от 500 ₽', duration: '30 мин', image: 'https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Педикюр SPA', price: '3 000 ₽', duration: '90 мин', image: 'https://images.pexels.com/photos/2600287/pexels-photo-2600287.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Наращивание ногтей', price: 'от 3 500 ₽', duration: '150 мин', image: 'https://images.pexels.com/photos/4965824/pexels-photo-4965824.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Камила Юсупова', role: 'Нейл-мастер, топ-1', avatar: 'https://images.pexels.com/photos/7446912/pexels-photo-7446912.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Ева Литвинова', role: 'Мастер дизайна', avatar: 'https://images.pexels.com/photos/4965824/pexels-photo-4965824.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Софья Замятина', role: 'Педикюрист', avatar: 'https://images.pexels.com/photos/7446915/pexels-photo-7446915.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'ул. Арбат, 24, Москва',
      hours: 'Пн–Сб: 10:00 – 21:00, Вс: 11:00 – 18:00',
      phone: '+7 (495) 456-78-90',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'Instagram', url: '#' }, { label: 'WhatsApp', url: '#' }],
      reviews: [
        { name: 'Юлия', text: 'Камила делает невероятный дизайн! Каждый раз что-то новое и креативное. Обожаю эту студию.', rating: 5 },
        { name: 'Полина', text: 'Яркий интерьер, классная музыка и идеальный маникюр. Гель-лак держится 3 недели!', rating: 5 },
        { name: 'Виктория', text: 'Лучший педикюр в Москве. Софья — волшебница. Атмосфера очень创意.', rating: 5 },
      ],
    },
  },
  {
    designId: 'arch',
    business: {
      name: 'Arch Brow Studio',
      tagline: 'Архитектура идеальных бровей',
      description: 'Студия бровей с минималистичным подходом к красоте. Точное измерение, архитектура лица и идеальная форма. Ламинирование, окрашивание и коррекция в чистом светлом интерьере.',
      logo: 'https://images.pexels.com/photos/5177990/pexels-photo-5177990.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/7446904/pexels-photo-7446904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/7446904/pexels-photo-7446904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/5177990/pexels-photo-5177990.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/5177991/pexels-photo-5177991.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/7893958/pexels-photo-7893958.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Коррекция бровей', price: '1 200 ₽', duration: '30 мин', image: 'https://images.pexels.com/photos/8558247/pexels-photo-8558247.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Ламинирование бровей', price: '2 500 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/5178051/pexels-photo-5178051.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Окрашивание + коррекция', price: '1 800 ₽', duration: '45 мин', image: 'https://images.pexels.com/photos/5177990/pexels-photo-5177990.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Архитектура бровей', price: '3 000 ₽', duration: '75 мин', image: 'https://images.pexels.com/photos/5177991/pexels-photo-5177991.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Дарья Гордеева', role: 'Браумастер, основатель', avatar: 'https://images.pexels.com/photos/5178051/pexels-photo-5178051.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'Покровка, 5, Москва',
      hours: 'Пн–Сб: 10:00 – 20:00, Вс: выходной',
      phone: '+7 (495) 567-89-01',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'WhatsApp', url: '#' }, { label: 'Instagram', url: '#' }],
      reviews: [
        { name: 'Марина', text: 'Дарья сделала мне идеальные брови! Ламинирование держится 8 недель. Очень довольна.', rating: 5 },
        { name: 'Катя', text: 'Минималистичный и чистый интерьер. Мастера очень аккуратные. Рекомендую!', rating: 5 },
        { name: 'Жанна', text: 'Архитектура бровей изменила моё лицо. Лучшее, что я делала для себя.', rating: 5 },
      ],
    },
  },
  {
    designId: 'flutter',
    business: {
      name: 'Flutter Lash Bar',
      tagline: 'Взгляд, который запоминается',
      description: 'Студия наращивания ресниц и ламинации. Создаём естественные и выразительные образы — от классики до объёмного 3D-наращивания. Уютная атмосфера и стерильная чистота.',
      logo: 'https://images.pexels.com/photos/8554941/pexels-photo-8554941.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/7446922/pexels-photo-7446922.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/7446922/pexels-photo-7446922.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/8554941/pexels-photo-8554941.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/34930118/pexels-photo-34930118.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/7755654/pexels-photo-7755654.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Классическое наращивание', price: '2 500 ₽', duration: '90 мин', image: 'https://images.pexels.com/photos/5128267/pexels-photo-5128267.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Объём 2D-3D', price: '3 500 ₽', duration: '120 мин', image: 'https://images.pexels.com/photos/36930354/pexels-photo-36930354.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Ламинация ресниц', price: '2 200 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/7298696/pexels-photo-7298696.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Снятие + коррекция', price: '1 000 ₽', duration: '30 мин', image: 'https://images.pexels.com/photos/8554941/pexels-photo-8554941.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Екатерина Белова', role: 'Лэш-мастер, основатель', avatar: 'https://images.pexels.com/photos/8554941/pexels-photo-8554941.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Олеся Ким', role: 'Мастер наращивания', avatar: 'https://images.pexels.com/photos/7446922/pexels-photo-7446922.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Айна Султанова', role: 'Лэш-мастер', avatar: 'https://images.pexels.com/photos/34930118/pexels-photo-34930118.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'Кутузовский пр., 14, Москва',
      hours: 'Пн–Вс: 10:00 – 21:00',
      phone: '+7 (495) 678-90-12',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'WhatsApp', url: '#' }, { label: 'Instagram', url: '#' }],
      reviews: [
        { name: 'Лиза', text: 'Екатерина — лучший лэш-мастер! Ресницы выглядят естественно и держатся долго.', rating: 5 },
        { name: 'Наталья', text: 'Ламинация сделала мои ресницы визуально длиннее. Не нужно красить по утрам!', rating: 5 },
        { name: 'Регина', text: 'Уютная студия, можно расслабиться и даже поспать во время процедуры. Результат супер!', rating: 5 },
      ],
    },
  },
  {
    designId: 'ivory',
    business: {
      name: 'Atelier de Luxe',
      tagline: 'Индивидуальный подход к элегантности',
      description: 'Премиальная студия стиля, где каждый образ создаётся с вниманием к деталям. Персональный стилист, эксклюзивные уходы и атмосфера роскоши.',
      logo: 'https://images.pexels.com/photos/7046160/pexels-photo-7046160.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/7046160/pexels-photo-7046160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/7046160/pexels-photo-7046160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/7046168/pexels-photo-7046168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Консультация стилиста', price: '5 000 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/7046160/pexels-photo-7046160.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Персональный шопинг', price: '15 000 ₽', duration: '180 мин', image: 'https://images.pexels.com/photos/7046168/pexels-photo-7046168.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Разбор гардероба', price: '8 000 ₽', duration: '120 мин', image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Подготовка к мероприятию', price: '12 000 ₽', duration: '150 мин', image: 'https://images.pexels.com/photos/7046160/pexels-photo-7046160.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Анастасия Верди', role: 'Главный стилист', avatar: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Кристина Роше', role: 'Имидж-консультант', avatar: 'https://images.pexels.com/photos/3993455/pexels-photo-3993455.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'Столешников пер., 9, Москва',
      hours: 'Пн–Сб: 10:00 – 20:00',
      phone: '+7 (495) 111-22-33',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'WhatsApp', url: '#' }, { label: 'Instagram', url: '#' }],
      reviews: [
        { name: 'Елена М.', text: 'Анастасия полностью обновила мой стиль. Получаю комплименты каждый день!', rating: 5 },
        { name: 'Ирина Д.', text: 'Шопинг с Кристиной — невероятный опыт. Больше не трачу деньги впустую.', rating: 5 },
        { name: 'Ольга П.', text: 'Атмосфера ателье потрясающая. Чувствуешь себя особенной.', rating: 5 },
      ],
    },
  },
  {
    designId: 'carbon',
    business: {
      name: 'Black Steel Barbershop',
      tagline: 'Брутальный стиль для настоящих мужчин',
      description: 'Мужской барбершоп с характером. Классические стрижки, опасная бритва, виски и рок-н-ролл. Место, где каждый мужчина чувствует себя королём.',
      logo: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Мужская стрижка', price: '1 800 ₽', duration: '45 мин', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Стрижка + борода', price: '2 500 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Королевское бритьё', price: '1 500 ₽', duration: '30 мин', image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Камуфляж седины', price: '2 000 ₽', duration: '40 мин', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Артём Волков', role: 'Старший барбер', avatar: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Максим Стальной', role: 'Барбер', avatar: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'ул. Мясницкая, 15, Москва',
      hours: 'Пн–Вс: 10:00 – 22:00',
      phone: '+7 (495) 222-33-44',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'WhatsApp', url: '#' }, { label: 'VK', url: '#' }],
      reviews: [
        { name: 'Дмитрий', text: 'Лучший барбершоп в городе. Артём делает идеальный фейд каждый раз.', rating: 5 },
        { name: 'Алексей', text: 'Атмосфера на высоте — виски, музыка и отличная стрижка.', rating: 5 },
        { name: 'Сергей', text: 'Королевское бритьё — это целый ритуал. Кайф!', rating: 5 },
      ],
    },
  },
  {
    designId: 'ocean',
    business: {
      name: 'Клиника Здоровье+',
      tagline: 'Современная медицина для всей семьи',
      description: 'Многопрофильная клиника с опытными врачами и передовым оборудованием. Диагностика, лечение и профилактика в комфортной обстановке.',
      logo: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6502543/pexels-photo-6502543.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6812463/pexels-photo-6812463.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Приём терапевта', price: '2 500 ₽', duration: '30 мин', image: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'УЗИ-диагностика', price: '3 000 ₽', duration: '30 мин', image: 'https://images.pexels.com/photos/6502543/pexels-photo-6502543.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Анализы (комплекс)', price: '4 500 ₽', duration: '15 мин', image: 'https://images.pexels.com/photos/6812463/pexels-photo-6812463.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Консультация кардиолога', price: '3 500 ₽', duration: '45 мин', image: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Андрей Петров', role: 'Терапевт, к.м.н.', avatar: 'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Елена Смирнова', role: 'Кардиолог', avatar: 'https://images.pexels.com/photos/37273005/pexels-photo-37273005.png?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Игорь Козлов', role: 'УЗИ-специалист', avatar: 'https://images.pexels.com/photos/28442318/pexels-photo-28442318.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'Ленинский пр., 45, Москва',
      hours: 'Пн–Сб: 08:00 – 21:00, Вс: 09:00 – 18:00',
      phone: '+7 (495) 333-44-55',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'WhatsApp', url: '#' }, { label: 'Телефон', url: '#' }],
      reviews: [
        { name: 'Марина К.', text: 'Отличная клиника. Доктор Петров внимательный и компетентный.', rating: 5 },
        { name: 'Павел С.', text: 'Быстрая диагностика и понятные объяснения. Рекомендую!', rating: 5 },
        { name: 'Анна Т.', text: 'Хожу сюда всей семьёй. Врачи находят подход даже к детям.', rating: 5 },
      ],
    },
  },
  {
    designId: 'sage',
    business: {
      name: 'Green Balance Studio',
      tagline: 'Гармония тела и природы',
      description: 'Студия холистического здоровья. Йога, аюрведические массажи, детокс-программы и медитации в пространстве, наполненном живыми растениями.',
      logo: 'https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6187418/pexels-photo-6187418.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6187652/pexels-photo-6187652.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Хатха-йога (групповая)', price: '800 ₽', duration: '75 мин', image: 'https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Аюрведический массаж', price: '4 000 ₽', duration: '90 мин', image: 'https://images.pexels.com/photos/6187418/pexels-photo-6187418.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Детокс-программа 3 дня', price: '12 000 ₽', duration: '3 дня', image: 'https://images.pexels.com/photos/6187652/pexels-photo-6187652.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Медитация + звукотерапия', price: '1 500 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Лилия Грин', role: 'Основатель, йога-терапевт', avatar: 'https://images.pexels.com/photos/6187652/pexels-photo-6187652.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Рустам Алиев', role: 'Аюрведа-мастер', avatar: 'https://images.pexels.com/photos/6187418/pexels-photo-6187418.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'ул. Остоженка, 7, Москва',
      hours: 'Пн–Вс: 07:00 – 22:00',
      phone: '+7 (495) 444-55-66',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'Instagram', url: '#' }, { label: 'WhatsApp', url: '#' }],
      reviews: [
        { name: 'Ксения', text: 'Лилия — невероятный преподаватель. Йога здесь — это целый ритуал.', rating: 5 },
        { name: 'Владимир', text: 'Аюрведический массаж снял всё напряжение. Лучше любого спа.', rating: 5 },
        { name: 'Мария', text: 'Атмосфера с растениями и свечами — просто волшебство.', rating: 5 },
      ],
    },
  },
  {
    designId: 'copper',
    business: {
      name: 'Медная Сковорода',
      tagline: 'Авторская кухня с душой',
      description: 'Уютный ресторан авторской кухни. Сезонное меню, фермерские продукты и блюда, приготовленные с любовью. Идеальное место для ужина вдвоём или семейного обеда.',
      logo: 'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Бизнес-ланч', price: '650 ₽', duration: '45 мин', image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Романтический ужин', price: 'от 3 500 ₽', duration: '120 мин', image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Банкет (от 10 гостей)', price: 'от 2 500 ₽/чел', duration: '180 мин', image: 'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Кулинарный мастер-класс', price: '4 000 ₽', duration: '150 мин', image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Михаил Бронзов', role: 'Шеф-повар', avatar: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Анна Сомелье', role: 'Сомелье', avatar: 'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'Патриаршие пруды, Малая Бронная 10, Москва',
      hours: 'Пн–Чт: 12:00 – 23:00, Пт–Вс: 12:00 – 01:00',
      phone: '+7 (495) 555-66-77',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'Instagram', url: '#' }, { label: 'WhatsApp', url: '#' }],
      reviews: [
        { name: 'Наталия', text: 'Лучший ресторан на Патриарших. Пастрами и домашняя паста — божественно!', rating: 5 },
        { name: 'Роман', text: 'Привёз жену на годовщину — она в восторге. Спасибо Анне за подбор вина.', rating: 5 },
        { name: 'Глеб', text: 'Мастер-класс с шеф-поваром — потрясающий опыт!', rating: 5 },
      ],
    },
  },
  {
    designId: 'slate',
    business: {
      name: 'Право и Защита',
      tagline: 'Надёжная юридическая поддержка',
      description: 'Юридическая фирма полного цикла. Корпоративное право, недвижимость, семейные споры и защита в суде. Более 15 лет опыта и сотни выигранных дел.',
      logo: 'https://images.pexels.com/photos/7876154/pexels-photo-7876154.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/7876154/pexels-photo-7876154.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/7876154/pexels-photo-7876154.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6285113/pexels-photo-6285113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Консультация юриста', price: '3 000 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/7876154/pexels-photo-7876154.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Составление договора', price: 'от 5 000 ₽', duration: '1–3 дня', image: 'https://images.pexels.com/photos/6285113/pexels-photo-6285113.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Представительство в суде', price: 'от 30 000 ₽', duration: 'по делу', image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Правовой аудит бизнеса', price: '15 000 ₽', duration: '5 дней', image: 'https://images.pexels.com/photos/7876154/pexels-photo-7876154.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Виктор Громов', role: 'Управляющий партнёр', avatar: 'https://images.pexels.com/photos/6285113/pexels-photo-6285113.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Ольга Белова', role: 'Адвокат по семейным делам', avatar: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Андрей Тихий', role: 'Корпоративный юрист', avatar: 'https://images.pexels.com/photos/7876154/pexels-photo-7876154.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'ул. Новый Арбат, 21, Москва',
      hours: 'Пн–Пт: 09:00 – 19:00',
      phone: '+7 (495) 666-77-88',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'WhatsApp', url: '#' }, { label: 'Телефон', url: '#' }],
      reviews: [
        { name: 'Алексей К.', text: 'Виктор выиграл сложнейшее дело по недвижимости. Профессионал высшего класса.', rating: 5 },
        { name: 'Татьяна М.', text: 'Ольга помогла с разводом и разделом имущества. Очень деликатно и грамотно.', rating: 5 },
        { name: 'ООО «Прогресс»', text: 'Правовой аудит выявил риски, о которых мы не подозревали. Спасибо команде!', rating: 5 },
      ],
    },
  },
  {
    designId: 'coral',
    business: {
      name: 'Studio Lens',
      tagline: 'Истории через объектив',
      description: 'Фотостудия для творческих людей. Портретная, предметная и свадебная съёмка. Профессиональный свет, реквизит и мгновенная ретушь.',
      logo: 'https://images.pexels.com/photos/11234300/pexels-photo-11234300.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/11234300/pexels-photo-11234300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/11234300/pexels-photo-11234300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Портретная съёмка', price: '5 000 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/11234300/pexels-photo-11234300.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Свадебная съёмка', price: 'от 25 000 ₽', duration: '8 часов', image: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Предметная съёмка', price: '1 500 ₽/товар', duration: '20 мин', image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Аренда студии', price: '2 000 ₽/час', duration: '1 час', image: 'https://images.pexels.com/photos/11234300/pexels-photo-11234300.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Кирилл Солнцев', role: 'Фотограф, основатель', avatar: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Диана Свет', role: 'Ретушёр, фотограф', avatar: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'Красный Октябрь, Берсеневская наб. 6, Москва',
      hours: 'Пн–Вс: 09:00 – 23:00',
      phone: '+7 (495) 777-88-99',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'Instagram', url: '#' }, { label: 'WhatsApp', url: '#' }],
      reviews: [
        { name: 'Анна и Павел', text: 'Кирилл снял нашу свадьбу — каждый кадр как обложка журнала!', rating: 5 },
        { name: 'Бренд «Нова»', text: 'Предметная съёмка для каталога — идеальное качество и скорость.', rating: 5 },
        { name: 'Алина', text: 'Портретная сессия получилась невероятной. Студия очень стильная.', rating: 5 },
      ],
    },
  },
  {
    designId: 'midnight',
    business: {
      name: 'Noir Lounge',
      tagline: 'Элитное пространство для избранных',
      description: 'Премиум-лаундж с авторскими коктейлями, живой музыкой и приватными кабинетами. Вечер, который запомнится.',
      logo: 'https://images.pexels.com/photos/417279/pexels-photo-417279.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/417279/pexels-photo-417279.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/417279/pexels-photo-417279.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Бронь столика', price: 'бесплатно', duration: '—', image: 'https://images.pexels.com/photos/417279/pexels-photo-417279.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'VIP-кабинет (до 8 чел)', price: '15 000 ₽', duration: 'вечер', image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Дегустация коктейлей', price: '5 000 ₽', duration: '90 мин', image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Аренда для мероприятий', price: 'от 50 000 ₽', duration: 'вечер', image: 'https://images.pexels.com/photos/417279/pexels-photo-417279.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Даниил Нуар', role: 'Управляющий', avatar: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Виктория Ночь', role: 'Бар-менеджер', avatar: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'Никольская ул., 10, Москва',
      hours: 'Пт–Сб: 20:00 – 06:00, Вс–Чт: 19:00 – 02:00',
      phone: '+7 (495) 888-99-00',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'Instagram', url: '#' }, { label: 'WhatsApp', url: '#' }],
      reviews: [
        { name: 'Александр', text: 'Атмосфера вне конкуренции. Коктейли авторские и невероятные.', rating: 5 },
        { name: 'Мария', text: 'Отмечали день рождения в VIP — всё было безупречно.', rating: 5 },
        { name: 'Дмитрий', text: 'Живая музыка по пятницам — лучшее в Москве.', rating: 5 },
      ],
    },
  },
  {
    designId: 'forest',
    business: {
      name: 'Iron Forest Gym',
      tagline: 'Тренируйся как зверь',
      description: 'Фитнес-клуб для серьёзных тренировок. Свободные веса, функциональная зона, персональные тренеры и спортивное питание. Никаких очередей к тренажёрам.',
      logo: 'https://images.pexels.com/photos/39219674/pexels-photo-39219674.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/39219674/pexels-photo-39219674.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/39219674/pexels-photo-39219674.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Персональная тренировка', price: '3 000 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/39219674/pexels-photo-39219674.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Абонемент (месяц)', price: '4 500 ₽', duration: '30 дней', image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Групповая тренировка', price: '800 ₽', duration: '55 мин', image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Программа питания', price: '5 000 ₽', duration: 'разовая', image: 'https://images.pexels.com/photos/39219674/pexels-photo-39219674.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Руслан Железный', role: 'Тренер, КМС', avatar: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Ольга Сила', role: 'Тренер, фитнес-бикини', avatar: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'ул. Большая Семёновская, 42, Москва',
      hours: 'Пн–Вс: 06:00 – 00:00',
      phone: '+7 (495) 999-00-11',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'VK', url: '#' }, { label: 'WhatsApp', url: '#' }],
      reviews: [
        { name: 'Антон', text: 'Лучший зал в районе. Руслан составил программу — за 3 месяца минус 12 кг.', rating: 5 },
        { name: 'Евгения', text: 'Занимаюсь с Ольгой — подготовилась к соревнованиям!', rating: 5 },
        { name: 'Денис', text: 'Наконец зал без очередей. Оборудование топовое.', rating: 5 },
      ],
    },
  },
  {
    designId: 'sand',
    business: {
      name: 'Школа «Знание»',
      tagline: 'Образование, которое меняет жизнь',
      description: 'Образовательный центр для взрослых. Курсы по программированию, дизайну, маркетингу и бизнесу. Живые занятия, практика и поддержка менторов.',
      logo: 'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      cover: 'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      photos: [
        'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/6285113/pexels-photo-6285113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      ],
      services: [
        { name: 'Курс «Веб-разработка»', price: '45 000 ₽', duration: '3 месяца', image: 'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Курс «UX/UI дизайн»', price: '35 000 ₽', duration: '2 месяца', image: 'https://images.pexels.com/photos/6285113/pexels-photo-6285113.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Интенсив «Маркетинг»', price: '15 000 ₽', duration: '2 недели', image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Консультация ментора', price: '3 000 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Павел Мудрый', role: 'Основатель, ментор', avatar: 'https://images.pexels.com/photos/6285113/pexels-photo-6285113.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Дарья Код', role: 'Преподаватель разработки', avatar: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Игорь Пиксель', role: 'Преподаватель дизайна', avatar: 'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      ],
      address: 'Новослободская ул., 31, Москва',
      hours: 'Пн–Пт: 10:00 – 21:00, Сб: 10:00 – 18:00',
      phone: '+7 (495) 000-11-22',
      socials: [{ label: 'Telegram', url: '#' }, { label: 'VK', url: '#' }, { label: 'WhatsApp', url: '#' }],
      reviews: [
        { name: 'Максим', text: 'После курса разработки нашёл работу за 2 месяца. Лучшая инвестиция!', rating: 5 },
        { name: 'Алёна', text: 'Курс дизайна с Игорем — это практика с первого дня. Очень рекомендую!', rating: 5 },
        { name: 'Олег', text: 'Менторство с Павлом помогло запустить свой бизнес. Благодарен!', rating: 5 },
      ],
    },
  },
];

export interface PricingTier {
  staff: string;
  price: string;
  period: string;
  features: string[];
  highlight: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    staff: '1 сотрудник',
    price: '890 ₽',
    period: '/ месяц',
    features: [
      '1 специалист с расписанием',
      'Безлимитные услуги и заявки',
      'Все 15 дизайнов клиентских страниц',
      'Онлайн-запись и бронирование',
      'Контакты, карты и соцсети',
    ],
    highlight: false,
  },
  {
    staff: 'До 3 сотрудников',
    price: '1 800 ₽',
    period: '/ месяц',
    features: [
      'До 3 специалистов с расписанием',
      'Безлимитные услуги и заявки',
      'Все 15 дизайнов клиентских страниц',
      'Онлайн-запись и бронирование',
      'Контакты, карты и соцсети',
    ],
    highlight: true,
  },
  {
    staff: 'До 7 сотрудников',
    price: '3 200 ₽',
    period: '/ месяц',
    features: [
      'До 7 специалистов с расписанием',
      'Безлимитные услуги и заявки',
      'Все 15 дизайнов клиентских страниц',
      'Онлайн-запись и бронирование',
      'Контакты, карты и соцсети',
    ],
    highlight: false,
  },
];

export interface Step {
  num: string;
  title: string;
  text: string;
}

export const steps: Step[] = [
  { num: '01', title: 'Регистрация', text: 'Создайте аккаунт PAZLIX за минуту — без программирования.' },
  { num: '02', title: 'Проект бизнеса', text: 'Укажите название, описание и сферу вашего бизнеса.' },
  { num: '03', title: 'Выбор дизайна', text: 'Выберите один из 15 профессиональных шаблонов.' },
  { num: '04', title: 'Логотип и фото', text: 'Загрузите логотип, фотографии офиса, помещений или работ.' },
  { num: '05', title: 'Услуги', text: 'Добавьте услуги с ценами, длительностью и фотографиями.' },
  { num: '06', title: 'Сотрудники', text: 'Добавьте специалистов, их аватары и расписания.' },
  { num: '07', title: 'Контакты', text: 'Укажите адрес, график, соцсети и карты.' },
  { num: '08', title: 'Готово', text: 'Получите готовую страницу для клиентов и начинайте получать заявки.' },
];
