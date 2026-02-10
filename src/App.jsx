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
      {/* Background Card */}
      <div className="bg-sky-50/50 p-8 rounded-3xl border border-sky-100 relative overflow-hidden group hover:bg-sky-50 transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm">
             <Activity className="w-6 h-6 text-sky-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">האתגר: סביבה דינמית</h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg">
          מניעת הונאות היא "מרוץ חימוש" מתמיד. אנו מתמודדים מול טיפולוגיות המשתנות מדי יום וטרנדים טכנולוגיים מתפתחים.
          ההצלחה מחייבת גמישות מחשבתית, יכולת הסתגלות מהירה, ופיתוח כלים לזיהוי דפוסים חדשים בזמן אמת.
        </p>
      </div>

      {/* Goal Card */}
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
          <li className="flex items-start gap-3">
            <span className="mt-2 w-2 h-2 bg-sky-400 rounded-full flex-shrink-0"></span>
            אישור המשך אסטרטגיית המניעה והפעילות במתכונת הנוכחית ל-2026.
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
        {/* Bezeq Fraud */}
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
                התחזות לנציג שירות המודיע על חוב דחוף. התוקף מבקש אשראי וקוד אימות (OTP) של PayBox, ופותח חשבון חדש על שם הקורבן.
                <br className="mb-2"/>
                <span className="font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded text-xs">קהל יעד: אוכלוסייה מבוגרת</span>
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

        {/* Restaurant Fraud */}
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
                שיחה מ"המסעדה" על כשל בתשלום מיד לאחר הזמנה. הלקוח נדרש למסור אשראי וקוד לאימות. התוקף משתלט על חשבון ה-PayBox הקיים.
                <br className="mb-2"/>
                <span className="font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded text-xs">שיטה: ניצול טיימינג</span>
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

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mb-4">
                  <Sliders className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">הידוק בקרות Wallet Score</h3>
              <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                      <span>אופטימיזציה לזיהוי אנומליות במכשירי iOS (אנשי קשר, TimeZone).</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                      <span>הגברת רגישות מודל הסיכון בזיהוי קורלציה בין מועד הרישום להיקף העברות.</span>
                  </li>
              </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">הגברת מודעות והתראות</h3>
              <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                      <span>חידוד הודעות SMS בעת Login עם אזהרה בולטת למניעת פישינג.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                      <span>הוספת התראות אבטחה יזומות בעת כניסה ממכשירים לא מזוהים.</span>
                  </li>
              </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">צמצום משטח התקיפה</h3>
              <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                      <span><strong>מודל "מסלולים":</strong> הפחתת תקרת אשראי זר ל-1,000 ₪, להקטנת תמריץ ההונאה.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                      <span>חסימת משיכות כספים לחשבונות בנק שטרם אושרו במערכת (אדי״ב).</span>
                  </li>
              </ul>
          </div>
       </div>
    </div>
  );

// Slide 5: The Chart
const ChartSlide = () => {
    // Custom Tooltip Logic to show all metrics + Total Saved
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        // Safe access to payload data
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
               {/* Saved Breakdown */}
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor: colors.chart.savedNear}}></span>מניעה אקטיבית:</span><span className="font-medium text-slate-700">{formatMoney(savedNear)}</span></div>
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor: colors.chart.savedRetro}}></span>ניכוי יתרה:</span><span className="font-medium text-slate-700">{formatMoney(savedRetro)}</span></div>
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor: colors.chart.savedCollection}}></span>גבייה:</span><span className="font-medium text-slate-700">{formatMoney(savedCollection)}</span></div>

               {/* Total Saved Summary */}
               <div className="my-2 pt-2 border-t border-dashed border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-sky-600">סה״כ נחסך:</span>
                  <span className="font-bold text-sky-600">{formatMoney(totalSaved)}</span>
               </div>

               {/* Damage */}
               <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor: colors.chart.damage}}></span>נזק בפועל:</span><span className="font-bold text-rose-500">{formatMoney(damage)}</span></div>

               {/* Quality */}
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
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedNear}}></div>מניעה אקטיבית</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedRetro}}></div>ניכוי יתרה</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.savedCollection}}></div>גבייה</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.chart.damage}}></div>נזק בפועל</div>
        </div>
      </div>

      <div className="flex-grow w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} />

            <YAxis
              yAxisId="left"
              tickFormatter={formatCurrency}
              axisLine={false}
              tickLine={false}
              tick={{fill: '#94a3b8', fontSize: 12}}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(v)=>`${v}%`}
              axisLine={false}
              tickLine={false}
              tick={{fill: '#0ea5e9', fontSize: 12, fontWeight: 600}}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />

            {/* Bars with PayBox Blue Palette */}
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

