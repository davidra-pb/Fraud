import React, { useState, useEffect } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Shield, TrendingUp, Activity, Server, Target, Lock, Eye, FileText,
  ChevronLeft, ChevronRight, Fingerprint, Cpu, Search, Phone, Utensils,
  Sliders, MessageSquare, CreditCard, ShieldCheck, CheckCircle, Zap,
  AlertCircle, Microscope, BrainCircuit, FileBadge, Map, GraduationCap, Archive, Scale, ShieldAlert, Printer, X
} from 'lucide-react';

// --- CONFIG ---
const APP_VERSION = "v.1.19";

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
  <div className="flex flex-col items-center justify-center h-full text-center space-y-8 bg-gradient-to-br from-sky-50 to-white print:h-full print:w-full">
    <div className="w-32 h-32 bg-sky-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-sky-200 print:shadow-none print:border print:border-slate-200">
      <Shield className="w-16 h-16 text-white" />
    </div>
    <div>
      <h1 className="text-6xl font-black text-slate-800 mb-4 tracking-tight">סקירה שנתית: מעילות והונאות</h1>
      <h2 className="text-3xl text-sky-600 font-normal">סיכום 2025 ותוכניות ל-2026</h2>
    </div>
    <div className="mt-12 px-10 py-3 bg-white rounded-full text-sky-700 text-xl font-bold shadow-xl border border-sky-100 print:shadow-none print:border-slate-300">
      דירקטוריון פברואר 2026
    </div>
  </div>
);

// 2. Context
const ContextSlide = () => (
  <div className="h-full flex flex-col justify-center px-12 overflow-hidden print:h-full print:px-8">
    <h2 className="text-4xl font-bold text-slate-800 mb-8 border-r-8 border-sky-500 pr-6">רקע ומטרות</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-grow max-h-[70vh] print:max-h-none">
      <div className="bg-sky-50/60 p-8 rounded-[2rem] border border-sky-100 relative overflow-hidden flex flex-col justify-center print:border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm print:border print:border-slate-200">
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

      <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-100 border border-slate-100 relative flex flex-col justify-center print:border-slate-200">
        <div className="flex items-center gap-4 mb-6">
           <div className="bg-sky-100 p-4 rounded-2xl shadow-sm print:border print:border-sky-200">
              <Target className="w-8 h-8 text-sky-600" />
           </div>
          <h3 className="text-2xl font-bold text-slate-800">מה נציג היום?</h3>
        </div>
        <ul className="space-y-6 text-slate-600 text-xl">
          <li className="flex items-start gap-4">
            <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0 print-no-shadow"></span>
            <span>
              <strong>מספרים:</strong> כמה מנענו וכמה זה חסך לחברה.
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0 print-no-shadow"></span>
            <span>
              <strong>איך אנחנו עובדים:</strong> סקירה של כלי ההגנה והבקרות למניעת מעילות.
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0 print-no-shadow"></span>
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
    const latestData = chartData[3];
    const prevData = chartData[2];

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
    <div className="h-full flex flex-col px-8 overflow-hidden print:h-full print:px-6">
      {/* Wrapper to scale down to 90% */}
      <div className="w-full h-full flex flex-col origin-top transform scale-90 print:scale-100" style={{ transformOrigin: 'top center' }}>
          <div className="mb-4">
              <h2 className="text-4xl font-bold text-slate-800 mb-2">נתוני מניעה ונזק - 2025</h2>
              <p className="text-xl text-slate-500">סיכום נתונים שנתי</p>
          </div>

          <div className="flex gap-8 h-full pb-4">

              <div className="w-1/4 flex flex-col gap-4">
                  <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden print:border-slate-300">
                      <div className="absolute top-0 right-0 w-1.5 h-full bg-sky-500"></div>
                      <div>
                          <div className="text-slate-500 font-medium text-base mb-1">איכות מניעה (%)</div>
                          <div className="text-5xl font-black text-slate-800">{savedPercentage}%</div>
                      </div>
                      <div className="flex flex-col gap-1 mt-2 text-slate-500 text-sm">
                          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit print:border print:border-emerald-200">
                            <TrendingUp className="w-4 h-4" />
                            <span className="font-bold text-base">+{improvement.toFixed(1)}%</span>
                          </div>
                          <p>שיפור משמעותי מול 2024.</p>
                      </div>
                  </div>

                  <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden print:border-slate-300">
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

                  <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col justify-between flex-1 relative overflow-hidden print:border-slate-300">
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

                  <div className="bg-amber-50 p-4 rounded-[1.5rem] shadow-sm border border-amber-200 flex flex-col justify-center relative overflow-hidden print:border-amber-300">
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
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex-grow relative print:border-slate-300">
                      <div className="flex gap-6 text-sm font-medium absolute top-4 left-6 bg-slate-50 px-3 py-1.5 rounded-lg z-10 print:border print:border-slate-200">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full print:border print:border-slate-400" style={{backgroundColor: colors.chart.savedNear}}></div>מניעה אקטיבית</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full print:border print:border-slate-400" style={{backgroundColor: colors.chart.savedRetro}}></div>ניכוי יתרה</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full print:border print:border-slate-400" style={{backgroundColor: colors.chart.savedCollection}}></div>גבייה</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full print:border print:border-slate-400" style={{backgroundColor: colors.chart.damage}}></div>נזק בפועל</div>
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

                  <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl flex items-center gap-4 print:border-sky-200">
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
    </div>
    );
};

