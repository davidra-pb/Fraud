import React, { useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import {
  Shield, TrendingUp, AlertTriangle, DollarSign, Target,
  Layers, Lock, Eye, FileText, ChevronLeft, ChevronRight, Activity, Server, Users,
  Fingerprint, ShieldCheck, Cpu, Search, Phone, Utensils, Zap, Sliders, MessageSquare, CreditCard,
  ThumbsUp, PieChart, ArrowUpRight, CheckCircle
} from 'lucide-react';

// --- DATA FOR CHART ---
const chartData = [
  { year: '2022', savedNear: 741053, savedRetro: 338370, savedCollection: 265140, damage: 779212, quality: 63.3, totalSaved: 1344563, totalExposure: 2123775 },
  { year: '2023', savedNear: 289707, savedRetro: 269037, savedCollection: 222605, damage: 658667, quality: 54.3, totalSaved: 781349, totalExposure: 1440016 },
  { year: '2024', savedNear: 270150, savedRetro: 117560, savedCollection: 368444, damage: 394876, quality: 65.7, totalSaved: 756154, totalExposure: 1151030 },
  { year: '2025', savedNear: 590387, savedRetro: 85356, savedCollection: 261321, damage: 244950, quality: 79.3, totalSaved: 937064, totalExposure: 1182014 },
];

const formatCurrency = (val) => val >= 1000 ? `₪${(val/1000).toFixed(0)}k` : val;
const formatFullCurrency = (val) => new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(val);

// PayBox Brand Colors
const colors = {
    primary: "#0ea5e9", // Sky 500
    secondary: "#38bdf8", // Sky 400
    accent: "#bae6fd", // Sky 200
    bgLight: "#f0f9ff", // Sky 50
    textDark: "#0f172a", // Slate 900
    textGray: "#64748b", // Slate 500
    chart: {
        savedNear: "#0284c7", // Sky 600
        savedRetro: "#38bdf8", // Sky 400
        savedCollection: "#bae6fd", // Sky 200
        damage: "#f43f5e", // Rose 500
        line: "#0c4a6e" // Sky 900
    }
};

// --- LOGIN COMPONENT ---
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '123456') {
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

// --- SLIDES ---

// 1. Title Slide
const TitleSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-12 animate-fadeIn bg-gradient-to-br from-sky-50 to-white">
    <div className="w-40 h-40 bg-sky-500 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-sky-200 rotate-3 transition-transform hover:rotate-0">
      <Shield className="w-20 h-20 text-white" />
    </div>
    <div>
      <h1 className="text-7xl font-black text-slate-800 mb-8 tracking-tight">סקירת מערך מניעת הונאות</h1>
      <h2 className="text-4xl text-sky-600 font-medium">סיכום פעילות שנתי 2025 ומוכנות ל-2026</h2>
    </div>
    <div className="mt-20 px-12 py-5 bg-white rounded-full text-sky-700 text-2xl font-bold shadow-xl border border-sky-100">
      דירקטוריון פברואר 2026
    </div>
  </div>
);

