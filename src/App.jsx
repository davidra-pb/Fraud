import React, { useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Shield, TrendingUp, Activity, Server, Target, Lock, Eye, FileText,
  ChevronLeft, ChevronRight, Fingerprint, Cpu, Search, Phone, Utensils,
  Sliders, MessageSquare, CreditCard, ShieldCheck, CheckCircle, Zap, AlertCircle, Microscope, BrainCircuit,
  FileBadge, Map, GraduationCap, Archive
} from 'lucide-react';

// --- CONFIG ---
const APP_VERSION = "v.1.11";

// --- DATA ---
const chartData = [
  { year: '2022', savedNear: 741053.20, savedRetro: 338370.34, savedCollection: 265140.60, damage: 779212.67, quality: 63.3, totalSaved: 1344564, totalExposure: 2123776 },
  { year: '2023', savedNear: 289707, savedRetro: 269037.13, savedCollection: 221925.26, damage: 659347.02, quality: 54.2, totalSaved: 780669, totalExposure: 1440016 },
  { year: '2024', savedNear: 270150, savedRetro: 119560, savedCollection: 368974.10, damage: 395792.65, quality: 65.7, totalSaved: 758684, totalExposure: 1154477 },
  { year: '2025', savedNear: 590387.37, savedRetro: 85356, savedCollection: 263511.59, damage: 254250.00, quality: 78.7, totalSaved: 939255, totalExposure: 1193505 },
];

const formatCurrency = (val) => val >= 1000 ? `₪${(val/1000).toFixed(0)}k` : val;
const formatMillions = (val) => `₪${(val/1000000).toFixed(1)}M`;

// PayBox Brand Colors
const colors = {
    chart: {
        savedNear: "#0ea5e9", // Sky 500
        savedRetro: "#38bdf8", // Sky 400
        savedCollection: "#bae6fd", // Sky 200
        damage: "#f43f5e", // Rose 500
        line: "#0c4a6e" // Sky 900
    }
};

// --- COMPONENTS ---

// Login Screen
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Pb@2026') {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-100 font-sans p-4" dir="rtl">
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md text-center border border-slate-200">
        <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-sky-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">המצגת מוגנת</h2>
        <p className="text-slate-500 mb-8 text-base">אנא הזן סיסמת צפייה כדי להמשיך</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="סיסמה..."
              className={`w-full px-5 py-3 text-lg border rounded-xl text-right focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all text-slate-700 placeholder-slate-400 ${error ? 'border-red-300 ring-red-50' : 'border-slate-300'}`}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-right font-medium">סיסמה שגויה, נסה שוב</p>}

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 text-lg rounded-xl transition-all shadow-lg hover:shadow-sky-200 mt-2"
          >
            כניסה למצגת
          </button>
        </form>

        <div className="mt-6 text-slate-400 text-xs font-medium">
            {APP_VERSION}
        </div>
      </div>
    </div>
  );
};

// 1. Title Slide
const TitleSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fadeIn bg-gradient-to-br from-sky-50 to-white">
    <div className="w-32 h-32 bg-sky-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-sky-200">
      <Shield className="w-16 h-16 text-white" />
    </div>
    <div>
      <h1 className="text-6xl font-black text-slate-800 mb-4 tracking-tight">סקירה שנתית: מעילות והונאות</h1>
      <h2 className="text-3xl text-sky-600 font-normal">סיכום 2025 ותוכניות ל-2026</h2>
    </div>
    <div className="mt-12 px-10 py-3 bg-white rounded-full text-sky-700 text-xl font-bold shadow-xl border border-sky-100">
      דירקטוריון פברואר 2026
    </div>
  </div>
);

