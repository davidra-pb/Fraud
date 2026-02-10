import React, { useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Shield, TrendingUp, Activity, Server, Target, Lock, Eye, FileText,
  ChevronLeft, ChevronRight, Fingerprint, Cpu, Search, Phone, Utensils,
  Sliders, MessageSquare, CreditCard, ShieldCheck, CheckCircle, Zap
} from 'lucide-react';

// --- CONFIG ---
const APP_VERSION = "v.1.03";

// --- DATA ---
const chartData = [
  { year: '2022', savedNear: 741053, savedRetro: 338370, savedCollection: 265140, damage: 779212, quality: 63.3, totalSaved: 1344563, totalExposure: 2123775 },
  { year: '2023', savedNear: 289707, savedRetro: 269037, savedCollection: 222605, damage: 658667, quality: 54.3, totalSaved: 781349, totalExposure: 1440016 },
  { year: '2024', savedNear: 270150, savedRetro: 117560, savedCollection: 368444, damage: 394876, quality: 65.7, totalSaved: 756154, totalExposure: 1151030 },
  { year: '2025', savedNear: 590387, savedRetro: 85356, savedCollection: 261321, damage: 244950, quality: 79.3, totalSaved: 937064, totalExposure: 1182014 },
];

const formatCurrency = (val) => val >= 1000 ? `₪${(val/1000).toFixed(0)}k` : val;
// New formatter for Millions on Axis
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
      <div className="bg-white p-12 rounded-[2rem] shadow-2xl w-full max-w-lg text-center border border-slate-200">
        <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <Lock className="w-10 h-10 text-sky-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-3">המצגת מוגנת</h2>
        <p className="text-slate-500 mb-10 text-lg">אנא הזן סיסמת צפייה כדי להמשיך</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="סיסמה..."
              className={`w-full px-6 py-4 text-lg border rounded-xl text-right focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all text-slate-700 placeholder-slate-400 ${error ? 'border-red-300 ring-red-50' : 'border-slate-300'}`}
            />
          </div>

          {error && <p className="text-red-500 text-base text-right font-medium">סיסמה שגויה, נסה שוב</p>}

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 text-xl rounded-xl transition-all shadow-lg hover:shadow-sky-200 mt-4"
          >
            כניסה למצגת
          </button>
        </form>
      </div>
    </div>
  );
};

// 1. Title Slide
const TitleSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-12 animate-fadeIn bg-gradient-to-br from-sky-50 to-white">
    <div className="w-40 h-40 bg-sky-500 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-sky-200">
      <Shield className="w-20 h-20 text-white" />
    </div>
    <div>
      <h1 className="text-7xl font-bold text-slate-800 mb-8 tracking-tight">סקירת מניעת הונאות</h1>
      <h2 className="text-4xl text-sky-600 font-normal">סיכום 2025 ותוכניות ל-2026</h2>
    </div>
    <div className="mt-20 px-12 py-5 bg-white rounded-full text-sky-700 text-2xl font-bold shadow-xl border border-sky-100">
      דירקטוריון פברואר 2026
    </div>
  </div>
);