// 4. Trends 2025
const TrendsSlide = () => (
  <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden print:h-full print:px-8">
     <h2 className="text-4xl font-bold text-slate-800 mb-10 border-r-8 border-rose-300 pr-6">סוגי הונאות בולטים ב-2025</h2>

     <div className="grid grid-cols-2 gap-12 flex-grow max-h-[65vh] print:max-h-none">
        {/* Bezeq Fraud */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between h-full print:border-slate-300">
            <div>
                <div className="flex items-start justify-between mb-6">
                    <div className="bg-rose-50 p-5 rounded-2xl print:border print:border-rose-100">
                        <Phone className="w-10 h-10 text-rose-400" />
                    </div>
                    <div className="bg-slate-50 px-5 py-2 rounded-full text-base font-bold text-slate-600 border border-slate-200 print:border-slate-300">
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
                    <div className="mt-4 inline-block font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl text-lg print:border print:border-rose-200">
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
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between h-full print:border-slate-300">
             <div>
                <div className="flex items-start justify-between mb-6">
                    <div className="bg-rose-50 p-5 rounded-2xl print:border print:border-rose-100">
                        <Utensils className="w-10 h-10 text-rose-400" />
                    </div>
                    <div className="bg-slate-50 px-5 py-2 rounded-full text-base font-bold text-slate-600 border border-slate-200 print:border-slate-300">
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
                    <div className="mt-4 inline-block font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl text-lg print:border print:border-rose-200">
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
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden print:h-full print:px-8">
       <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 border-r-8 border-sky-400 pr-6">מה עשינו השנה?</h2>
            <p className="text-slate-500 text-2xl">שיפורים במערכת ובמוצר</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow max-h-[65vh] print:max-h-none">

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full flex flex-col print:border-slate-300">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform print:border print:border-sky-200">
                  <Sliders className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">שיפור מנוע הסיכונים</h3>
              <ul className="space-y-4 flex-grow">
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0 print:border print:border-sky-300"></div>
                      <span><strong>מכשירי iPhone:</strong> הוספנו יכולת לאתר משתמשים ללא אנשי קשר ומאזור זמן שאיננו ישראל (בדומה לאנדרואיד) כמענה לצרכים מהשטח.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0 print:border print:border-sky-300"></div>
                      <span><strong>ניתוח ותגובה:</strong> ניתוח מקרים ותגובה מהירה הם המפתח למניעת נזק כספי.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full flex flex-col print:border-slate-300">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform print:border print:border-sky-200">
                  <MessageSquare className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">התראות ללקוח</h3>
              <ul className="space-y-4 flex-grow">
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0 print:border print:border-sky-300"></div>
                      <span><strong>SMS ברור יותר:</strong> שינינו את הנוסח בהודעת הכניסה כדי שלקוחות יבינו שאסור למסור את הקוד.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0 print:border print:border-sky-300"></div>
                      <span><strong>מכשיר חדש:</strong> שולחים התראה ללקוח אם מישהו נכנס לחשבון שלו ממכשיר לא מוכר.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full flex flex-col print:border-slate-300">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform print:border print:border-sky-200">
                  <CreditCard className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">צמצום סיכונים</h3>
              <ul className="space-y-4 flex-grow">
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0 print:border print:border-sky-300"></div>
                      <span><strong>הגבלת סכומים:</strong> תהליך עסקי שהוריד את הספים בכרטיסים ל-1,000 ₪, שהוביל לירידה בסיכון.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 text-lg leading-snug">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0 print:border print:border-sky-300"></div>
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
        <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden print:h-full print:px-8">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">איך אנחנו מגינים?</h2>
                <p className="text-slate-500 text-xl max-w-4xl mx-auto">
                    מערכת של כמה שכבות סינון, מהגנה כללית ועד בדיקה פרטנית
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 w-full flex-grow justify-center">
                {layers.map((layer, idx) => (
                    <div
                        key={idx}
                        className={`${layer.widthClass} ${layer.color} text-white rounded-2xl shadow-xl flex items-center p-5 transition-all hover:scale-[1.01] print:shadow-none print:border print:border-slate-400`}
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
                                    <span key={i} className="text-base bg-black/20 px-4 py-1.5 rounded-xl border border-white/10 shadow-sm print:border print:border-white/30">
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

// 7. Lists (View to 2026)
const ListsSlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden print:h-full print:px-8">
        <h2 className="text-4xl font-bold text-slate-800 mb-8 border-r-8 border-sky-400 pr-6">מבט ל-2026 - המשך ניהול שוטף ובקרה</h2>
        <div className="grid grid-cols-3 gap-8 flex-grow">

            <div className="bg-slate-700 text-white p-8 rounded-[2rem] shadow-xl transform hover:scale-105 transition duration-300 flex flex-col h-full justify-between print:shadow-none print:border print:border-slate-600">
                <div>
                    <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">רשימה שחורה (Black List)</h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        ניהול רשימה לפי מזהים ייחודיים: מזהה מכשיר וחשבונות בנק שזוהו כהונאה בעבר וחסימה לצמיתות.
                    </p>
                </div>
                <div className="pt-6 border-t border-slate-600">
                    <span className="text-sm bg-rose-500/90 px-4 py-2 rounded-full text-white font-bold shadow-lg print:border print:border-white">חסימה אוטומטית</span>
                </div>
            </div>

            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-lg transform hover:scale-105 transition duration-300 flex flex-col h-full justify-between print:border-slate-300 print:shadow-none">
                <div>
                    <div className="bg-sky-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        <Microscope className="w-8 h-8 text-sky-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">ניטור מוגבר שוטף</h3>
                    <p className="text-slate-500 text-lg leading-relaxed mb-6">
                        תהליך יומי המציף עסקאות חשודות על בסיס "התורה שבעל פה" (חוקים שנצברו). הצוות מנתח לעומק ומבצע עצירה מיידית.
                    </p>
                </div>
                <div className="pt-6 border-t border-slate-50">
                    <span className="text-sm bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-bold">ניטור אנושי</span>
                </div>
            </div>

            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-lg transform hover:scale-105 transition duration-300 flex flex-col h-full justify-between print:border-slate-300 print:shadow-none">
                <div>
                    <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        <FileText className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">מוקפאים / חסומים (Banned)</h3>
                    <p className="text-slate-500 text-lg leading-relaxed mb-6">
                        ניהול חסימה לפי ת.ז וטלפון. כולל חשבונות שהוקפאו זמנית בגלל חשד, עד לבירור מול הלקוח.
                    </p>
                </div>
                <div className="pt-6 border-t border-slate-50">
                    <span className="text-sm bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold">הקפאה זמנית / חסימה</span>
                </div>
            </div>
        </div>

        <div className="mt-8 bg-sky-50 border border-sky-100 p-6 rounded-3xl flex items-center gap-6 shadow-sm print:border-sky-200 print:shadow-none">
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

// 8. Embezzlement Slide (NO SCROLL FIX)
const EmbezzlementSlide = () => (
    <div className="h-full flex flex-col px-16 pt-8 pb-6 animate-fadeIn overflow-hidden print:h-full print:px-8">
        <div className="mb-6 text-center shrink-0">
            <h2 className="text-4xl font-bold text-slate-800 mb-2 border-b-4 border-indigo-500 inline-block pb-2">ניהול סיכוני מעילות</h2>
            <p className="text-slate-500 text-2xl">פעילות שנת 2025 ותכנון ל-2026</p>
        </div>

        {/* Main Content Area - Flex Column for Vertical Spacing */}
        <div className="flex-grow flex flex-col justify-between gap-6 h-full min-h-0">

            {/* Top Row: 3 Cards */}
            <div className="grid grid-cols-3 gap-8 flex-grow min-h-0">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full overflow-hidden print:border-slate-300 print:shadow-none">
                    <div className="flex items-center gap-4 mb-3 shrink-0">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors print:border print:border-indigo-200">
                            <Scale className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">מדיניות ונהלים</h3>
                    </div>
                    <ul className="text-slate-600 text-lg leading-relaxed space-y-3 flex-grow overflow-y-auto">
                        <li>• עדכון מקיף לנוהל מהימנות עובדים.</li>
                        <li>• החמרת קריטריונים לסיווג עובדי "רמה א׳" (רגישים).</li>
                        <li>• ביצוע בדיקות נאותות מוגברות וסיווג ביטחוני.</li>
                    </ul>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full overflow-hidden print:border-slate-300 print:shadow-none">
                    <div className="flex items-center gap-4 mb-3 shrink-0">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors print:border print:border-indigo-200">
                            <ShieldAlert className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">מיפוי ובקרה</h3>
                    </div>
                    <ul className="text-slate-600 text-lg leading-relaxed space-y-3 flex-grow overflow-y-auto">
                        <li>• מיפוי תהליכי ליבה ומוקדי סיכון למעילות.</li>
                        <li>• יישום עקרון הפרדת סמכויות (SoD) במערכות.</li>
                        <li>• בניית תוכנית להפחתת חשיפות והטמעת בקרות מפצות.</li>
                    </ul>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full overflow-hidden print:border-slate-300 print:shadow-none">
                    <div className="flex items-center gap-4 mb-3 shrink-0">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors print:border print:border-indigo-200">
                            <GraduationCap className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">תרבות ומודעות</h3>
                    </div>
                    <ul className="text-slate-600 text-lg leading-relaxed space-y-3 flex-grow overflow-y-auto">
                        <li>• הדרכות ייעודיות לצוותים אופרטיביים בסיכון גבוה.</li>
                        <li>• חיזוק האתיקה הארגונית ומנגנוני הדיווח.</li>
                        <li>• הטמעת תרבות של "אפס סובלנות" למעילות.</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Row: 2026 Plan */}
            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[2rem] flex items-center gap-6 shadow-sm shrink-0 print:border-indigo-200 print:shadow-none">
                <div className="bg-indigo-600 rounded-full p-3 text-white shadow-lg shrink-0">
                    <Archive className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="font-bold text-indigo-900 text-xl mb-1">תוכנית עבודה 2026: מיקוד בחשבונות רדומים</h4>
                    <p className="text-indigo-800 text-lg leading-snug">
                        צוות הציות יטמיע בקרות אוטומטיות לזיהוי "התעוררות" חשודה של חשבונות ללא פעילות (Dormant Accounts), במטרה למנוע השתלטות פנימית ושימוש לרעה במאגרי המידע.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

// 9. Thank You
const ThankYouSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-10 animate-fadeIn bg-gradient-to-tl from-sky-50 to-white print:h-full print:w-full">
        <div className="w-32 h-32 bg-sky-100 rounded-full flex items-center justify-center mb-4 shadow-sm print:shadow-none print:border print:border-slate-300"><ShieldCheck className="w-16 h-16 text-sky-500" /></div>
        <div><h1 className="text-8xl font-extrabold text-slate-800 mb-4 tracking-tight">תודה רבה</h1></div>
    </div>
);

// --- MAIN APP ---
const BoardPresentation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPrintMode, setIsPrintMode] = useState(false); // New state for Print Mode

    const slides = [
        { component: <TitleSlide />, label: "פתיחה" },
        { component: <ContextSlide />, label: "רקע ומטרות" },
        { component: <ChartSlide />, label: "נתונים" },
        { component: <TrendsSlide />, label: "מגמות 2025" },
        { component: <ImprovementsSlide />, label: "שיפורים שבוצעו" },
        { component: <LayersSlide />, label: "שכבות הגנה" },
        { component: <ListsSlide />, label: "מבט ל-2026" },
        { component: <EmbezzlementSlide />, label: "ניהול מעילות" },
        { component: <ThankYouSlide />, label: "סיום" },
    ];

    // Keyboard Navigation Effect
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isAuthenticated || isPrintMode) return;

            if (e.key === 'ArrowLeft') {
                setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
            } else if (e.key === 'ArrowRight') {
                setCurrentSlide(prev => Math.max(prev - 1, 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAuthenticated, isPrintMode, slides.length]);

    const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
    const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    if (!isAuthenticated) { return <LoginScreen onLogin={() => setIsAuthenticated(true)} />; }

    // --- PRINT MODE RENDER ---
    if (isPrintMode) {
        return (
            <div className="bg-white min-h-screen font-sans p-0 m-0" dir="rtl">
                <style>{`
                    @media print {
                        @page { size: landscape; margin: 0; }
                        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; margin: 0; padding: 0; }
                        .no-print { display: none !important; }
                        /* Universal Reset for Print - NO SHADOWS */
                        * { box-shadow: none !important; text-shadow: none !important; filter: none !important; }

                        /* Layout */
                        .print-slide { break-after: always; page-break-after: always; width: 297mm; height: 210mm; overflow: hidden; display: flex; flex-direction: column; }
                        .print-scale-90 { transform: scale(0.9); transform-origin: center; width: 100%; height: 100%; }

                        /* Borders to replace shadows */
                        .print-border { border: 1px solid #cbd5e1 !important; }
                        .print-no-shadow { box-shadow: none !important; }
                    }
                `}</style>

                <div className="fixed top-4 right-4 z-50 flex gap-4 no-print">
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all"
                    >
                        <Printer className="w-5 h-5" />
                        הדפס / שמור כ-PDF
                    </button>
                    <button
                        onClick={() => setIsPrintMode(false)}
                        className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-full shadow-md transition-all"
                    >
                        <X className="w-5 h-5" />
                        חזור למצגת
                    </button>
                </div>

                <div className="flex flex-col">
                    {slides.map((slide, index) => (
                        <div key={index} className="print-slide relative w-screen h-screen overflow-hidden bg-white border-b-2 border-slate-100 print:border-none">
                            <div className="absolute top-4 left-6 text-slate-300 text-sm font-bold z-10">
                                {index + 1} / {slides.length} • {APP_VERSION}
                            </div>
                            <div className="w-full h-full print-scale-90">
                                {slide.component}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // --- PRESENTATION MODE RENDER ---
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-100 p-8 overflow-hidden font-sans">
            <div className="bg-white w-[98vw] h-[92vh] rounded-[3.5rem] shadow-2xl border border-white/60 relative overflow-hidden flex flex-col">
                <div className="w-full h-3 bg-sky-50">
                    <div className="h-full bg-sky-500 transition-all duration-700 ease-in-out" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div>
                </div>
                <div className="flex-grow relative overflow-hidden">{slides[currentSlide].component}</div>
                <div className="h-28 bg-white border-t border-slate-50 flex items-center justify-between px-16">
                    <div className="text-slate-400 text-xl font-medium flex gap-4"><span>שקף {currentSlide + 1} מתוך {slides.length} | {slides[currentSlide].label}</span></div>
                    <div className="flex gap-6 items-center">
                        <button
                            onClick={() => setIsPrintMode(true)}
                            className="flex items-center gap-2 text-sky-600 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl transition-all font-semibold mr-4"
                            title="הכן להדפסה"
                        >
                            <Printer className="w-5 h-5" />
                            <span className="hidden md:inline">הכן להדפסה / PDF</span>
                        </button>

                        <div className="h-8 w-px bg-slate-200 mx-2"></div>

                        <button onClick={prevSlide} disabled={currentSlide === 0} className={`p-5 rounded-full ${currentSlide === 0 ? 'text-slate-300 bg-slate-50' : 'bg-white shadow-lg border border-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-600'} transition-all`}><ChevronRight className="w-8 h-8" /></button>
                        <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className={`p-5 rounded-full ${currentSlide === slides.length - 1 ? 'text-slate-300 bg-slate-50' : 'bg-sky-500 shadow-xl shadow-sky-200 text-white hover:bg-sky-600 hover:shadow-sky-300'} transition-all`}><ChevronLeft className="w-8 h-8" /></button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-6 text-slate-400 text-lg font-medium">Fraud Prevention Operations • Board Meeting Q1 2026 • {APP_VERSION}</div>
        </div>
    );
};

export default BoardPresentation;