import React, { useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import {
  Shield, TrendingUp, AlertTriangle, DollarSign, Target,
  Layers, Lock, Eye, FileText, ChevronLeft, ChevronRight, Activity, Server, Users,
  Fingerprint, ShieldCheck, Cpu, Search, Phone, Utensils, Zap, Sliders, MessageSquare, CreditCard,
  ThumbsUp, Key
} from 'lucide-react';

// --- הגדרת סיסמה ---
// שנה את זה לכל סיסמה שתרצה
const CORRECT_PASSWORD = "123";

// --- LOGIN COMPONENT ---
const LoginScreen = ({ onLogin }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === CORRECT_PASSWORD) {
      onLogin(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 font-sans" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-200">
        <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">המצגת מוגנת</h2>
        <p className="text-slate-500 mb-6">אנא הזן סיסמת צפייה כדי להמשיך</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="סיסמה..."
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none text-center text-lg dir-ltr"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition-all shadow-md active:scale-95"
          >
            כניסה למצגת
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-rose-50 text-rose-600 rounded-lg text-sm font-medium animate-bounce">
            ❌ סיסמה שגויה, נסה שוב
          </div>
        )}
      </div>
    </div>
  );
};


// --- DATA FOR CHART ---
const chartData = [
  { year: '2022', savedNear: 741053, savedRetro: 338370, savedCollection: 265140, damage: 779212, quality: 63.3 },
  { year: '2023', savedNear: 289707, savedRetro: 269037, savedCollection: 222605, damage: 658667, quality: 54.3 },
  { year: '2024', savedNear: 270150, savedRetro: 117560, savedCollection: 368444, damage: 394876, quality: 65.7 },
  { year: '2025', savedNear: 590387, savedRetro: 85356, savedCollection: 261321, damage: 244950, quality: 79.3 },
];

const formatCurrency = (val) => val >= 1000 ? `₪${(val/1000).toFixed(0)}k` : val;

const colors = {
    primary: "#0ea5e9",
    secondary: "#38bdf8",
    accent: "#bae6fd",
    bgLight: "#f0f9ff",
    textDark: "#0f172a",
    textGray: "#64748b",
    chart: {
        savedNear: "#0284c7",
        savedRetro: "#38bdf8",
        savedCollection: "#bae6fd",
        damage: "#f43f5e",
        line: "#0c4a6e"
    }
};

// --- SLIDE COMPONENTS ---

// Slide 1: Title
const TitleSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fadeIn bg-gradient-to-br from-sky-50 to-white">
    <div className="w-24 h-24 bg-sky-500 rounded-3xl flex items-center justify-center shadow-xl shadow-sky-200 rotate-3 transition-transform hover:rotate-0">
      <Shield className="w-12 h-12 text-white" />
    </div>
    <div>
      <h1 className="text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">סקירת מערך מניעת הונאות</h1>
      <h2 className="text-2xl text-sky-600 font-medium">סיכום פעילות שנתי 2025 ומוכנות ל-2026</h2>
    </div>
    <div className="mt-12 px-8 py-3 bg-white rounded-full text-sky-600 font-semibold shadow-sm border border-sky-100">
      דירקטוריון פברואר 2026
    </div>
  </div>
);

