import React, { useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import {
  Shield, TrendingUp, AlertTriangle, DollarSign, Target,
  Layers, Lock, Eye, FileText, ChevronLeft, ChevronRight, Activity, Server, Users,
  Fingerprint, ShieldCheck, Cpu, Search, Phone, Utensils, Zap, Sliders, MessageSquare, CreditCard,
  ThumbsUp
} from 'lucide-react';

// --- DATA FOR CHART ---
const chartData = [
  { year: '2022', savedNear: 741053, savedRetro: 338370, savedCollection: 265140, damage: 779212, quality: 63.3 },
  { year: '2023', savedNear: 289707, savedRetro: 269037, savedCollection: 222605, damage: 658667, quality: 54.3 },
  { year: '2024', savedNear: 270150, savedRetro: 117560, savedCollection: 368444, damage: 394876, quality: 65.7 },
  { year: '2025', savedNear: 590387, savedRetro: 85356, savedCollection: 261321, damage: 244950, quality: 79.3 },
];

const formatCurrency = (val) => val >= 1000 ? `₪${(val/1000).toFixed(0)}k` : val;

// PayBox Brand Colors (Strictly Enforced)
const colors = {
    // Brand Core
    primary: "#0ea5e9", // Sky 500 (PayBox Blue-ish)
    secondary: "#38bdf8", // Sky 400
    accent: "#bae6fd", // Sky 200

    // UI Elements
    bgLight: "#f0f9ff", // Sky 50
    textDark: "#0f172a", // Slate 900
    textGray: "#64748b", // Slate 500

    // Chart Specific
    chart: {
        savedNear: "#0284c7", // Sky 600
        savedRetro: "#38bdf8", // Sky 400
        savedCollection: "#bae6fd", // Sky 200
        damage: "#f43f5e", // Rose 500 (Soft Red for alerts)
        line: "#0c4a6e" // Sky 900 (Dark contrast)
    }
};

// --- LOGIN COMPONENT ---
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo password
    if (password === '123456') {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-100 font-sans p-4" dir="rtl">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-200">
        <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-sky-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">המצגת מוגנת</h2>
        <p className="text-slate-500 mb-8">אנא הזן סיסמת צפייה כדי להמשיך</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="סיסמה..."
              className={`w-full px-4 py-3 border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-slate-700 placeholder-slate-400 ${error ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-300'}`}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-right font-medium">סיסמה שגויה, נסה שוב</p>}

          <button
            type="submit"
            className="w-full bg-[#2b6cb0] hover:bg-[#2c5282] text-white font-bold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg mt-2"
          >
            כניסה למצגת
          </button>
        </form>
      </div>
    </div>
  );
};

// --- SLIDE COMPONENTS ---

// Slide 1: Title
const TitleSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-10 animate-fadeIn bg-gradient-to-br from-sky-50 to-white">
    <div className="w-32 h-32 bg-sky-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-sky-200 rotate-3 transition-transform hover:rotate-0">
      <Shield className="w-16 h-16 text-white" />
    </div>
    <div>
      <h1 className="text-6xl font-black text-slate-800 mb-6 tracking-tight">סקירת מערך מניעת הונאות</h1>
      <h2 className="text-3xl text-sky-600 font-medium">סיכום פעילות שנתי 2025 ומוכנות ל-2026</h2>
    </div>
    <div className="mt-16 px-10 py-4 bg-white rounded-full text-sky-600 text-xl font-bold shadow-lg border border-sky-100">
      דירקטוריון פברואר 2026
    </div>
  </div>
);

