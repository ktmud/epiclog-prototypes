import { useState, useEffect, useRef } from "react";
import {
  MapPin, Coffee, Landmark, Utensils, Globe, Check, Plus, Share2,
  ChevronRight, ArrowLeft, Sparkles, Link2, PenLine, Map,
  User, Music2, BookOpen, X, RotateCw, Building2, Camera, Clock,
  Star, Navigation, Phone, Globe2, FileText, CalendarCheck,
  Pencil, ExternalLink, CheckCircle2, Circle, StickyNote, Tag,
  Inbox, TrendingUp, Flame, Users, Filter, Search, Bell, Flag,
  TreePine, Snowflake, Trophy, Pin, Trash2,
  SlidersHorizontal, LayoutList, Layers, AlignLeft, Clock
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────

const CategoryIcon = ({ tag, size = 18, color = "currentColor" }) => {
  const p = { size, color, strokeWidth: 2 };
  return ({
    Countries: <Globe {...p} />,
    Coffee: <Coffee {...p} />,
    Landmarks: <Landmark {...p} />,
    Food: <Utensils {...p} />,
    UNESCO: <Building2 {...p} />,
    Nature: <TreePine {...p} />,
    Seasonal: <Snowflake {...p} />,
  })[tag] || <MapPin {...p} />;
};
const SourceIcon = ({ source, size = 13 }) => {
  const p = { size, strokeWidth: 2 };
  return source === "instagram" ? <Camera {...p} /> : source === "tiktok" ? <Music2 {...p} /> :
    source === "rednote" ? <BookOpen {...p} /> : <Link2 {...p} />;
};
const srcColor = (s) => ({ instagram: "#E1306C", tiktok: "#2D2D2D", rednote: "#FF2D2D" }[s] || "#888");

// ── Data ─────────────────────────────────────────────────────────────────────

const INITIAL_LISTS = [
  {
    id: 1, title: "Former Soviet Union", tag: "Countries",
    description: "15 countries, one epic journey through post-Soviet history",
    total: 15, visited: 4, color: "#C8002D", colorLight: "#FFE8EE", accent: "#A00024",
    places: [
      { id: 101, name: "Russia", visited: true, visitedDate: "Mar 2022", rating: 4, notes: "Trans-Siberian Railway was unforgettable.", address: "Moscow, Russia", phone: "", website: "visitrussia.com", tags: ["culture","history"] },
      { id: 102, name: "Ukraine", visited: true, visitedDate: "Jul 2019", rating: 5, notes: "Kyiv Old Town — magical cobblestone streets.", address: "Kyiv, Ukraine", phone: "", website: "", tags: ["culture"] },
      { id: 103, name: "Kazakhstan", visited: true, visitedDate: "Sep 2021", rating: 4, notes: "Almaty mountains exceeded every expectation.", address: "Almaty, Kazakhstan", phone: "", website: "", tags: ["nature","adventure"] },
      { id: 104, name: "Georgia", visited: true, visitedDate: "Oct 2021", rating: 5, notes: "Best wine in the world. Period.", address: "Tbilisi, Georgia", phone: "", website: "georgia.travel", tags: ["food","culture"] },
      { id: 105, name: "Armenia", visited: false, visitedDate: "", rating: 0, notes: "", address: "Yerevan, Armenia", phone: "", website: "", tags: [] },
      { id: 106, name: "Azerbaijan", visited: false, visitedDate: "", rating: 0, notes: "", address: "Baku, Azerbaijan", phone: "", website: "", tags: [] },
      { id: 107, name: "Belarus", visited: false, visitedDate: "", rating: 0, notes: "", address: "Minsk, Belarus", phone: "", website: "", tags: [] },
      { id: 108, name: "Moldova", visited: false, visitedDate: "", rating: 0, notes: "", address: "Chișinău, Moldova", phone: "", website: "", tags: [] },
      { id: 109, name: "Latvia", visited: false, visitedDate: "", rating: 0, notes: "", address: "Riga, Latvia", phone: "", website: "", tags: [] },
      { id: 110, name: "Lithuania", visited: false, visitedDate: "", rating: 0, notes: "", address: "Vilnius, Lithuania", phone: "", website: "", tags: [] },
      { id: 111, name: "Estonia", visited: false, visitedDate: "", rating: 0, notes: "", address: "Tallinn, Estonia", phone: "", website: "", tags: [] },
      { id: 112, name: "Tajikistan", visited: false, visitedDate: "", rating: 0, notes: "", address: "Dushanbe, Tajikistan", phone: "", website: "", tags: [] },
      { id: 113, name: "Kyrgyzstan", visited: false, visitedDate: "", rating: 0, notes: "", address: "Bishkek, Kyrgyzstan", phone: "", website: "", tags: [] },
      { id: 114, name: "Uzbekistan", visited: false, visitedDate: "", rating: 0, notes: "", address: "Tashkent, Uzbekistan", phone: "", website: "", tags: [] },
      { id: 115, name: "Turkmenistan", visited: false, visitedDate: "", rating: 0, notes: "", address: "Ashgabat, Turkmenistan", phone: "", website: "", tags: [] },
    ],
  },
  {
    id: 2, title: "Seattle Coffee Circuit", tag: "Coffee",
    description: "Top 10 specialty roasters hiding in plain sight",
    total: 10, visited: 7, color: "#1B4FCC", colorLight: "#EBF0FF", accent: "#1038A0",
    places: [
      { id: 201, name: "Victrola Coffee", visited: true, visitedDate: "Jan 2024", rating: 5, notes: "The Pike Place location has the best pour-over bar.", address: "310 E Pike St, Seattle", phone: "(206) 624-1725", website: "victrolacoffee.com", tags: ["pour-over","cozy"] },
      { id: 202, name: "Lighthouse Roasters", visited: true, visitedDate: "Feb 2024", rating: 4, notes: "Old-school roasting feel, incredible single origins.", address: "400 N 43rd St, Seattle", phone: "(206) 634-3140", website: "lighthouseroasters.com", tags: ["roastery"] },
      { id: 203, name: "Broadcast Coffee", visited: true, visitedDate: "Mar 2024", rating: 5, notes: "Tiny but mighty. The almond croissant is mandatory.", address: "4611 14th Ave NW, Seattle", phone: "", website: "broadcastcoffee.com", tags: ["pastries"] },
      { id: 204, name: "Milstead & Co.", visited: true, visitedDate: "Mar 2024", rating: 5, notes: "The most technically precise espresso in Seattle.", address: "754 N 34th St, Seattle", phone: "(206) 659-4814", website: "milsteadandco.com", tags: ["espresso","fremont"] },
      { id: 205, name: "Elm Coffee Roasters", visited: true, visitedDate: "Apr 2024", rating: 4, notes: "Beautiful Pioneer Square space, excellent filter.", address: "240 2nd Ave Ext S, Seattle", phone: "(206) 445-7808", website: "elmcoffeeroasters.com", tags: ["pioneer-square"] },
      { id: 206, name: "Caffe Vita", visited: true, visitedDate: "Apr 2024", rating: 4, notes: "Seattle OG. The Bull's Eye blend is iconic.", address: "1005 E Pike St, Seattle", phone: "(206) 709-4440", website: "caffevita.com", tags: ["classic"] },
      { id: 207, name: "Fonte Coffee", visited: true, visitedDate: "May 2024", rating: 3, notes: "Great downtown location, solid beans.", address: "1321 1st Ave, Seattle", phone: "(206) 777-6193", website: "fontecoffee.com", tags: ["downtown"] },
      { id: 208, name: "Analog Coffee", visited: false, visitedDate: "", rating: 0, notes: "Want to try their cold brew program.", address: "235 Summit Ave E, Seattle", phone: "(206) 328-7777", website: "", tags: ["cold-brew"] },
      { id: 209, name: "Street Bean Espresso", visited: false, visitedDate: "", rating: 0, notes: "", address: "2702 3rd Ave, Seattle", phone: "", website: "", tags: [] },
      { id: 210, name: "Ada's Technical Books", visited: false, visitedDate: "", rating: 0, notes: "Also a bookshop — double win.", address: "425 15th Ave E, Seattle", phone: "(206) 322-1058", website: "adasbooks.com", tags: ["books","unique"] },
    ],
  },
  {
    id: 3, title: "7 Wonders of the World", tag: "Landmarks",
    description: "The new seven wonders voted by 100 million people",
    total: 7, visited: 2, color: "#00AABB", colorLight: "#E6FCF5", accent: "#008899",
    places: [
      { id: 301, name: "Great Wall of China", visited: true, visitedDate: "Aug 2018", rating: 5, notes: "Mutianyu section — fewer crowds, stunning autumn colors.", address: "Huairou, Beijing, China", phone: "", website: "", tags: ["bucket-list","history"] },
      { id: 302, name: "Petra", visited: true, visitedDate: "Nov 2019", rating: 5, notes: "Arrive before 7am. Treasury at sunrise = life-changing.", address: "Ma'an, Jordan", phone: "", website: "visitpetra.jo", tags: ["bucket-list","sunrise"] },
      { id: 303, name: "Christ the Redeemer", visited: false, visitedDate: "", rating: 0, notes: "", address: "Rio de Janeiro, Brazil", phone: "", website: "", tags: [] },
      { id: 304, name: "Machu Picchu", visited: false, visitedDate: "", rating: 0, notes: "Book Inca Trail permit 6 months in advance.", address: "Cusco, Peru", phone: "", website: "", tags: ["hiking"] },
      { id: 305, name: "Chichen Itza", visited: false, visitedDate: "", rating: 0, notes: "", address: "Yucatán, Mexico", phone: "", website: "", tags: [] },
      { id: 306, name: "Roman Colosseum", visited: false, visitedDate: "", rating: 0, notes: "Pre-book skip-the-line tickets.", address: "Piazza del Colosseo, Rome, Italy", phone: "", website: "colosseo.it", tags: ["history"] },
      { id: 307, name: "Taj Mahal", visited: false, visitedDate: "", rating: 0, notes: "", address: "Agra, Uttar Pradesh, India", phone: "", website: "", tags: [] },
    ],
  },
  {
    id: 4, title: "Tokyo Ramen Tour", tag: "Food",
    description: "12 legendary bowls across Tokyo's ramen districts",
    total: 12, visited: 0, color: "#E8A020", colorLight: "#FFF4DC", accent: "#C8500A",
    places: [
      { id: 401, name: "Fuunji (Shinjuku)", visited: false, visitedDate: "", rating: 0, notes: "Arrive 30 min before opening. Tsukemen is the must-order.", address: "2-14-3 Yoyogi, Shibuya", phone: "", website: "", tags: ["tsukemen","queue"] },
      { id: 402, name: "Ichiran Shibuya", visited: false, visitedDate: "", rating: 0, notes: "Solo dining booths — uniquely Japanese.", address: "1-22-7 Jinnan, Shibuya", phone: "", website: "ichiran.com", tags: ["tonkotsu"] },
      { id: 403, name: "Afuri Harajuku", visited: false, visitedDate: "", rating: 0, notes: "Yuzu shio — light and citrusy.", address: "3-63-1 Sendagaya, Shibuya", phone: "", website: "afuri.com", tags: ["yuzu","shio"] },
      { id: 404, name: "Nakiryu", visited: false, visitedDate: "", rating: 0, notes: "Michelin-starred. Dandan noodles only.", address: "2-34-4 Nishiogu, Arakawa", phone: "", website: "", tags: ["michelin"] },
      { id: 405, name: "Tsuta Sugamo", visited: false, visitedDate: "", rating: 0, notes: "World's first Michelin-starred ramen shop.", address: "1-14-1 Sugamo, Toshima", phone: "", website: "", tags: ["michelin","shoyu"] },
      { id: 406, name: "Konjiki Hototogisu", visited: false, visitedDate: "", rating: 0, notes: "", address: "2-4-1 Shinjuku, Shinjuku", phone: "", website: "", tags: [] },
      { id: 407, name: "Kagari Ginza", visited: false, visitedDate: "", rating: 0, notes: "Chicken paitan — rich and silky.", address: "6-4-12 Ginza, Chuo", phone: "", website: "", tags: ["chicken"] },
      { id: 408, name: "Mensho Tokyo", visited: false, visitedDate: "", rating: 0, notes: "", address: "1-4-16 Hakusan, Bunkyo", phone: "", website: "", tags: [] },
      { id: 409, name: "Taishoken", visited: false, visitedDate: "", rating: 0, notes: "The original tsukemen inventor.", address: "1-60-1 Higashiikebukuro, Toshima", phone: "", website: "", tags: ["historic","tsukemen"] },
      { id: 410, name: "Bassanova", visited: false, visitedDate: "", rating: 0, notes: "", address: "2-14-7 Kyomachibori, Nishi", phone: "", website: "", tags: [] },
      { id: 411, name: "Fuji Soba", visited: false, visitedDate: "", rating: 0, notes: "Standing soba chain — authentic fast food.", address: "Multiple locations, Tokyo", phone: "", website: "", tags: ["soba"] },
      { id: 412, name: "Ramen Jiro", visited: false, visitedDate: "", rating: 0, notes: "Extreme portions. Cult following.", address: "2-16-4 Mita, Minato", phone: "", website: "", tags: ["extreme","cult"] },
    ],
  },
  {
    id: 5, title: "European Christmas Markets", tag: "Seasonal",
    description: "The most magical winter markets across Europe",
    total: 9, visited: 3, color: "#8B1A8B", colorLight: "#F8E8F8", accent: "#6A106A",
    places: [
      { id: 501, name: "Strasbourg, France", visited: true, visitedDate: "Dec 2022", rating: 5, notes: "The oldest Christmas market in Europe. Mulled wine on every corner.", address: "Strasbourg, France", phone: "", website: "", tags: ["wine","historic"] },
      { id: 502, name: "Vienna, Austria", visited: true, visitedDate: "Dec 2021", rating: 5, notes: "Rathaus market is breathtaking at night.", address: "Vienna, Austria", phone: "", website: "", tags: ["classic"] },
      { id: 503, name: "Prague, Czech Republic", visited: true, visitedDate: "Dec 2019", rating: 4, notes: "Old Town Square transforms completely.", address: "Prague, Czech Republic", phone: "", website: "", tags: ["cobblestone"] },
      { id: 504, name: "Cologne, Germany", visited: false, visitedDate: "", rating: 0, notes: "Cathedral backdrop is iconic.", address: "Cologne, Germany", phone: "", website: "", tags: [] },
      { id: 505, name: "Bruges, Belgium", visited: false, visitedDate: "", rating: 0, notes: "", address: "Bruges, Belgium", phone: "", website: "", tags: [] },
      { id: 506, name: "Edinburgh, Scotland", visited: false, visitedDate: "", rating: 0, notes: "", address: "Edinburgh, Scotland", phone: "", website: "", tags: [] },
      { id: 507, name: "Tallinn, Estonia", visited: false, visitedDate: "", rating: 0, notes: "Medieval old town + snow = perfect.", address: "Tallinn, Estonia", phone: "", website: "", tags: ["medieval"] },
      { id: 508, name: "Nuremberg, Germany", visited: false, visitedDate: "", rating: 0, notes: "The original Christkindlesmarkt.", address: "Nuremberg, Germany", phone: "", website: "", tags: ["historic"] },
      { id: 509, name: "Budapest, Hungary", visited: false, visitedDate: "", rating: 0, notes: "", address: "Budapest, Hungary", phone: "", website: "", tags: [] },
    ],
  },
  {
    id: 6, title: "Best Beaches in SE Asia", tag: "Nature",
    description: "Crystal water, white sand, legendary sunsets",
    total: 11, visited: 5, color: "#00843D", colorLight: "#E0F8EC", accent: "#00662E",
    places: [
      { id: 601, name: "Railay Beach, Thailand", visited: true, visitedDate: "Feb 2020", rating: 5, notes: "Accessible only by boat. Limestone cliffs are jaw-dropping.", address: "Krabi, Thailand", phone: "", website: "", tags: ["dramatic","cliffs"] },
      { id: 602, name: "Koh Lanta, Thailand", visited: true, visitedDate: "Feb 2020", rating: 4, notes: "Less crowded than Phi Phi. Perfect vibe.", address: "Koh Lanta, Thailand", phone: "", website: "", tags: ["chill"] },
      { id: 603, name: "Palawan, Philippines", visited: true, visitedDate: "Mar 2018", rating: 5, notes: "El Nido lagoons are otherworldly.", address: "Palawan, Philippines", phone: "", website: "", tags: ["lagoon","snorkeling"] },
      { id: 604, name: "Gili Trawangan, Indonesia", visited: true, visitedDate: "Jun 2019", rating: 4, notes: "No cars, just bikes and horses.", address: "Lombok, Indonesia", phone: "", website: "", tags: ["no-cars"] },
      { id: 605, name: "Nusa Penida, Indonesia", visited: true, visitedDate: "Jun 2019", rating: 5, notes: "Kelingking Beach cliff view is unreal.", address: "Bali, Indonesia", phone: "", website: "", tags: ["cliffs","instagram"] },
      { id: 606, name: "Koh Rong, Cambodia", visited: false, visitedDate: "", rating: 0, notes: "", address: "Koh Rong, Cambodia", phone: "", website: "", tags: [] },
      { id: 607, name: "Phu Quoc, Vietnam", visited: false, visitedDate: "", rating: 0, notes: "", address: "Phu Quoc, Vietnam", phone: "", website: "", tags: [] },
      { id: 608, name: "Koh Tao, Thailand", visited: false, visitedDate: "", rating: 0, notes: "Best diving in the Gulf.", address: "Koh Tao, Thailand", phone: "", website: "", tags: ["diving"] },
      { id: 609, name: "Tioman Island, Malaysia", visited: false, visitedDate: "", rating: 0, notes: "", address: "Pahang, Malaysia", phone: "", website: "", tags: [] },
      { id: 610, name: "Con Dao, Vietnam", visited: false, visitedDate: "", rating: 0, notes: "", address: "Con Dao, Vietnam", phone: "", website: "", tags: [] },
      { id: 611, name: "Karimunjawa, Indonesia", visited: false, visitedDate: "", rating: 0, notes: "", address: "Central Java, Indonesia", phone: "", website: "", tags: [] },
    ],
  },
  {
    id: 7, title: "NYC Bagel Pilgrimage", tag: "Food",
    description: "The definitive ranking of New York's finest bagels",
    total: 8, visited: 8, color: "#E8A020", colorLight: "#FFF4DC", accent: "#B87A10",
    places: [
      { id: 701, name: "Ess-a-Bagel", visited: true, visitedDate: "Apr 2023", rating: 5, notes: "The platonic ideal of a New York bagel.", address: "831 3rd Ave, New York", phone: "(212) 980-1010", website: "ess-a-bagel.com", tags: ["classic","huge"] },
      { id: 702, name: "Absolute Bagels", visited: true, visitedDate: "Apr 2023", rating: 5, notes: "Columbia students swear by it. Sesame everything.", address: "2788 Broadway, New York", phone: "(212) 932-2052", website: "", tags: ["uptown"] },
      { id: 703, name: "H&H Bagels", visited: true, visitedDate: "May 2023", rating: 4, notes: "Legendary for a reason. Soft and chewy.", address: "2239 Broadway, New York", phone: "(212) 595-8003", website: "hhbagels.com", tags: ["legendary"] },
      { id: 704, name: "Russ & Daughters", visited: true, visitedDate: "May 2023", rating: 5, notes: "The lox and cream cheese combo is transcendent.", address: "179 E Houston St, New York", phone: "(212) 475-4880", website: "russanddaughters.com", tags: ["lox","historic"] },
      { id: 705, name: "Murray's Bagels", visited: true, visitedDate: "Jun 2023", rating: 4, notes: "No toasting allowed — a bold stance, correct stance.", address: "500 6th Ave, New York", phone: "(212) 462-2830", website: "", tags: ["no-toast"] },
      { id: 706, name: "Tompkins Square Bagels", visited: true, visitedDate: "Jun 2023", rating: 4, notes: "East Village gem. Creative schmear options.", address: "165 Avenue A, New York", phone: "", website: "", tags: ["east-village","creative"] },
      { id: 707, name: "Black Seed Bagels", visited: true, visitedDate: "Jul 2023", rating: 4, notes: "Montreal-meets-NYC style. Wood-fired.", address: "170 Elizabeth St, New York", phone: "", website: "blackseedbagels.com", tags: ["montreal-style","wood-fired"] },
      { id: 708, name: "Sadelle's", visited: true, visitedDate: "Jul 2023", rating: 3, notes: "Great vibe, slightly overrated bagel.", address: "463 W Broadway, New York", phone: "(212) 776-4926", website: "sadelles.com", tags: ["brunch","soho"] },
    ],
  },
  {
    id: 8, title: "National Parks USA", tag: "Nature",
    description: "America's greatest wilderness areas — one stamp at a time",
    total: 10, visited: 2, color: "#00843D", colorLight: "#E0F8EC", accent: "#00662E",
    places: [
      { id: 801, name: "Yellowstone", visited: true, visitedDate: "Aug 2021", rating: 5, notes: "Grand Prismatic Spring from the overlook trail is unbelievable.", address: "Wyoming, USA", phone: "", website: "nps.gov/yell", tags: ["geysers","wildlife"] },
      { id: 802, name: "Grand Canyon", visited: true, visitedDate: "Oct 2022", rating: 5, notes: "South Rim at sunset. Photos don't do it justice.", address: "Arizona, USA", phone: "", website: "nps.gov/grca", tags: ["iconic","hiking"] },
      { id: 803, name: "Zion National Park", visited: false, visitedDate: "", rating: 0, notes: "Angels Landing permit required. The Narrows is on my list.", address: "Utah, USA", phone: "", website: "nps.gov/zion", tags: ["hiking","slot-canyons"] },
      { id: 804, name: "Yosemite", visited: false, visitedDate: "", rating: 0, notes: "Book lodging 6 months ahead minimum.", address: "California, USA", phone: "", website: "nps.gov/yose", tags: ["el-capitan","waterfalls"] },
      { id: 805, name: "Glacier National Park", visited: false, visitedDate: "", rating: 0, notes: "Going-to-the-Sun Road — drive it before glaciers are gone.", address: "Montana, USA", phone: "", website: "nps.gov/glac", tags: ["glaciers","scenic-drive"] },
      { id: 806, name: "Arches", visited: false, visitedDate: "", rating: 0, notes: "", address: "Utah, USA", phone: "", website: "nps.gov/arch", tags: ["rock-formations"] },
      { id: 807, name: "Olympic National Park", visited: false, visitedDate: "", rating: 0, notes: "", address: "Washington, USA", phone: "", website: "nps.gov/olym", tags: ["rainforest","coast"] },
      { id: 808, name: "Acadia National Park", visited: false, visitedDate: "", rating: 0, notes: "Cadillac Mountain for the first sunrise in the US.", address: "Maine, USA", phone: "", website: "nps.gov/acad", tags: ["sunrise","coast"] },
      { id: 809, name: "Great Smoky Mountains", visited: false, visitedDate: "", rating: 0, notes: "", address: "Tennessee/North Carolina, USA", phone: "", website: "nps.gov/grsm", tags: ["fall-foliage"] },
      { id: 810, name: "Joshua Tree", visited: false, visitedDate: "", rating: 0, notes: "Stargazing is insane here.", address: "California, USA", phone: "", website: "nps.gov/jotr", tags: ["stargazing","desert"] },
    ],
  },
];

const BACKLOG = [
  { id: 1, title: "Lisbon rooftop bars", source: "instagram", saved: "2 days ago" },
  { id: 2, title: "Hidden temples in Kyoto", source: "tiktok", saved: "1 week ago" },
  { id: 3, title: "Best paella in Valencia", source: "rednote", saved: "1 week ago" },
  { id: 4, title: "Norwegian fjord villages", source: "instagram", saved: "2 weeks ago" },
];

const EXPLORE_LISTS = [
  { id: 10, title: "Street Food in Bangkok", tag: "Food", description: "12 iconic street food stops every visitor must try", visited: 0, total: 12, color: "#E8A020", colorLight: "#FFF4DC", accent: "#C8500A", places: [] },
  { id: 11, title: "UNESCO Sites in Europe", tag: "UNESCO", description: "50 must-see heritage sites across the continent", visited: 0, total: 50, color: "#1B4FCC", colorLight: "#EBF0FF", accent: "#1038A0", places: [] },
  { id: 12, title: "Hidden Gems of Japan", tag: "Countries", description: "Off-the-beaten-path towns and landscapes", visited: 0, total: 8, color: "#00AABB", colorLight: "#E6FCF5", accent: "#008899", places: [] },
];

// ── Near Me data (simulated) ──────────────────────────────────────────────────

const NEARBY = [
  { id:"n1", title:"Seattle Coffee Circuit", tag:"Coffee", distance:"0.3 mi", next:"Analog Coffee", color:"#1B4FCC", colorLight:"#EBF0FF", visited:7, total:10 },
  { id:"n2", title:"National Parks USA", tag:"Nature", distance:"0.8 mi", next:"Olympic National Park", color:"#00843D", colorLight:"#E0F8EC", visited:2, total:10 },
  { id:"n3", title:"7 Wonders of the World", tag:"Landmarks", distance:"1.4 mi", next:"Roman Colosseum", color:"#00AABB", colorLight:"#E6FCF5", visited:2, total:7 },
];

const TAG_COLORS = {
  Countries:"#C8002D", Coffee:"#1B4FCC", Landmarks:"#00AABB",
  Food:"#E8A020", Nature:"#00843D", Seasonal:"#8B1A8B",
};

function applyListFiltersAndSort(lists, { sort, tags, progress }) {
  let out = [...lists];
  if (tags.length > 0) out = out.filter(l => tags.includes(l.tag));
  if (progress === "active")    out = out.filter(l => l.visited > 0 && l.visited < l.total);
  if (progress === "done")      out = out.filter(l => l.visited === l.total);
  if (progress === "unstarted") out = out.filter(l => l.visited === 0);
  if (sort === "progress") out.sort((a,b) => (b.visited/b.total)-(a.visited/a.total));
  if (sort === "az")       out.sort((a,b) => a.title.localeCompare(b.title));
  if (sort === "complete") out.sort((a,b) => { const ac=a.visited===a.total,bc=b.visited===b.total; return ac===bc?0:ac?-1:1; });
  return out;
}

function groupByCategory(lists) {
  const g = {};
  lists.forEach(l => { if (!g[l.tag]) g[l.tag]=[]; g[l.tag].push(l); });
  return Object.entries(g);
}

function groupByProgress(lists) {
  const done=lists.filter(l=>l.visited===l.total);
  const active=lists.filter(l=>l.visited>0&&l.visited<l.total);
  const unstarted=lists.filter(l=>l.visited===0);
  return [[done.length&&"Completed ✓",done],[active.length&&"In Progress",active],[unstarted.length&&"Not Started",unstarted]].filter(([l])=>l);
}

function NearMeCard({ item, onClick }) {
  const pct = Math.round((item.visited/item.total)*100);
  const done = item.visited === item.total;
  return (
    <div className="nearby-card" style={{ borderColor: item.color+"40" }} onClick={onClick}>
      <div className="nearby-top">
        <div className="nearby-icon" style={{ background:item.colorLight }}>
          <CategoryIcon tag={item.tag} size={15} color={item.color}/>
        </div>
        <div className="nearby-dist" style={{ color:item.color }}>
          <Navigation size={10} strokeWidth={2} style={{ marginRight:3 }}/>
          {item.distance}
        </div>
      </div>
      <div className="nearby-title">{item.title}</div>
      {!done && <div className="nearby-next">Next: <strong>{item.next}</strong></div>}
      {done && <div className="nearby-done">All done ✓</div>}
      <div className="nearby-bar-track">
        <div className="nearby-bar-fill" style={{ width:`${pct}%`, background:item.color }}/>
      </div>
      <div className="nearby-meta">
        <span style={{ color:item.color, fontWeight:700 }}>{pct}%</span>
        <span style={{ color:"#B0A080" }}>{item.visited}/{item.total}</span>
      </div>
    </div>
  );
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function ProgressRing({ pct, size = 52, stroke = 4, color = "#1B4FCC", bg = "#E8E0D0" }) {
  const r = (size - stroke) / 2, circ = 2 * Math.PI * r, dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", display: "block" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.85s cubic-bezier(.4,0,.2,1)" }} />
    </svg>
  );
}

