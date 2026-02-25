<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Defense in Depth - Vectors</title>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;800;900&display=swap');
        
        body { 
            font-family: 'Heebo', sans-serif; 
            background-color: #f1f5f9; 
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 60px;
            padding: 60px 0;
            margin: 0;
        }

        .slide {
            width: 1280px;
            height: 720px;
            background-color: #ffffff;
            border-radius: 2rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            padding: 50px 80px;
        }

        .slide-header {
            margin-bottom: 30px;
            text-align: center;
        }

        .slide-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 0.5rem;
        }

        .slide-subtitle {
            font-size: 1.25rem;
            color: #64748b;
            font-weight: 500;
        }

        /* Animations */
        @keyframes arrow-strike {
            0% { transform: translateY(-15px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(15px); opacity: 0; }
        }
        .anim-strike { animation: arrow-strike 1.5s infinite; }
        .anim-strike-delay { animation: arrow-strike 1.5s infinite; animation-delay: 0.75s; }

        @keyframes pulse-shield {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .anim-shield { animation: pulse-shield 2s infinite; }

        @keyframes radar-ping {
            0% { transform: scale(0.8); opacity: 0.8; border-color: rgba(244, 63, 94, 0.8); }
            100% { transform: scale(1.2); opacity: 0; border-color: rgba(244, 63, 94, 0); }
        }
        .anim-radar { animation: radar-ping 2s infinite cubic-bezier(0, 0, 0.2, 1); }
    </style>
</head>
<body>

    <!-- OPTION 1: THE FUNNEL (משפך הסינון) -->
    <div class="slide">
        <div class="slide-header">
            <h2 class="slide-title">אופציה 1: מודל "משפך הסינון" (The Funnel)</h2>
            <p class="slide-subtitle">ממחיש חזותית כיצד כל שכבת הגנה מסננת את נפח ההתקפות עד להגנה מוחלטת בליבה</p>
        </div>
        
        <div class="flex-grow flex flex-col items-center justify-start pt-4">
            
            <!-- Attack Vector Top -->
            <div class="flex flex-col items-center mb-2">
                <div class="bg-rose-500 text-white px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-md mb-2 border border-rose-600">וקטור תקיפה נכנס (איומי סייבר והונאה)</div>
                <div class="flex gap-6 text-rose-500 anim-strike">
                    <i data-lucide="arrow-down-to-line" class="w-8 h-8 opacity-70"></i>
                    <i data-lucide="arrow-down-to-line" class="w-10 h-10"></i>
                    <i data-lucide="arrow-down-to-line" class="w-8 h-8 opacity-70"></i>
                </div>
            </div>

            <!-- Layer 1 -->
            <div class="w-full bg-slate-800 text-white p-5 rounded-2xl text-center border-t-4 border-rose-500 shadow-lg relative z-10 flex items-center justify-between px-10">
                <div class="flex items-center gap-4"><div class="p-2 bg-white/10 rounded-lg"><i data-lucide="server" class="w-6 h-6"></i></div><h3 class="text-xl font-bold">שכבה 1: תשתית וסייבר</h3></div>
                <p class="text-slate-300 font-medium">חסימת מתקפות רשת, בוטים וגישה ממדינות עוינות (Geo-Block)</p>
            </div>
            
            <!-- Filter 1 -->
            <div class="flex gap-8 text-rose-400 my-2 anim-strike anim-strike-delay">
                <i data-lucide="arrow-down" class="w-6 h-6"></i>
                <i data-lucide="arrow-down" class="w-6 h-6"></i>
            </div>

            <!-- Layer 2 -->
            <div class="w-[90%] bg-sky-900 text-white p-5 rounded-2xl text-center border-t-4 border-rose-400 shadow-lg relative z-20 flex items-center justify-between px-10">
                <div class="flex items-center gap-4"><div class="p-2 bg-white/10 rounded-lg"><i data-lucide="fingerprint" class="w-6 h-6"></i></div><h3 class="text-xl font-bold">שכבה 2: זיהוי ואימות לקוח</h3></div>
                <p class="text-sky-200 font-medium">חסימת זהויות בדויות דרך אימות אדי״ב, נב״ת 411 וזיהוי מכשיר</p>
            </div>

            <!-- Filter 2 -->
            <div class="flex gap-4 text-rose-300 my-2 anim-strike">
                <i data-lucide="arrow-down" class="w-6 h-6"></i>
            </div>

            <!-- Layer 3 -->
            <div class="w-[80%] bg-sky-600 text-white p-5 rounded-2xl text-center border-t-4 border-rose-300 shadow-lg relative z-30 flex items-center justify-between px-10">
                <div class="flex items-center gap-4"><div class="p-2 bg-white/20 rounded-lg"><i data-lucide="cpu" class="w-6 h-6"></i></div><h3 class="text-xl font-bold">שכבה 3: מנועי סיכון (Real-Time)</h3></div>
                <p class="text-sky-100 font-medium">עצירת פעולות פיננסיות חשודות בזמן אמת ע"י מודל Wallet Score</p>
            </div>

            <!-- Filter 3 (Blocked) -->
            <div class="h-6 w-1 border-l-2 border-dashed border-rose-300 my-1 relative">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-400"><i data-lucide="x" class="w-5 h-5"></i></div>
            </div>

            <!-- Layer 4 (Core) -->
            <div class="w-[70%] bg-white text-slate-800 p-6 rounded-2xl text-center border-2 border-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.2)] relative z-40 flex items-center justify-between px-10 anim-shield mt-2">
                <div class="flex items-center gap-4"><div class="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><i data-lucide="shield-check" class="w-8 h-8"></i></div><h3 class="text-2xl font-bold text-emerald-700">שכבה 4: ליבת הבקרה</h3></div>
                <p class="text-slate-600 font-bold">חקירות אנליסטים, רשימות שחורות וטיפול בחריגים</p>
            </div>

        </div>
    </div>


    <!-- OPTION 2: THE DEEP CORE (שכבות עוטפות עם ציר חדירה) -->
    <div class="slide">
        <div class="slide-header">
            <h2 class="slide-title">אופציה 2: "מעטפת הליבה" (Nested Penetration)</h2>
            <p class="slide-subtitle">ממחיש באופן פיזי את ציר התקיפה המנסה לחדור את השכבות, וכיצד הוא נבלם</p>
        </div>
        
        <div class="flex-grow flex items-center justify-center relative w-full px-12">
            
            <!-- ATTACK VECTOR SIDEBAR -->
            <div class="absolute right-12 top-0 bottom-0 w-32 flex flex-col items-center z-50 pt-6">
                <div class="bg-rose-500 text-white text-sm font-bold py-2 px-4 rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.5)] border border-rose-400 whitespace-nowrap z-10 text-center leading-tight">
                    וקטור<br/>תקיפה
                </div>
                <!-- Animated penetrating line -->
                <div class="w-2 flex-grow bg-gradient-to-b from-rose-500 via-rose-300 to-transparent relative rounded-full -mt-2">
                    <div class="absolute top-[20%] left-1/2 -translate-x-1/2 text-rose-500 bg-slate-900 rounded-full anim-strike"><i data-lucide="chevron-down" class="w-6 h-6"></i></div>
                    <div class="absolute top-[45%] left-1/2 -translate-x-1/2 text-rose-400 bg-sky-900 rounded-full anim-strike"><i data-lucide="chevron-down" class="w-6 h-6"></i></div>
                    <div class="absolute top-[70%] left-1/2 -translate-x-1/2 text-rose-300 bg-sky-600 rounded-full anim-strike"><i data-lucide="chevron-down" class="w-6 h-6"></i></div>
                    
                    <!-- Blocking Shield -->
                    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-emerald-500 bg-white p-1 rounded-full shadow-lg border border-emerald-200">
                        <i data-lucide="shield-alert" class="w-8 h-8"></i>
                    </div>
                </div>
            </div>

            <!-- LAYERS (Padded to make room for vector on the right) -->
            <div class="bg-slate-900 w-full rounded-[3rem] p-8 pr-32 shadow-2xl relative border border-slate-800">
                <div class="flex items-center gap-4 mb-4">
                    <h3 class="text-xl font-bold text-white uppercase tracking-wider">שכבה 1: תשתית וסייבר</h3>
                    <p class="text-slate-400 text-sm">חסימת גישה היקפית, Geo-Block, חומת אש</p>
                </div>

                <div class="bg-sky-900 w-full rounded-[2.5rem] p-8 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] border border-sky-800/50 mt-2">
                    <div class="flex items-center gap-4 mb-4">
                        <h3 class="text-xl font-bold text-white uppercase tracking-wider">שכבה 2: זיהוי לקוח (KYC)</h3>
                        <p class="text-sky-200/80 text-sm">אימות אדי״ב ונב״ת 411 בתהליך ההצטרפות</p>
                    </div>

                    <div class="bg-sky-600 w-full rounded-[2rem] p-8 shadow-[inset_0_10px_20px_rgba(0,0,0,0.3)] border border-sky-500 mt-2">
                        <div class="flex items-center gap-4 mb-4">
                            <h3 class="text-xl font-bold text-white uppercase tracking-wider">שכבה 3: מנועי סיכון (Real-Time)</h3>
                            <p class="text-sky-100 text-sm">חוקיות ו-Wallet Score לבדיקת עסקאות</p>
                        </div>

                        <!-- Core -->
                        <div class="bg-white w-full rounded-[1.5rem] p-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-between border-4 border-emerald-500/30 mt-2 anim-shield">
                            <div>
                                <h3 class="text-2xl font-bold text-emerald-700 mb-1">שכבה 4: ליבת הבקרה האנושית</h3>
                                <p class="text-slate-500 text-lg font-medium">חקירות עומק, ניטור יומי ע"י אנליסטים וניהול רשימות שחורות לחריגים.</p>
                            </div>
                            <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-200">
                                <i data-lucide="shield-check" class="w-10 h-10 text-emerald-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <!-- OPTION 3: THE RADAR (מעגלי אבטחה קונצנטריים) -->
    <div class="slide">
        <div class="slide-header">
            <h2 class="slide-title">אופציה 3: "הרדאר" (Concentric Rings)</h2>
            <p class="slide-subtitle">הפרדה ברורה בין הייצוג הויזואלי של שכבות ההגנה לבין הפירוט הטקסטואלי</p>
        </div>
        
        <div class="flex-grow flex items-center justify-between gap-12 px-6">
            
            <!-- Graphic Right Side (Radar) -->
            <div class="relative w-[480px] h-[480px] flex items-center justify-center shrink-0">
                
                <!-- Attack Vector Lightning -->
                <div class="absolute top-0 right-0 z-50 transform -translate-x-4 translate-y-4">
                    <div class="relative">
                        <div class="absolute inset-0 rounded-full border-2 anim-radar"></div>
                        <div class="bg-rose-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg border border-rose-400 mb-2 whitespace-nowrap">איום חיצוני</div>
                        <i data-lucide="zap" class="w-10 h-10 text-rose-500 fill-rose-500 anim-strike transform rotate-12"></i>
                    </div>
                </div>

                <!-- Rings -->
                <div class="absolute w-full h-full rounded-full border-[24px] border-slate-200 shadow-inner flex items-center justify-center">
                    <div class="absolute top-4 text-slate-400 font-bold text-sm">תשתית</div>
                </div>
                <div class="absolute w-[360px] h-[360px] rounded-full border-[24px] border-sky-100 shadow-[inset_0_4px_15px_rgba(0,0,0,0.05)] flex items-center justify-center">
                    <div class="absolute top-4 text-sky-400 font-bold text-sm">KYC</div>
                </div>
                <div class="absolute w-[240px] h-[240px] rounded-full border-[24px] border-sky-300 shadow-[inset_0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center">
                    <div class="absolute top-4 text-sky-600 font-bold text-sm">Risk Engine</div>
                </div>
                
                <!-- Core -->
                <div class="absolute w-[120px] h-[120px] rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] z-10 border-4 border-white anim-shield">
                    <i data-lucide="shield-check" class="w-12 h-12"></i>
                </div>
            </div>

            <!-- Text Left Side -->
            <div class="flex flex-col gap-5 flex-grow">
                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 border-r-4 border-r-slate-300">
                    <div class="p-3 bg-slate-50 rounded-xl"><i data-lucide="server" class="w-6 h-6 text-slate-500"></i></div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">1. תשתית וסייבר</h3>
                        <p class="text-slate-500 text-sm">חומת אש (Firewall), חסימות אזוריות והגנה ממתקפות רשת.</p>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 border-r-4 border-r-sky-200">
                    <div class="p-3 bg-sky-50 rounded-xl"><i data-lucide="fingerprint" class="w-6 h-6 text-sky-500"></i></div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">2. זיהוי לקוח (KYC)</h3>
                        <p class="text-slate-500 text-sm">בדיקות רגולציה (נב״ת 411), אימות אדי״ב ובניית פרופיל סיכון.</p>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 border-r-4 border-r-sky-400">
                    <div class="p-3 bg-sky-100 rounded-xl"><i data-lucide="cpu" class="w-6 h-6 text-sky-600"></i></div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">3. מנועי סיכון אוטומטיים</h3>
                        <p class="text-slate-500 text-sm">ניתוח עסקאות בזמן אמת ע"י חוקים חכמים ומודל Wallet Score.</p>
                    </div>
                </div>

                <div class="bg-emerald-50 p-5 rounded-2xl shadow-md border border-emerald-100 flex items-center gap-4 border-r-4 border-r-emerald-500">
                    <div class="p-3 bg-emerald-500 rounded-xl shadow-inner"><i data-lucide="users" class="w-6 h-6 text-white"></i></div>
                    <div>
                        <h3 class="text-xl font-bold text-emerald-800">4. בקרה אנושית (ליבת ההגנה)</h3>
                        <p class="text-emerald-600 text-sm font-medium">צוות אנליסטים לניטור חריגים, חקירות עומק ורשימות שחורות.</p>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script>
        // Initialize Lucide icons
        lucide.createIcons();
    </script>
</body>
</html>