// Slide 2: Context & Goals
const ContextSlide = () => (
  <div className="h-full flex flex-col justify-center px-16 animate-fadeIn">
    <h2 className="text-4xl font-bold text-slate-800 mb-16 border-r-8 border-sky-500 pr-6">רקע ומטרות הדיון</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      {/* Background Card */}
      <div className="bg-sky-50/50 p-10 rounded-[2rem] border border-sky-100 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
             <Activity className="w-8 h-8 text-sky-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">האתגר: סביבה דינמית</h3>
        </div>
        <p className="text-slate-600 leading-loose text-xl">
          מניעת הונאות היא "מרוץ חימוש" מתמיד. אנו מתמודדים מול טיפולוגיות המשתנות מדי יום וטרנדים טכנולוגיים מתפתחים.
          ההצלחה מחייבת גמישות מחשבתית, יכולת הסתגלות מהירה, ופיתוח כלים לזיהוי דפוסים חדשים בזמן אמת.
        </p>
      </div>

      {/* Goal Card */}
      <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 relative">
        <div className="flex items-center gap-4 mb-6">
           <div className="bg-sky-100 p-4 rounded-2xl shadow-sm">
              <Target className="w-8 h-8 text-sky-600" />
           </div>
          <h3 className="text-2xl font-bold text-slate-800">מטרת הדיון</h3>
        </div>
        <ul className="space-y-6 text-slate-600 text-xl">
          <li className="flex items-start gap-4">
            <span className="mt-2.5 w-2.5 h-2.5 bg-sky-400 rounded-full shrink-0"></span>
            הצגת אפקטיביות צוות האופרציה וה-ROI השנתי.
          </li>
          <li className="flex items-start gap-4">
            <span className="mt-2.5 w-2.5 h-2.5 bg-sky-400 rounded-full shrink-0"></span>
            סקירת שכבות ההגנה הטכנולוגיות והאנושיות.
          </li>
          <li className="flex items-start gap-4">
            <span className="mt-2.5 w-2.5 h-2.5 bg-sky-400 rounded-full shrink-0"></span>
            אישור המשך אסטרטגיית המניעה והפעילות במתכונת הנוכחית ל-2026.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Slide 3: The Chart
const ChartSlide = () => {
    // Custom Tooltip Logic
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
          <div className="bg-white p-5 border border-slate-100 shadow-2xl rounded-2xl font-sans text-right min-w-[240px]" dir="rtl">
            <p className="font-bold text-slate-800 text-xl mb-4 border-b pb-2">{label}</p>

            <div className="space-y-3 text-lg">
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedNear}}></span>מניעה אקטיבית:</span><span className="font-medium text-slate-700">{formatMoney(savedNear)}</span></div>
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedRetro}}></span>ניכוי יתרה:</span><span className="font-medium text-slate-700">{formatMoney(savedRetro)}</span></div>
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedCollection}}></span>גבייה:</span><span className="font-medium text-slate-700">{formatMoney(savedCollection)}</span></div>

               <div className="my-3 pt-3 border-t border-dashed border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-sky-600">סה״כ נחסך:</span>
                  <span className="font-bold text-sky-600">{formatMoney(totalSaved)}</span>
               </div>

               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.damage}}></span>נזק בפועל:</span><span className="font-bold text-rose-500">{formatMoney(damage)}</span></div>

               <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-800">איכות מניעה:</span>
                  <span className="font-extrabold text-sky-800 text-xl">{quality}%</span>
               </div>
            </div>
          </div>
        );
      }
      return null;
    };

    return (
    <div className="h-full flex flex-col px-8 animate-fadeIn">
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-4xl font-bold text-slate-800">תמונת מצב שנתית: מניעה מול נזק</h2>
          <p className="text-xl text-slate-500 mt-2">עלייה עקבית באיכות המניעה (79.3%) וירידה דרמטית בנזק בפועל</p>
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full" style={{backgroundColor: colors.chart.savedNear}}></div>מניעה אקטיבית</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full" style={{backgroundColor: colors.chart.savedRetro}}></div>ניכוי יתרה</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full" style={{backgroundColor: colors.chart.savedCollection}}></div>גבייה</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full" style={{backgroundColor: colors.chart.damage}}></div>נזק בפועל</div>
        </div>
      </div>

      <div className="flex-grow w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 16, fontWeight: 500}} dy={10} />

            <YAxis
              yAxisId="left"
              tickFormatter={formatCurrency}
              axisLine={false}
              tickLine={false}
              tick={{fill: '#94a3b8', fontSize: 14}}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(v)=>`${v}%`}
              axisLine={false}
              tickLine={false}
              tick={{fill: '#0ea5e9', fontSize: 14, fontWeight: 600}}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />

            <Bar yAxisId="left" dataKey="savedCollection" name="גבייה" stackId="a" fill={colors.chart.savedCollection} />
            <Bar yAxisId="left" dataKey="savedRetro" name="ניכוי יתרה" stackId="a" fill={colors.chart.savedRetro} />
            <Bar yAxisId="left" dataKey="savedNear" name="מניעה אקטיבית" stackId="a" fill={colors.chart.savedNear} radius={[0,0,4,4]} />
            <Bar yAxisId="left" dataKey="damage" name="נזק בפועל" stackId="a" fill={colors.chart.damage} radius={[4,4,0,0]} />

            <Line yAxisId="right" type="monotone" dataKey="quality" name="איכות מניעה" stroke={colors.chart.line} strokeWidth={5} dot={{r:6, fill: colors.chart.line, strokeWidth: 0}} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
    );
};