// 2. Context
const ContextSlide = () => (
  <div className="h-full flex flex-col justify-center px-12 animate-fadeIn">
    <h2 className="text-4xl font-bold text-slate-800 mb-10 border-r-8 border-sky-500 pr-6">רקע ומטרות</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-[65%]">
      <div className="bg-sky-50/60 p-8 rounded-[2rem] border border-sky-100 relative overflow-hidden flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
             <Activity className="w-8 h-8 text-sky-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">האתגרים שלנו</h3>
        </div>
        <div className="space-y-4 text-slate-600 text-xl leading-relaxed">
          <p>
            עולם ההונאות והמעילות משתנה כל הזמן. אנחנו פוגשים שיטות חדשות ומתוחכמות יותר, הן מבחוץ והן בסיכונים פנימיים.
          </p>
          <p>
            כדי להתמודד עם זה, אנחנו צריכים להיות גמישים, לעדכן את המערכות שלנו ולחזק את הבקרות הפנימיות.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-100 border border-slate-100 relative flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-6">
           <div className="bg-sky-100 p-4 rounded-2xl shadow-sm">
              <Target className="w-8 h-8 text-sky-600" />
           </div>
          <h3 className="text-2xl font-bold text-slate-800">מה נציג היום?</h3>
        </div>
        <ul className="space-y-6 text-slate-600 text-xl">
          <li className="flex items-start gap-4">
            <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0"></span>
            <span>
              <strong>מספרים:</strong> כמה מנענו וכמה זה חסך לחברה.
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0"></span>
            <span>
              <strong>איך אנחנו עובדים:</strong> סקירה של כלי ההגנה והבקרות למניעת מעילות.
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0"></span>
            <span>
              <strong>אישור תוכנית:</strong> המשך עבודה באותה מתכונת ב-2026.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// 3. Chart Slide
const ChartSlide = () => {
    const latestData = chartData[3]; // 2025
    const prevData = chartData[2];   // 2024

    const totalExposure = latestData.totalExposure;
    const totalSaved = latestData.totalSaved;
    const savedPercentage = latestData.quality;
    const improvement = ((latestData.quality - prevData.quality) / prevData.quality) * 100;
    const damageReduced = prevData.damage - latestData.damage;

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        const getVal = (key) => payload.find(p => p.dataKey === key)?.value || 0;

        return (
          <div className="bg-white p-4 border border-slate-100 shadow-2xl rounded-xl font-sans text-right min-w-[240px]" dir="rtl">
            <p className="font-bold text-slate-800 text-lg mb-2 border-b pb-2">{label}</p>
            <div className="space-y-2 text-base">
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: colors.chart.savedNear}}></span>מניעה אקטיבית:</span><span className="font-medium text-slate-700">{formatCurrency(getVal('savedNear'))}</span></div>
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: colors.chart.savedRetro}}></span>ניכוי יתרה:</span><span className="font-medium text-slate-700">{formatCurrency(getVal('savedRetro'))}</span></div>
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: colors.chart.savedCollection}}></span>גבייה:</span><span className="font-medium text-slate-700">{formatCurrency(getVal('savedCollection'))}</span></div>
               <div className="my-2 pt-2 border-t border-dashed border-slate-200 flex justify-between items-center bg-sky-50 -mx-4 px-4 py-1">
                  <span className="font-bold text-sky-700">סה״כ נחסך:</span>
                  <span className="font-bold text-sky-700">{formatCurrency(getVal('savedCollection') + getVal('savedRetro') + getVal('savedNear'))}</span>
               </div>
               <div className="flex justify-between items-center pt-1"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: colors.chart.damage}}></span>נזק בפועל:</span><span className="font-bold text-rose-500">{formatCurrency(getVal('damage'))}</span></div>
               <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-800">איכות מניעה:</span>
                  <span className="font-black text-sky-600 text-lg">{getVal('quality')}%</span>
               </div>
            </div>
          </div>
        );
      }
      return null;
    };

    return (
    <div className="h-full flex flex-col px-8 animate-fadeIn">
      <div className="mb-4">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">נתוני מניעה ונזק - 2025</h2>
          <p className="text-xl text-slate-500">סיכום נתונים שנתי</p>
      </div>

      <div className="flex gap-8 h-full pb-4">

          <div className="w-1/4 flex flex-col gap-4">
              <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-sky-500"></div>
                  <div>
                      <div className="text-slate-500 font-medium text-base mb-1">איכות מניעה (%)</div>
                      <div className="text-5xl font-black text-slate-800">{savedPercentage}%</div>
                  </div>
                  <div className="flex flex-col gap-1 mt-2 text-slate-500 text-sm">
                      <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-bold text-base">+{improvement.toFixed(1)}%</span>
                      </div>
                      <p>שיפור משמעותי מול 2024.</p>
                  </div>
              </div>

              <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-sky-300"></div>
                  <div>
                      <div className="text-slate-500 font-medium text-base mb-1">כסף שהוצל</div>
                      <div className="text-4xl font-black text-sky-600">{formatCurrency(totalSaved)}</div>
                  </div>
                  <div className="mt-2 text-slate-500 text-sm leading-snug">
                      <p className="mb-1">מתוך חשיפה של <strong>{formatCurrency(totalExposure)}</strong></p>
                      <p>יחס מניעה של <strong>1:4</strong> (נחסכו 4 שקלים על כל שקל נזק).</p>
                  </div>
              </div>

              <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-rose-400"></div>
                  <div>
                      <div className="text-slate-500 font-medium text-base mb-1">נזק בפועל</div>
                      <div className="text-4xl font-black text-rose-500">{formatCurrency(latestData.damage)}</div>
                  </div>
                  <div className="mt-2 text-slate-500 text-sm flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-sky-500" />
                        <span>ירידה של <strong>{formatCurrency(damageReduced)}</strong></span>
                      </div>
                      <p>הנתון הנמוך ביותר ב-3 שנים.</p>
                  </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-[1.5rem] shadow-sm border border-amber-200 flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      <div className="text-amber-800 font-bold text-base">עדכון נתונים</div>
                  </div>
                  <p className="text-amber-900 text-sm leading-tight font-medium">
                      התקבלו הכחשות נוספות (2025) בסך <strong>330k ₪</strong> הממתינות לסיווג.
                  </p>
                  <div className="mt-2 text-amber-700/70 text-xs border-t border-amber-200 pt-1">
                      * הכחשות מתקבלות עד חצי שנה ממועד העסקה.
                  </div>
              </div>
          </div>

          <div className="w-3/4 flex flex-col gap-3">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex-grow relative">
                  <div className="flex gap-6 text-sm font-medium absolute top-4 left-6 bg-slate-50 px-3 py-1.5 rounded-lg z-10">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedNear}}></div>מניעה אקטיבית</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedRetro}}></div>ניכוי יתרה</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedCollection}}></div>גבייה</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.damage}}></div>נזק בפועל</div>
                  </div>

                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{top: 50, right: 10, bottom: 5, left: 0}}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 16, fontWeight: 600}} dy={10} />
                        <YAxis yAxisId="left" tickFormatter={formatMillions} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 14}} />
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(v)=>`${v}%`} axisLine={false} tickLine={false} tick={{fill: '#0ea5e9', fontSize: 14, fontWeight: 700}} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                        <Bar yAxisId="left" dataKey="savedCollection" name="גבייה" stackId="a" fill={colors.chart.savedCollection} />
                        <Bar yAxisId="left" dataKey="savedRetro" name="ניכוי יתרה" stackId="a" fill={colors.chart.savedRetro} />
                        <Bar yAxisId="left" dataKey="savedNear" name="מניעה אקטיבית" stackId="a" fill={colors.chart.savedNear} radius={[0,0,6,6]} />
                        <Bar yAxisId="left" dataKey="damage" name="נזק בפועל" stackId="a" fill={colors.chart.damage} radius={[6,6,0,0]} />
                        <Line yAxisId="right" type="monotone" dataKey="quality" name="איכות מניעה" stroke={colors.chart.line} strokeWidth={5} dot={{r:6, fill: colors.chart.line, strokeWidth: 0}} />
                    </ComposedChart>
                  </ResponsiveContainer>
              </div>

              <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl flex items-center gap-4">
                  <div className="bg-sky-500 text-white p-2 rounded-lg">
                      <Zap className="w-5 h-5" />
                  </div>
                  <div>
                      <h4 className="font-bold text-sky-900 text-lg mb-0.5">בשורה התחתונה</h4>
                      <p className="text-sky-800 text-base leading-snug">
                          השנה הצלחנו לעצור הרבה יותר כסף בזמן אמת. על כל שקל ש"ברח" לנו, עצרנו 4 שקלים לפני שיצאו.
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </div>
    );
};