// 2. Context
const ContextSlide = () => (
  <div className="h-full flex flex-col justify-center px-20 animate-fadeIn">
    <h2 className="text-5xl font-bold text-slate-800 mb-16 border-r-8 border-sky-500 pr-8">רקע ומטרות</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
      <div className="bg-sky-50/60 p-12 rounded-[2.5rem] border border-sky-100 relative overflow-hidden">
        <div className="flex items-center gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm">
             <Activity className="w-10 h-10 text-sky-600" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800">האתגרים שלנו</h3>
        </div>
        <div className="space-y-6 text-slate-600 text-2xl leading-relaxed">
          <p>
            עולם ההונאות משתנה כל הזמן. אנחנו פוגשים שיטות חדשות ומתוחכמות יותר.
          </p>
          <p>
            כדי להתמודד עם זה, אנחנו צריכים להיות גמישים ולעדכן את המערכות שלנו מהר.
          </p>
        </div>
      </div>

      <div className="bg-white p-12 rounded-[2.5rem] shadow-lg shadow-slate-100 border border-slate-100 relative">
        <div className="flex items-center gap-5 mb-8">
           <div className="bg-sky-100 p-5 rounded-2xl shadow-sm">
              <Target className="w-10 h-10 text-sky-600" />
           </div>
          <h3 className="text-3xl font-bold text-slate-800">מה נציג היום?</h3>
        </div>
        <ul className="space-y-8 text-slate-600 text-2xl">
          <li className="flex items-start gap-5">
            <span className="mt-3 w-3 h-3 bg-sky-500 rounded-full flex-shrink-0"></span>
            <span>
              <strong>מספרים:</strong> כמה מנענו וכמה זה חסך לחברה.
            </span>
          </li>
          <li className="flex items-start gap-5">
            <span className="mt-3 w-3 h-3 bg-sky-500 rounded-full flex-shrink-0"></span>
            <span>
              <strong>איך אנחנו עובדים:</strong> סקירה של כלי ההגנה.
            </span>
          </li>
          <li className="flex items-start gap-5">
            <span className="mt-3 w-3 h-3 bg-sky-500 rounded-full flex-shrink-0"></span>
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
          <div className="bg-white p-6 border border-slate-100 shadow-2xl rounded-2xl font-sans text-right min-w-[280px]" dir="rtl">
            <p className="font-bold text-slate-800 text-2xl mb-4 border-b pb-3">{label}</p>
            <div className="space-y-3 text-lg">
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedNear}}></span>מניעה אקטיבית:</span><span className="font-medium text-slate-700">{formatCurrency(getVal('savedNear'))}</span></div>
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedRetro}}></span>ניכוי יתרה:</span><span className="font-medium text-slate-700">{formatCurrency(getVal('savedRetro'))}</span></div>
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedCollection}}></span>גבייה:</span><span className="font-medium text-slate-700">{formatCurrency(getVal('savedCollection'))}</span></div>
               <div className="my-3 pt-3 border-t border-dashed border-slate-200 flex justify-between items-center bg-sky-50 -mx-6 px-6 py-2">
                  <span className="font-bold text-sky-700">סה״כ נחסך:</span>
                  <span className="font-bold text-sky-700">{formatCurrency(getVal('savedCollection') + getVal('savedRetro') + getVal('savedNear'))}</span>
               </div>
               <div className="flex justify-between items-center pt-2"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.damage}}></span>נזק בפועל:</span><span className="font-bold text-rose-500">{formatCurrency(getVal('damage'))}</span></div>
               <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-800">איכות מניעה:</span>
                  <span className="font-black text-sky-600 text-2xl">{getVal('quality')}%</span>
               </div>
            </div>
          </div>
        );
      }
      return null;
    };

    return (
    <div className="h-full flex flex-col px-12 animate-fadeIn">
      <div className="mb-10">
          <h2 className="text-5xl font-bold text-slate-800 mb-3">נתוני מניעה ונזק - 2025</h2>
          <p className="text-2xl text-slate-500">סיכום נתונים שנתי</p>
      </div>

      <div className="flex gap-12 h-full pb-8">

          <div className="w-1/4 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-sky-500"></div>
                  <div>
                      <div className="text-slate-500 font-medium text-lg mb-1">איכות מניעה (%)</div>
                      <div className="text-6xl font-black text-slate-800">{savedPercentage}%</div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4 text-slate-500 text-sm">
                      <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold text-lg">+{improvement.toFixed(1)}%</span>
                      </div>
                      <p>שיפור משמעותי מול 2024. היעד לשנת 2026 עומד על 82%.</p>
                  </div>
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-sky-300"></div>
                  <div>
                      <div className="text-slate-500 font-medium text-lg mb-1">כסף שהוצל</div>
                      <div className="text-5xl font-black text-sky-600">{formatCurrency(totalSaved)}</div>
                  </div>
                  <div className="mt-4 text-slate-500 text-sm leading-snug">
                      <p className="mb-1">מתוך חשיפה של <strong>{formatCurrency(totalExposure)}</strong></p>
                      <p>יחס מניעה של <strong>1:4</strong> (על כל שקל נזק, נחסכו כ-4 שקלים).</p>
                  </div>
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-rose-400"></div>
                  <div>
                      <div className="text-slate-500 font-medium text-lg mb-1">נזק בפועל</div>
                      <div className="text-5xl font-black text-rose-500">{formatCurrency(latestData.damage)}</div>
                  </div>
                  <div className="mt-4 text-slate-500 text-sm flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-sky-500" />
                        <span>ירידה של <strong>{formatCurrency(damageReduced)}</strong></span>
                      </div>
                      <p>הנתון הנמוך ביותר ב-3 השנים האחרונות.</p>
                  </div>
              </div>
          </div>

          <div className="w-3/4 flex flex-col gap-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex-grow relative">
                  <div className="flex gap-8 text-base font-medium absolute top-6 left-8 bg-slate-50 px-4 py-2 rounded-xl">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full" style={{backgroundColor: colors.chart.savedNear}}></div>מניעה אקטיבית</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full" style={{backgroundColor: colors.chart.savedRetro}}></div>ניכוי יתרה</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full" style={{backgroundColor: colors.chart.savedCollection}}></div>גבייה</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full" style={{backgroundColor: colors.chart.damage}}></div>נזק בפועל</div>
                  </div>

                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{top: 60, right: 10, bottom: 10, left: 10}}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 20, fontWeight: 600}} dy={15} />
                        <YAxis yAxisId="left" tickFormatter={formatMillions} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 16}} />
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(v)=>`${v}%`} axisLine={false} tickLine={false} tick={{fill: '#0ea5e9', fontSize: 16, fontWeight: 700}} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                        <Bar yAxisId="left" dataKey="savedCollection" name="גבייה" stackId="a" fill={colors.chart.savedCollection} />
                        <Bar yAxisId="left" dataKey="savedRetro" name="ניכוי יתרה" stackId="a" fill={colors.chart.savedRetro} />
                        <Bar yAxisId="left" dataKey="savedNear" name="מניעה אקטיבית" stackId="a" fill={colors.chart.savedNear} radius={[0,0,6,6]} />
                        <Bar yAxisId="left" dataKey="damage" name="נזק בפועל" stackId="a" fill={colors.chart.damage} radius={[6,6,0,0]} />
                        <Line yAxisId="right" type="monotone" dataKey="quality" name="איכות מניעה" stroke={colors.chart.line} strokeWidth={6} dot={{r:8, fill: colors.chart.line, strokeWidth: 0}} />
                    </ComposedChart>
                  </ResponsiveContainer>
              </div>

              <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl flex items-start gap-4">
                  <div className="bg-sky-500 text-white p-2 rounded-lg mt-1">
                      <Zap className="w-6 h-6" />
                  </div>
                  <div>
                      <h4 className="font-bold text-sky-900 text-xl mb-1">בשורה התחתונה</h4>
                      <p className="text-sky-800 text-lg leading-snug">
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
  <div className="h-full flex flex-col justify-center px-20 animate-fadeIn">
     <h2 className="text-5xl font-bold text-slate-800 mb-16 border-r-8 border-rose-300 pr-8">סוגי הונאות בולטים ב-2025</h2>

     <div className="grid grid-cols-2 gap-16">
        {/* Bezeq Fraud */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden flex flex-col h-full">
            <div className="flex items-start justify-between mb-8">
                <div className="bg-rose-50 p-6 rounded-3xl">
                    <Phone className="w-12 h-12 text-rose-400" />
                </div>
                <div className="bg-slate-50 px-6 py-2 rounded-full text-lg font-bold text-slate-600 border border-slate-200">
                    הנדסה חברתית
                </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-6">הונאת "בזק" / שירות לקוחות</h3>
            <div className="text-slate-600 text-2xl mb-8 leading-relaxed flex-grow space-y-4">
                <p>
                    <strong>מה קורה?</strong> מתקשרים ללקוח, מזדהים כנציג שירות וטוענים שיש חוב דחוף. ככה מוציאים פרטי אשראי וקוד כניסה.
                </p>
                <p>
                    <strong>התוצאה:</strong> פותחים חשבון PayBox חדש על שם הלקוח ומתחילים לחייב.
                </p>
                <div className="mt-4 inline-block font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl text-xl">
                    בעיקר מול אוכלוסייה מבוגרת
                </div>
            </div>
            <div className="flex items-center gap-10 mt-8 pt-8 border-t border-slate-100">
                <div>
                    <span className="block text-base text-slate-400 uppercase font-bold tracking-wider">כמות מקרים</span>
                    <span className="text-4xl font-black text-slate-700">~24</span>
                </div>
                 <div className="w-px h-16 bg-slate-200"></div>
                <div>
                    <span className="block text-base text-slate-400 uppercase font-bold tracking-wider">נזק כספי</span>
                    <span className="text-4xl font-black text-rose-500">₪64k</span>
                </div>
            </div>
        </div>

        {/* Restaurant Fraud */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden flex flex-col h-full">
             <div className="flex items-start justify-between mb-8">
                <div className="bg-rose-50 p-6 rounded-3xl">
                    <Utensils className="w-12 h-12 text-rose-400" />
                </div>
                <div className="bg-slate-50 px-6 py-2 rounded-full text-lg font-bold text-slate-600 border border-slate-200">
                    פישינג
                </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-6">הונאת "מסעדות"</h3>
            <div className="text-slate-600 text-2xl mb-8 leading-relaxed flex-grow space-y-4">
                <p>
                    <strong>מה קורה?</strong> שיחה מ"המסעדה" דקה אחרי ההזמנה: "התשלום לא עבר". מבקשים פרטי אשראי וקוד.
                </p>
                <p>
                    <strong>התוצאה:</strong> משתלטים על החשבון הקיים של הלקוח ומבצעים עסקאות.
                </p>
                <div className="mt-4 inline-block font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl text-xl">
                    מנצלים את הלחץ של הלקוח
                </div>
            </div>
            <div className="flex items-center gap-10 mt-8 pt-8 border-t border-slate-100">
                <div>
                    <span className="block text-base text-slate-400 uppercase font-bold tracking-wider">כמות מקרים</span>
                    <span className="text-4xl font-black text-slate-700">~35</span>
                </div>
                 <div className="w-px h-16 bg-slate-200"></div>
                <div>
                    <span className="block text-base text-slate-400 uppercase font-bold tracking-wider">נזק כספי</span>
                    <span className="text-4xl font-black text-rose-500">₪180k</span>
                </div>
            </div>
        </div>
     </div>
  </div>
);

// 5. Improvements
const ImprovementsSlide = () => (
    <div className="h-full flex flex-col justify-center px-20 animate-fadeIn">
       <div className="mb-16">
            <h2 className="text-5xl font-bold text-slate-800 mb-6 border-r-8 border-sky-400 pr-8">מה עשינו השנה?</h2>
            <p className="text-slate-500 text-3xl">שיפורים במערכת ובמוצר</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Sliders className="w-10 h-10 text-sky-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">שיפור מנוע הסיכונים</h3>
              <ul className="space-y-6">
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
                      <span><strong>אייפון:</strong> סידרנו זיהוי של דפוסים חשודים ספציפית במכשירי אפל.</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
                      <span><strong>זיהוי מהיר:</strong> המערכת עולה מהר יותר על חשבונות שנפתחו רק כדי להעביר כסף.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-10 h-10 text-sky-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">התראות ללקוח</h3>
              <ul className="space-y-6">
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
                      <span><strong>SMS ברור יותר:</strong> שינינו את הנוסח בהודעת הכניסה כדי שלקוחות יבינו שאסור למסור את הקוד.</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
                      <span><strong>מכשיר חדש:</strong> שולחים התראה ללקוח אם מישהו נכנס לחשבון שלו ממכשיר לא מוכר.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-10 h-10 text-sky-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">צמצום סיכונים</h3>
              <ul className="space-y-6">
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
                      <span><strong>הגבלת סכומים:</strong> תהליך עסקי להורדת תקרות בכרטיסים זרים ל-1,000 ₪, שהוביל לירידה עקיפה בסיכון.</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
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
            icon: <Server className="w-10 h-10" />,
            desc: "חוסמים גישה לא מורשית עוד לפני שנכנסים לאפליקציה.",
            items: ["חומת אש (Firewall)", "חסימת מדינות (Geo-Block)", "הגנה ממתקפות"],
            color: "bg-slate-700",
            widthClass: "w-full"
        },
        {
            title: "זיהוי לקוח (בכניסה)",
            icon: <Fingerprint className="w-10 h-10" />,
            desc: "בודקים שמי שנרשם הוא באמת מי שהוא טוען.",
            items: ["איסוף נב״ת 411: ת.ז, כתובת, טלפון, מגדר, אופי שימוש", "אימות מסמכים", "פרופיל ראשוני"],
            color: "bg-sky-600",
            widthClass: "w-[92%]"
        },
        {
            title: "מנועי סיכון (בזמן אמת)",
            icon: <Cpu className="w-10 h-10" />,
            desc: "בודקים כל פעולה ופעולה ברגע שהיא קורית.",
            items: ["ציון סיכון (Risk Score)", "בדיקות הלבנת הון", "ניתוח התנהגות"],
            color: "bg-sky-500",
            widthClass: "w-[84%]"
        },
        {
            title: "בקרה אנושית (טיפול בחריגים)",
            icon: <Search className="w-10 h-10" />,
            desc: "האנליסטים שלנו בודקים מקרים חשודים לעומק.",
            items: ["ניטור יומי", "רשימות שחורות", "תחקור הונאות"],
            color: "bg-sky-400",
            widthClass: "w-[76%]"
        }
    ];

    return (
        <div className="h-full flex flex-col justify-center px-20 animate-fadeIn overflow-y-auto">
            <div className="mb-12 text-center">
                <h2 className="text-5xl font-bold text-slate-800 mb-6">איך אנחנו מגינים?</h2>
                <p className="text-slate-500 text-2xl max-w-5xl mx-auto">
                    מערכת של כמה שכבות סינון, מהגנה כללית ועד בדיקה פרטנית
                </p>
            </div>

            <div className="flex flex-col items-center gap-8 w-full">
                {layers.map((layer, idx) => (
                    <div
                        key={idx}
                        className={`${layer.widthClass} ${layer.color} text-white rounded-3xl shadow-xl flex items-center p-8 transition-all hover:scale-[1.01]`}
                    >
                        <div className="p-4 bg-white/20 rounded-2xl mr-4 ml-8 backdrop-blur-md shadow-inner">
                            {layer.icon}
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-3xl font-bold">{layer.title}</h3>
                                <span className="text-sky-100 text-lg font-light italic">{layer.desc}</span>
                            </div>
                            <div className="flex gap-4 mt-4 flex-wrap">
                                {layer.items.map((item, i) => (
                                    <span key={i} className="text-lg bg-black/20 px-5 py-2 rounded-xl border border-white/10 shadow-sm">
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

// 7. Lists
const ListsSlide = () => (
    <div className="h-full flex flex-col justify-center px-20 animate-fadeIn">
        <h2 className="text-5xl font-bold text-slate-800 mb-16 border-r-8 border-sky-400 pr-8">ניהול שוטף ובקרה</h2>
        <div className="grid grid-cols-3 gap-12">

            <div className="bg-slate-700 text-white p-12 rounded-[2.5rem] shadow-xl transform hover:scale-105 transition duration-300 flex flex-col">
                <div className="bg-white/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md shadow-inner">
                    <Lock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">רשימה שחורה (Black List)</h3>
                <p className="text-slate-300 text-xl leading-relaxed mb-8 flex-grow">
                    משתמשים שזוהו כהונאה בעבר ונחסמו לצמיתות.
                </p>
                <div className="pt-8 border-t border-slate-600 mt-auto">
                    <span className="text-base bg-rose-500/90 px-6 py-3 rounded-full text-white font-bold shadow-lg">חסימה אוטומטית</span>
                </div>
            </div>

            <div className="bg-white border border-slate-100 p-12 rounded-[2.5rem] shadow-lg transform hover:scale-105 transition duration-300 flex flex-col">
                <div className="bg-sky-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8">
                    <Eye className="w-10 h-10 text-sky-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-slate-800">רשימת מעקב (Watch List)</h3>
                <p className="text-slate-500 text-xl leading-relaxed mb-8 flex-grow">
                    משתמשים עם פעילות חריגה שדורשים בדיקה ידנית לפני אישור.
                </p>
                <div className="pt-8 border-t border-slate-50 mt-auto">
                    <span className="text-base bg-sky-100 text-sky-700 px-6 py-3 rounded-full font-bold">ניטור מוגבר</span>
                </div>
            </div>

            <div className="bg-white border border-slate-100 p-12 rounded-[2.5rem] shadow-lg transform hover:scale-105 transition duration-300 flex flex-col">
                <div className="bg-orange-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8">
                    <FileText className="w-10 h-10 text-orange-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-slate-800">מוקפאים (Banned)</h3>
                <p className="text-slate-500 text-xl leading-relaxed mb-8 flex-grow">
                    חשבונות שהוקפאו זמנית בגלל חשד, עד לבירור מול הלקוח.
                </p>
                <div className="pt-8 border-t border-slate-50 mt-auto">
                    <span className="text-base bg-orange-100 text-orange-700 px-6 py-3 rounded-full font-bold">הקפאה זמנית</span>
                </div>
            </div>
        </div>

        <div className="mt-16 bg-sky-50 border border-sky-100 p-8 rounded-3xl flex items-center gap-8 shadow-sm">
            <div className="bg-sky-500 rounded-full p-4 text-white shadow-lg">
                <Activity className="w-8 h-8" />
            </div>
            <div>
                <h4 className="font-bold text-sky-900 text-2xl mb-2">מה עושים ביומיום?</h4>
                <p className="text-sky-800 text-xl">
                    כל יום הצוות עובר על פעילויות חריגה. אם יש משהו חשוד, עוצרים מיד את הפעילות.
                </p>
            </div>
        </div>
    </div>
);

// 8. Thank You
const ThankYouSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-12 animate-fadeIn bg-gradient-to-tl from-sky-50 to-white">
    <div className="w-40 h-40 bg-sky-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <ShieldCheck className="w-20 h-20 text-sky-500" />
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
    { component: <ListsSlide />, label: "ניטור ובקרה" },
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