// Slide 4: Trends 2025
const TrendsSlide = () => (
  <div className="h-full flex flex-col justify-center px-16 animate-fadeIn">
     <h2 className="text-4xl font-bold text-slate-800 mb-12 border-r-8 border-rose-300 pr-6">מגמות וטרנדים מרכזיים 2025</h2>

     <div className="grid grid-cols-2 gap-12">
        {/* Bezeq Fraud */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition-shadow relative overflow-hidden flex flex-col">
            <div className="flex items-start justify-between mb-6">
                <div className="bg-rose-50 p-4 rounded-2xl">
                    <Phone className="w-10 h-10 text-rose-400" />
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-full text-sm font-bold text-slate-500 border border-slate-200">
                    הנדסה חברתית
                </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">הונאת "בזק" / נותני שירות</h3>
            <p className="text-slate-500 text-lg mb-6 leading-relaxed flex-grow">
                התחזות לנציג שירות המודיע על חוב דחוף. התוקף מבקש אשראי וקוד אימות (OTP) של PayBox, ופותח חשבון חדש על שם הקורבן.
                <br/><br/>
                <span className="font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded">קהל יעד: אוכלוסייה מבוגרת</span>
            </p>
            <div className="flex items-center gap-8 mt-6 pt-6 border-t border-slate-50">
                <div>
                    <span className="block text-sm text-slate-400 uppercase font-semibold">היקף מקרים</span>
                    <span className="text-3xl font-bold text-slate-700">~24</span>
                </div>
                 <div className="w-px h-12 bg-slate-100"></div>
                <div>
                    <span className="block text-sm text-slate-400 uppercase font-semibold">נזק כספי</span>
                    <span className="text-3xl font-bold text-rose-500">₪64k</span>
                </div>
            </div>
        </div>

        {/* Restaurant Fraud */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition-shadow relative overflow-hidden flex flex-col">
             <div className="flex items-start justify-between mb-6">
                <div className="bg-rose-50 p-4 rounded-2xl">
                    <Utensils className="w-10 h-10 text-rose-400" />
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-full text-sm font-bold text-slate-500 border border-slate-200">
                    פישינג בזמן אמת
                </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">הונאת "מסעדות"</h3>
            <p className="text-slate-500 text-lg mb-6 leading-relaxed flex-grow">
                שיחה מ"המסעדה" על כשל בתשלום מיד לאחר הזמנה. הלקוח נדרש למסור אשראי וקוד לאימות. התוקף משתלט על חשבון ה-PayBox הקיים.
                <br/><br/>
                <span className="font-semibold text-orange-400 bg-orange-50 px-3 py-1 rounded">שיטה: ניצול טיימינג</span>
            </p>
            <div className="flex items-center gap-8 mt-6 pt-6 border-t border-slate-50">
                <div>
                    <span className="block text-sm text-slate-400 uppercase font-semibold">היקף מקרים</span>
                    <span className="text-3xl font-bold text-slate-700">~35</span>
                </div>
                 <div className="w-px h-12 bg-slate-100"></div>
                <div>
                    <span className="block text-sm text-slate-400 uppercase font-semibold">נזק כספי</span>
                    <span className="text-3xl font-bold text-orange-400">₪180k</span>
                </div>
            </div>
        </div>
     </div>
  </div>
);

// Slide 5: Improvements
const ImprovementsSlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn">
       <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 border-r-8 border-sky-400 pr-6">צעדי מנע ושיפורים טכנולוגיים</h2>
            <p className="text-slate-500 text-2xl">מענה בזמן אמת לאיומים המתפתחים</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition group">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6">
                  <Sliders className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">הידוק בקרות Wallet Score</h3>
              <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-slate-500 text-lg">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span>אופטימיזציה לזיהוי אנומליות במכשירי iOS (אנשי קשר, TimeZone).</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-500 text-lg">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span>הגברת רגישות מודל הסיכון בזיהוי קורלציה בין מועד הרישום להיקף העברות.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition group">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">הגברת מודעות והתראות</h3>
              <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-slate-500 text-lg">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span>חידוד הודעות SMS בעת Login עם אזהרה בולטת למניעת פישינג.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-500 text-lg">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span>הוספת התראות אבטחה יזומות בעת כניסה ממכשירים לא מזוהים.</span>
                  </li>
              </ul>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition group">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6">
                  <CreditCard className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">צמצום משטח התקיפה</h3>
              <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-slate-500 text-lg">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span><strong>מודל "מסלולים":</strong> הפחתת תקרת אשראי זר ל-1,000 ₪, להקטנת תמריץ ההונאה.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-500 text-lg">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                      <span>חסימת משיכות כספים לחשבונות בנק שטרם אושרו במערכת (אדי״ב).</span>
                  </li>
              </ul>
          </div>
       </div>
    </div>
  );

// Slide 6: Layers (Fixed Layout - No Overlap, Full Width)
const LayersSlide = () => {
    const layers = [
        {
            title: "אבטחת תשתית וסייבר (השכבה החיצונית)",
            icon: <Server className="w-8 h-8" />,
            items: ["חומת אש (Firewall)", "חסימות גיאוגרפיות", "הגנה מגישה לא מורשית"],
            color: "bg-slate-700",
            widthClass: "w-full"
        },
        {
            title: "זיהוי ואימות לקוח (KYC)",
            icon: <Fingerprint className="w-8 h-8" />,
            items: ["איסוף מידע רגולטורי (411)", "אימות מסמכים ביומטרי", "פרופיל סיכון ראשוני"],
            color: "bg-sky-600",
            widthClass: "w-[90%]"
        },
        {
            title: "מנועי סיכון בזמן אמת",
            icon: <Cpu className="w-8 h-8" />,
            items: ["Risk Score דינמי", "Wallet Score פיננסי", "ניטור הלבנת הון (AML)"],
            color: "bg-sky-500",
            widthClass: "w-[80%]"
        },
        {
            title: "בקרה וניטור תפעולי",
            icon: <Search className="w-8 h-8" />,
            items: ["ניטור אנליסטים יומי", "ניהול רשימות מוגבלים", "תחקור אירועי הונאה"],
            color: "bg-sky-400",
            widthClass: "w-[70%]"
        }
    ];

    return (
        <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-y-auto">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">ארכיטקטורת ההגנה: רב-שכבתית</h2>
                <p className="text-slate-500 text-xl max-w-4xl mx-auto">
                    מערך ההגנה בנוי כמשפך סינון, מהתשתית הרחבה ועד קבלת ההחלטות העסקית
                </p>
            </div>

            <div className="flex flex-col items-center gap-6 w-full">
                {layers.map((layer, idx) => (
                    <div
                        key={idx}
                        className={`${layer.widthClass} ${layer.color} text-white rounded-2xl shadow-lg flex items-center p-6 transition-all hover:scale-[1.01]`}
                    >
                        <div className="p-3 bg-white/20 rounded-xl mr-4 ml-6 backdrop-blur-sm shadow-inner">
                            {layer.icon}
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-2xl font-bold mb-1">{layer.title}</h3>
                            <div className="flex gap-3 mt-2 flex-wrap">
                                {layer.items.map((item, i) => (
                                    <span key={i} className="text-sm md:text-base bg-black/10 px-4 py-1.5 rounded-lg border border-white/10">
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

// Slide 7: Lists
const ListsSlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn">
        <h2 className="text-4xl font-bold text-slate-800 mb-12 border-r-8 border-sky-400 pr-6">בקרה, ניטור וכלי עבודה</h2>
        <div className="grid grid-cols-3 gap-10">
            <div className="bg-slate-700 text-white p-10 rounded-[2rem] shadow-lg transform hover:scale-105 transition duration-300">
                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm"><Lock className="w-8 h-8 text-white" /></div>
                <h3 className="text-2xl font-bold mb-4">Black List</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">רשימה שחורה של מזהי משתמשים שנחסמו לצמיתות עקב הונאה ודאית.</p>
                <div className="pt-6 border-t border-slate-600"><span className="text-sm bg-rose-500/80 px-4 py-2 rounded-full text-white font-medium">חסימה מיידית</span></div>
            </div>
            <div className="bg-white border border-slate-100 p-10 rounded-[2rem] shadow-sm transform hover:scale-105 transition duration-300">
                <div className="bg-sky-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"><Eye className="w-8 h-8 text-sky-500" /></div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Watch List</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-6">רשימת מעקב אחר משתמשים בעלי פרופיל סיכון גבוה המחייבים בדיקה ידנית.</p>
                <div className="pt-6 border-t border-slate-50"><span className="text-sm bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-medium">ניטור מוגבר</span></div>
            </div>
            <div className="bg-white border border-slate-100 p-10 rounded-[2rem] shadow-sm transform hover:scale-105 transition duration-300">
                <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"><FileText className="w-8 h-8 text-orange-400" /></div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Banned Users</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-6">משתמשים שפעילותם הוקפאה (זמנית או קבוע) עקב חשד למעורבות בפעילות לא תקינה.</p>
                <div className="pt-6 border-t border-slate-50"><span className="text-sm bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-medium">הקפאת פעילות</span></div>
            </div>
        </div>
        <div className="mt-12 bg-sky-50 border border-sky-100 p-6 rounded-2xl flex items-center gap-6">
            <div className="bg-sky-500 rounded-full p-3 text-white shadow-sm"><Activity className="w-6 h-6" /></div>
            <div>
                <h4 className="font-bold text-sky-900 text-xl">שגרת ניטור יומית</h4>
                <p className="text-sky-700 text-lg">ניתוח יומי של פעילויות חשודות על בסיס חוקים אוטומטיים וניסיון מצטבר. מנגנוני עצירה מופעלים מיידית.</p>
            </div>
        </div>
    </div>
);

// Slide 8: Thank You
const ThankYouSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-10 animate-fadeIn bg-gradient-to-tl from-sky-50 to-white">
    <div className="w-32 h-32 bg-sky-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
        <ShieldCheck className="w-16 h-16 text-sky-500" />
    </div>
    <div>
        <h1 className="text-6xl font-extrabold text-slate-800 mb-4 tracking-tight">תודה רבה</h1>
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
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-100 p-6 overflow-hidden">

      {/* Slide Container (Full Width/Height) */}
      <div className="bg-white w-[95vw] h-[90vh] rounded-[3rem] shadow-2xl border border-white/50 relative overflow-hidden flex flex-col">

        <div className="w-full h-2 bg-sky-50">
          <div
            className="h-full bg-sky-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        <div className="flex-grow relative overflow-hidden">
          {slides[currentSlide].component}
        </div>

        <div className="h-24 bg-white border-t border-slate-50 flex items-center justify-between px-12">
          <div className="text-slate-400 text-lg font-medium">
            שקף {currentSlide + 1} מתוך {slides.length} | {slides[currentSlide].label}
          </div>

          <div className="flex gap-6">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-4 rounded-full ${currentSlide === 0 ? 'text-slate-300 bg-slate-50' : 'bg-white shadow-md border border-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-600'} transition-all`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`p-4 rounded-full ${currentSlide === slides.length - 1 ? 'text-slate-300 bg-slate-50' : 'bg-sky-500 shadow-xl shadow-sky-200 text-white hover:bg-sky-600 hover:shadow-sky-300'} transition-all`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 text-slate-400 text-sm font-medium">
        Fraud Prevention Operations • Board Meeting Q1 2026
      </div>
    </div>
  );
};

export default BoardPresentation;