// 2. Context & Goals
const ContextSlide = () => (
  <div className="h-full flex flex-col justify-center px-20 animate-fadeIn">
    <h2 className="text-5xl font-bold text-slate-800 mb-16 border-r-8 border-sky-500 pr-8">רקע ומטרות הדיון</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
      {/* Background Card */}
      <div className="bg-sky-50/60 p-12 rounded-[2.5rem] border border-sky-100 relative overflow-hidden group hover:bg-sky-50 transition-colors">
        <div className="flex items-center gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm">
             <Activity className="w-10 h-10 text-sky-600" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800">האתגר: סביבה דינמית</h3>
        </div>
        <div className="space-y-6 text-slate-600 text-2xl leading-relaxed">
          <p>
            מניעת הונאות בשנת 2025 הפכה ל"מרוץ חימוש" מורכב. אנו מתמודדים מול כנופיות מאורגנות המשתמשות באוטומציה, הנדסה חברתית מתקדמת וניצול פערים בין-ארגוניים.
          </p>
          <p>
            ההצלחה מחייבת שילוב של טכנולוגיה בזמן אמת, מודיעין עסקי, וגמישות תפעולית לשינוי חוקים עסקיים בתוך דקות.
          </p>
        </div>
      </div>

      {/* Goal Card */}
      <div className="bg-white p-12 rounded-[2.5rem] shadow-lg shadow-slate-100 border border-slate-100 relative overflow-hidden group">
        <div className="flex items-center gap-5 mb-8">
           <div className="bg-sky-100 p-5 rounded-2xl shadow-sm">
              <Target className="w-10 h-10 text-sky-600" />
           </div>
          <h3 className="text-3xl font-bold text-slate-800">מטרות הדיון</h3>
        </div>
        <ul className="space-y-8 text-slate-600 text-2xl">
          <li className="flex items-start gap-5">
            <span className="mt-3 w-3 h-3 bg-sky-500 rounded-full flex-shrink-0 shadow-sm"></span>
            <span>
              <strong>סקירת ביצועים:</strong> הצגת הישגי צוות האופרציה, עמידה ביעדי ה-KPI השנתיים והצגת ה-ROI (החזר השקעה) של המערך.
            </span>
          </li>
          <li className="flex items-start gap-5">
            <span className="mt-3 w-3 h-3 bg-sky-500 rounded-full flex-shrink-0 shadow-sm"></span>
            <span>
              <strong>מתודולוגיה:</strong> סקירת עומק של שכבות ההגנה הטכנולוגיות והתהליכים האנושיים המגבים אותן.
            </span>
          </li>
          <li className="flex items-start gap-5">
            <span className="mt-3 w-3 h-3 bg-sky-500 rounded-full flex-shrink-0 shadow-sm"></span>
            <span>
              <strong>אישור תוכנית עבודה:</strong> אישור המשך אסטרטגיית המניעה והפעילות במתכונת הנוכחית לשנת 2026.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// 3. Chart Slide (The Dashboard)
const ChartSlide = () => {
    const latestData = chartData[3]; // 2025
    const prevData = chartData[2];   // 2024

    // KPI Calculations
    const totalExposure = latestData.totalExposure;
    const totalSaved = latestData.totalSaved;
    const savedPercentage = latestData.quality;
    const improvement = ((latestData.quality - prevData.quality) / prevData.quality) * 100;
    const damageReduced = prevData.damage - latestData.damage;

    // Tooltip Logic
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
      {/* Header */}
      <div className="mb-10">
          <h2 className="text-5xl font-bold text-slate-800 mb-3">תמונת מצב שנתית: מניעה מול נזק</h2>
          <p className="text-2xl text-slate-500">לוח מחוונים מרכזי - ביצועי שנת 2025</p>
      </div>

      <div className="flex gap-12 h-full pb-8">

          {/* Left Side: KPIs */}
          <div className="w-1/4 flex flex-col gap-6">
              {/* KPI 1: Quality */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-sky-500"></div>
                  <div>
                      <div className="text-slate-500 font-medium text-lg mb-1">איכות מניעה (Success Rate)</div>
                      <div className="text-6xl font-black text-slate-800">{savedPercentage}%</div>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit mt-4">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-bold text-lg">+{improvement.toFixed(1)}%</span>
                      <span className="text-sm text-emerald-700">מול אשתקד</span>
                  </div>
              </div>

              {/* KPI 2: Saved Money */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-sky-300"></div>
                  <div>
                      <div className="text-slate-500 font-medium text-lg mb-1">סה״כ כסף שהוצל (Saved)</div>
                      <div className="text-5xl font-black text-sky-600">{formatCurrency(totalSaved)}</div>
                  </div>
                  <div className="mt-4 text-slate-400 text-base">
                      מתוך חשיפה כוללת של <strong>{formatCurrency(totalExposure)}</strong>
                  </div>
              </div>

              {/* KPI 3: Damage Reduction */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-rose-400"></div>
                  <div>
                      <div className="text-slate-500 font-medium text-lg mb-1">נזק בפועל (Actual Loss)</div>
                      <div className="text-5xl font-black text-rose-500">{formatCurrency(latestData.damage)}</div>
                  </div>
                  <div className="mt-4 text-slate-500 text-base flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-sky-500" />
                      <span>ירידה של <strong>{formatCurrency(damageReduced)}</strong> בנזק</span>
                  </div>
              </div>
          </div>

          {/* Right Side: Chart & Insight */}
          <div className="w-3/4 flex flex-col gap-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex-grow relative">
                  {/* Legend */}
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
                        <YAxis yAxisId="left" tickFormatter={formatCurrency} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 16}} />
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

              {/* Insight Box */}
              <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl flex items-start gap-4">
                  <div className="bg-sky-500 text-white p-2 rounded-lg mt-1">
                      <Zap className="w-6 h-6" />
                  </div>
                  <div>
                      <h4 className="font-bold text-sky-900 text-xl mb-1">שורה תחתונה</h4>
                      <p className="text-sky-800 text-lg leading-snug">
                          שנת 2025 מסמנת נקודת מפנה: בעוד היקף ניסיונות ההונאה (חשיפה) נותר גבוה, יכולת המערכת "ללכוד" את הכסף בזמן אמת השתפרה דרמטית.
                          על כל 1 ₪ שנזקף כנזק, המערכת הצליחה להציל כ-4 ₪, לעומת יחס של 1:1 בשנים קודמות.
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
     <h2 className="text-5xl font-bold text-slate-800 mb-16 border-r-8 border-rose-300 pr-8">מגמות וטרנדים מרכזיים 2025</h2>

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
            <h3 className="text-3xl font-bold text-slate-800 mb-6">הונאת "בזק" / נותני שירות</h3>
            <div className="text-slate-600 text-2xl mb-8 leading-relaxed flex-grow space-y-4">
                <p>
                    <strong>שיטה:</strong> הלקוח מקבל שיחה ממתחזה לנציג שירות (בזק/חשמל) המתריע על חוב מיידי. התוקף מנצל את הלחץ כדי לחלץ פרטי אשראי וקוד אימות (OTP) של PayBox.
                </p>
                <p>
                    <strong>פעולה:</strong> התוקף פותח חשבון PayBox *חדש* על שם הקורבן ומבצע עסקאות מיידיות.
                </p>
                <div className="mt-4 inline-block font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl text-xl">
                    קהל יעד עיקרי: אוכלוסייה מבוגרת
                </div>
            </div>
            <div className="flex items-center gap-10 mt-8 pt-8 border-t border-slate-100">
                <div>
                    <span className="block text-base text-slate-400 uppercase font-bold tracking-wider">היקף מקרים</span>
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
                    פישינג בזמן אמת
                </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-6">הונאת "מסעדות"</h3>
            <div className="text-slate-600 text-2xl mb-8 leading-relaxed flex-grow space-y-4">
                <p>
                    <strong>שיטה:</strong> שיחה ממתחזה ל"מסעדה" דקות לאחר ביצוע הזמנה, בטענה לכשל בתשלום. הלקוח נדרש למסור אשראי וקוד לאימות מחדש.
                </p>
                <p>
                    <strong>פעולה:</strong> בשונה מהונאת בזק, כאן מתבצעת <strong>השתלטות (Account Takeover)</strong> על חשבון קיים.
                </p>
                <div className="mt-4 inline-block font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl text-xl">
                    גורם הצלחה: תזמון מדויק ואמינות
                </div>
            </div>
            <div className="flex items-center gap-10 mt-8 pt-8 border-t border-slate-100">
                <div>
                    <span className="block text-base text-slate-400 uppercase font-bold tracking-wider">היקף מקרים</span>
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
            <h2 className="text-5xl font-bold text-slate-800 mb-6 border-r-8 border-sky-400 pr-8">צעדי מנע ושיפורים טכנולוגיים</h2>
            <p className="text-slate-500 text-3xl">מענה בזמן אמת לאיומים המתפתחים (Q4 2025)</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Sliders className="w-10 h-10 text-sky-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">הידוק בקרות Wallet Score</h3>
              <ul className="space-y-6">
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
                      <span><strong>תיקון פרצת iOS:</strong> אופטימיזציה לזיהוי אנומליות ספציפיות במכשירי אייפון (היעדר אנשי קשר, בדיקות TimeZone).</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
                      <span><strong>קורלציות זמן:</strong> הגברת רגישות המודל לזיהוי יחס חשוד בין מועד הרישום לבין היקף העברות מיידי.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-10 h-10 text-sky-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">הגברת מודעות והתראות</h3>
              <ul className="space-y-6">
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
                      <span><strong>SMS בעת Login:</strong> שינוי הנוסח להודעה הכוללת אזהרה מפורשת וברורה מפני מסירת הקוד (Anti-Phishing).</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
                      <span><strong>זיהוי מכשיר חדש:</strong> שליחת התראת אבטחה יזומה (Push/SMS) ללקוח בעת כניסה ממכשיר לא מזוהה.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full">
              <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-10 h-10 text-sky-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">צמצום משטח התקיפה</h3>
              <ul className="space-y-6">
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
                      <span><strong>מודל "מסלולים":</strong> הפחתת תקרת אשראי זר ל-1,000 ₪, מה שמקטין משמעותית את האטרקטיביות להונאה.</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-600 text-xl leading-snug">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-2.5 shrink-0"></div>
                      <span><strong>בקרת משיכות (אדי״ב):</strong> חסימה הרמטית של משיכות כספים לחשבונות בנק שטרם אומתו במערכת.</span>
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
            title: "אבטחת תשתית וסייבר (השכבה החיצונית)",
            icon: <Server className="w-10 h-10" />,
            desc: "מניעת גישה לא מורשית עוד לפני הכניסה לאפליקציה.",
            items: ["חומת אש (Firewall)", "חסימות גיאוגרפיות (Geo-Block)", "WAF להגנה ממתקפות Web"],
            color: "bg-slate-700",
            widthClass: "w-full"
        },
        {
            title: "זיהוי ואימות לקוח (KYC & Onboarding)",
            icon: <Fingerprint className="w-10 h-10" />,
            desc: "וידוא זהות המשתמש בשלב הרישום למניעת זהויות גנובות.",
            items: ["איסוף מידע רגולטורי (411)", "אימות מסמכים ביומטרי", "פרופיל סיכון ראשוני"],
            color: "bg-sky-600",
            widthClass: "w-[92%]"
        },
        {
            title: "מנועי סיכון בזמן אמת (Decision Engines)",
            icon: <Cpu className="w-10 h-10" />,
            desc: "ניתוח כל טרנזקציה בזמן אמת וקבלת החלטה אוטומטית.",
            items: ["Risk Score דינמי לכל פעולה", "Wallet Score פיננסי", "ניטור הלבנת הון (AML)"],
            color: "bg-sky-500",
            widthClass: "w-[84%]"
        },
        {
            title: "בקרה וניטור תפעולי (Manual Review)",
            icon: <Search className="w-10 h-10" />,
            desc: "הגורם האנושי: חקירת אירועים חריגים וטיפול במקרי קצה.",
            items: ["ניטור אנליסטים יומי", "ניהול רשימות שחורות", "תחקור פורנזי של הונאות"],
            color: "bg-sky-400",
            widthClass: "w-[76%]"
        }
    ];

    return (
        <div className="h-full flex flex-col justify-center px-20 animate-fadeIn overflow-y-auto">
            <div className="mb-12 text-center">
                <h2 className="text-5xl font-bold text-slate-800 mb-6">ארכיטקטורת ההגנה: רב-שכבתית</h2>
                <p className="text-slate-500 text-2xl max-w-5xl mx-auto">
                    מודל "המשפך": סינון הדרגתי של איומים, החל מהגנה רחבה על התשתית ועד בדיקה כירורגית של עסקאות בודדות
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
        <h2 className="text-5xl font-bold text-slate-800 mb-16 border-r-8 border-sky-400 pr-8">בקרה, ניטור וכלי עבודה</h2>
        <div className="grid grid-cols-3 gap-12">

            {/* Black List */}
            <div className="bg-slate-700 text-white p-12 rounded-[2.5rem] shadow-xl transform hover:scale-105 transition duration-300 flex flex-col">
                <div className="bg-white/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md shadow-inner">
                    <Lock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Black List</h3>
                <p className="text-slate-300 text-xl leading-relaxed mb-8 flex-grow">
                    מאגר נתונים של מזהי משתמשים (ת"ז, Device ID, IP) שנחסמו לצמיתות עקב הונאה ודאית בעבר.
                </p>
                <div className="pt-8 border-t border-slate-600 mt-auto">
                    <span className="text-base bg-rose-500/90 px-6 py-3 rounded-full text-white font-bold shadow-lg">חסימה מיידית ואוטומטית</span>
                </div>
            </div>

            {/* Watch List */}
            <div className="bg-white border border-slate-100 p-12 rounded-[2.5rem] shadow-lg transform hover:scale-105 transition duration-300 flex flex-col">
                <div className="bg-sky-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8">
                    <Eye className="w-10 h-10 text-sky-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-slate-800">Watch List</h3>
                <p className="text-slate-500 text-xl leading-relaxed mb-8 flex-grow">
                    רשימת מעקב אחר משתמשים בעלי פרופיל סיכון גבוה (למשל: דפוס פעילות חריג) המחייבים אישור ידני לכל פעולה.
                </p>
                <div className="pt-8 border-t border-slate-50 mt-auto">
                    <span className="text-base bg-sky-100 text-sky-700 px-6 py-3 rounded-full font-bold">ניטור מוגבר ע"י אנליסט</span>
                </div>
            </div>

            {/* Banned Users */}
            <div className="bg-white border border-slate-100 p-12 rounded-[2.5rem] shadow-lg transform hover:scale-105 transition duration-300 flex flex-col">
                <div className="bg-orange-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8">
                    <FileText className="w-10 h-10 text-orange-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-slate-800">Banned Users</h3>
                <p className="text-slate-500 text-xl leading-relaxed mb-8 flex-grow">
                    משתמשים שפעילותם הוקפאה (זמנית או קבוע) עקב חשד קונקרטי למעורבות בפעילות לא תקינה, עד לבירור.
                </p>
                <div className="pt-8 border-t border-slate-50 mt-auto">
                    <span className="text-base bg-orange-100 text-orange-700 px-6 py-3 rounded-full font-bold">הקפאת פעילות מלאה</span>
                </div>
            </div>
        </div>

        {/* Daily Ops Bar */}
        <div className="mt-16 bg-sky-50 border border-sky-100 p-8 rounded-3xl flex items-center gap-8 shadow-sm">
            <div className="bg-sky-500 rounded-full p-4 text-white shadow-lg">
                <Activity className="w-8 h-8" />
            </div>
            <div>
                <h4 className="font-bold text-sky-900 text-2xl mb-2">שגרת ניטור יומית</h4>
                <p className="text-sky-800 text-xl">
                    צוות האופרציה מבצע ניתוח יומי של פעילויות חשודות (Daily Review) על בסיס חוקים אוטומטיים וניסיון מצטבר. מנגנוני עצירה מופעלים מיידית בעת זיהוי אנומליה.
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
    { component: <ChartSlide />, label: "תמונת מצב שנתית" },
    { component: <TrendsSlide />, label: "מגמות 2025" },
    { component: <ImprovementsSlide />, label: "צעדי מנע ושיפורים" },
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
          <div className="text-slate-400 text-xl font-medium">
            שקף {currentSlide + 1} מתוך {slides.length} | {slides[currentSlide].label}
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
        Fraud Prevention Operations • Board Meeting Q1 2026
      </div>
    </div>
  );
};

export default BoardPresentation;