// Slide 6: Defense Layers (Pastel + Stacked + Reversed)
const LayersSlide = () => {
  // Ordered so Infrastructure is index 0 (Highest/Tallest/Back)
  const layers = [
    {
      title: "אבטחת תשתית וסייבר",
      icon: <Server className="w-5 h-5" />,
      items: ["חומת אש (Firewall)", "חסימות גיאוגרפיות", "הגנה מגישה לא מורשית"],
      color: "bg-slate-700", // Keep Foundation Dark but neutral
    },
    {
      title: "זיהוי ואימות לקוח (KYC)",
      icon: <Fingerprint className="w-5 h-5" />,
      items: ["איסוף מידע רגולטורי (411)", "אימות מסמכים ביומטרי", "פרופיל סיכון ראשוני"],
      color: "bg-sky-600", // Strong Blue
    },
    {
      title: "מנועי סיכון בזמן אמת",
      icon: <Cpu className="w-5 h-5" />,
      items: ["Risk Score דינמי", "Wallet Score פיננסי", "ניטור הלבנת הון (AML)"],
      color: "bg-sky-500", // Medium Sky
    },
    {
      title: "בקרה וניטור תפעולי",
      icon: <Search className="w-5 h-5" />,
      items: ["ניטור אנליסטים יומי", "ניהול רשימות מוגבלים", "תחקור אירועי הונאה"],
      color: "bg-sky-400", // Light Sky
    }
  ];

  return (
    <div className="h-full flex flex-col px-4 animate-fadeIn overflow-hidden">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-r-4 border-sky-500 pr-4">ארכיטקטורת ההגנה: רב-שכבתית</h2>
      <p className="text-slate-500 mb-8 max-w-3xl">
        מערך ההגנה בנוי ממעגלי אבטחה המשתלבים זה בזה, מהתשתית ועד קבלת ההחלטות העסקית.
      </p>

      {/* Visual Representation of Layers - Stacked Cards */}
      <div className="flex flex-col items-center justify-end flex-grow relative -mb-10">
        {layers.map((layer, idx) => (
          <div
            key={idx}
            className={`w-full max-w-4xl ${layer.color} text-white rounded-t-3xl shadow-lg absolute bottom-0 flex flex-col items-center pt-6 transition-all duration-500 hover:-translate-y-2`}
            style={{
              height: `${(layers.length - idx) * 110 + 40}px`, // Stacking effect
              zIndex: idx,
              width: `${100 - (idx * 5)}%` // Tapering effect
            }}
          >
            <div className="flex items-center gap-2 mb-3 bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm">
              {layer.icon}
              <span className="font-bold text-lg">{layer.title}</span>
            </div>
            <div className="flex gap-4 opacity-90 text-sm md:text-base">
              {layer.items.map((item, i) => (
                <span key={i} className="flex items-center gap-1 bg-black/10 px-3 py-1 rounded-lg border border-white/5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span> {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Slide 7: Lists & Operations
const ListsSlide = () => (
  <div className="h-full flex flex-col justify-center px-12 animate-fadeIn">
    <h2 className="text-2xl font-bold text-slate-800 mb-8 border-r-4 border-sky-400 pr-4">בקרה, ניטור וכלי עבודה</h2>

    <div className="grid grid-cols-3 gap-6">
      {/* Black List */}
      <div className="bg-slate-700 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition duration-300">
        <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2">Black List</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          רשימה שחורה של מזהי משתמשים שנחסמו לצמיתות עקב הונאה ודאית.
        </p>
        <div className="mt-4 pt-4 border-t border-slate-600">
          <span className="text-xs bg-rose-500/80 px-2 py-1 rounded text-white font-medium">חסימה מיידית</span>
        </div>
      </div>

      {/* Watch List */}
      <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm transform hover:scale-105 transition duration-300">
        <div className="bg-sky-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
          <Eye className="w-6 h-6 text-sky-500" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-800">Watch List</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          רשימת מעקב אחר משתמשים בעלי פרופיל סיכון גבוה המחייבים בדיקה ידנית.
        </p>
        <div className="mt-4 pt-4 border-t border-slate-50">
          <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded font-medium">ניטור מוגבר</span>
        </div>
      </div>

      {/* Banned Users */}
      <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm transform hover:scale-105 transition duration-300">
        <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
          <FileText className="w-6 h-6 text-orange-400" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-800">Banned Users</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          משתמשים שפעילותם הוקפאה (זמנית או קבוע) עקב חשד למעורבות בפעילות לא תקינה.
        </p>
        <div className="mt-4 pt-4 border-t border-slate-50">
          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-medium">הקפאת פעילות</span>
        </div>
      </div>
    </div>

    {/* Daily Ops Bar */}
    <div className="mt-10 bg-sky-50 border border-sky-100 p-5 rounded-2xl flex items-center gap-4">
      <div className="bg-sky-500 rounded-full p-2 text-white shadow-sm">
        <Activity className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-sky-900">שגרת ניטור יומית</h4>
        <p className="text-sky-700 text-sm">
          ניתוח יומי של פעילויות חשודות על בסיס חוקים אוטומטיים וניסיון מצטבר. מנגנוני עצירה מופעלים מיידית.
        </p>
      </div>
    </div>
  </div>
);

// Slide 8: Thank You (New)
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
    { component: <ImprovementsSlide />, label: "צעדי מנע ושיפורים" },
    { component: <LayersSlide />, label: "שכבות הגנה" },
    { component: <ListsSlide />, label: "ניטור ובקרה" },
    { component: <ThankYouSlide />, label: "סיום" },
  ];

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen bg-slate-50 p-4 md:p-8 font-sans" dir="rtl">

      {/* Slide Container (Aspect Ratio 16:9 approx) */}
      <div className="bg-white w-full h-[600px] rounded-[32px] shadow-2xl border border-white/50 relative overflow-hidden flex flex-col">

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-sky-50">
          <div
            className="h-full bg-sky-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        {/* Slide Content Area */}
        <div className="flex-grow p-8 relative">
          {slides[currentSlide].component}
        </div>

        {/* Footer / Navigation */}
        <div className="h-20 bg-white border-t border-slate-50 flex items-center justify-between px-8">
          <div className="text-slate-400 text-sm font-medium">
            שקף {currentSlide + 1} מתוך {slides.length} | {slides[currentSlide].label}
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-3 rounded-full ${currentSlide === 0 ? 'text-slate-300 bg-slate-50' : 'bg-white shadow-sm border border-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-600'} transition-all`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`p-3 rounded-full ${currentSlide === slides.length - 1 ? 'text-slate-300 bg-slate-50' : 'bg-sky-500 shadow-lg shadow-sky-200 text-white hover:bg-sky-600 hover:shadow-sky-300'} transition-all`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-slate-400 text-sm font-medium">
        Fraud Prevention Operations • Board Meeting Q1 2026
      </div>
    </div>
  );
};

export default BoardPresentation;