function StarRating({ value, onChange, size = 15 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => onChange && onChange(n)}
          style={{ background: "none", border: "none", cursor: onChange ? "pointer" : "default", padding: 1 }}>
          <Star size={size} strokeWidth={1.8} fill={n <= value ? "#E8A020" : "none"} color={n <= value ? "#E8A020" : "#D0D0E4"} />
        </button>
      ))}
    </div>
  );
}

function PillFilter({ filters, active, onSelect }) {
  const ref = useRef(null);
  return (
    <div ref={ref} className="pill-filter-row">
      {filters.map(f => (
        <button key={f.id} className={`pill-filter ${active === f.id ? "pill-active" : ""}`}
          style={active === f.id ? { background: f.color || "#1B4FCC", color: "#fff", borderColor: "transparent" } : {}}
          onClick={() => onSelect(f.id)}>
          {f.icon && <span style={{ marginRight: 5, display:"flex", alignItems:"center" }}>{f.icon}</span>}
          {f.label}
        </button>
      ))}
    </div>
  );
}

// ── Swipeable List Card ───────────────────────────────────────────────────────

function ListCard({ list, onClick, index, onDelete, onPin, onShare, pinned }) {
  const pct = Math.round((list.visited / list.total) * 100);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const ACTION_THRESHOLD = 72;
  const CELEBRATE_THRESHOLD = 80;

  const onPointerDown = (e) => {
    setDragging(true);
    startX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    startOffset.current = offset;
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const delta = x - startX.current + startOffset.current;
    // Clamp: left swipe max -220px (show 3 action buttons), right swipe max +90px
    setOffset(Math.max(-220, Math.min(90, delta)));
    if (delta > CELEBRATE_THRESHOLD && !celebrated) setCelebrated(true);
    if (delta <= CELEBRATE_THRESHOLD && celebrated) setCelebrated(false);
  };

  const onPointerUp = () => {
    setDragging(false);
    if (offset < -ACTION_THRESHOLD) {
      // Snap to show actions
      setOffset(-220);
    } else if (offset > CELEBRATE_THRESHOLD) {
      // Swipe right = check-in celebration, then snap back
      setCelebrated(true);
      setTimeout(() => { setOffset(0); setCelebrated(false); }, 900);
    } else {
      setOffset(0);
    }
  };

  const closeSwipe = () => setOffset(0);

  const bgColor = offset > 0
    ? `rgba(32,201,151,${Math.min(1, offset / 80)})`
    : `rgba(0,0,0,0)`;

  return (
    <div className="swipe-wrapper" style={{ animationDelay: `${index * 70}ms`, animation: "slideUp 0.34s cubic-bezier(.4,0,.2,1) both" }}>
      {/* Right-swipe bg (celebration) */}
      {offset > 0 && (
        <div className="swipe-celebrate" style={{ background: `linear-gradient(135deg, #E8A020, #C8002D)`, opacity: Math.min(1, offset / 60) }}>
          <CheckCircle2 size={22} color="#fff" strokeWidth={2.5} />
          <span className={`celebrate-text ${celebrated ? "show" : ""}`}>Check in! ✓</span>
        </div>
      )}

      {/* Left-swipe action buttons */}
      {offset < -10 && (
        <div className="swipe-actions-left">
          <button className="swipe-action-btn" style={{ background: "rgba(0,0,0,0.15)" }}
            onClick={(e) => { e.stopPropagation(); onPin(list.id); closeSwipe(); }}>
            <Pin size={16} strokeWidth={2} color="#fff" />
            <span className="swipe-action-lbl">{pinned ? "Unpin" : "Pin"}</span>
          </button>
          <button className="swipe-action-btn" style={{ background: "rgba(0,0,0,0.15)" }}
            onClick={(e) => { e.stopPropagation(); onShare(list); closeSwipe(); }}>
            <Share2 size={16} strokeWidth={2} color="#fff" />
            <span className="swipe-action-lbl">Share</span>
          </button>
          <button className="swipe-action-btn" style={{ background: "rgba(220,38,38,0.5)" }}
            onClick={(e) => { e.stopPropagation(); onDelete(list.id); }}>
            <Trash2 size={16} strokeWidth={2} color="#fff" />
            <span className="swipe-action-lbl">Delete</span>
          </button>
        </div>
      )}

      {/* The card itself */}
      <div
        className="swipe-card-inner list-card"
        style={{
          "--card-color": list.color,
          transform: `translateX(${offset}px)`,
          transition: dragging ? "none" : "transform 0.25s cubic-bezier(.4,0,.2,1)",
          borderRadius: 17,
          cursor: "pointer",
        }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={() => { if (dragging) onPointerUp(); }}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
        onClick={() => { if (Math.abs(offset) < 6) onClick(list); }}
      >
        {pinned && (
          <div style={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
            <Pin size={12} fill={list.color} color={list.color} strokeWidth={2} />
          </div>
        )}
        <div className="card-stripe" style={{ background: list.color }} />
        <div className="card-inner">
          <div className="card-top">
            <div className="card-icon-badge" style={{ background: list.colorLight }}>
              <CategoryIcon tag={list.tag} size={19} color={list.color} />
            </div>
            <div className="card-text">
              <span className="card-tag" style={{ color: list.color }}>{list.tag}</span>
              <h3 className="card-title">{list.title}</h3>
              <p className="card-desc">{list.description}</p>
            </div>
            <div className="card-ring-wrap">
              <ProgressRing pct={pct} size={52} stroke={4} color={list.color} bg={list.colorLight} />
              <span className="card-pct" style={{ color: list.color }}>{pct}%</span>
            </div>
          </div>
          <div className="card-footer">
            <div className="card-pill" style={{ background: list.colorLight, color: list.accent }}>
              <Check size={11} strokeWidth={3} style={{ marginRight: 4, flexShrink: 0 }} />
              {list.visited}/{list.total} visited
            </div>
            <div className="card-dots">
              {list.places.slice(0, 9).map((p, i) => (
                <span key={i} className="dot" style={{ background: p.visited ? list.color : "#E2E2EE" }} />
              ))}
              {list.total > 9 && <span className="dot-more" style={{ color: list.color }}>+{list.total - 9}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Backlog Banner ────────────────────────────────────────────────────────────

function BacklogBanner({ items, onExpand }) {
  return (
    <div className="backlog-banner" onClick={onExpand}>
      <div className="bb-left">
        <div className="bb-icon">
          <Inbox size={18} strokeWidth={2} color="#1B4FCC" />
        </div>
        <div className="bb-text">
          <div className="bb-title">Backlog</div>
          <div className="bb-sub">{items.length} unsorted places — tap to review</div>
        </div>
      </div>
      <div className="bb-right">
        <div className="bb-sources">
          {[...new Set(items.map(i => i.source))].map(s => (
            <span key={s} className="bb-src-dot" style={{ color: srcColor(s) }}>
              <SourceIcon source={s} size={12} />
            </span>
          ))}
        </div>
        <ChevronRight size={16} color="#1B4FCC" strokeWidth={2.5} />
      </div>
    </div>
  );
}

// ── Backlog Sheet ─────────────────────────────────────────────────────────────

function BacklogSheet({ items, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-titlebar">
          <div>
            <h3 className="sheet-title">Backlog</h3>
            <p className="sheet-sub">Places saved from social media — organize them into lists</p>
          </div>
          <button className="icon-btn" onClick={onClose}><X size={14} strokeWidth={2.5} /></button>
        </div>

        {/* AI suggestion */}
        <div className="ai-banner">
          <div className="ai-icon"><Sparkles size={17} strokeWidth={2} /></div>
          <div className="ai-text">
            <div className="ai-title">AI suggestion</div>
            <div className="ai-sub">3 places could form a "Lisbon Weekend" list</div>
          </div>
          <button className="ai-btn">Create</button>
        </div>

        <div className="backlog-list">
          {items.map((item, i) => (
            <div key={item.id} className="backlog-item" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="backlog-thumb"><MapPin size={18} strokeWidth={1.8} /></div>
              <div className="backlog-info">
                <div className="backlog-title">{item.title}</div>
                <div className="backlog-meta">
                  <span className="backlog-src"
                    style={{ color: srcColor(item.source), background: `${srcColor(item.source)}10`, border: `1px solid ${srcColor(item.source)}26` }}>
                    <SourceIcon source={item.source} size={11} />{item.source}
                  </span>
                  <Clock size={10} style={{ marginRight: 2 }} />{item.saved}
                </div>
              </div>
              <button className="backlog-add-btn"><Plus size={15} strokeWidth={2.5} /></button>
            </div>
          ))}
        </div>

        <div style={{ padding: "0 20px 32px" }}>
          <button className="action-btn action-primary" style={{ background: "linear-gradient(130deg,#C8002D,#1B4FCC)", width: "100%" }}>
            <Sparkles size={14} style={{ marginRight: 7 }} />Auto-organize with AI
          </button>
        </div>
      </div>
    </div>
  );
}

// ── POI Panel ─────────────────────────────────────────────────────────────────

function POIPanel({ place, list, onClose, onSave }) {
  const [tab, setTab] = useState("notes");
  const [editingDetails, setEditingDetails] = useState(false);
  const [draft, setDraft] = useState({ ...place });
  const [tagInput, setTagInput] = useState("");
  const set = (k, v) => setDraft(d => ({ ...d, [k]: v }));

  useEffect(() => { setDraft({ ...place }); }, [place]);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (t && !draft.tags.includes(t)) set("tags", [...draft.tags, t]);
    setTagInput("");
  };
  const removeTag = t => set("tags", draft.tags.filter(x => x !== t));

  const saveField = (key, value) => {
    const updated = { ...draft, [key]: value };
    setDraft(updated);
    onSave(updated, false);
  };

  const saveDetails = () => { onSave(draft, false); setEditingDetails(false); };
  const cancelDetails = () => { setDraft({ ...place }); setEditingDetails(false); };

  const handleToggleVisited = () => {
    const updated = {
      ...draft,
      visited: !draft.visited,
      visitedDate: !draft.visited ? new Date().toLocaleString("default", { month: "short", year: "numeric" }) : "",
      rating: !draft.visited ? draft.rating : 0,
    };
    onSave(updated, true);
  };

  const openEdit = () => { setTab("details"); setEditingDetails(true); };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="poi-sheet" onClick={e => e.stopPropagation()}>

        {/* ── Header: name, status, edit trigger, tabs ── */}
        <div className="poi-header">

          {/* Row 1: icon · name+list · close */}
          <div className="poi-header-row">
            <div className="poi-icon-wrap" style={{ background: list.colorLight }}>
              <CategoryIcon tag={list.tag} size={17} color={list.color} />
            </div>
            <div className="poi-header-text">
              {editingDetails
                ? <input className="poi-name-edit" value={draft.name}
                    onChange={e => set("name", e.target.value)}
                    placeholder="Place name" autoFocus />
                : <h2 className="poi-name">{draft.name}</h2>}
              <span className="poi-list-tag" style={{ color: list.color }}>{list.title}</span>
            </div>
            {/* Edit place details shortcut in title */}
            <button className="poi-edit-trigger" onClick={openEdit} title="Edit place details">
              <Pencil size={13} strokeWidth={2.2} color={list.color} />
            </button>
            <button className="icon-btn" onClick={onClose}>
              <X size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* Row 2: visited status — no box, just a subtle inline label */}
          <div className="poi-visited-row">
            {draft.visited
              ? <span className="poi-visited-label" style={{ color: list.accent }}>
                  <CheckCircle2 size={12} strokeWidth={2.2} style={{ marginRight: 4 }} />
                  Visited {draft.visitedDate && `· ${draft.visitedDate}`}
                </span>
              : <span className="poi-visited-label" style={{ color: "#B0A080" }}>
                  <Circle size={12} strokeWidth={2} style={{ marginRight: 4 }} />
                  Not visited yet
                </span>
            }
          </div>

          {/* Row 3: tabs — flush to header bottom */}
          <div className="poi-tabs">
            {[{ id: "notes", label: "My Notes" }, { id: "details", label: "Place Details" }].map(t => (
              <button key={t.id}
                className={`poi-tab ${tab === t.id ? "poi-tab-active" : ""}`}
                style={tab === t.id ? { color: list.color, borderBottomColor: list.color } : {}}
                onClick={() => { setTab(t.id); if (t.id === "notes") setEditingDetails(false); }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab: My Notes ── */}
        {tab === "notes" && (<>
          <div className="poi-body">
            {/* Rating — only when visited, tap stars to save instantly */}
            {draft.visited && (
              <div className="poi-field-flat">
                <label className="poi-field-label">
                  <Star size={12} strokeWidth={2} style={{ marginRight: 5 }} />Rating
                </label>
                <StarRating value={draft.rating} onChange={v => saveField("rating", v)} size={22} />
              </div>
            )}

            {/* Notes — full width textarea, auto-saves on blur */}
            <div className="poi-field-flat" style={{ paddingBottom: 0 }}>
              <label className="poi-field-label">
                <StickyNote size={12} strokeWidth={2} style={{ marginRight: 5 }} />Notes
              </label>
            </div>
            <textarea className="poi-textarea poi-textarea-open" value={draft.notes}
              placeholder="Your thoughts, tips, memories…"
              rows={5}
              onChange={e => set("notes", e.target.value)}
              onBlur={e => saveField("notes", e.target.value)} />

            {/* Visit date — only when visited */}
            {draft.visited && (
              <div className="poi-field-flat">
                <label className="poi-field-label">
                  <CalendarCheck size={12} strokeWidth={2} style={{ marginRight: 5 }} />Visit date
                </label>
                <input className="poi-input-flat" value={draft.visitedDate} placeholder="e.g. Mar 2024"
                  onChange={e => set("visitedDate", e.target.value)}
                  onBlur={e => saveField("visitedDate", e.target.value)} />
              </div>
            )}
          </div>

          {/* Footer: mark visited + done — ONLY on notes tab */}
          <div className="poi-actions">
            <button className="action-btn action-ghost" onClick={handleToggleVisited}>
              {draft.visited
                ? <><Circle size={13} strokeWidth={2} style={{ marginRight: 5 }} />Mark Unvisited</>
                : <><CheckCircle2 size={13} strokeWidth={2} style={{ marginRight: 5 }} />Mark Visited</>}
            </button>
            <button className="action-btn action-primary" style={{ background: list.color }} onClick={onClose}>
              Done
            </button>
          </div>
        </>)}

        {/* ── Tab: Place Details ── */}
        {tab === "details" && (<>
          <div className="poi-body">
            {[
              { Icon: Navigation, label: "Address", key: "address", ph: "Enter address…" },
              { Icon: Phone,      label: "Phone",   key: "phone",   ph: "Enter phone…" },
              { Icon: Globe2,     label: "Website", key: "website", ph: "Enter URL…" },
            ].map(({ Icon, label, key, ph }) => (
              <div key={key} className="poi-field-flat">
                <label className="poi-field-label">
                  <Icon size={12} strokeWidth={2} style={{ marginRight: 5 }} />{label}
                </label>
                {editingDetails
                  ? <input className="poi-input-flat" value={draft[key]} placeholder={ph}
                      onChange={e => set(key, e.target.value)} />
                  : draft[key]
                    ? <div className={`poi-field-value ${key !== "phone" ? "poi-link" : ""}`}>
                        <span>{draft[key]}</span>
                        {key !== "phone" && <ExternalLink size={12} color="#1B4FCC" strokeWidth={2} style={{ marginLeft: 5, flexShrink: 0 }} />}
                      </div>
                    : <div className="poi-field-empty">Not set</div>}
              </div>
            ))}

            {/* Tags */}
            <div className="poi-field-flat">
              <label className="poi-field-label">
                <Tag size={12} strokeWidth={2} style={{ marginRight: 5 }} />Tags
              </label>
              <div className="poi-tags">
                {draft.tags.map(t => (
                  <span key={t} className="poi-tag" style={{ background: list.colorLight, color: list.accent }}>
                    {t}
                    {editingDetails && (
                      <button className="tag-remove" onClick={() => removeTag(t)}>
                        <X size={9} strokeWidth={3} />
                      </button>
                    )}
                  </span>
                ))}
                {editingDetails && (
                  <input className="tag-input" value={tagInput} placeholder="Add tag…"
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addTag()} />
                )}
                {draft.tags.length === 0 && !editingDetails && (
                  <div className="poi-field-empty">No tags</div>
                )}
              </div>
            </div>

            {/* Edit / Save / Cancel — entry in read mode, inline controls in edit mode */}
            {!editingDetails && (
              <button className="poi-edit-details-btn" onClick={() => setEditingDetails(true)}
                style={{ color: list.color, borderColor: `${list.color}40` }}>
                <Pencil size={13} strokeWidth={2.2} style={{ marginRight: 6 }} />
                Edit Place Details
              </button>
            )}
          </div>

          {editingDetails && (
            <div className="poi-actions">
              <button className="action-btn action-ghost" onClick={cancelDetails}>Cancel</button>
              <button className="action-btn action-primary" style={{ background: list.color }} onClick={saveDetails}>
                <Check size={13} strokeWidth={2.5} style={{ marginRight: 5 }} />Save
              </button>
            </div>
          )}
        </>)}
      </div>
    </div>
  );
}

// ── List Detail Sheet ─────────────────────────────────────────────────────────

function AddPlaceSheet({ list, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  return (
    <div className="overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={e => e.stopPropagation()} style={{ paddingBottom: 36 }}>
        <div className="sheet-handle" />
        <button className="icon-btn" style={{ position:"absolute", top:18, right:20 }} onClick={onClose}>
          <X size={14} strokeWidth={2.5} />
        </button>
        <h3 className="sheet-title" style={{ marginBottom: 4 }}>Add a Place</h3>
        <p className="sheet-sub" style={{ marginBottom: 16 }}>Add it to "{list.title}"</p>
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "#B0A080", display: "block", marginBottom: 6 }}>Place name *</label>
            <input className="poi-input" autoFocus placeholder="e.g. Kyoto, Japan"
              value={name} onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && name.trim() && onAdd(name, address)} />
          </div>
          <div>
            <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "#B0A080", display: "block", marginBottom: 6 }}>Address / location (optional)</label>
            <input className="poi-input" placeholder="e.g. Gion District, Kyoto"
              value={address} onChange={e => setAddress(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 9, marginTop: 4 }}>
            <button className="action-btn action-ghost" onClick={onClose}>Cancel</button>
            <button className="action-btn action-primary" style={{ background: list.color }}
              disabled={!name.trim()} onClick={() => onAdd(name, address)}>
              <Plus size={14} strokeWidth={2.5} style={{ marginRight: 6 }} />Add Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailView({ list: initialList, onClose }) {
  const [listData, setListData] = useState(initialList);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showAddPlace, setShowAddPlace] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [sheetHeight, setSheetHeight] = useState(74);
  const [dragging, setDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartH = useRef(0);
  const sheetRef = useRef(null);

  const visited = listData.places.filter(p => p.visited).length;
  const pct = Math.round((visited / listData.places.length) * 100);

  const handlePlaceSave = (updated, closePanel = false) => {
    setListData(prev => ({ ...prev, places: prev.places.map(p => p.id === updated.id ? updated : p) }));
    if (closePanel) {
      setSelectedPlace(null);
    } else {
      setSelectedPlace(updated);
    }
  };

  const toggleVisited = (p, e) => {
    e.stopPropagation();
    const updated = {
      ...p,
      visited: !p.visited,
      visitedDate: !p.visited ? new Date().toLocaleString("default", { month: "short", year: "numeric" }) : "",
      rating: !p.visited ? p.rating : 0,
    };
    handlePlaceSave(updated, false);
  };

  const handleAddPlace = (name, address) => {
    const newPlace = {
      id: Date.now(), name: name.trim(), visited: false, visitedDate: "", rating: 0,
      notes: "", address: address || "", phone: "", website: "", tags: [],
    };
    setListData(prev => ({ ...prev, places: [...prev.places, newPlace], total: prev.total + 1 }));
    setShowAddPlace(false);
  };

  const onDragStart = (clientY) => { setDragging(true); dragStartY.current = clientY; dragStartH.current = sheetHeight; };
  const onDragMove = (clientY) => {
    if (!dragging) return;
    const delta = dragStartY.current - clientY;
    setSheetHeight(h => Math.min(94, Math.max(40, dragStartH.current + (delta / window.innerHeight) * 100)));
  };
  const onDragEnd = () => {
    if (!dragging) return;
    setDragging(false);
    setSheetHeight(h => h > 83 ? 92 : h < 55 ? 0 : 74);
  };
  useEffect(() => { if (sheetHeight < 5) onClose(); }, [sheetHeight]);

  return (<>
    <div className="detail-overlay"
      onClick={selectedPlace || showAddPlace || shareOpen ? undefined : onClose}
      onMouseMove={e => onDragMove(e.clientY)} onMouseUp={onDragEnd}
      onTouchMove={e => onDragMove(e.touches[0].clientY)} onTouchEnd={onDragEnd}>
      <div ref={sheetRef} className="detail-sheet"
        style={{ height: `${sheetHeight}vh`, transition: dragging ? "none" : "height 0.3s cubic-bezier(.4,0,.2,1)" }}
        onClick={e => e.stopPropagation()}>

        <div className="detail-drag-area"
          onMouseDown={e => onDragStart(e.clientY)}
          onTouchStart={e => onDragStart(e.touches[0].clientY)}>
          <div className="sheet-handle" />
        </div>

        <div className="detail-header" style={{ background: listData.colorLight }}>
          <button className="icon-btn" style={{ position:"absolute", top:12, right:14 }} onClick={onClose}>
            <X size={14} strokeWidth={2.5} />
          </button>
          <div className="detail-hero">
            <div className="detail-icon" style={{ background: listData.color }}>
              <CategoryIcon tag={listData.tag} size={22} color="#fff" />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <span className="d-tag" style={{ color: listData.color }}>{listData.tag.toUpperCase()}</span>
              <h2 className="d-title">{listData.title}</h2>
              <p className="d-desc">{listData.description}</p>
            </div>
          </div>
          <div className="detail-stats">
            <div className="d-ring-wrap">
              <ProgressRing pct={pct} size={52} stroke={4} color={listData.color} bg={`${listData.color}22`} />
              <span className="d-pct" style={{ color: listData.color }}>{pct}%</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <div className="d-big" style={{ color: listData.color }}>{visited}<span className="d-small">/{listData.places.length}</span></div>
                <div className="d-remaining" style={{ color: listData.accent }}>
                  <MapPin size={10} style={{ marginRight: 2 }} />{listData.places.length - visited} left
                </div>
              </div>
              <div className="d-label">places visited</div>
            </div>
          </div>
        </div>

        <div className="detail-list">
          {listData.places.map(p => (
            <div key={p.id} className={`place-row ${p.visited ? "place-done" : ""}`}
              onClick={() => setSelectedPlace(p)}>
              <div className="place-check"
                style={p.visited ? { background: listData.color, borderColor: listData.color, color: "#fff" } : { borderColor: "#D0C0A8" }}
                onClick={e => { e.stopPropagation(); toggleVisited(p, e); }}>
                {p.visited && <Check size={11} strokeWidth={3} />}
              </div>
              <div className="place-row-content">
                <span className="place-name">{p.name}</span>
                <div className="place-row-meta">
                  {p.visited && p.visitedDate && <span className="place-date">{p.visitedDate}</span>}
                  {p.visited && p.rating > 0 && <StarRating value={p.rating} size={11} />}
                  {p.notes && <span className="place-has-note"><StickyNote size={11} strokeWidth={2} style={{ marginRight:2 }} /></span>}
                  {p.tags.length > 0 && <span className="place-tag-count"><Tag size={10} strokeWidth={2} style={{ marginRight:2 }} />{p.tags.length}</span>}
                </div>
              </div>
              <ChevronRight size={14} color={listData.color} strokeWidth={2} style={{ flexShrink:0, opacity:0.45 }} />
            </div>
          ))}
        </div>

        <div className="detail-actions">
          <button className="action-btn action-primary" style={{ background: listData.color }}
            onClick={() => setShowAddPlace(true)}>
            <Plus size={14} strokeWidth={2.5} style={{ marginRight:6 }} />Add Place
          </button>
          <button className="action-btn action-ghost" onClick={() => setShareOpen(true)}>
            <Share2 size={13} strokeWidth={2} style={{ marginRight:6 }} />Share
          </button>
        </div>
      </div>
    </div>

    {showAddPlace && <AddPlaceSheet list={listData} onClose={() => setShowAddPlace(false)} onAdd={handleAddPlace} />}

    {shareOpen && (
      <div className="overlay" onClick={() => setShareOpen(false)}>
        <div className="bottom-sheet" onClick={e => e.stopPropagation()} style={{ paddingBottom: 36 }}>
          <div className="sheet-handle" />
          <button className="icon-btn" style={{ position:"absolute", top:18, right:20 }} onClick={() => setShareOpen(false)}>
            <X size={14} strokeWidth={2.5} />
          </button>
          <h3 className="sheet-title" style={{ marginBottom: 4 }}>Share "{listData.title}"</h3>
          <p className="sheet-sub" style={{ marginBottom: 18 }}>Let friends discover and copy your list</p>
          <div className="modal-opts">
            {[
              { Icon: Link2, label: "Copy Link", sub: "epiclog.app/lists/…", color: "#1B4FCC" },
              { Icon: Users, label: "Invite Friends", sub: "Share directly with contacts", color: "#00AABB" },
              { Icon: Globe, label: "Make Public", sub: "Anyone can discover this list", color: "#E8A020" },
            ].map(({ Icon, label, sub, color }, i) => (
              <button key={i} className="modal-opt" style={{ marginBottom: 8 }} onClick={() => setShareOpen(false)}>
                <div className="opt-ico" style={{ background: `${color}18` }}>
                  <Icon size={18} color={color} strokeWidth={2} />
                </div>
                <div className="opt-txt"><div className="opt-label">{label}</div><div className="opt-sub">{sub}</div></div>
                <ChevronRight size={16} color={color} strokeWidth={2.5} />
              </button>
            ))}
          </div>
        </div>
      </div>
    )}

    {selectedPlace && <POIPanel place={selectedPlace} list={listData} onClose={() => setSelectedPlace(null)} onSave={handlePlaceSave} />}
  </>);
}

// ── Add Modal ─────────────────────────────────────────────────────────────────

// ── Filter/Sort Sheet ─────────────────────────────────────────────────────────

function FilterSheet({ draft, onChange, onApply, onClose, activeCount }) {
  const SORT_OPTIONS = [
    { id:"recent",   label:"Most Recent",   icon:<Clock size={13} strokeWidth={2}/> },
    { id:"progress", label:"Most Complete", icon:<TrendingUp size={13} strokeWidth={2}/> },
    { id:"az",       label:"A to Z",        icon:<AlignLeft size={13} strokeWidth={2}/> },
    { id:"complete", label:"Done First",    icon:<CheckCircle2 size={13} strokeWidth={2}/> },
  ];
  const PROGRESS_OPTIONS = [
    { id:"all", label:"All" }, { id:"active", label:"In Progress" },
    { id:"done", label:"Completed" }, { id:"unstarted", label:"Not Started" },
  ];
  const ALL_TAGS = ["Countries","Coffee","Landmarks","Food","Nature","Seasonal"];
  const toggleTag = t => onChange({ ...draft, tags: draft.tags.includes(t) ? draft.tags.filter(x=>x!==t) : [...draft.tags,t] });

  return (
    <div className="overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={e=>e.stopPropagation()} style={{ paddingBottom:0, maxHeight:"88vh" }}>
        <div className="sheet-handle"/>
        <div style={{ display:"flex", alignItems:"center", padding:"10px 20px 10px", gap:10 }}>
          <span className="sheet-title" style={{ flex:1 }}>Filter & Sort</span>
          <button style={{ fontSize:12, fontWeight:700, color:"#C8002D", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}
            onClick={() => onChange({ sort:"recent", tags:[], progress:"all" })}>Reset</button>
          <button className="icon-btn" onClick={onClose}><X size={14} strokeWidth={2.5}/></button>
        </div>

        <div style={{ padding:"8px 20px 4px", borderBottom:"1px solid #EDE8DF" }}>
          <div className="fs-label">Sort by</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
            {SORT_OPTIONS.map(o => (
              <button key={o.id} className={`sort-opt ${draft.sort===o.id?"sort-opt-active":""}`}
                onClick={() => onChange({ ...draft, sort:o.id })}>
                <span style={{ display:"flex", alignItems:"center", opacity: draft.sort===o.id?1:0.5 }}>{o.icon}</span>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding:"12px 20px 4px", borderBottom:"1px solid #EDE8DF" }}>
          <div className="fs-label">Progress</div>
          <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:14 }}>
            {PROGRESS_OPTIONS.map(o => (
              <button key={o.id} className={`progress-opt ${draft.progress===o.id?"progress-opt-active":""}`}
                onClick={() => onChange({ ...draft, progress:o.id })}>{o.label}</button>
            ))}
          </div>
        </div>

        <div style={{ padding:"12px 20px 4px" }}>
          <div className="fs-label">Category</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:16 }}>
            {ALL_TAGS.map(t => {
              const active = draft.tags.includes(t);
              const c = TAG_COLORS[t]||"#1B4FCC";
              return (
                <button key={t} className="tag-chip-filter" onClick={() => toggleTag(t)}
                  style={active
                    ? { background:c, color:"#fff", borderColor:"transparent" }
                    : { background:"#fff", color:"#5A4A28", borderColor:"#D4C4A8" }}>
                  <CategoryIcon tag={t} size={12} color={active?"#fff":c}/> {t}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding:"0 20px 32px" }}>
          <button className="action-btn action-primary"
            style={{ background:"linear-gradient(130deg,#C8002D,#1B4FCC)", width:"100%" }}
            onClick={onApply}>
            Show {activeCount} list{activeCount!==1?"s":""}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);
  const handleImport = () => { if (!url) return; setAnalyzing(true); setTimeout(() => { setAnalyzing(false); setDone(true); }, 2000); };

  const opts = [
    { Icon: PenLine, label: "From Scratch", sub: "Build your own list", color: "#1B4FCC" },
    { Icon: Link2, label: "Import from Link", sub: "TikTok, IG, Rednote…", color: "#C8002D", action: () => setStep(1) },
    { Icon: Sparkles, label: "AI Suggest", sub: "Based on your travel history", color: "#00AABB" },
    { Icon: Globe, label: "Browse Public Lists", sub: "Curated by the community", color: "#E8A020" },
  ];

  return (
    <div className="overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={e => e.stopPropagation()} style={{ paddingBottom: 40 }}>
        <div className="sheet-handle" />
        <button className="icon-btn" style={{ position:"absolute",top:18,right:20 }} onClick={onClose}><X size={14} strokeWidth={2.5} /></button>
        {step === 0 && (<>
          <h3 className="sheet-title" style={{ marginBottom:4 }}>New Epic List</h3>
          <p className="sheet-sub" style={{ marginBottom:18 }}>How do you want to kick things off?</p>
          <div className="modal-opts">
            {opts.map(({ Icon, label, sub, color, action }, i) => (
              <button key={i} className="modal-opt" onClick={action || (() => {})}>
                <div className="opt-ico" style={{ background: `${color}18` }}><Icon size={18} color={color} strokeWidth={2} /></div>
                <div className="opt-txt"><div className="opt-label">{label}</div><div className="opt-sub">{sub}</div></div>
                <ChevronRight size={16} color={color} strokeWidth={2.5} />
              </button>
            ))}
          </div>
        </>)}
        {step === 1 && (<>
          <button className="back-btn" onClick={() => setStep(0)}><ArrowLeft size={13} strokeWidth={2.5} style={{ marginRight:4 }} />Back</button>
          <h3 className="sheet-title" style={{ marginBottom:4 }}>Drop a Link</h3>
          <p className="sheet-sub" style={{ marginBottom:16 }}>AI will extract and organize places instantly</p>
          {!done ? (<>
            <div className="src-chips">
              {[{Icon:Camera,label:"Instagram",color:"#E1306C"},{Icon:Music2,label:"TikTok",color:"#2D2D2D"},{Icon:BookOpen,label:"Rednote",color:"#FF2D2D"},{Icon:Link2,label:"Any URL",color:"#1B4FCC"}].map(({Icon,label,color},i) => (
                <span key={i} className="src-chip" style={{ borderColor:`${color}40`,color,background:`${color}0E` }}>
                  <Icon size={11} strokeWidth={2} style={{ marginRight:4 }} />{label}
                </span>
              ))}
            </div>
            <input className="field-input" placeholder="Paste your link here…" value={url} onChange={e => setUrl(e.target.value)} />
            <button className="action-btn action-primary" style={{ width:"100%",marginTop:10,background:"linear-gradient(130deg,#C8002D,#1B4FCC)" }} onClick={handleImport} disabled={!url}>
              {analyzing ? <><RotateCw size={13} className="spin" style={{ marginRight:6 }} />Reading link…</> : <><Sparkles size={13} style={{ marginRight:6 }} />Extract Places with AI</>}
            </button>
          </>) : (
            <div className="success-wrap">
              <div className="success-ring"><Check size={28} color="#00AABB" strokeWidth={2.5} /></div>
              <h4>3 places found!</h4>
              <p>Added to your Backlog. Build a list from them?</p>
              <button className="action-btn action-primary" style={{ width:"100%",background:"#00AABB" }} onClick={onClose}>Create List from Backlog</button>
            </div>
          )}
        </>)}
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function EpiclogApp() {
  const [activeNav, setActiveNav] = useState("lists");
  const [listsFilter, setListsFilter] = useState("all");
  const [exploreFilter, setExploreFilter] = useState("trending");
  const [lists, setLists] = useState(INITIAL_LISTS);
  const [pinnedIds, setPinnedIds] = useState(new Set());
  const [shareTarget, setShareTarget] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [viewMode, setViewMode] = useState("flat");
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [committed, setCommitted] = useState({ sort:"recent", tags:[], progress:"all" });
  const [filterDraft, setFilterDraft] = useState({ sort:"recent", tags:[], progress:"all" });

  const openFilterSheet = () => { setFilterDraft({ ...committed }); setShowFilterSheet(true); };
  const applyFilterSheet = () => { setCommitted({ ...filterDraft }); setShowFilterSheet(false); };
  const activeFilterCount = (committed.tags.length>0?1:0)+(committed.progress!=="all"?1:0)+(committed.sort!=="recent"?1:0);
  const previewCount = applyListFiltersAndSort(lists, filterDraft).length;

  const handleDeleteList = (id) => setLists(prev => prev.filter(l => l.id !== id));
  const handlePinList = (id) => setPinnedIds(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const handleShareList = (list) => setShareTarget(list);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  // Contextual pill filters per section
  const listsFilters = [
    { id: "all", label: "All Lists" },
    { id: "nearby", label: "Near Me", icon: <MapPin size={12} strokeWidth={2} />, color: "#C8002D" },
    { id: "active", label: "In Progress", color: "#E8A020" },
    { id: "done", label: "Completed", color: "#00AABB" },
    { id: "Countries", label: "Countries", color: "#C8002D" },
    { id: "Food", label: "Food", color: "#E8A020" },
    { id: "Nature", label: "Nature", color: "#00843D" },
    { id: "Coffee", label: "Coffee", color: "#1B4FCC" },
    { id: "Landmarks", label: "Landmarks", color: "#00AABB" },
    { id: "Seasonal", label: "Seasonal", color: "#8B1A8B" },
  ];

  const exploreFilters = [
    { id: "trending", label: "Trending", icon: <Flame size={12} strokeWidth={2} />, color: "#E8A020" },
    { id: "nearby", label: "Near Me", icon: <MapPin size={12} strokeWidth={2} />, color: "#C8002D" },
    { id: "new", label: "New", icon: <Sparkles size={12} strokeWidth={2} />, color: "#1B4FCC" },
    { id: "community", label: "Community", icon: <Users size={12} strokeWidth={2} />, color: "#00AABB" },
  ];

  const filteredLists = lists.filter(l => {
    if (listsFilter === "all" || listsFilter === "nearby") return true;
    if (listsFilter === "active") return l.visited > 0 && l.visited < l.total;
    if (listsFilter === "done") return l.visited === l.total;
    return l.tag === listsFilter;
  });

  const navItems = [
    { Icon: Map, label: "Lists", id: "lists" },
    { Icon: Inbox, label: "Backlog", id: "backlog" },
    { Icon: Globe, label: "Explore", id: "explore" },
    { Icon: User, label: "Profile", id: "profile" },
  ];

  return (
    <div className={`app ${mounted ? "app-in" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Manrope:wght@600;700;800&family=Paytone+One&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .app { font-family: 'DM Sans', sans-serif; background: #F5F2EC; min-height: 100vh; max-width: 420px; margin: 0 auto; color: #1A1208; overflow: hidden; opacity: 0; transform: translateY(8px); transition: opacity 0.4s ease, transform 0.4s ease; display: flex; flex-direction: column; height: 100vh; }
        .app-in { opacity: 1; transform: translateY(0); }

        /* HEADER — sticky top */
        .header { padding: 42px 22px 10px; background: #fff; position: relative; overflow: hidden; border-bottom: 1px solid #EDE8DF; flex-shrink: 0; z-index: 10; transition: padding 0.25s ease; }
        .header.compact { padding: 14px 22px 10px; }
        .header-blob { position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, #C8002D12 0%, #1B4FCC08 55%, transparent 100%); pointer-events: none; }
        .header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0; }
        .wordmark { font-family: 'Paytone One', sans-serif; font-size: 34px; font-weight: 400; letter-spacing: -0.5px; color: #1A1208; display: flex; align-items: center; line-height: 1; }
        .wm-epic { color: #C8002D; }
        .wm-dot { width: 6px; height: 6px; border-radius: 50%; background: #1B4FCC; margin: 0 2px 7px; display: inline-block; }
        .header-actions { display: flex; gap: 8px; align-items: center; }
        .avatar-btn { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #C8002D, #1B4FCC); border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 9px rgba(27,79,204,0.24); }

        /* PROFILE PAGE */
        .profile-hero { background: linear-gradient(150deg, #080D22 0%, #1B3088 45%, #6B0018 100%); padding: 28px 22px 0; position: relative; overflow: hidden; }
        .profile-hero-bg { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 80% 0%, rgba(27,79,204,0.28) 0%, transparent 55%), radial-gradient(ellipse at 8% 90%, rgba(0,170,187,0.28) 0%, transparent 55%); }
        .profile-top-row { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px; position: relative; }
        .profile-avatar { width: 64px; height: 64px; border-radius: 50%; flex-shrink: 0; background: linear-gradient(135deg, #C8002D, #1B4FCC); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 3px rgba(255,255,255,0.15), 0 8px 20px rgba(0,0,0,0.3); }
        .profile-identity { flex: 1; min-width: 0; }
        .profile-name { font-family: 'Manrope', sans-serif; font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 2px; }
        .profile-handle { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 500; margin-bottom: 8px; }
        .profile-level-badge { display: inline-flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 20px; padding: 4px 10px; font-size: 11.5px; font-weight: 700; color: #F4C97A; }
        .profile-edit-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 20px; padding: 6px 12px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8); cursor: pointer; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; gap: 5px; white-space: nowrap; flex-shrink: 0; }
        .profile-progress-section { position: relative; padding: 0 0 22px; }
        .profile-progress-label { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
        .profile-progress-title { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.5); letter-spacing: 0.5px; text-transform: uppercase; }
        .profile-progress-count { font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 800; color: #fff; }
        .profile-progress-count span { color: rgba(255,255,255,0.4); font-size: 11px; font-weight: 600; }
        .progress-track { height: 8px; background: rgba(255,255,255,0.12); border-radius: 20px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 20px; background: linear-gradient(90deg, #C8002D, #E8A020, #1B4FCC, #00AABB); background-size: 200% 100%; animation: progressShimmer 3s ease infinite; transition: width 1s cubic-bezier(.4,0,.2,1); }
        @keyframes progressShimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .progress-milestones { display: flex; justify-content: space-between; margin-top: 6px; }
        .milestone { font-size: 10px; color: rgba(255,255,255,0.25); font-weight: 600; }
        .milestone.reached { color: rgba(255,255,255,0.6); }
        .profile-stat-strip { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid rgba(255,255,255,0.08); }
        .strip-stat { padding: 14px 8px; text-align: center; border-right: 1px solid rgba(255,255,255,0.08); }
        .strip-stat:last-child { border-right: none; }
        .strip-num { font-family: 'Manrope', sans-serif; font-size: 20px; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 3px; }
        .strip-label { font-size: 10px; color: rgba(255,255,255,0.4); font-weight: 600; }
        .profile-section-title { font-family: 'Manrope', sans-serif; font-size: 14px; font-weight: 800; color: #1A1208; padding: 18px 22px 10px; }
        .list-progress-grid { padding: 0 22px; display: flex; flex-direction: column; gap: 9px; margin-bottom: 4px; }
        .list-progress-card { background: #fff; border-radius: 16px; padding: 13px 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.048); animation: slideUp 0.34s cubic-bezier(.4,0,.2,1) both; }
        .lp-top { display: flex; align-items: center; gap: 11px; margin-bottom: 9px; }
        .lp-icon { width: 32px; height: 32px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .lp-text { flex: 1; min-width: 0; }
        .lp-title { font-size: 13px; font-weight: 700; color: #1A1208; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 1px; }
        .lp-subtitle { font-size: 11px; color: #7A6A4A; font-weight: 500; }
        .lp-pct { font-size: 13px; font-weight: 800; flex-shrink: 0; }
        .lp-track { height: 5px; background: #EDE8DF; border-radius: 20px; overflow: hidden; }
        .lp-fill { height: 100%; border-radius: 20px; transition: width 1.2s cubic-bezier(.4,0,.2,1); }
        .achievements-row { display: flex; gap: 10px; padding: 0 22px; margin-bottom: 4px; overflow-x: auto; scrollbar-width: none; }
        .achievements-row::-webkit-scrollbar { display: none; }
        .achievement-chip { flex-shrink: 0; background: #fff; border-radius: 14px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1.5px solid #EDE8DF; }
        .ach-icon { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ach-title { font-size: 12.5px; font-weight: 700; color: #1A1208; margin-bottom: 1px; white-space: nowrap; }
        .ach-sub { font-size: 10.5px; color: #7A6A4A; font-weight: 500; white-space: nowrap; }
        .recent-activity { padding: 0 22px 20px; display: flex; flex-direction: column; gap: 9px; }
        .activity-item { background: #fff; border-radius: 14px; padding: 13px 15px; display: flex; align-items: center; gap: 12px; box-shadow: 0 2px 7px rgba(0,0,0,0.045); animation: slideUp 0.34s cubic-bezier(.4,0,.2,1) both; }
        .activity-dot { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .activity-text { flex: 1; }
        .activity-main { font-size: 13.5px; font-weight: 600; color: #1A1208; margin-bottom: 2px; }
        .activity-sub { font-size: 11.5px; color: #7A6A4A; font-weight: 500; }
        .activity-time { font-size: 11px; color: #C4B090; font-weight: 500; }

        /* PILL FILTER ROW */
        .pill-filter-row { display: flex; gap: 7px; padding: 12px 22px 10px; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .pill-filter-row::-webkit-scrollbar { display: none; }
        .pill-filter { flex-shrink: 0; display: flex; align-items: center; font-size: 12.5px; font-weight: 600; padding: 6px 14px; border-radius: 20px; border: 1.5px solid #D4C4A8; background: #fff; color: #5A4A28; cursor: pointer; transition: all 0.16s; font-family: 'DM Sans', sans-serif; white-space: nowrap; }
        .pill-filter:active { transform: scale(0.95); }
        .pill-active { font-weight: 700; }

        /* NEAR ME SECTION */
        .nearby-scroll { display:flex; gap:11px; padding:0 22px 4px; overflow-x:auto; scrollbar-width:none; -webkit-overflow-scrolling:touch; }
        .nearby-scroll::-webkit-scrollbar { display:none; }
        .nearby-card { flex-shrink:0; width:154px; background:#fff; border-radius:15px; padding:13px; border:1.5px solid #E2D8CC; box-shadow:0 2px 8px rgba(0,0,0,0.05); cursor:pointer; transition:transform 0.14s; }
        .nearby-card:active { transform:scale(0.97); }
        .nearby-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:9px; }
        .nearby-icon { width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; }
        .nearby-dist { display:flex; align-items:center; font-size:10.5px; font-weight:700; }
        .nearby-title { font-size:12.5px; font-weight:700; color:#1A1208; margin-bottom:4px; line-height:1.25; }
        .nearby-next { font-size:10.5px; color:#7A6A4A; font-weight:500; margin-bottom:9px; }
        .nearby-next strong { color:#1A1208; }
        .nearby-done { font-size:10.5px; font-weight:700; color:#00843D; margin-bottom:9px; }
        .nearby-bar-track { height:3px; background:#EDE5D8; border-radius:20px; overflow:hidden; margin-bottom:5px; }
        .nearby-bar-fill { height:100%; border-radius:20px; }
        .nearby-meta { display:flex; justify-content:space-between; font-size:10px; font-weight:600; }

        /* FILTER TOOLBAR */
        .filter-btn { display:flex; align-items:center; gap:7px; background:#fff; border:1.5px solid #D4C4A8; border-radius:20px; padding:7px 14px; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; color:#1A1208; box-shadow:0 1px 4px rgba(0,0,0,0.05); transition:all 0.13s; position:relative; }
        .filter-btn:active { transform:scale(0.96); }
        .filter-btn-active { border-color:#1B4FCC; color:#1B4FCC; background:#EBF0FF; }
        .filter-badge { position:absolute; top:-5px; right:-5px; width:16px; height:16px; border-radius:50%; background:#C8002D; color:#fff; font-size:9px; font-weight:800; display:flex; align-items:center; justify-content:center; border:2px solid #F5F2EC; }
        .view-toggle { display:flex; background:#EDE5D8; border-radius:10px; padding:3px; gap:2px; }
        .view-btn { width:28px; height:28px; border-radius:7px; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; background:transparent; color:#B0A080; transition:all 0.13s; }
        .view-btn-active { background:#fff; color:#1B4FCC; box-shadow:0 1px 4px rgba(0,0,0,0.08); }
        .active-filters-row { display:flex; gap:6px; padding:0 22px 8px; overflow-x:auto; scrollbar-width:none; }
        .active-filters-row::-webkit-scrollbar { display:none; }
        .active-chip { display:flex; align-items:center; gap:5px; font-size:11px; font-weight:700; padding:4px 9px; border-radius:20px; background:#1B4FCC; color:#fff; white-space:nowrap; flex-shrink:0; }
        .active-chip button { background:none; border:none; cursor:pointer; color:#fff; display:flex; align-items:center; padding:0; opacity:0.8; }

        /* GROUP HEADERS for grouped views */
        .group-header { display:flex; align-items:center; gap:9px; padding:14px 22px 8px; }
        .group-label { font-family:'Manrope',sans-serif; font-size:13px; font-weight:800; color:#1A1208; }
        .group-line { flex:1; height:1px; background:#E2D8CC; }
        .group-count { font-size:11px; font-weight:600; color:#7A6A4A; }

        /* FILTER SHEET internals */
        .fs-label { font-size:10px; font-weight:700; letter-spacing:.8px; text-transform:uppercase; color:#B0A080; margin-bottom:10px; }
        .sort-opt { display:flex; align-items:center; gap:8px; background:#F5F2EC; border:1.5px solid transparent; border-radius:12px; padding:10px 13px; cursor:pointer; font-size:13px; font-weight:600; color:#1A1208; font-family:'DM Sans',sans-serif; transition:all 0.13s; }
        .sort-opt:active { transform:scale(0.97); }
        .sort-opt-active { background:#EBF0FF; border-color:#1B4FCC; color:#1B4FCC; font-weight:700; }
        .progress-opt { font-size:12.5px; font-weight:600; padding:7px 14px; border-radius:20px; border:1.5px solid #D4C4A8; background:#fff; color:#5A4A28; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.13s; }
        .progress-opt-active { background:#1B4FCC; border-color:transparent; color:#fff; font-weight:700; }
        .tag-chip-filter { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:600; padding:7px 13px; border-radius:20px; border:1.5px solid; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.13s; }
        .section-header { display: flex; align-items: center; justify-content: space-between; padding: 4px 22px 10px; }
        .section-title { font-family: 'Manrope', sans-serif; font-size: 16px; font-weight: 800; color: #1A1208; }
        .section-count { font-size: 11px; font-weight: 600; color: #7A6A4A; background: #EDE5D8; padding: 3px 10px; border-radius: 20px; }

        /* CARDS */
        .cards-scroll { padding: 0 22px 20px; display: flex; flex-direction: column; gap: 10px; }
        .list-card { background: #fff; border-radius: 17px; cursor: pointer; display: flex; overflow: hidden; box-shadow: 0 2px 9px rgba(0,0,0,0.05); animation: slideUp 0.34s cubic-bezier(.4,0,.2,1) both; transition: transform 0.14s, box-shadow 0.14s; }
        .list-card:active { transform: scale(0.975); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .card-stripe { width: 4px; flex-shrink: 0; }
        .card-inner { flex: 1; padding: 14px 14px 12px 13px; min-width: 0; }
        .card-top { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
        .card-icon-badge { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .card-text { flex: 1; min-width: 0; }
        .card-tag { font-size: 9.5px; font-weight: 700; letter-spacing: 0.7px; text-transform: uppercase; display: block; margin-bottom: 3px; }
        .card-title { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; color: #1A1208; line-height: 1.25; word-break: break-word; overflow-wrap: break-word; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .card-desc { font-size: 11.5px; color: #7A6A4A; font-weight: 500; margin-top: 3px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .card-ring-wrap { position: relative; flex-shrink: 0; width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; }
        .card-ring-wrap svg { position: absolute; inset: 0; }
        .card-pct { font-size: 10.5px; font-weight: 700; position: relative; z-index: 1; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; }
        .card-pill { display: flex; align-items: center; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; }
        .card-dots { display: flex; gap: 4px; align-items: center; }
        .dot { width: 6px; height: 6px; border-radius: 50%; transition: background 0.25s; }
        .dot-more { font-size: 9.5px; font-weight: 700; margin-left: 2px; }

        /* BACKLOG BANNER */
        .backlog-banner { margin: 0 22px 14px; background: #fff; border-radius: 15px; padding: 13px 15px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; box-shadow: 0 2px 9px rgba(0,0,0,0.05); border: 1.5px solid #E8E8F4; transition: transform 0.14s; animation: slideUp 0.34s cubic-bezier(.4,0,.2,1) both; }
        .backlog-banner:active { transform: scale(0.975); }
        .bb-left { display: flex; align-items: center; gap: 12px; }
        .bb-icon { width: 40px; height: 40px; border-radius: 11px; background: #EBF0FF; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bb-text {}
        .bb-title { font-size: 14px; font-weight: 700; color: #1A1208; margin-bottom: 2px; }
        .bb-sub { font-size: 11.5px; color: #7A6A4A; font-weight: 500; }
        .bb-right { display: flex; align-items: center; gap: 8px; }
        .bb-sources { display: flex; gap: 5px; }
        .bb-src-dot { display: flex; align-items: center; }

        /* BACKLOG SHEET */
        .backlog-list { padding: 0 20px; display: flex; flex-direction: column; gap: 9px; margin-bottom: 16px; }
        .backlog-item { background: #F8F4EE; border-radius: 13px; padding: 11px 13px; display: flex; align-items: center; gap: 12px; cursor: pointer; animation: slideUp 0.34s cubic-bezier(.4,0,.2,1) both; transition: transform 0.13s; }
        .backlog-item:active { transform: scale(0.97); }
        .backlog-thumb { width: 40px; height: 40px; border-radius: 11px; background: #EEEEF8; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #B0A080; }
        .backlog-info { flex: 1; min-width: 0; }
        .backlog-title { font-size: 13.5px; font-weight: 600; margin-bottom: 4px; color: #1A1208; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .backlog-meta { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #7A6A4A; font-weight: 500; }
        .backlog-src { display: flex; align-items: center; gap: 3px; padding: 2px 8px; border-radius: 20px; font-weight: 600; font-size: 11px; }
        .backlog-add-btn { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #C8002D, #1B4FCC); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #fff; border: none; cursor: pointer; box-shadow: 0 3px 9px rgba(27,79,204,0.24); }

        /* AI BANNER */
        .ai-banner { margin: 14px 20px 14px; background: linear-gradient(130deg, #1B4FCC, #C8002D); border-radius: 13px; padding: 12px 14px; display: flex; align-items: center; gap: 11px; }
        .ai-icon { width: 34px; height: 34px; border-radius: 10px; background: rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #fff; }
        .ai-text { flex: 1; }
        .ai-title { font-size: 12.5px; font-weight: 700; color: #fff; margin-bottom: 1px; }
        .ai-sub { font-size: 11px; color: rgba(255,255,255,0.72); font-weight: 500; }
        .ai-btn { font-size: 11.5px; font-weight: 700; color: #1B4FCC; background: #fff; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; white-space: nowrap; font-family: 'DM Sans', sans-serif; }

        /* BACKLOG PAGE HEADER */
        .backlog-page-header { background: #fff; padding: 14px 22px 12px; border-bottom: 1px solid #EDE8DF; }
        .backlog-page-title-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .backlog-page-title { font-family: 'Manrope', sans-serif; font-size: 20px; font-weight: 800; color: #1A1208; margin-bottom: 2px; }
        .backlog-page-sub { font-size: 11.5px; color: #7A6A4A; font-weight: 500; }

        /* NAV BADGE for backlog */
        .nav-badge { position: absolute; top: -2px; right: -2px; width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, #C8002D, #1B4FCC); color: #fff; font-size: 9px; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; }
        .nav-ico-wrap { position: relative; }

        /* FAB — fixed within the app container */
        .fab { position: absolute; bottom: 0px; right: 22px; width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #C8002D, #1B4FCC); border: none; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 16px rgba(27,79,204,0.36); transition: transform 0.14s, box-shadow 0.14s; z-index: 50; transform: translateY(-80%); }
        .fab:active { transform: translateY(-80%) scale(0.9); box-shadow: 0 2px 8px rgba(27,79,204,0.28); }

        /* SCROLLABLE CONTENT AREA */
        .content-scroll { flex: 1; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; }

        /* EXPLORE */
        .explore-section-label { padding: 6px 22px 8px; font-size: 11px; font-weight: 700; color: #8A7A5A; letter-spacing: 0.6px; text-transform: uppercase; }
        .bottom-nav { flex-shrink: 0; width: 100%; background: rgba(255,255,255,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-top: 1px solid #E2D8CC; display: flex; padding: 10px 0 22px; z-index: 10; }
        .nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; background: transparent; border: none; cursor: pointer; transition: transform 0.12s; padding: 3px; }
        .nav-item:active { transform: scale(0.84); }
        .nav-ico { display: flex; align-items: center; justify-content: center; width: 36px; height: 28px; border-radius: 14px; transition: background 0.15s; }
        .nav-item.active .nav-ico { background: #EBF0FF; }
        .nav-lbl { font-size: 10px; font-weight: 600; }
        .nav-item.active .nav-ico, .nav-item.active .nav-lbl { color: #1B4FCC; }
        .nav-item:not(.active) .nav-ico, .nav-item:not(.active) .nav-lbl { color: #C4B090; }

        /* DETAIL OVERLAY + DRAGGABLE SHEET */
        .detail-overlay { position: fixed; inset: 0; background: rgba(16,8,0,0.48); backdrop-filter: blur(6px); z-index: 200; display: flex; align-items: flex-end; animation: fadeIn 0.2s ease; user-select: none; }
        .detail-sheet { width: 100%; max-width: 420px; margin: 0 auto; background: #F5F2EC; border-radius: 24px 24px 0 0; display: flex; flex-direction: column; overflow: hidden; }
        .detail-drag-area { padding: 6px 0 2px; cursor: grab; flex-shrink: 0; display: flex; justify-content: center; background: #F5F2EC; border-radius: 24px 24px 0 0; }
        .detail-drag-area:active { cursor: grabbing; }

        /* OVERLAY + SHEETS */
        .overlay { position: fixed; inset: 0; background: rgba(16,8,0,0.48); backdrop-filter: blur(8px); z-index: 200; display: flex; align-items: flex-end; animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .bottom-sheet { width: 100%; max-width: 420px; margin: 0 auto; background: #fff; border-radius: 24px 24px 0 0; max-height: 88vh; overflow-y: auto; animation: sheetUp 0.28s cubic-bezier(.4,0,.2,1); padding: 10px 0 0; position: relative; }
        @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .sheet-handle { width: 32px; height: 4px; background: rgba(0,0,0,0.1); border-radius: 2px; margin: 0 auto 8px; }
        .sheet-titlebar { display: flex; align-items: flex-start; justify-content: space-between; padding: 0 20px 12px; }
        .sheet-title { font-family: 'Manrope', sans-serif; font-size: 19px; font-weight: 800; color: #1A1208; padding: 0 20px; margin-bottom: 4px; }
        .sheet-sub { font-size: 12px; color: #7A6A4A; font-weight: 500; padding: 0 20px; }

        .detail-header { padding: 10px 16px 12px; position: relative; flex-shrink: 0; }
        .detail-list { background: #fff; flex: 1; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
        .detail-actions { padding: 12px 18px 18px; display: flex; gap: 9px; background: #fff; border-top: 1px solid #F5F2EC; flex-shrink: 0; }
        .detail-hero { display: flex; gap: 13px; align-items: flex-start; margin-bottom: 16px; }
        .detail-icon { width: 50px; height: 50px; border-radius: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 13px rgba(0,0,0,0.14); }
        .d-tag { font-size: 9.5px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; display: block; margin-bottom: 4px; }
        .d-title { font-family: 'DM Sans', sans-serif; font-size: 18px; font-weight: 700; color: #1A1208; margin-bottom: 3px; line-height: 1.22; }
        .d-desc { font-size: 12px; color: #7A6A4A; font-weight: 500; line-height: 1.4; }
        .detail-stats { display: flex; align-items: center; gap: 18px; }
        .d-ring-wrap { position: relative; width: 52px; height: 52px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .d-ring-wrap svg { position: absolute; inset: 0; }
        .d-pct { font-size: 10px; font-weight: 700; position: relative; z-index: 1; }
        .d-big { font-family: 'Manrope', sans-serif; font-size: 26px; font-weight: 800; line-height: 1; }
        .d-small { font-size: 14px; color: #C4B090; }
        .d-label { font-size: 11px; color: #7A6A4A; font-weight: 600; margin-top: 3px; }
        .d-remaining { font-size: 10.5px; font-weight: 600; display: flex; align-items: center; }
        .place-row { display: flex; align-items: center; gap: 10px; padding: 12px 18px; cursor: pointer; border-bottom: 1px solid #F5F2EC; transition: background 0.1s; }
        .place-row:active { background: #FAF6F0; }
        .place-check { width: 22px; height: 22px; border-radius: 50%; border: 2.5px solid; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.16s; }
        .place-row-content { flex: 1; min-width: 0; }
        .place-name { font-size: 14px; font-weight: 600; color: #1A1208; display: block; margin-bottom: 3px; transition: opacity 0.16s; }
        .place-done .place-name { opacity: 0.3; text-decoration: line-through; }
        .place-row-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .place-date { font-size: 11px; color: #7A6A4A; font-weight: 500; }
        .place-has-note { display: flex; align-items: center; font-size: 11px; color: #C4B090; }
        .place-tag-count { display: flex; align-items: center; font-size: 11px; color: #C4B090; }

        /* POI SHEET */
        .poi-sheet { width: 100%; max-width: 420px; margin: 0 auto; background: #fff; border-radius: 24px 24px 0 0; max-height: 92vh; overflow-y: auto; animation: sheetUp 0.26s cubic-bezier(.4,0,.2,1); display: flex; flex-direction: column; }
        /* POI PANEL */
        .poi-header { padding: 14px 18px 0; background: #fff; }
        .poi-header-row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .poi-icon-wrap { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .poi-header-text { flex: 1; min-width: 0; }
        .poi-name { font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 700; color: #1A1208; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .poi-name-edit { font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 700; color: #1A1208; line-height: 1.2; width: 100%; background: none; border: none; border-bottom: 1.5px solid #1B4FCC; outline: none; padding: 0 0 2px; }
        /* Prevent iOS from zooming on input focus — all inputs must be >= 16px */
        input, textarea, select { font-size: 16px !important; }
        .poi-field-label, .poi-tab, .action-btn, .pill-filter, .modal-opt, .back-btn, .sheet-title, .section-title { font-size: revert; }
        input.poi-input, input.poi-input-flat, input.tag-input, input.poi-name-edit, textarea.poi-textarea { font-size: 16px; }
        .poi-list-tag { font-size: 11px; font-weight: 600; color: #7A6A4A; display: block; margin-top: 1px; }
        .poi-edit-trigger { background: none; border: none; cursor: pointer; padding: 6px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.13s; }
        .poi-edit-trigger:active { background: #F5F2EC; }
        .poi-visited-row { display: flex; align-items: center; padding: 0 0 10px; }
        .poi-visited-label { display: flex; align-items: center; font-size: 12px; font-weight: 600; }
        .poi-tabs { display: flex; border-bottom: 1px solid #EDE8DF; }
        .poi-tab { flex: 1; padding: 9px 0; font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif; background: none; border: none; border-bottom: 2.5px solid transparent; color: #B0A080; cursor: pointer; transition: color 0.14s, border-color 0.14s; margin-bottom: -1px; }
        .poi-tab-active { font-weight: 700; }
        .poi-body { padding: 0 18px 8px; flex: 1; overflow-y: auto; }
        .poi-field-flat { padding: 12px 0 4px; }
        .poi-field-label { display: flex; align-items: center; font-size: 10px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; color: #B0A080; margin-bottom: 5px; }
        .poi-field-value { font-size: 13.5px; font-weight: 500; color: #1A1208; line-height: 1.4; }
        .poi-link { display: flex; align-items: center; color: #1B4FCC !important; cursor: pointer; }
        .poi-field-empty { font-size: 13px; color: #C4B090; font-style: italic; }
        .poi-input-flat { width: 100%; background: none; border: none; border-bottom: 1.5px solid #EDE5D8; padding: 6px 0; font-size: 13.5px; font-weight: 500; color: #1A1208; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.14s; }
        .poi-input-flat:focus { border-bottom-color: #1B4FCC; }
        .poi-input-flat::placeholder { color: #C4B090; }
        .poi-input { width: 100%; background: #F5F2EC; border: 1.5px solid #EDE5D8; border-radius: 10px; padding: 10px 12px; font-size: 13.5px; font-weight: 500; color: #1A1208; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.16s; }
        .poi-input:focus { border-color: #1B4FCC; }
        .poi-textarea { width: 100%; background: none; border: none; padding: 6px 0; font-size: 13.5px; font-weight: 500; color: #1A1208; font-family: 'DM Sans', sans-serif; outline: none; resize: none; line-height: 1.6; display: block; }
        .poi-textarea::placeholder { color: #C4B090; }
        .poi-tags { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
        .poi-tag { display: flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
        .tag-remove { background: none; border: none; cursor: pointer; display: flex; align-items: center; padding: 0; opacity: 0.6; color: inherit; }
        .tag-input { background: #F5F2EC; border: 1.5px dashed #D0C0A8; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 600; color: #1A1208; font-family: 'DM Sans', sans-serif; outline: none; width: 90px; }
        .poi-edit-details-btn { display: flex; align-items: center; justify-content: center; width: 100%; margin-top: 16px; padding: 11px 16px; border-radius: 12px; border: 1.5px solid; background: none; font-size: 13.5px; font-weight: 700; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background 0.13s; }
        .poi-edit-details-btn:active { background: #F5F2EC; }
        .poi-actions { padding: 12px 18px 32px; display: flex; gap: 9px; border-top: 1px solid #EDE8DF; background: #fff; flex-shrink: 0; }

        /* MODAL OPTS */
        .modal-opts { display: flex; flex-direction: column; gap: 8px; padding: 0 20px; }
        .modal-opt { display: flex; align-items: center; gap: 12px; background: #F4F4FA; border: none; border-radius: 13px; padding: 12px 13px; cursor: pointer; text-align: left; width: 100%; transition: background 0.13s, transform 0.13s; font-family: 'DM Sans', sans-serif; color: #1A1208; }
        .modal-opt:active { transform: scale(0.97); background: #E2D8CC; }
        .opt-ico { width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .opt-txt { flex: 1; }
        .opt-label { font-size: 14px; font-weight: 700; margin-bottom: 1px; color: #1A1208; }
        .opt-sub { font-size: 11.5px; color: #7A6A4A; font-weight: 500; }
        .back-btn { background: none; border: none; color: #1B4FCC; font-size: 13px; font-weight: 600; cursor: pointer; margin-bottom: 12px; padding: 0 20px; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; }
        .src-chips { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 13px; padding: 0 20px; }
        .src-chip { display: flex; align-items: center; font-size: 11.5px; font-weight: 600; border: 1.5px solid; padding: 5px 11px; border-radius: 20px; }
        .field-input { display: block; width: calc(100% - 40px); margin: 0 20px; background: #F5F2EC; border: 2px solid #EDE5D8; border-radius: 12px; padding: 12px 14px; color: #1A1208; font-size: 13.5px; font-weight: 500; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.16s; }
        .field-input:focus { border-color: #1B4FCC; }
        .field-input::placeholder { color: #C4B090; }
        .success-wrap { text-align: center; padding: 16px 20px 4px; }
        .success-ring { width: 60px; height: 60px; border-radius: 50%; background: #E6FCF5; border: 3px solid #00AABB; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; animation: pop 0.36s cubic-bezier(.4,0,.2,1); }
        @keyframes pop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        .success-wrap h4 { font-family: 'Manrope', sans-serif; font-size: 18px; font-weight: 800; margin-bottom: 6px; color: #1A1208; }
        .success-wrap p { font-size: 12.5px; color: #7A6A4A; font-weight: 500; margin-bottom: 17px; }

        /* STICKY NEW LIST BAR */
        .sticky-new-list { flex-shrink: 0; padding: 20px 22px 14px; background: #F5F2EC; border-top: 1px solid #E2D8CC; }
        .new-list-btn { width: 100%; padding: 14px 20px; border-radius: 14px; background: linear-gradient(130deg, #1B4FCC, #C8002D); border: none; color: #fff; font-size: 15px; font-weight: 700; font-family: 'DM Sans', sans-serif; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 16px rgba(27,79,204,0.32); transition: transform 0.14s, box-shadow 0.14s; }
        .new-list-btn:active { transform: scale(0.97); box-shadow: 0 2px 8px rgba(132,94,247,0.2); }

        /* SWIPEABLE CARD WRAPPER */
        .swipe-wrapper { position: relative; overflow: hidden; border-radius: 17px; }
        .swipe-actions-left { position: absolute; inset: 0; display: flex; align-items: center; justify-content: flex-end; padding-right: 16px; background: linear-gradient(135deg, #1B4FCC, #C8002D); border-radius: 17px; gap: 6px; }
        .swipe-actions-right { position: absolute; inset: 0; display: flex; align-items: center; padding-left: 16px; gap: 8px; border-radius: 17px; overflow: hidden; }
        .swipe-action-btn { display: flex; flex-direction: column; align-items: center; gap: 4px; background: none; border: none; color: #fff; cursor: pointer; padding: 8px 10px; border-radius: 10px; transition: background 0.15s; }
        .swipe-action-btn:active { background: rgba(255,255,255,0.2); }
        .swipe-action-lbl { font-size: 10px; font-weight: 700; }
        .swipe-card-inner { position: relative; transition: transform 0.25s cubic-bezier(.4,0,.2,1); will-change: transform; touch-action: pan-y; }
        .swipe-celebrate { position: absolute; inset: 0; border-radius: 17px; display: flex; align-items: center; padding-left: 20px; gap: 10px; pointer-events: none; }
        .celebrate-text { font-size: 14px; font-weight: 700; color: #fff; opacity: 0; transition: opacity 0.2s; }
        .celebrate-text.show { opacity: 1; }

        /* BUTTONS */
        .action-btn { flex: 1; padding: 13px 16px; border-radius: 12px; font-size: 13.5px; font-weight: 700; font-family: 'DM Sans', sans-serif; cursor: pointer; border: none; display: flex; align-items: center; justify-content: center; transition: opacity 0.15s, transform 0.12s; }
        .action-btn:active { transform: scale(0.96); }
        .action-btn:disabled { opacity: 0.36; cursor: not-allowed; }
        .action-primary { color: #fff; box-shadow: 0 4px 12px rgba(27,79,204,0.22); }
        .action-ghost { background: #F5F2EC; color: #5A4A28; }
        .icon-btn { width: 30px; height: 30px; border-radius: 50%; background: rgba(26,18,8,0.07); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; transition: background 0.13s; flex-shrink: 0; }
        .icon-btn:active { background: rgba(26,18,8,0.13); }
        .spin { animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── HEADER ── */}
      <div className={`header${scrolled ? " compact" : ""}`}>
        <div className="header-blob" />
        <div className="header-row">
          <div className="wordmark"><span className="wm-epic">Epic</span><span>log</span></div>
          <div className="header-actions">
            <button className="icon-btn" style={{ background: "#F5F2EC" }}><Search size={15} strokeWidth={2} color="#7A6A4A" /></button>
            <button className="avatar-btn" onClick={() => setActiveNav("profile")}><User size={15} strokeWidth={2.5} /></button>
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="content-scroll" style={{ position: "relative" }}
        onScroll={e => setScrolled(e.currentTarget.scrollTop > 10)}>

        {/* ── LISTS SECTION ── */}
        {activeNav === "lists" && (<>
          {/* Toolbar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 22px 6px", flexShrink:0 }}>
            <button className={`filter-btn ${activeFilterCount>0?"filter-btn-active":""}`} onClick={openFilterSheet}>
              <SlidersHorizontal size={14} strokeWidth={2}/>
              Filter & Sort
              {activeFilterCount>0 && <span className="filter-badge">{activeFilterCount}</span>}
            </button>
            <div className="view-toggle">
              <button className={`view-btn ${viewMode==="flat"?"view-btn-active":""}`} onClick={()=>setViewMode("flat")}><LayoutList size={15} strokeWidth={2}/></button>
              <button className={`view-btn ${viewMode==="category"?"view-btn-active":""}`} onClick={()=>setViewMode("category")}><Layers size={15} strokeWidth={2}/></button>
              <button className={`view-btn ${viewMode==="progress"?"view-btn-active":""}`} onClick={()=>setViewMode("progress")}><Filter size={15} strokeWidth={2}/></button>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="active-filters-row">
              {committed.sort !== "recent" && (
                <div className="active-chip">
                  {committed.sort==="progress"?"Most Complete":committed.sort==="az"?"A–Z":"Done First"}
                  <button onClick={()=>setCommitted(c=>({...c,sort:"recent"}))}><X size={10} strokeWidth={3}/></button>
                </div>
              )}
              {committed.progress !== "all" && (
                <div className="active-chip">
                  {committed.progress==="active"?"In Progress":committed.progress==="done"?"Completed":"Not Started"}
                  <button onClick={()=>setCommitted(c=>({...c,progress:"all"}))}><X size={10} strokeWidth={3}/></button>
                </div>
              )}
              {committed.tags.map(t => (
                <div key={t} className="active-chip" style={{ background:TAG_COLORS[t]||"#1B4FCC" }}>
                  {t}<button onClick={()=>setCommitted(c=>({...c,tags:c.tags.filter(x=>x!==t)}))}><X size={10} strokeWidth={3}/></button>
                </div>
              ))}
            </div>
          )}

          {(() => {
            const processed = applyListFiltersAndSort(
              [...lists].sort((a,b)=>(pinnedIds.has(b.id)?1:0)-(pinnedIds.has(a.id)?1:0)),
              committed
            );
            if (viewMode === "flat") return (<>
              <div className="section-header" style={{ paddingBottom:8 }}>
                <span className="section-title">Near Me</span>
                <span style={{ fontSize:11, color:"#B0A080", fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
                  <Navigation size={11} strokeWidth={2} color="#B0A080"/>Seattle, WA
                </span>
              </div>
              <div className="nearby-scroll">
                {NEARBY.map(n => <NearMeCard key={n.id} item={n} onClick={()=>{ const f=lists.find(l=>l.title===n.title); if(f) setSelected(f); }}/>)}
              </div>
              <div className="section-header" style={{ paddingTop:18 }}>
                <span className="section-title">All Lists</span>
                <span className="section-count">{processed.length} lists</span>
              </div>
              <div className="cards-scroll">
                {processed.map((l,i)=><ListCard key={l.id} list={l} index={i} onClick={setSelected} onDelete={handleDeleteList} onPin={handlePinList} onShare={handleShareList} pinned={pinnedIds.has(l.id)}/>)}
                {processed.length===0 && <div style={{ textAlign:"center",padding:"40px 0",color:"#C4B090" }}><Filter size={32} strokeWidth={1.5} style={{ marginBottom:10,opacity:0.5 }}/><p style={{ fontSize:14,fontWeight:600 }}>No lists match</p></div>}
              </div>
            </>);
            if (viewMode === "category") return (<>
              {groupByCategory(processed).map(([tag,items])=>(
                <div key={tag}>
                  <div className="group-header"><CategoryIcon tag={tag} size={13} color={TAG_COLORS[tag]||"#1B4FCC"}/><span className="group-label" style={{ color:TAG_COLORS[tag]||"#1B4FCC" }}>{tag}</span><div className="group-line"/><span className="group-count">{items.length}</span></div>
                  <div className="cards-scroll" style={{ paddingBottom:4 }}>{items.map((l,i)=><ListCard key={l.id} list={l} index={i} onClick={setSelected} onDelete={handleDeleteList} onPin={handlePinList} onShare={handleShareList} pinned={pinnedIds.has(l.id)}/>)}</div>
                </div>
              ))}
              <div style={{ height:20 }}/>
            </>);
            return (<>
              {groupByProgress(processed).map(([label,items])=>(
                <div key={label}>
                  <div className="group-header"><span className="group-label">{label}</span><div className="group-line"/><span className="group-count">{items.length}</span></div>
                  <div className="cards-scroll" style={{ paddingBottom:4 }}>{items.map((l,i)=><ListCard key={l.id} list={l} index={i} onClick={setSelected} onDelete={handleDeleteList} onPin={handlePinList} onShare={handleShareList} pinned={pinnedIds.has(l.id)}/>)}</div>
                </div>
              ))}
              <div style={{ height:20 }}/>
            </>);
          })()}
        </>)}

        {/* ── BACKLOG SECTION ── */}
        {activeNav === "backlog" && (<>
          <div className="backlog-page-header">
            <div className="backlog-page-title-row">
              <div>
                <h2 className="backlog-page-title">Backlog</h2>
                <p className="backlog-page-sub">Places you've saved — waiting to become adventures</p>
              </div>
              <button className="action-btn action-primary" style={{ background:"linear-gradient(130deg,#C8002D,#1B4FCC)", flex:"none", padding:"9px 14px", fontSize:12 }} onClick={() => setShowAdd(true)}>
                <Link2 size={13} strokeWidth={2.5} style={{ marginRight:5 }} />Import
              </button>
            </div>
          </div>
          <div className="ai-banner" style={{ margin:"0 22px 16px" }}>
            <div className="ai-icon"><Sparkles size={17} strokeWidth={2} /></div>
            <div className="ai-text">
              <div className="ai-title">AI suggestion</div>
              <div className="ai-sub">3 places could form a "Lisbon Weekend" list</div>
            </div>
            <button className="ai-btn">Create</button>
          </div>
          <div className="section-header" style={{ paddingTop: 0 }}>
            <span className="section-title">Saved Places</span>
            <span className="section-count">{BACKLOG.length} items</span>
          </div>
          <div className="backlog-list" style={{ padding:"0 22px 20px" }}>
            {BACKLOG.map((item, i) => (
              <div key={item.id} className="backlog-item" style={{ animationDelay:`${i*55}ms`, background:"#fff", boxShadow:"0 2px 8px rgba(0,0,0,0.048)" }}>
                <div className="backlog-thumb"><MapPin size={18} strokeWidth={1.8} /></div>
                <div className="backlog-info">
                  <div className="backlog-title">{item.title}</div>
                  <div className="backlog-meta">
                    <span className="backlog-src"
                      style={{ color:srcColor(item.source), background:`${srcColor(item.source)}10`, border:`1px solid ${srcColor(item.source)}26` }}>
                      <SourceIcon source={item.source} size={11} />{item.source}
                    </span>
                    <Clock size={10} style={{ marginRight:2 }} />{item.saved}
                  </div>
                </div>
                <div style={{ display:"flex", gap:7 }}>
                  <button className="backlog-add-btn" title="Add to list"><Plus size={14} strokeWidth={2.5} /></button>
                </div>
              </div>
            ))}
          </div>
        </>)}

        {/* ── EXPLORE SECTION ── */}
        {activeNav === "explore" && (<>
          <PillFilter filters={exploreFilters} active={exploreFilter} onSelect={setExploreFilter} />
          <div className="explore-section-label">Popular right now</div>
          <div className="cards-scroll">
            {EXPLORE_LISTS.map((l, i) => <ListCard key={l.id} list={l} index={i} onClick={setSelected} />)}
          </div>
        </>)}

        {/* ── PROFILE SECTION ── */}
        {activeNav === "profile" && (() => {
          const totalPlaces = lists.reduce((s, l) => s + l.total, 0);
          const totalVisited = lists.reduce((s, l) => s + l.visited, 0);
          const overallPct = Math.round((totalVisited / totalPlaces) * 100);
          const completedLists = lists.filter(l => l.visited === l.total).length;

          return (
            <div>
              {/* ── HERO BANNER ── */}
              <div className="profile-hero">
                <div className="profile-hero-bg" />

                {/* Avatar + identity */}
                <div className="profile-top-row">
                  <div className="profile-avatar">
                    <User size={28} strokeWidth={2} color="#fff" />
                  </div>
                  <div className="profile-identity">
                    <div className="profile-name">Alex Wanderer</div>
                    <div className="profile-handle">@alexw · Since Jan 2023</div>
                    <div className="profile-level-badge">
                      <Star size={11} strokeWidth={2.5} fill="#F4C97A" color="#F4C97A" />
                      Level 4 Explorer
                    </div>
                  </div>
                  <button className="profile-edit-btn">
                    <Pencil size={11} strokeWidth={2.5} />Edit
                  </button>
                </div>

                {/* Overall progress bar */}
                <div className="profile-progress-section">
                  <div className="profile-progress-label">
                    <span className="profile-progress-title">Overall Journey</span>
                    <span className="profile-progress-count">
                      {totalVisited} <span>/ {totalPlaces} places</span>
                    </span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${overallPct}%` }} />
                  </div>
                  <div className="progress-milestones">
                    {[10, 25, 50, 100].map(m => (
                      <span key={m} className={`milestone ${totalVisited >= m ? "reached" : ""}`}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stat strip */}
                <div className="profile-stat-strip">
                  {[
                    { num: totalVisited, label: "Visited" },
                    { num: lists.length, label: "Lists" },
                    { num: completedLists, label: "Completed" },
                    { num: 44, label: "Backlog" },
                  ].map((s, i) => (
                    <div key={i} className="strip-stat">
                      <div className="strip-num">{s.num}</div>
                      <div className="strip-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── ACHIEVEMENTS ── */}
              <div className="profile-section-title">Achievements</div>
              <div className="achievements-row">
                {[
                  { icon: <Trophy size={16} strokeWidth={2} color="#F4C97A" />, bg: "#FFF4DC", title: "Completionist", sub: "Finished NYC Bagels" },
                  { icon: <Flame size={16} strokeWidth={2} color="#C8002D" />, bg: "#FFF0F0", title: "On Fire 🔥", sub: "7-day streak" },
                  { icon: <Globe size={16} strokeWidth={2} color="#1B4FCC" />, bg: "#EBF0FF", title: "Globetrotter", sub: "6 countries visited" },
                  { icon: <MapPin size={16} strokeWidth={2} color="#00AABB" />, bg: "#E6FCF5", title: "Scout", sub: "First 10 check-ins" },
                ].map((a, i) => (
                  <div key={i} className="achievement-chip" style={{ animationDelay: `${i*60}ms` }}>
                    <div className="ach-icon" style={{ background: a.bg }}>{a.icon}</div>
                    <div>
                      <div className="ach-title">{a.title}</div>
                      <div className="ach-sub">{a.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── PER-LIST PROGRESS ── */}
              <div className="profile-section-title">Your Lists</div>
              <div className="list-progress-grid">
                {lists.map((l, i) => {
                  const pct = Math.round((l.visited / l.total) * 100);
                  return (
                    <div key={l.id} className="list-progress-card" style={{ animationDelay: `${i * 50}ms` }}>
                      <div className="lp-top">
                        <div className="lp-icon" style={{ background: l.colorLight }}>
                          <CategoryIcon tag={l.tag} size={16} color={l.color} />
                        </div>
                        <div className="lp-text">
                          <div className="lp-title">{l.title}</div>
                          <div className="lp-subtitle">{l.visited} of {l.total} places · {l.tag}</div>
                        </div>
                        <div className="lp-pct" style={{ color: l.color }}>{pct}%</div>
                      </div>
                      <div className="lp-track">
                        <div className="lp-fill" style={{ width: `${pct}%`, background: l.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── RECENT ACTIVITY ── */}
              <div className="profile-section-title">Recent Activity</div>
              <div className="recent-activity">
                {[
                  { icon: <Check size={15} strokeWidth={2.5} color="#00AABB" />, bg: "#E6FCF5", main: "Visited Fonte Coffee", sub: "Seattle Coffee Circuit · 7/10 done", time: "2 days ago" },
                  { icon: <Plus size={15} strokeWidth={2.5} color="#1B4FCC" />, bg: "#EBF0FF", main: "Added note to Machu Picchu", sub: "7 Wonders of the World", time: "5 days ago" },
                  { icon: <Sparkles size={15} strokeWidth={2} color="#E8A020" />, bg: "#FFF4DC", main: "AI created \"Lisbon Weekend\"", sub: "From 3 backlog saves", time: "1 week ago" },
                  { icon: <MapPin size={15} strokeWidth={2} color="#C8002D" />, bg: "#FFF0F0", main: "Visited Georgia", sub: "Former Soviet Union · 4/15 done", time: "Oct 2021" },
                ].map((a, i) => (
                  <div key={i} className="activity-item" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="activity-dot" style={{ background: a.bg }}>{a.icon}</div>
                    <div className="activity-text">
                      <div className="activity-main">{a.main}</div>
                      <div className="activity-sub">{a.sub}</div>
                    </div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

      </div>{/* end content-scroll */}

      {/* ── FAB (Lists only) ── */}
      {activeNav === "lists" && (
        <div style={{ position: "relative", flexShrink: 0, height: 0 }}>
          <button className="fab" onClick={() => setShowAdd(true)}>
            <Plus size={24} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
      <div className="bottom-nav">
        {navItems.map(({ Icon, label, id }) => (
          <button key={id} className={`nav-item ${activeNav === id ? "active" : ""}`} onClick={() => { setActiveNav(id); setScrolled(false); }}>
            <div className="nav-ico-wrap">
              <div className="nav-ico"><Icon size={20} strokeWidth={activeNav === id ? 2.5 : 1.8} /></div>
              {id === "backlog" && <span className="nav-badge">4</span>}
            </div>
            <span className="nav-lbl">{label}</span>
          </button>
        ))}
      </div>

      {/* ── MODALS / SHEETS ── */}
      {selected && <DetailView list={selected} onClose={() => setSelected(null)} />}
      {showAdd && <AddModal onClose={() => setShowAdd(false)} />}
      {showFilterSheet && <FilterSheet draft={filterDraft} onChange={setFilterDraft} onApply={applyFilterSheet} onClose={() => setShowFilterSheet(false)} activeCount={previewCount} />}
      {shareTarget && (
        <div className="overlay" onClick={() => setShareTarget(null)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()} style={{ paddingBottom: 36 }}>
            <div className="sheet-handle" />
            <div style={{ padding: "4px 20px 16px" }}>
              <h3 className="sheet-title" style={{ marginBottom: 4 }}>Share "{shareTarget.title}"</h3>
              <p style={{ fontSize: 12.5, color: "#7A6A4A", fontWeight: 500, marginBottom: 20 }}>
                Let friends discover and copy your list
              </p>
              {[
                { Icon: Link2, label: "Copy Link", sub: "epiclog.app/lists/…", color: "#1B4FCC", action: () => setShareTarget(null) },
                { Icon: Users, label: "Invite Friends", sub: "Share directly with your contacts", color: "#00AABB", action: () => setShareTarget(null) },
                { Icon: Globe, label: "Make Public", sub: "Anyone can discover this list", color: "#E8A020", action: () => setShareTarget(null) },
              ].map(({ Icon, label, sub, color, action }, i) => (
                <button key={i} className="modal-opt" style={{ marginBottom: 8 }} onClick={action}>
                  <div className="opt-ico" style={{ background: `${color}18` }}>
                    <Icon size={18} color={color} strokeWidth={2} />
                  </div>
                  <div className="opt-txt">
                    <div className="opt-label">{label}</div>
                    <div className="opt-sub">{sub}</div>
                  </div>
                  <ChevronRight size={16} color={color} strokeWidth={2.5} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
