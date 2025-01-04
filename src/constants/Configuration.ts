// constants.js
export const ARTIST_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";
export const SEARCH_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";
export const MOVIE_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

export const API_CONFIG = {
  //baseUrl: 'http://127.0.0.1:8000/api/v1/tmdb',
  baseUrl: 'http://192.168.1.7:8000/api/v1/tmdb',
  token: 'your-api-token', // Replace with your actual token if needed
};

export const SUPPORTED_LANGUAGES = [
  {
    iso_639_1: "hi",
    english_name: "Hindi",
    name: "हिन्दी",
  },
  {
    iso_639_1: "en",
    english_name: "English",
    name: "English",
  },
  {
    iso_639_1: "bn",
    english_name: "Bengali",
    name: "বাংলা",
  },
  {
    iso_639_1: "gu",
    english_name: "Gujarati",
    name: "",
  },
  {
    iso_639_1: "kn",
    english_name: "Kannada",
    name: "?????",
  },

  {
    iso_639_1: "ks",
    english_name: "Kashmiri",
    name: "",
  },
  {
    iso_639_1: "mr",
    english_name: "Marathi",
    name: "",
  },
  {
    iso_639_1: "or",
    english_name: "Oriya",
    name: "",
  },
  {
    iso_639_1: "sa",
    english_name: "Sanskrit",
    name: "",
  },
  {
    iso_639_1: "sd",
    english_name: "Sindhi",
    name: "",
  },
  {
    iso_639_1: "ta",
    english_name: "Tamil",
    name: "தமிழ்",
  },
  {
    iso_639_1: "ur",
    english_name: "Urdu",
    name: "اردو",
  },
  {
    iso_639_1: "ko",
    english_name: "Korean",
    name: "한국어/조선말",
  },
  {
    iso_639_1: "it",
    english_name: "Italian",
    name: "Italiano",
  },
  {
    iso_639_1: "ru",
    english_name: "Russian",
    name: "Pусский",
  },
  {
    iso_639_1: "sw",
    english_name: "Swahili",
    name: "Kiswahili",
  },

  {
    iso_639_1: "ps",
    english_name: "Pushto",
    name: "پښتو",
  },
  {
    iso_639_1: "cn",
    english_name: "Cantonese",
    name: "广州话 / 廣州話",
  },

  {
    iso_639_1: "pi",
    english_name: "Pali",
    name: "",
  },
  {
    iso_639_1: "so",
    english_name: "Somali",
    name: "Somali",
  },

  {
    iso_639_1: "th",
    english_name: "Thai",
    name: "ภาษาไทย",
  },
  {
    iso_639_1: "cu",
    english_name: "Slavic",
    name: "",
  },
  {
    iso_639_1: "fr",
    english_name: "French",
    name: "Français",
  },
  {
    iso_639_1: "la",
    english_name: "Latin",
    name: "Latin",
  },
  {
    iso_639_1: "ar",
    english_name: "Arabic",
    name: "العربية",
  },

  {
    iso_639_1: "et",
    english_name: "Estonian",
    name: "Eesti",
  },
  {
    iso_639_1: "mn",
    english_name: "Mongolian",
    name: "",
  },
  {
    iso_639_1: "my",
    english_name: "Burmese",
    name: "",
  },
  {
    iso_639_1: "pt",
    english_name: "Portuguese",
    name: "Português",
  },

  {
    iso_639_1: "ka",
    english_name: "Georgian",
    name: "ქართული",
  },
  {
    iso_639_1: "uz",
    english_name: "Uzbek",
    name: "ozbek",
  },
  {
    iso_639_1: "zh",
    english_name: "Mandarin",
    name: "普通话",
  },
  {
    iso_639_1: "el",
    english_name: "Greek",
    name: "ελληνικά",
  },
  {
    iso_639_1: "ga",
    english_name: "Irish",
    name: "Gaeilge",
  },

  {
    iso_639_1: "nl",
    english_name: "Dutch",
    name: "Nederlands",
  },
  {
    iso_639_1: "sl",
    english_name: "Slovenian",
    name: "Slovenščina",
  },
  {
    iso_639_1: "sr",
    english_name: "Serbian",
    name: "Srpski",
  },
  {
    iso_639_1: "ug",
    english_name: "Uighur",
    name: "",
  },
  {
    iso_639_1: "bg",
    english_name: "Bulgarian",
    name: "български език",
  },
  {
    iso_639_1: "mt",
    english_name: "Maltese",
    name: "Malti",
  },
  {
    iso_639_1: "ne",
    english_name: "Nepali",
    name: "",
  },
  {
    iso_639_1: "si",
    english_name: "Sinhalese",
    name: "සිංහල",
  },
  {
    iso_639_1: "sn",
    english_name: "Shona",
    name: "",
  },
  {
    iso_639_1: "su",
    english_name: "Sundanese",
    name: "",
  },
  {
    iso_639_1: "fi",
    english_name: "Finnish",
    name: "suomi",
  },
  {
    iso_639_1: "hr",
    english_name: "Croatian",
    name: "Hrvatski",
  },
  {
    iso_639_1: "vi",
    english_name: "Vietnamese",
    name: "Tiếng Việt",
  },
  {
    iso_639_1: "hy",
    english_name: "Armenian",
    name: "",
  },
  {
    iso_639_1: "az",
    english_name: "Azerbaijani",
    name: "Azərbaycan",
  },
  {
    iso_639_1: "lv",
    english_name: "Latvian",
    name: "Latviešu",
  },

  {
    iso_639_1: "pl",
    english_name: "Polish",
    name: "Polski",
  },
  {
    iso_639_1: "tr",
    english_name: "Turkish",
    name: "Türkçe",
  },
  {
    iso_639_1: "ca",
    english_name: "Catalan",
    name: "Català",
  },
  {
    iso_639_1: "de",
    english_name: "German",
    name: "Deutsch",
  },
  {
    iso_639_1: "ro",
    english_name: "Romanian",
    name: "Română",
  },
  {
    iso_639_1: "ty",
    english_name: "Tahitian",
    name: "",
  },
  {
    iso_639_1: "he",
    english_name: "Hebrew",
    name: "עִבְרִית",
  },
  {
    iso_639_1: "as",
    english_name: "Assamese",
    name: "",
  },
  {
    iso_639_1: "bo",
    english_name: "Tibetan",
    name: "",
  },
  {
    iso_639_1: "ja",
    english_name: "Japanese",
    name: "日本語",
  },
  {
    iso_639_1: "no",
    english_name: "Norwegian",
    name: "Norsk",
  },
  {
    iso_639_1: "pa",
    english_name: "Punjabi",
    name: "ਪੰਜਾਬੀ",
  },

  {
    iso_639_1: "am",
    english_name: "Amharic",
    name: "",
  },
  {
    iso_639_1: "fa",
    english_name: "Persian",
    name: "فارسی",
  },
  {
    iso_639_1: "is",
    english_name: "Icelandic",
    name: "Íslenska",
  },
  {
    iso_639_1: "kk",
    english_name: "Kazakh",
    name: "қазақ",
  },
  {
    iso_639_1: "lt",
    english_name: "Lithuanian",
    name: "Lietuvių",
  },
  {
    iso_639_1: "mi",
    english_name: "Maori",
    name: "",
  },
  {
    iso_639_1: "ms",
    english_name: "Malay",
    name: "Bahasa melayu",
  },

  {
    iso_639_1: "tk",
    english_name: "Turkmen",
    name: "",
  },
  {
    iso_639_1: "af",
    english_name: "Afrikaans",
    name: "Afrikaans",
  },
  {
    iso_639_1: "cs",
    english_name: "Czech",
    name: "Český",
  },
  {
    iso_639_1: "ce",
    english_name: "Chechen",
    name: "",
  },
  {
    iso_639_1: "sk",
    english_name: "Slovak",
    name: "Slovenčina",
  },
  {
    iso_639_1: "tg",
    english_name: "Tajik",
    name: "",
  },
  {
    iso_639_1: "cv",
    english_name: "Chuvash",
    name: "",
  },
  {
    iso_639_1: "da",
    english_name: "Danish",
    name: "Dansk",
  },

  {
    iso_639_1: "kg",
    english_name: "Kongo",
    name: "",
  },
  {
    iso_639_1: "ku",
    english_name: "Kurdish",
    name: "",
  },
  {
    iso_639_1: "ml",
    english_name: "Malayalam",
    name: "",
  },
  {
    iso_639_1: "es",
    english_name: "Spanish",
    name: "Español",
  },
  {
    iso_639_1: "sv",
    english_name: "Swedish",
    name: "svenska",
  },
  {
    iso_639_1: "te",
    english_name: "Telugu",
    name: "తెలుగు",
  },
];

export const SUPPORTED_GENRES = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  // {
  //   id: 10765,
  //   name: "Sci-Fi & Fantasy",
  // },
  // {
  //   id: 10759,
  //   name: "Action & Adventure",
  // },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
];