// Slide 2: Context & Goals
const ContextSlide = () => (
  <div className="h-full flex flex-col justify-center px-12 animate-fadeIn">
    <h2 className="text-3xl font-bold text-slate-800 mb-12 border-r-4 border-sky-500 pr-4">רקע ומטרות הדיון</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-sky-50/50 p-8 rounded-3xl border border-sky-100 relative overflow-hidden group hover:bg-sky-50 transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm">
             <Activity className="w-6 h-6 text-sky-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">האתגר: סביבה דינמית</h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg">
          מניעת הונאות היא "מרוץ חימוש" מתמיד. אנו מתמודדים מול טיפולוגיות המשתנות מדי יום וטרנדים טכנולוגיים מתפתחים.
        </p>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-4">
           <div className="bg-sky-100 p-3 rounded-2xl shadow-sm">
              <Target className="w-6 h-6 text-sky-600" />
           </div>
          <h3 className="text-xl font-bold text-slate-800">מטרת הדיון</h3>
        </div>
        <ul className="space-y-4 text-slate-600 text-lg">
          <li className="flex items-start gap-3">
            <span className="mt-2 w-2 h-2 bg-sky-400 rounded-full flex-shrink-0"></span>
            הצגת אפקטיביות צוות האופרציה וה-ROI השנתי.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 w-2 h-2 bg-sky-400 rounded-full flex-shrink-0"></span>
            סקירת שכבות ההגנה הטכנולוגיות והאנושיות.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Slide 3: Trends 2025
const TrendsSlide = () => (
  <div className="h-full flex flex-col justify-center px-8 animate-fadeIn">
     <h2 className="text-3xl font-bold text-slate-800 mb-8 border-r-4 border-rose-300 pr-4">מגמות וטרנדים מרכזיים 2025</h2>
     <div className="grid grid-cols-2 gap-8">
       <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
           <div className="flex items-start justify-between mb-4">
               <div className="bg-rose-50 p-3 rounded-2xl">
                   <Phone className="w-8 h-8 text-rose-400" />
               </div>
               <div className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-200">
                   הנדסה חברתית
               </div>
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-2">הונאת "בזק" / נותני שירות</h3>
           <p className="text-slate-500 text-sm mb-4 leading-relaxed flex-grow">
               התחזות לנציג שירות המודיע על חוב דחוף. התוקף מבקש אשראי וקוד אימות (OTP).
           </p>
           <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-50">
               <div>
                   <span className="block text-xs text-slate-400 uppercase tracking-wide font-semibold">היקף מקרים</span>
                   <span className="text-2xl font-bold text-slate-700">~24</span>
               </div>
                <div className="w-px h-10 bg-slate-100"></div>
               <div>
                   <span className="block text-xs text-slate-400 uppercase tracking-wide font-semibold">נזק כספי</span>
                   <span className="text-2xl font-bold text-rose-500">₪64k</span>
               </div>
           </div>
       </div>
       <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
             <div className="flex items-start justify-between mb-4">
               <div className="bg-rose-50 p-3 rounded-2xl">
                   <Utensils className="w-8 h-8 text-rose-400" />
               </div>
               <div className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-200">
                   פישינג בזמן אמת
               </div>
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-2">הונאת "מסעדות"</h3>
           <p className="text-slate-500 text-sm mb-4 leading-relaxed flex-grow">
               שיחה מ"המסעדה" על כשל בתשלום מיד לאחר הזמנה.
           </p>
           <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-50">
               <div>
                   <span className="block text-xs text-slate-400 uppercase tracking-wide font-semibold">היקף מקרים</span>
                   <span className="text-2xl font-bold text-slate-700">~35</span>
               </div>
                <div className="w-px h-10 bg-slate-100"></div>
               <div>
                   <span className="block text-xs text-slate-400 uppercase tracking-wide font-semibold">נזק כספי</span>
                   <span className="text-2xl font-bold text-rose-500">₪180k</span>
               </div>
           </div>
       </div>
     </div>
  </div>
);

// Slide 4: Improvements
const ImprovementsSlide = () => (
    <div className="h-full flex flex-col justify-center px-8 animate-fadeIn">
       <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2 border-r-4 border-sky-400 pr-4">צעדי מנע ושיפורים טכנולוגיים</h2>
            <p className="text-slate-500 text-lg">מענה בזמן אמת לאיומים המתפתחים</p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mb-4">
                  <Sliders className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">הידוק בקרות Wallet Score</h3>
              <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                      <span>אופטימיזציה לזיהוי אנומליות במכשירי iOS.</span>
                  </li>
              </ul>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">הגברת מודעות והתראות</h3>
              <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                      <span>חידוד הודעות SMS בעת Login עם אזהרה.</span>
                  </li>
              </ul>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">צמצום משטח התקיפה</h3>
              <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                      <span>מודל "מסלולים" והפחתת תקרות אשראי.</span>
                  </li>
              </ul>
          </div>
       </div>
    </div>
);

// Slide 5: The Chart
const ChartSlide = () => {
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        const getVal = (key) => payload.find(p => p.dataKey === key)?.value || 0;
        const savedCollection = getVal('savedCollection');
        const savedRetro = getVal('savedRetro');
        const savedNear = getVal('savedNear');
        const damage = getVal('damage');
        const quality = getVal('quality');
        const totalSaved = savedCollection + savedRetro + savedNear;
        const formatMoney = (v) => `₪${(v).toLocaleString()}`;
        return (
          <div className="bg-white p-4 border border-slate-100 shadow-xl rounded-2xl font-sans text-right min-w-[200px]" dir="rtl">
            <p className="font-bold text-slate-800 text-lg mb-3 border-b pb-2">{label}</p>
            <div className="space-y-2 text-sm">
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor: colors.chart.savedNear}}></span>מניעה:</span><span className="font-medium text-slate-700">{formatMoney(savedNear)}</span></div>
               <div className="my-2 pt-2 border-t border-dashed border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-sky-600">סה״כ נחסך:</span>
                  <span className="font-bold text-sky-600">{formatMoney(totalSaved)}</span>
               </div>
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor: colors.chart.damage}}></span>נזק:</span><span className="font-bold text-rose-500">{formatMoney(damage)}</span></div>
               <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-800">איכות מניעה:</span>
                  <span className="font-extrabold text-sky-800 text-base">{quality}%</span>
               </div>
            </div>
          </div>
        );
      }
      return null;
    };

    return (
    <div className="h-full flex flex-col px-4 animate-fadeIn">
      <div className="flex justify-between items-end mb-6 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">תמונת מצב שנתית: מניעה מול נזק</h2>
          <p className="text-slate-500">עלייה עקבית באיכות המניעה (79.3%) וירידה דרמטית בנזק בפועל</p>
        </div>
      </div>
      <div className="flex-grow w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} />
            <YAxis yAxisId="left" tickFormatter={formatCurrency} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(v)=>`${v}%`} axisLine={false} tickLine={false} tick={{fill: '#0ea5e9', fontSize: 12, fontWeight: 600}} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar yAxisId="left" dataKey="savedCollection" name="גבייה" stackId="a" fill={colors.chart.savedCollection} />
            <Bar yAxisId="left" dataKey="savedRetro" name="ניכוי יתרה" stackId="a" fill={colors.chart.savedRetro} />
            <Bar yAxisId="left" dataKey="savedNear" name="מניעה אקטיבית" stackId="a" fill={colors.chart.savedNear} radius={[0,0,4,4]} />
            <Bar yAxisId="left" dataKey="damage" name="נזק בפועל" stackId="a" fill={colors.chart.damage} radius={[4,4,0,0]} />
            <Line yAxisId="right" type="monotone" dataKey="quality" name="איכות מניעה" stroke={colors.chart.line} strokeWidth={4} dot={{r:5, fill: colors.chart.line, strokeWidth: 0}} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
    );
};