// 4. Trends 2025
const TrendsSlide = () => (
  <div className="h-full flex flex-col justify-center px-16 animate-fadeIn">
     <h2 className="text-4xl font-bold text-slate-800 mb-10 border-r-8 border-rose-300 pr-6">סוגי הונאות בולטים ב-2025</h2>

     <div className="grid grid-cols-2 gap-12 h-[70%]">
        {/* Bezeq Fraud */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between h-full">
            <div>
                <div className="flex items-start justify-between mb-6">
                    <div className="bg-rose-50 p-5 rounded-2xl">
                        <Phone className="w-10 h-10 text-rose-400" />
                    </div>
                    <div className="bg-slate-50 px-5 py-2 rounded-full text-base font-bold text-slate-600 border border-slate-200">
                        הנדסה חברתית
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">הונאת "בזק" / שירות לקוחות</h3>
                <div className="text-slate-600 text-xl leading-relaxed space-y-4">
                    <p>
                        <strong>מה קורה?</strong> מתקשרים ללקוח, מזדהים כנציג שירות וטוענים שיש חוב דחוף. ככה מוציאים פרטי אשראי וקוד כניסה.
                    </p>
                    <p>
                        <strong>התוצאה:</strong> פותחים חשבון PayBox חדש על שם הלקוח ומתחילים לחייב.
                    </p>
                    <div className="mt-4 inline-block font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl text-lg">
                        בעיקר מול אוכלוסייה מבוגרת
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-8 mt-6 pt-6 border-t border-slate-100">
                <div>
                    <span className="block text-sm text-slate-400 uppercase font-bold tracking-wider">כמות מקרים</span>
                    <span className="text-3xl font-black text-slate-700">~24</span>
                </div>
                 <div className="w-px h-12 bg-slate-200"></div>
                <div>
                    <span className="block text-sm text-slate-400 uppercase font-bold tracking-wider">נזק כספי</span>
                    <span className="text-3xl font-black text-rose-500">₪64k</span>
                </div>
            </div>
        </div>

        {/* Restaurant Fraud */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between h-full">
             <div>
                <div className="flex items-start justify-between mb-6">
                    <div className="bg-rose-50 p-5 rounded-2xl">
                        <Utensils className="w-10 h-10 text-rose-400" />
                    </div>
                    <div className="bg-slate-50 px-5 py-2 rounded-full text-base font-bold text-slate-600 border border-slate-200">
                        פישינג
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">הונאת "מסעדות"</h3>
                <div className="text-slate-600 text-xl leading-relaxed space-y-4">
                    <p>
                        <strong>מה קורה?</strong> שיחה מ"המסעדה" דקה אחרי ההזמנה: "התשלום לא עבר". מבקשים פרטי אשראי וקוד.
                    </p>
                    <p>
                        <strong>התוצאה:</strong> משתלטים על החשבון הקיים של הלקוח ומבצעים עסקאות.
                    </p>
                    <div className="mt-4 inline-block font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl text-lg">
                        מנצלים את הלחץ של הלקוח
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-8 mt-6 pt-6 border-t border-slate-100">
                <div>
                    <span className="block text-sm text-slate-400 uppercase font-bold tracking-wider">כמות מקרים</span>
                    <span className="text-3xl font-black text-slate-700">~35</span>
                </div>
                 <div className="w-px h-12 bg-slate-200"></div>
                <div>
                    <span className="block text-sm text-slate-400 uppercase font-bold tracking-wider">נזק כספי</span>
                    <span className="text-3xl font-black text-rose-500">₪180k</span>
                </div>
            </div>
        </div>
     </div>
  </div>
);

// 5. Improvements
const ImprovementsSlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn">
       <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 border-r-8 border-sky-400 pr-6">מה עשינו השנה?</h2>
            <p className="text-slate-500 text-2xl">שיפורים במערכת ובמוצר</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[65%]">

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sliders className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">שיפור מנוע הסיכונים</h3>
              <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span><strong>מכשירי iPhone:</strong> הוספנו יכולת לאתר משתמשים ללא אנשי קשר ומאזור זמן שאיננו ישראל (בדומה לאנדרואיד) כמענה לצרכים מהשטח.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span><strong>ניתוח ותגובה:</strong> ניתוח מקרים ותגובה מהירה הם המפתח למניעת נזק כספי.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">התראות ללקוח</h3>
              <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span><strong>SMS ברור יותר:</strong> שינינו את הנוסח בהודעת הכניסה כדי שלקוחות יבינו שאסור למסור את הקוד.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span><strong>מכשיר חדש:</strong> שולחים התראה ללקוח אם מישהו נכנס לחשבון שלו ממכשיר לא מוכר.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">צמצום סיכונים</h3>
              <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span><strong>הגבלת סכומים:</strong> תהליך עסקי שהוריד את הספים בכרטיסים ל-1,000 ₪, שהוביל לירידה בסיכון.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span><strong>בקרת משיכות:</strong> לא ניתן למשוך כסף לחשבון בנק שטרם אושר.</span>
                  </li>
              </ul>
          </div>
       </div>
    </div>
  );

// 6. Layers
const LayersSlide = () => {
    const layers = [
        {
            title: "תשתית וסייבר (בסיס)",
            icon: <Server className="w-8 h-8" />,
            desc: "חוסמים גישה לא מורשית עוד לפני שנכנסים לאפליקציה.",
            items: ["חומת אש (Firewall)", "חסימת מדינות (Geo-Block)", "הגנה ממתקפות"],
            color: "bg-slate-700",
            widthClass: "w-full"
        },
        {
            title: "זיהוי לקוח (בכניסה)",
            icon: <Fingerprint className="w-8 h-8" />,
            desc: "בודקים שמי שנרשם הוא באמת מי שהוא טוען.",
            items: ["איסוף נב״ת 411: ת.ז, כתובת, טלפון, מגדר, אופי שימוש", "אימות ח-ן מול אדי״ב", "פרופיל ראשוני"],
            color: "bg-sky-600",
            widthClass: "w-[92%]"
        },
        {
            title: "מנועי סיכון (בזמן אמת)",
            icon: <Cpu className="w-8 h-8" />,
            desc: "בודקים כל פעולה ופעולה ברגע שהיא קורית.",
            items: ["ציון סיכון (Wallet Score)", "חוקי וספי מערכת", "אימות מסמכים"],
            color: "bg-sky-500",
            widthClass: "w-[84%]"
        },
        {
            title: "בקרה אנושית (טיפול בחריגים)",
            icon: <Search className="w-8 h-8" />,
            desc: "האנליסטים שלנו בודקים מקרים חשודים לעומק.",
            items: ["ניטור יומי", "רשימות שחורות", "תחקור הונאות", "בדיקות הלבנת הון", "ניתוח התנהגות", "אימות מסמכים"],
            color: "bg-sky-400",
            widthClass: "w-[76%]"
        }
    ];

    return (
        <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-y-auto">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">איך אנחנו מגינים?</h2>
                <p className="text-slate-500 text-xl max-w-4xl mx-auto">
                    מערכת של כמה שכבות סינון, מהגנה כללית ועד בדיקה פרטנית
                </p>
            </div>

            <div className="flex flex-col items-center gap-6 w-full">
                {layers.map((layer, idx) => (
                    <div
                        key={idx}
                        className={`${layer.widthClass} ${layer.color} text-white rounded-2xl shadow-xl flex items-center p-6 transition-all hover:scale-[1.01]`}
                    >
                        <div className="p-3 bg-white/20 rounded-xl mr-4 ml-6 backdrop-blur-md shadow-inner">
                            {layer.icon}
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-end mb-1">
                                <h3 className="text-2xl font-bold">{layer.title}</h3>
                                <span className="text-sky-100 text-base font-light italic">{layer.desc}</span>
                            </div>
                            <div className="flex gap-3 mt-3 flex-wrap">
                                {layer.items.map((item, i) => (
                                    <span key={i} className="text-base bg-black/20 px-4 py-1.5 rounded-xl border border-white/10 shadow-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 7. Embezzlement Slide (NEW)
const EmbezzlementSlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn">
       <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 border-r-8 border-indigo-500 pr-6">ניהול סיכוני מעילות</h2>
            <p className="text-slate-500 text-2xl">פעילות שנת 2025 ותכנון ל-2026</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[65%]">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileBadge className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">נוהל מהימנות עובדים</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                  בוצע עדכון לנוהל, כולל החמרת הקריטריונים לסיווג עובד ב"רמה א׳" (תפקידים רגישים).
              </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Map className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">מיפוי ובקרה</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                  מיפוי אזורי מעילות בחברה, יצירת תוכנית עבודה להפחתת סיכונים והטמעת בקרות מפצות.
              </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">הדרכה והטמעה</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                  ביצוע הדרכות ייעודיות לצוותים האופרטיביים, הנמצאים בסיכון גבוה יותר מתוקף אופי עבודתם.
              </p>
          </div>
       </div>

       {/* 2026 Plan */}
       <div className="mt-8 bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex items-center gap-6 shadow-sm">
            <div className="bg-indigo-500 rounded-full p-3 text-white shadow-lg">
                <Archive className="w-8 h-8" />
            </div>
            <div>
                <h4 className="font-bold text-indigo-900 text-xl mb-1">תוכנית עבודה 2026</h4>
                <p className="text-indigo-800 text-lg">
                    צוות הציות יישם בקרות ייעודיות לניטור וטיפול בחשבונות רדומים (Dormant Accounts).
                </p>
            </div>
        </div>
    </div>
);

// 8. Lists
const ListsSlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn">
        <h2 className="text-4xl font-bold text-slate-800 mb-10 border-r-8 border-sky-400 pr-6">מבט ל-2026 - המשך ניהול שוטף ובקרה</h2>
        <div className="grid grid-cols-3 gap-10">

            <div className="bg-slate-700 text-white p-8 rounded-[2rem] shadow-xl transform hover:scale-105 transition duration-300 flex flex-col">
                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner">
                    <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">רשימה שחורה (Black List)</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-6 flex-grow">
                    ניהול רשימה לפי מזהים ייחודיים: מזהה מכשיר וחשבונות בנק שזוהו כהונאה בעבר וחסימה לצמיתות.
                </p>
                <div className="pt-6 border-t border-slate-600 mt-auto">
                    <span className="text-sm bg-rose-500/90 px-4 py-2 rounded-full text-white font-bold shadow-lg">חסימה אוטומטית</span>
                </div>
            </div>

            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-lg transform hover:scale-105 transition duration-300 flex flex-col">
                <div className="bg-sky-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Microscope className="w-8 h-8 text-sky-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">ניטור מוגבר שוטף</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-6 flex-grow">
                    תהליך יומי המציף עסקאות חשודות על בסיס "התורה שבעל פה" (חוקים שנצברו). הצוות מנתח לעומק ומבצע עצירה מיידית.
                </p>
                <div className="pt-6 border-t border-slate-50 mt-auto">
                    <span className="text-sm bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-bold">ניטור אנושי</span>
                </div>
            </div>

            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-lg transform hover:scale-105 transition duration-300 flex flex-col">
                <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">מוקפאים / חסומים (Banned)</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-6 flex-grow">
                    ניהול חסימה לפי ת.ז וטלפון. כולל חשבונות שהוקפאו זמנית בגלל חשד, עד לבירור מול הלקוח.
                </p>
                <div className="pt-6 border-t border-slate-50 mt-auto">
                    <span className="text-sm bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold">הקפאה זמנית / חסימה</span>
                </div>
            </div>
        </div>

        <div className="mt-10 bg-sky-50 border border-sky-100 p-6 rounded-3xl flex items-center gap-6 shadow-sm">
            <div className="bg-sky-500 rounded-full p-3 text-white shadow-lg">
                <BrainCircuit className="w-8 h-8" />
            </div>
            <div>
                <h4 className="font-bold text-sky-900 text-xl mb-1">מבט קדימה</h4>
                <p className="text-sky-800 text-lg leading-relaxed">
                    שיפורים נוספים בחוקי ניטור ומניעה ב-Wallet Score, המשך במתווה הקיים. הכנסת כלים מתקדמים לבדיקות משתמשים בשילוב כלי AI ולוגיקות עסקיות.
                </p>
            </div>
        </div>
    </div>
);

// 9. Thank You
const ThankYouSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-10 animate-fadeIn bg-gradient-to-tl from-sky-50 to-white">
    <div className="w-32 h-32 bg-sky-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
        <ShieldCheck className="w-16 h-16 text-sky-500" />
    </div>
    <div>
        <h1 className="text-8xl font-extrabold text-slate-800 mb-4 tracking-tight">תודה רבה</h1>
    </div>
  </div>
);


// --- MAIN APP ---
const BoardPresentation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { component: <TitleSlide />, label: "פתיחה" },
    { component: <ContextSlide />, label: "רקע ומטרות" },
    { component: <ChartSlide />, label: "נתונים" },
    { component: <TrendsSlide />, label: "מגמות 2025" },
    { component: <ImprovementsSlide />, label: "שיפורים שבוצעו" },
    { component: <LayersSlide />, label: "שכבות הגנה" },
    { component: <EmbezzlementSlide />, label: "ניהול מעילות" }, // New Slide
    { component: <ListsSlide />, label: "מבט ל-2026" },
    { component: <ThankYouSlide />, label: "סיום" },
  ];

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-100 p-8 overflow-hidden font-sans">

      {/* Slide Container (Full Width/Height) */}
      <div className="bg-white w-[98vw] h-[92vh] rounded-[3.5rem] shadow-2xl border border-white/60 relative overflow-hidden flex flex-col">

        {/* Progress Bar */}
        <div className="w-full h-3 bg-sky-50">
          <div
            className="h-full bg-sky-500 transition-all duration-700 ease-in-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        {/* Slide Content */}
        <div className="flex-grow relative overflow-hidden">
          {slides[currentSlide].component}
        </div>

        {/* Navigation Footer */}
        <div className="h-28 bg-white border-t border-slate-50 flex items-center justify-between px-16">
          <div className="text-slate-400 text-xl font-medium flex gap-4">
            <span>
              שקף {currentSlide + 1} מתוך {slides.length} | {slides[currentSlide].label}
            </span>
          </div>

          <div className="flex gap-8">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-5 rounded-full ${currentSlide === 0 ? 'text-slate-300 bg-slate-50' : 'bg-white shadow-lg border border-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-600'} transition-all`}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`p-5 rounded-full ${currentSlide === slides.length - 1 ? 'text-slate-300 bg-slate-50' : 'bg-sky-500 shadow-xl shadow-sky-200 text-white hover:bg-sky-600 hover:shadow-sky-300'} transition-all`}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-slate-400 text-lg font-medium">
        Fraud Prevention Operations • Board Meeting Q1 2026 • {APP_VERSION}
      </div>
    </div>
  );
};

export default BoardPresentation;