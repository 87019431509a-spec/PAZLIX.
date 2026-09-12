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
        { name: 'Женская стрижка', price: 'от 1 500 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Окрашивание Airtouch', price: 'от 6 500 ₽', duration: '180 мин', image: 'https://images.pexels.com/photos/3993455/pexels-photo-3993455.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Укладка на выход', price: '2 000 ₽', duration: '45 мин', image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Уход для волос Olaplex', price: '3 000 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/3993452/pexels-photo-3993452.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
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
        { name: 'Релакс-массаж 60 мин', price: '3 500 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/6187418/pexels-photo-6187418.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Горячие камни', price: '4 500 ₽', duration: '90 мин', image: 'https://images.pexels.com/photos/6187652/pexels-photo-6187652.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Стоун-терапия для спины', price: '3 000 ₽', duration: '45 мин', image: 'https://images.pexels.com/photos/9146381/pexels-photo-9146381.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Арома-спа ритуал', price: '5 500 ₽', duration: '120 мин', image: 'https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
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
        { name: 'Маникюр + гель-лак', price: '2 000 ₽', duration: '90 мин', image: 'https://images.pexels.com/photos/7446912/pexels-photo-7446912.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Дизайн ногтей (френч/втирка)', price: 'от 500 ₽', duration: '30 мин', image: 'https://images.pexels.com/photos/4965824/pexels-photo-4965824.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Педикюр SPA', price: '3 000 ₽', duration: '90 мин', image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Наращивание ногтей', price: 'от 3 500 ₽', duration: '150 мин', image: 'https://images.pexels.com/photos/7446915/pexels-photo-7446915.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
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
        { name: 'Коррекция бровей', price: '1 200 ₽', duration: '30 мин', image: 'https://images.pexels.com/photos/5177990/pexels-photo-5177990.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Ламинирование бровей', price: '2 500 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/7446904/pexels-photo-7446904.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Окрашивание + коррекция', price: '1 800 ₽', duration: '45 мин', image: 'https://images.pexels.com/photos/5177991/pexels-photo-5177991.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Архитектура бровей', price: '3 000 ₽', duration: '75 мин', image: 'https://images.pexels.com/photos/7893958/pexels-photo-7893958.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
      ],
      team: [
        { name: 'Дарья Гордеева', role: 'Браумастер, основатель', avatar: 'https://images.pexels.com/photos/5177990/pexels-photo-5177990.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Кристина Лебедева', role: 'Мастер бровей', avatar: 'https://images.pexels.com/photos/5177991/pexels-photo-5177991.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
        { name: 'Алина Муравьёва', role: 'Браумастер', avatar: 'https://images.pexels.com/photos/7446904/pexels-photo-7446904.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
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
        { name: 'Классическое наращивание', price: '2 500 ₽', duration: '90 мин', image: 'https://images.pexels.com/photos/8554941/pexels-photo-8554941.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Объём 2D-3D', price: '3 500 ₽', duration: '120 мин', image: 'https://images.pexels.com/photos/7446922/pexels-photo-7446922.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Ламинация ресниц', price: '2 200 ₽', duration: '60 мин', image: 'https://images.pexels.com/photos/34930118/pexels-photo-34930118.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
        { name: 'Снятие + коррекция', price: '1 000 ₽', duration: '30 мин', image: 'https://images.pexels.com/photos/7755654/pexels-photo-7755654.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
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
      'Все 5 дизайнов клиентских страниц',
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
      'Все 5 дизайнов клиентских страниц',
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
      'Все 5 дизайнов клиентских страниц',
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
  { num: '03', title: 'Выбор дизайна', text: 'Выберите один из 5 профессиональных вариантов.' },
  { num: '04', title: 'Логотип и фото', text: 'Загрузите логотип, фотографии офиса, помещений или работ.' },
  { num: '05', title: 'Услуги', text: 'Добавьте услуги с ценами, длительностью и фотографиями.' },
  { num: '06', title: 'Сотрудники', text: 'Добавьте специалистов, их аватары и расписания.' },
  { num: '07', title: 'Контакты', text: 'Укажите адрес, график, соцсети и карты.' },
  { num: '08', title: 'Готово', text: 'Получите готовую страницу для клиентов и начинайте получать заявки.' },
];