// Slide 6: Defense Layers
const LayersSlide = () => {
  const layers = [
    { title: "אבטחת תשתית וסייבר", icon: <Server className="w-5 h-5" />, items: ["חומת אש (Firewall)", "חסימות גיאוגרפיות"], color: "bg-slate-700" },
    { title: "זיהוי ואימות לקוח (KYC)", icon: <Fingerprint className="w-5 h-5" />, items: ["איסוף מידע רגולטורי", "אימות ביומטרי"], color: "bg-sky-600" },
    { title: "מנועי סיכון בזמן אמת", icon: <Cpu className="w-5 h-5" />, items: ["Risk Score דינמי", "Wallet Score"], color: "bg-sky-500" },
    { title: "בקרה וניטור תפעולי", icon: <Search className="w-5 h-5" />, items: ["ניטור אנליסטים", "ניהול רשימות מוגבלים"], color: "bg-sky-400" }
  ];
  return (
    <div className="h-full flex flex-col px-4 animate-fadeIn overflow-hidden">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-r-4 border-sky-500 pr-4">ארכיטקטורת ההגנה: רב-שכבתית</h2>
      <div className="flex flex-col items-center justify-end flex-grow relative -mb-10">
        {layers.map((layer, idx) => (
          <div key={idx} className={`w-full max-w-4xl ${layer.color} text-white rounded-t-3xl shadow-lg absolute bottom-0 flex flex-col items-center pt-6 transition-all duration-500 hover:-translate-y-2`}
            style={{ height: `${(layers.length - idx) * 110 + 40}px`, zIndex: idx, width: `${100 - (idx * 5)}%` }}>
            <div className="flex items-center gap-2 mb-3 bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm">
              {layer.icon}
              <span className="font-bold text-lg">{layer.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Slide 7: Lists
const ListsSlide = () => (
  <div className="h-full flex flex-col justify-center px-12 animate-fadeIn">
    <h2 className="text-2xl font-bold text-slate-800 mb-8 border-r-4 border-sky-400 pr-4">בקרה, ניטור וכלי עבודה</h2>
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-slate-700 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">
        <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm"><Lock className="w-6 h-6 text-white" /></div>
        <h3 className="text-xl font-bold mb-2">Black List</h3>
        <p className="text-slate-300 text-sm">רשימה שחורה של חסומים.</p>
      </div>
      <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:scale-105 transition">
        <div className="bg-sky-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4"><Eye className="w-6 h-6 text-sky-500" /></div>
        <h3 className="text-xl font-bold mb-2 text-slate-800">Watch List</h3>
        <p className="text-slate-500 text-sm">רשימת מעקב בסיכון גבוה.</p>
      </div>
      <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:scale-105 transition">
        <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4"><FileText className="w-6 h-6 text-orange-400" /></div>
        <h3 className="text-xl font-bold mb-2 text-slate-800">Banned Users</h3>
        <p className="text-slate-500 text-sm">משתמשים שפעילותם הוקפאה.</p>
      </div>
    </div>
  </div>
);

// Slide 8: Thank You
const ThankYouSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-fadeIn bg-gradient-to-tl from-sky-50 to-white">
    <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <ShieldCheck className="w-12 h-12 text-sky-500" />
    </div>
    <div>
        <h1 className="text-5xl font-extrabold text-slate-800 mb-2 tracking-tight">תודה רבה</h1>
    </div>
  </div>
);


// --- MAIN APP COMPONENT ---

const BoardPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { component: <TitleSlide />, label: "פתיחה" },
    { component: <ContextSlide />, label: "רקע ומטרות" },
    { component: <ChartSlide />, label: "נתונים" },
    { component: <TrendsSlide />, label: "מגמות 2025" },
    { component: <ImprovementsSlide />, label: "צעדי מנע" },
    { component: <LayersSlide />, label: "שכבות הגנה" },
    { component: <ListsSlide />, label: "ניטור ובקרה" },
    { component: <ThankYouSlide />, label: "סיום" },
  ];
  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen bg-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="bg-white w-full h-[600px] rounded-[32px] shadow-2xl border border-white/50 relative overflow-hidden flex flex-col">
        <div className="w-full h-1.5 bg-sky-50">
          <div className="h-full bg-sky-500 transition-all duration-500 ease-out" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div>
        </div>
        <div className="flex-grow p-8 relative">
          {slides[currentSlide].component}
        </div>
        <div className="h-20 bg-white border-t border-slate-50 flex items-center justify-between px-8">
          <div className="text-slate-400 text-sm font-medium">שקף {currentSlide + 1} מתוך {slides.length}</div>
          <div className="flex gap-4">
            <button onClick={prevSlide} disabled={currentSlide === 0} className={`p-3 rounded-full ${currentSlide === 0 ? 'text-slate-300' : 'bg-white shadow-sm hover:text-sky-600'} transition-all`}><ChevronRight className="w-5 h-5" /></button>
            <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className={`p-3 rounded-full ${currentSlide === slides.length - 1 ? 'text-slate-300' : 'bg-sky-500 shadow-lg text-white hover:bg-sky-600'} transition-all`}><ChevronLeft className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- WRAPPER WITH SECURITY ---
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={setIsAuthenticated} />;
  }

  return <BoardPresentation />;
};

export default App;