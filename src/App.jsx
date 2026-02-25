import React, { useState, useEffect, useRef } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';
import {
  Shield, TrendingUp, Activity, Server, Target, Lock, Eye, FileText,
  ChevronLeft, ChevronRight, Fingerprint, Cpu, Search, Phone, Utensils,
  Sliders, MessageSquare, CreditCard, ShieldCheck, CheckCircle, Zap,
  AlertCircle, Microscope, BrainCircuit, FileBadge, Map, GraduationCap, Archive, Scale, ShieldAlert, Printer, X, MessageCircle, MousePointer2, Cloud, CloudOff, RefreshCw, ZapOff, Sparkles, Smartphone, Compass, ArrowDownToLine, ArrowDown
} from 'lucide-react';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

// --- CONFIG ---
const APP_VERSION = "v.1.48";

// --- FIREBASE SETUP (Safe Initialization) ---
let app, auth, db;
let isFirebaseAvailable = false;
let appId = 'fraud-prevention-deck';

try {
    if (typeof __firebase_config !== 'undefined' && __firebase_config) {
        const configObj = JSON.parse(__firebase_config);
        if (Object.keys(configObj).length > 0) {
            app = initializeApp(configObj);
            auth = getAuth(app);
            db = getFirestore(app);

            const rawAppId = typeof __app_id !== 'undefined' ? __app_id : 'fraud-prevention-deck';
            appId = rawAppId.replace(/[^a-zA-Z0-9_-]/g, '_');

            isFirebaseAvailable = true;
        }
    }
} catch (e) {
    console.warn("Firebase init failed (running in offline mode):", e);
}

// --- DATA ---
const chartData = [
  { year: '2022', savedNear: 741053.20, savedRetro: 338370.34, savedCollection: 265140.60, damage: 779212.67, quality: 63.3, totalSaved: 1344564, totalExposure: 2123776 },
  { year: '2023', savedNear: 289707, savedRetro: 269037.13, savedCollection: 221925.26, damage: 659347.02, quality: 54.2, totalSaved: 780669, totalExposure: 1440016 },
  { year: '2024', savedNear: 270150, savedRetro: 119560, savedCollection: 368974.10, damage: 395792.65, quality: 65.7, totalSaved: 758684, totalExposure: 1154477 },
  { year: '2025', savedNear: 590387.37, savedRetro: 85356, savedCollection: 263511.59, damage: 254250.00, quality: 78.7, totalSaved: 939255, totalExposure: 1193505 },
];

const formatCurrency = (val) => val >= 1000 ? `₪${(val/1000).toFixed(0)}k` : val;
const formatMillions = (val) => `₪${(val/1000000).toFixed(1)}M`;

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

// --- COMMENTS SYSTEM ---
const CommentsLayer = ({ slideIndex, isVisible, containerRef, newCommentPos, setNewCommentPos, onStatusChange }) => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [newCommentText, setNewCommentText] = useState("");
    const [useLocalMode, setUseLocalMode] = useState(!isFirebaseAvailable);
    const [isSaving, setIsSaving] = useState(false);

    const LOCAL_STORAGE_KEY = `fraud-deck-comments-${appId}`;

    useEffect(() => {
        if (onStatusChange) {
            onStatusChange(useLocalMode ? 'local' : 'cloud');
        }
    }, [useLocalMode, onStatusChange]);

    useEffect(() => {
        if (!isFirebaseAvailable) {
            setUseLocalMode(true);
            return;
        }

        const initAuth = async () => {
            try {
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    await signInWithCustomToken(auth, __initial_auth_token);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (err) {
                console.warn("Auth failed, switching to local mode:", err);
                setUseLocalMode(true);
            }
        };
        initAuth();
        const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
                setUseLocalMode(false);
            } else {
                setUseLocalMode(true);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (useLocalMode) {
            try {
                const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (saved) setComments(JSON.parse(saved));
            } catch(e) {}
            return;
        }

        if (!user) return;

        try {
            const commentsRef = collection(db, 'artifacts', appId, 'public', 'data', 'comments');
            const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
                const loadedComments = [];
                snapshot.forEach(doc => {
                    loadedComments.push({ id: doc.id, ...doc.data() });
                });
                setComments(loadedComments);
            }, (error) => {
                setUseLocalMode(true);
            });

            return () => unsubscribe();
        } catch (err) {
            setUseLocalMode(true);
        }
    }, [user, useLocalMode]);

    const handleSaveComment = async () => {
        if (!newCommentText.trim()) return;
        setIsSaving(true);

        const newComment = {
            slideIndex,
            x: newCommentPos.x,
            y: newCommentPos.y,
            text: newCommentText,
            createdAt: new Date().toISOString(),
            authorId: user ? user.uid : 'local-user',
        };

        if (useLocalMode) {
            const updatedComments = [...comments, { ...newComment, id: Date.now().toString() }];
            setComments(updatedComments);
            try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedComments)); } catch (e) {}
            setNewCommentPos(null);
            setNewCommentText("");
            setIsSaving(false);
        } else {
            try {
                await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'comments'), newComment);
                setNewCommentPos(null);
                setNewCommentText("");
            } catch (err) {
                setUseLocalMode(true);
                const updatedComments = [...comments, { ...newComment, id: Date.now().toString() }];
                setComments(updatedComments);
                try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedComments)); } catch (e) {}
                setNewCommentPos(null);
                setNewCommentText("");
            } finally {
                setIsSaving(false);
            }
        }
    };

    const handleDeleteComment = async (id) => {
        if (useLocalMode) {
            const updatedComments = comments.filter(c => c.id !== id);
            setComments(updatedComments);
            try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedComments)); } catch (e) {}
        } else {
            try {
                await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'comments', id));
            } catch (err) {
                 const updatedComments = comments.filter(c => c.id !== id);
                 setComments(updatedComments);
            }
        }
    };

    if (!isVisible) return null;

    const currentSlideComments = comments.filter(c => c.slideIndex === slideIndex);

    return (
        <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden no-print">
            {!newCommentPos && currentSlideComments.length === 0 && (
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-slate-800/90 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm animate-fadeIn pointer-events-none z-50">
                    <MousePointer2 className="w-4 h-4" />
                    <span>קליק ימני להוספת הערה {useLocalMode ? '(מצב מקומי)' : ''}</span>
                </div>
            )}
            {currentSlideComments.map(comment => (
                <div
                    key={comment.id}
                    className="absolute pointer-events-auto bg-amber-100 border border-amber-300 shadow-xl rounded-lg rounded-br-none p-3 w-48 text-sm text-slate-900 animate-fadeIn z-[101] transform -translate-y-full origin-bottom-left"
                    style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
                >
                    <div className="flex justify-between items-start mb-1 border-b border-amber-200 pb-1">
                        <span className="text-[10px] text-amber-700 font-bold">הערה</span>
                        <button onClick={() => handleDeleteComment(comment.id)} className="text-slate-400 hover:text-red-600 transition-colors p-1"><X className="w-3 h-3" /></button>
                    </div>
                    <p className="font-medium leading-snug break-words whitespace-pre-wrap">{String(comment.text || '')}</p>
                    <div className="absolute bottom-[-5px] right-0 w-3 h-3 bg-amber-100 border-b border-r border-amber-300 transform rotate-45"></div>
                </div>
            ))}
            {newCommentPos && (
                <div className="absolute pointer-events-auto bg-white border border-sky-500 shadow-2xl rounded-xl p-3 w-64 animate-fadeIn z-[102]" style={{ left: `${newCommentPos.x}%`, top: `${newCommentPos.y}%` }}>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-bold text-sky-600">הוספת הערה</p>
                        <button onClick={() => setNewCommentPos(null)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4"/></button>
                    </div>
                    <textarea
                        className="w-full text-sm border border-slate-200 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[80px] bg-slate-50 resize-none text-right"
                        placeholder="כתוב הערה כאן..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button onClick={handleSaveComment} disabled={isSaving} className={`flex-1 bg-sky-600 text-white text-xs py-2 rounded-lg transition font-medium shadow-sm flex items-center justify-center ${isSaving ? 'opacity-70 cursor-wait' : 'hover:bg-sky-700'}`}>
                            {isSaving ? <RefreshCw className="w-3 h-3 animate-spin" /> : 'שמור'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- SLIDE COMPONENTS ---

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
              עולם ההונאות משתנה כל הזמן. הסביבה הפנימית והחיצונית מתפתחת בקצב מסחרר עם כניסת טכנולוגיות חדשות ומוצרים פיננסיים חדשים.
            </p>
            <p>
              מול כל אלה, האתגר המרכזי שלנו הוא למנוע ולסכל את הנזק תוך שמירה על חוויית משתמש חלקה ומינימום הפרעה ללקוחות לגיטימיים.
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
                <strong>תפיסת הפעלה:</strong> סקירה של מעגלי ההגנה הקיימים והניהול המערכתי המפחית סיכונים.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0 print-no-shadow"></span>
              <span>
                <strong>מיקודים במניעה:</strong> כיצד פעלנו למול מתווי התקיפה הבולטים ביותר בשנה החולפת.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0 print-no-shadow"></span>
              <span>
                <strong>נתונים מרכזיים מניהול ההונאות משנת 2025.</strong>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0 print-no-shadow"></span>
              <span>
                <strong>מבט קדימה:</strong> מיקודים ל-2026.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
);

// 3. Operating Concept (The Funnel - Option 1)
const OperatingConceptSlide = () => {
    return (
        <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden print:h-full print:px-8">
            <style>{`
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
            `}</style>

            <div className="mb-6 text-center">
                <h2 className="text-4xl font-bold text-slate-800 mb-2">תפיסת ההפעלה: מודל הסינון</h2>
            </div>

            <div className="flex-grow flex flex-col items-center justify-start pt-2">

                {/* Attack Vector Top */}
                <div className="flex flex-col items-center mb-2">
                    <div className="bg-rose-500 text-white px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-md mb-2 border border-rose-600">וקטור תקיפה נכנס (איומי סייבר והונאה)</div>
                    <div className="flex gap-6 text-rose-500 anim-strike">
                        <ArrowDownToLine className="w-8 h-8 opacity-70" />
                        <ArrowDownToLine className="w-10 h-10" />
                        <ArrowDownToLine className="w-8 h-8 opacity-70" />
                    </div>
                </div>

                {/* Layer 1 */}
                <div className="w-full bg-slate-800 text-white p-5 rounded-2xl text-center border-t-4 border-rose-500 shadow-lg relative z-10 flex items-center justify-between px-10">
                    <div className="flex items-center gap-4"><div className="p-2 bg-white/10 rounded-lg"><Server className="w-6 h-6" /></div><h3 className="text-xl font-bold">שכבה 1: תשתית וסייבר</h3></div>
                    <p className="text-slate-300 font-medium text-lg">חסימת מתקפות רשת, בוטים וגישה ממדינות עוינות (Geo-Block)</p>
                </div>

                {/* Filter 1 */}
                <div className="flex gap-8 text-rose-400 my-2 anim-strike anim-strike-delay">
                    <ArrowDown className="w-6 h-6" />
                    <ArrowDown className="w-6 h-6" />
                </div>

                {/* Layer 2 */}
                <div className="w-[90%] bg-sky-900 text-white p-5 rounded-2xl text-center border-t-4 border-rose-400 shadow-lg relative z-20 flex items-center justify-between px-10">
                    <div className="flex items-center gap-4"><div className="p-2 bg-white/10 rounded-lg"><Fingerprint className="w-6 h-6" /></div><h3 className="text-xl font-bold">שכבה 2: זיהוי ואימות לקוח</h3></div>
                    <p className="text-sky-200 font-medium text-lg">חסימת זהויות בדויות דרך אימות אדי״ב, נב״ת 411 וזיהוי מכשיר</p>
                </div>

                {/* Filter 2 */}
                <div className="flex gap-4 text-rose-300 my-2 anim-strike">
                    <ArrowDown className="w-6 h-6" />
                </div>

                {/* Layer 3 */}
                <div className="w-[80%] bg-sky-600 text-white p-5 rounded-2xl text-center border-t-4 border-rose-300 shadow-lg relative z-30 flex items-center justify-between px-10">
                    <div className="flex items-center gap-4"><div className="p-2 bg-white/20 rounded-lg"><Cpu className="w-6 h-6" /></div><h3 className="text-xl font-bold">שכבה 3: מנועי סיכון (Real-Time)</h3></div>
                    <p className="text-sky-100 font-medium text-lg">עצירת פעולות פיננסיות חשודות בזמן אמת ע"י מודל Wallet Score</p>
                </div>

                {/* Filter 3 (Blocked) */}
                <div className="h-6 w-1 border-l-2 border-dashed border-rose-300 my-1 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-400"><X className="w-5 h-5" /></div>
                </div>

                {/* Layer 4 (Core) */}
                <div className="w-[70%] bg-white text-slate-800 p-6 rounded-2xl text-center border-2 border-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.2)] relative z-40 flex items-center justify-between px-10 anim-shield mt-2">
                    <div className="flex items-center gap-4"><div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><ShieldCheck className="w-8 h-8" /></div><h3 className="text-2xl font-bold text-emerald-700">בקרה אנושית (הצפה וטיפול בחריגים)</h3></div>
                    <p className="text-slate-600 font-bold text-lg">חקירות אנליסטים, רשימות שחורות וטיפול באירועים חריגים</p>
                </div>

            </div>
        </div>
    );
};

// 4. Fraud Strategy Part 1 (Stolen Cards Focus)
const FraudStrategySlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden print:h-full print:px-8">

       {/* Header & Explanation Area */}
       <div className="mb-6">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 border-r-8 border-sky-400 pr-6">סוגי הונאות בולטים - מיקודי 2025</h2>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800 mb-3">1. שימוש בכרטיסי אשראי גנובים (האיום המרכזי)</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                    השימוש השכיח והמשמעותי ביותר בהונאות ב-PayBox הינו שימוש בפרטי כרטיסי אשראי גנובים, המהווים כיום את <strong>"אויב מספר 1"</strong> של החברה. מטרת העבריינים היא להלבין כספים גנובים דרך העברות או משיכות לחשבונות קש.
                </p>
                <div className="bg-sky-100/50 p-4 rounded-xl border border-sky-100">
                    <p className="text-sky-800 text-lg font-medium leading-relaxed">
                        כלל תהליכי העבודה, השגרות והכלים שלנו מכוונים כדי למנוע מקרים אלו, ובנויים במספר שכבות הגנה במקביל. הטיפול באיום מתחלק לשני צירי פעולה:
                    </p>
                </div>
            </div>
       </div>

       <h4 className="text-xl font-bold text-slate-700 mb-3 px-2">מעגלי הטיפול באיום המרכזי ב-2025:</h4>

       {/* Actions Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow max-h-[35vh] print:max-h-none">
          {/* Preventive */}
          <div className="bg-white p-6 rounded-[2rem] shadow-md border border-slate-100 flex flex-col print:border-slate-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center print:border print:border-sky-200"><Shield className="w-6 h-6 text-sky-500" /></div>
                <h3 className="text-xl font-bold text-slate-800">מענה מניעתי (לא לאפשר מראש)</h3>
              </div>
              <ul className="space-y-4 flex-grow overflow-y-auto pr-2">
                  <li className="flex items-start gap-3 text-slate-600 text-base leading-snug">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                    <div><strong>דיוק מנוע סיכונים (Wallet Score):</strong> פיתוח חוקים חדשים תוך שמירה על איזון עדין ומינימום פגיעה במשתמשים לגיטימיים.</div>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 text-base leading-snug">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                    <div><strong>זיהוי מכשירים:</strong> איתור משתמשים ללא אנשי קשר במכשיר או המגיעים מאזור זמן זר.</div>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 text-base leading-snug">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                    <div><strong>התראות מונעות פישינג:</strong> שינוי ניסוח ה-SMS והתראה על כניסות ממכשירים לא מזוהים.</div>
                  </li>
              </ul>
          </div>

          {/* Reactive */}
          <div className="bg-white p-6 rounded-[2rem] shadow-md border border-slate-100 flex flex-col print:border-slate-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center print:border print:border-rose-200"><ZapOff className="w-6 h-6 text-rose-500" /></div>
                <h3 className="text-xl font-bold text-slate-800">מענה תגובתי (למקרים שחדרו)</h3>
              </div>
              <ul className="space-y-4 flex-grow overflow-y-auto pr-2">
                  <li className="flex items-start gap-3 text-slate-600 text-base leading-snug">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0"></div>
                    <div><strong>ניטור והתערבות אנושית:</strong> טיפול במקרים נדירים שהצליחו לחדור את ההגנה האוטומטית, דרך בקרת אנליסטים ועצירה מיידית.</div>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 text-base leading-snug">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0"></div>
                    <div><strong>חסימות והקפאות:</strong> מניעת חזרת הונאה דרך חסימה הרמטית לפי מזהה מכשיר, מספר טלפון או תעודת זהות של רשתות עוינות.</div>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 text-base leading-snug">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0"></div>
                    <div><strong>זיכויים וניהול הכחשות:</strong> מענה מהיר מול חברות האשראי לביטול עסקאות משובשות והחזרת כספים.</div>
                  </li>
              </ul>
          </div>
       </div>
    </div>
);

// 5. Trends (Part 2 - New Patterns)
const TrendsSlide = () => (
  <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden print:h-full print:px-8">
     <div className="mb-8">
        <h2 className="text-4xl font-bold text-slate-800 mb-4 border-r-8 border-rose-300 pr-6">סוגי הונאות בולטים - מיקודי 2025 (המשך)</h2>
        <h3 className="text-2xl font-bold text-slate-700 mt-2 mb-2">2. דפוסי הונאות חדשים שהתמודדנו איתם ב-2025</h3>
        <p className="text-slate-500 text-xl font-medium">מקרים מורכבים שעקפו את מעגלי ההגנה האוטומטיים ודרשו התערבות וניטור אנושי</p>
     </div>

     <div className="grid grid-cols-2 gap-12 flex-grow max-h-[55vh] print:max-h-none">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between h-full print:border-slate-300">
            <div>
                <div className="flex items-start justify-between mb-5">
                    <div className="bg-rose-50 p-4 rounded-2xl print:border print:border-rose-100">
                        <Phone className="w-8 h-8 text-rose-400" />
                    </div>
                    <div className="bg-slate-50 px-4 py-1.5 rounded-full text-sm font-bold text-slate-600 border border-slate-200 print:border-slate-300">
                        הנדסה חברתית
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">2.1 הונאות "בזק" / שירות לקוחות</h3>
                <div className="text-slate-600 text-lg leading-relaxed space-y-3">
                    <p><strong>כיצד זה מבוצע?</strong> עבריינים יוצרים קשר טלפוני עם הלקוח, מתחזים לנציג שירות וטוענים לחוב דחוף. בדרך זו הם מוציאים במרמה את פרטי האשראי וקוד האימות.</p>
                    <p><strong>התוצאה:</strong> פתיחת חשבון PayBox חדש על שם הלקוח התמים וביצוע חיובים מיידיים.</p>
                    <div className="mt-2 inline-block font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl text-base print:border print:border-rose-200">פגיעה ממוקדת באוכלוסייה מבוגרת</div>
                </div>
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
                <div><span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">כמות מקרים</span><span className="text-2xl font-black text-slate-700">~24</span></div>
                 <div className="w-px h-10 bg-slate-200"></div>
                <div><span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">נזק כספי מטופל</span><span className="text-2xl font-black text-rose-500">₪64k</span></div>
            </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between h-full print:border-slate-300">
             <div>
                <div className="flex items-start justify-between mb-5">
                    <div className="bg-rose-50 p-4 rounded-2xl print:border print:border-rose-100">
                        <Utensils className="w-8 h-8 text-rose-400" />
                    </div>
                    <div className="bg-slate-50 px-4 py-1.5 rounded-full text-sm font-bold text-slate-600 border border-slate-200 print:border-slate-300">פישינג ממוקד</div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">2.2 הונאת "מסעדות"</h3>
                <div className="text-slate-600 text-lg leading-relaxed space-y-3">
                    <p><strong>כיצד זה מבוצע?</strong> הלקוח מקבל שיחה ממתחזה ל"מסעדה" דקה לאחר ביצוע הזמנה לגיטימית. נטען כי "התשלום לא עבר" ומבוקש קוד האימות לסיום העסקה.</p>
                    <p><strong>התוצאה:</strong> השתלטות מלאה על החשבון הקיים של הלקוח וביצוע עסקאות בלתי מורשות.</p>
                    <div className="mt-2 inline-block font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl text-base print:border print:border-rose-200">ניצול ציני של הלחץ וחוסר תשומת הלב</div>
                </div>
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
                <div><span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">כמות מקרים</span><span className="text-2xl font-black text-slate-700">~35</span></div>
                 <div className="w-px h-10 bg-slate-200"></div>
                <div><span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">נזק כספי מטופל</span><span className="text-2xl font-black text-rose-500">₪180k</span></div>
            </div>
        </div>
     </div>
  </div>
);

// 6. Chart (Enhanced with Insights and Refined Trend Arrow)
const ChartSlide = () => {
    const latestData = chartData[3];
    const prevData = chartData[2];

    // FORMATTED TO 1 DECIMAL PLACE
    const totalExposureM = (latestData.totalExposure / 1000000).toFixed(1);
    const prevExposureM = (prevData.totalExposure / 1000000).toFixed(1);
    const currentQuality = latestData.quality.toFixed(1);
    const prevQuality = prevData.quality.toFixed(1);
    const qualityDelta = (latestData.quality - prevData.quality).toFixed(1);
    const totalSaved = latestData.totalSaved;

    const CustomBarLabel = (props) => {
        const { x, y, width, index } = props;
        const dataPoint = chartData[index];
        // FORMATTED TO 1 DECIMAL PLACE
        const barTotalM = (dataPoint.totalExposure / 1000000).toFixed(1);
        const barQuality = dataPoint.quality.toFixed(1) + '%';

        return (
            <g>
                {/* Total Exposure - Above the bar */}
                <text x={x + width / 2} y={y - 25} fill="#1e293b" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="900">
                    ₪{barTotalM}M
                </text>
                <text x={x + width / 2} y={y - 8} fill="#64748b" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="600">
                    סה"כ הונאה
                </text>

                {/* Quality % - Floating inside the top segment */}
                <rect x={x + width / 2 - 28} y={y + 12} width="56" height="28" fill="#ffffff" rx="14" stroke="#e2e8f0" strokeWidth="1" />
                <text x={x + width / 2} y={y + 26} fill="#0ea5e9" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="900">
                    {barQuality}
                </text>
            </g>
        );
    };

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
            </div>
          </div>
        );
      }
      return null;
    };

    return (
    <div className="h-full flex flex-col px-8 overflow-hidden print:h-full print:px-6">
      <div className="w-full h-full flex flex-col origin-top transform scale-90 print:scale-100" style={{ transformOrigin: 'top center' }}>

          <div className="mb-3 flex justify-between items-end shrink-0">
              <div>
                  <h2 className="text-4xl font-bold text-slate-800 mb-2">נתוני מניעה ונזק - 2025</h2>
                  <p className="text-xl text-slate-500">סיכום מגמות, חשיפה ומניעה כספית</p>
              </div>
          </div>

          {/* Full Width Top Section: Insights */}
          <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl flex items-start gap-4 shrink-0 mb-4 shadow-sm print:border-sky-200">
              <div className="bg-sky-500 text-white p-3 rounded-xl shrink-0 mt-1 shadow-md">
                  <Zap className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                  <h4 className="font-bold text-sky-900 text-xl mb-1">תובנות מרכזיות</h4>
                  <ul className="text-sky-800 text-lg leading-snug space-y-1">
                      <li className="flex items-start gap-2">
                          <span className="text-sky-500 font-bold">•</span>
                          <span><strong>יציבות בחשיפה:</strong> היקף ההונאות הכללי נותר יציב ביחס לשנה שעברה, על אף המשך הגידול המשמעותי בהיקף הפעילות והשקת המוצרים החדשים.</span>
                      </li>
                      <li className="flex items-start gap-2">
                          <span className="text-sky-500 font-bold">•</span>
                          <span><strong>זינוק במניעה:</strong> מתוך סך החשיפה, החברה הצליחה להציל <strong>{formatCurrency(totalSaved)}</strong>. מדובר בשיפור של <strong>{qualityDelta}%</strong> באיכות המניעה ביחס לאשתקד.</span>
                      </li>
                  </ul>
              </div>
          </div>

          <div className="flex gap-6 flex-grow pb-1 min-h-0">

              {/* Chart Area (Left Side) */}
              <div className="w-3/4 flex flex-col gap-3 relative">
                  <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 flex-grow flex flex-col relative print:border-slate-300">

                      {/* Top centered text */}
                      <div className="flex justify-center mb-0 z-20 shrink-0 relative">
                          <div className="bg-emerald-50 px-5 py-1.5 rounded-full border border-emerald-100 shadow-sm whitespace-nowrap">
                              <span className="text-emerald-700 font-bold text-sm flex items-center gap-2">
                                  <TrendingUp className="w-4 h-4 transform rotate-180" />
                                  מגמת ירידה עקבית בהיקפי הונאה
                              </span>
                          </div>
                      </div>

                      {/* SVG Arrow Overlay */}
                      <div className="absolute top-[30px] left-[10%] right-[10%] bottom-[80px] pointer-events-none z-10">
                         <svg viewBox="0 0 1000 200" width="100%" height="100%" preserveAspectRatio="none" style={{overflow: 'visible'}}>
                            <defs>
                                <marker id="trendArrowElegant" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                                    <path d="M 0,0 L 8,4 L 0,8 Z" fill="#10b981" />
                                </marker>
                            </defs>
                            <path d="M 120,20 Q 500,40 880,100" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" markerEnd="url(#trendArrowElegant)" opacity="0.6"/>
                         </svg>
                      </div>

                      {/* Chart */}
                      <div className="flex-grow w-full min-h-[300px] mt-1">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={chartData} margin={{top: 45, right: 10, bottom: 5, left: 0}}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 16, fontWeight: 600}} dy={10} />
                                <YAxis yAxisId="left" hide={true} domain={[0, 'dataMax + 100000']} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />

                                <Bar yAxisId="left" dataKey="damage" name="נזק בפועל" stackId="a" fill={colors.chart.damage} radius={[0,0,6,6]} />
                                <Bar yAxisId="left" dataKey="savedCollection" name="גבייה" stackId="a" fill={colors.chart.savedCollection} />
                                <Bar yAxisId="left" dataKey="savedRetro" name="ניכוי יתרה" stackId="a" fill={colors.chart.savedRetro} />
                                <Bar yAxisId="left" dataKey="savedNear" name="מניעה אקטיבית" stackId="a" fill={colors.chart.savedNear} radius={[6,6,0,0]}>
                                    <LabelList dataKey="totalExposure" content={<CustomBarLabel />} />
                                </Bar>
                            </ComposedChart>
                          </ResponsiveContainer>
                      </div>

                      {/* Legend at the bottom */}
                      <div className="flex justify-center gap-6 text-sm font-medium mt-3 mb-0 bg-slate-50 px-6 py-2 rounded-xl border border-slate-100 w-fit mx-auto shrink-0 print:border-slate-200">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full print:border print:border-slate-400" style={{backgroundColor: colors.chart.damage}}></div>נזק בפועל</div>
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full print:border print:border-slate-400" style={{backgroundColor: colors.chart.savedCollection}}></div>גבייה</div>
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full print:border print:border-slate-400" style={{backgroundColor: colors.chart.savedRetro}}></div>ניכוי יתרה</div>
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full print:border print:border-slate-400" style={{backgroundColor: colors.chart.savedNear}}></div>מניעה אקטיבית</div>
                      </div>
                  </div>
              </div>

              {/* Highlight Metrics (Right Side) */}
              <div className="w-1/4 flex flex-col gap-5">
                  {/* Total Fraud Box */}
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-center relative overflow-hidden flex-1 print:border-slate-300">
                      <div className="absolute top-0 right-0 w-2 h-full bg-slate-800"></div>
                      <div className="text-slate-500 font-bold text-lg mb-2 flex items-center gap-2">
                          <Target className="w-5 h-5" /> סך ההונאה (חשיפה כוללת)
                      </div>
                      <div className="text-5xl lg:text-6xl font-black text-slate-800 mb-3">₪{totalExposureM}M</div>
                      <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-600 text-base leading-tight">
                          היקף דומה לשנה שעברה<br/>
                          <span className="text-sm font-medium text-slate-400">(ב-2024: ₪{prevExposureM}M)</span>
                      </div>
                  </div>

                  {/* Quality Box */}
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-center relative overflow-hidden flex-1 print:border-slate-300">
                      <div className="absolute top-0 right-0 w-2 h-full bg-sky-500"></div>
                      <div className="text-slate-500 font-bold text-lg mb-2 flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-sky-500" /> איכות המניעה
                      </div>
                      <div className="text-5xl lg:text-6xl font-black text-sky-600 mb-3">{currentQuality}%</div>
                      <div className="bg-sky-50 border border-sky-100 p-3 rounded-xl text-sky-800 text-base leading-tight">
                          <div className="flex items-center gap-2 font-bold mb-1">
                              <TrendingUp className="w-4 h-4" /> עליה של +{qualityDelta}%
                          </div>
                          <span className="text-sm font-medium opacity-80">שיפור משמעותי ביחס אשתקד (ב-2024: {prevQuality}%)</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    );
};

// 7. Embezzlement 2025
const EmbezzlementSlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden print:h-full print:px-8">
        <div className="mb-10 text-center shrink-0">
            <h2 className="text-4xl font-bold text-slate-800 mb-2 border-b-4 border-indigo-500 inline-block pb-2">ניהול סיכוני מעילות פנים - סיכום 2025</h2>
            <p className="text-slate-500 text-2xl">חיזוק מעטפת ההגנה מבית ומניעת אי-סדרים</p>
        </div>
        <div className="grid grid-cols-3 gap-8 flex-grow max-h-[50vh] min-h-0">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full overflow-hidden print:border-slate-300 print:shadow-none">
                <div className="flex items-center gap-4 mb-5 shrink-0"><div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors print:border print:border-indigo-200"><Scale className="w-7 h-7 text-indigo-600" /></div><h3 className="text-xl font-bold text-slate-800">מדיניות ונהלים</h3></div>
                <ul className="text-slate-600 text-lg leading-relaxed space-y-4 flex-grow overflow-y-auto">
                    <li>• ביצוע עדכון מקיף ויסודי לנוהל מהימנות עובדים בארגון.</li>
                    <li>• החמרת הקריטריונים הנדרשים לסיווג עובדים לתפקידים רגישים ("רמה א׳").</li>
                    <li>• שילוב מערך של בדיקות נאותות מוגברות ומבחני מהימנות טרם כניסה לתפקיד.</li>
                </ul>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full overflow-hidden print:border-slate-300 print:shadow-none">
                <div className="flex items-center gap-4 mb-5 shrink-0"><div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors print:border print:border-indigo-200"><ShieldAlert className="w-7 h-7 text-indigo-600" /></div><h3 className="text-xl font-bold text-slate-800">מיפוי ובקרה</h3></div>
                <ul className="text-slate-600 text-lg leading-relaxed space-y-4 flex-grow overflow-y-auto">
                    <li>• עריכת מיפוי של תהליכי הליבה בארגון ואיתור מוקדי סיכון פוטנציאליים למעילות.</li>
                    <li>• יישום עקרון בסיסי של הפרדת סמכויות (Segregation of Duties) במערכות המידע.</li>
                    <li>• כתיבה ויישום תוכנית סדורה להפחתת חשיפות קיימות והטמעת בקרות מפצות.</li>
                </ul>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full overflow-hidden print:border-slate-300 print:shadow-none">
                <div className="flex items-center gap-4 mb-5 shrink-0"><div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors print:border print:border-indigo-200"><GraduationCap className="w-7 h-7 text-indigo-600" /></div><h3 className="text-xl font-bold text-slate-800">תרבות ומודעות</h3></div>
                <ul className="text-slate-600 text-lg leading-relaxed space-y-4 flex-grow overflow-y-auto">
                    <li>• העברת הדרכות ייעודיות לצוותים אופרטיביים הנמצאים במוקדי סיכון גבוה.</li>
                    <li>• חיזוק מערך האתיקה הארגונית והטמעת מנגנוני דיווח אנונימיים ובטוחים.</li>
                    <li>• פעילות אקטיבית להטמעת תרבות של "אפס סובלנות" בנושאי מעילות ואי-סדרים.</li>
                </ul>
            </div>
        </div>
    </div>
);

// 8. Transition to 2026
const SectionTransitionSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center bg-gradient-to-br from-sky-600 to-indigo-800 print:h-full print:w-full print:bg-white print:border-8 print:border-sky-600 animate-fadeIn">
        <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-md print:bg-sky-100 print:border print:border-sky-200">
            <Compass className="w-14 h-14 text-white print:text-sky-600" />
        </div>
        <h1 className="text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg print:text-slate-800 print:drop-shadow-none">מבט קדימה</h1>
        <h2 className="text-4xl text-sky-100 font-medium print:text-slate-500">מיקודים לשנת 2026</h2>
    </div>
);

// 9. Outlook 2026
const FutureOutlookSlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden print:h-full print:px-8">
        <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 border-r-8 border-sky-400 pr-6">מיקודים לשנת 2026</h2>
            <p className="text-slate-500 text-2xl">התאמת תפיסת ההפעלה לאיומים ולסביבה הטכנולוגית המשתנה</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow max-h-[65vh] print:max-h-none">

            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-lg transform hover:scale-105 transition duration-300 flex flex-col print:border-slate-300 print:shadow-none">
                <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"><CreditCard className="w-8 h-8 text-emerald-500" /></div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">מוצרים ושירותים חדשים</h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                    שימת דגש על איתור ולמידה של מתווי הונאה חדשים בסביבת המוצרים המתרחבת. בניית מעטפת הגנה ובקרות מותאמות לשירותים החדשים, ביניהם: העברות תשלום בזמן אמת (RTP), שירותי ערבויות, וחשבונות קטינים (PayBox Young).
                </p>
            </div>

            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-lg transform hover:scale-105 transition duration-300 flex flex-col print:border-slate-300 print:shadow-none">
                <div className="bg-sky-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"><Sparkles className="w-8 h-8 text-sky-500" /></div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">בינה מלאכותית (AI)</h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                    שילוב נרחב ומשמעותי של כלים מבוססי בינה מלאכותית ולמידת מכונה (Machine Learning) כחלק אינטגרלי מתהליכי הניטור, האיתור והזיהוי המהיר של הונאות מורכבות במערכות החברה.
                </p>
            </div>

            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-lg transform hover:scale-105 transition duration-300 flex flex-col print:border-slate-300 print:shadow-none">
                <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"><Eye className="w-8 h-8 text-indigo-500" /></div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">ניהול סיכוני פנים (מעילות)</h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                    הטמעת בקרות טכנולוגיות אוטומטיות לזיהוי "התעוררות" חשודה של חשבונות ללא פעילות (Dormant Accounts). בנוסף, בחינה מחודשת של נוהל המהימנות והגדלת תדירות חובת הפוליגרף לעובדים בתפקידים רגישים.
                </p>
            </div>
        </div>
    </div>
);

// 10. Thank You
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
    const [isPrintMode, setIsPrintMode] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState(true);
    const [newCommentPos, setNewCommentPos] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('checking'); 
    const containerRef = useRef(null);

    const slides = [
        { component: <TitleSlide />, label: "פתיחה" },
        { component: <ContextSlide />, label: "רקע ומטרות" },
        { component: <OperatingConceptSlide />, label: "תפיסת ההפעלה" },
        { component: <FraudStrategySlide />, label: "סוגי הונאות 2025" },
        { component: <TrendsSlide />, label: "מגמות ודוגמאות הונאה" },
        { component: <ChartSlide />, label: "נתוני מניעה ונזק" },
        { component: <EmbezzlementSlide />, label: "סיכוני מעילות 2025" },
        { component: <SectionTransitionSlide />, label: "מעבר ל-2026" },
        { component: <FutureOutlookSlide />, label: "מיקודים ל-2026" },
        { component: <ThankYouSlide />, label: "סיום" },
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isAuthenticated || isPrintMode) return;
            if (e.key === 'ArrowLeft') setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
            else if (e.key === 'ArrowRight') setCurrentSlide(prev => Math.max(prev - 1, 0));
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAuthenticated, isPrintMode, slides.length]);

    const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
    const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    const handleContainerContextMenu = (e) => {
        if (!commentsVisible || isPrintMode) return;
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setNewCommentPos({ x, y });
    };

    if (!isAuthenticated) return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;

    if (isPrintMode) {
        return (
            <div className="bg-white min-h-screen font-sans p-0 m-0" dir="rtl" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                <style>{`
                    @media print {
                        @page { size: landscape; margin: 0; }
                        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; margin: 0; padding: 0; }
                        .no-print { display: none !important; }
                        * { box-shadow: none !important; text-shadow: none !important; filter: none !important; }
                        .print-slide { break-after: always; page-break-after: always; width: 297mm; height: 210mm; overflow: hidden; display: flex; flex-direction: column; }
                        .print-scale-90 { transform: scale(0.9); transform-origin: center; width: 100%; height: 100%; }
                        .print-border { border: 1px solid #cbd5e1 !important; }
                        .print-no-shadow { box-shadow: none !important; }
                    }
                `}</style>
                <div className="fixed top-4 right-4 z-50 flex gap-4 no-print">
                    <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all"><Printer className="w-5 h-5" />הדפס / שמור כ-PDF</button>
                    <button onClick={() => setIsPrintMode(false)} className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-full shadow-md transition-all"><X className="w-5 h-5" />חזור למצגת</button>
                </div>
                <div className="flex flex-col">
                    {slides.map((slide, index) => (
                        <div key={index} className="print-slide relative w-screen h-screen overflow-hidden bg-white border-b-2 border-slate-100 print:border-none">
                            <div className="absolute top-4 left-6 text-slate-300 text-sm font-bold z-10">{index + 1} / {slides.length} • {APP_VERSION}</div>
                            <div className="w-full h-full print-scale-90">{slide.component}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-100 p-8 overflow-hidden font-sans" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
            <div className="bg-white w-[98vw] h-[92vh] rounded-[3.5rem] shadow-2xl border border-white/60 relative overflow-hidden flex flex-col">
                <div className="w-full h-3 bg-sky-50"><div className="h-full bg-sky-500 transition-all duration-700 ease-in-out" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div></div>
                <div className="flex-grow relative overflow-hidden" ref={containerRef} onContextMenu={handleContainerContextMenu}>
                    <CommentsLayer slideIndex={currentSlide} isVisible={commentsVisible} containerRef={containerRef} newCommentPos={newCommentPos} setNewCommentPos={setNewCommentPos} onStatusChange={setConnectionStatus} />
                    {slides[currentSlide].component}
                </div>
                <div className="h-28 bg-white border-t border-slate-50 flex items-center justify-between px-16 shrink-0">
                    <div className="text-slate-400 text-xl font-medium flex gap-4"><span>שקף {currentSlide + 1} מתוך {slides.length} | {slides[currentSlide].label}</span></div>
                    <div className="flex gap-6 items-center">
                        <div className="flex items-center gap-2 ml-4 cursor-pointer hover:opacity-80 transition" title={connectionStatus === 'cloud' ? 'מחובר לענן' : 'מצב מקומי (לחץ לניסיון חיבור)'} onClick={() => window.location.reload()}>
                            {connectionStatus === 'cloud' ? 
                                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold border border-emerald-100"><Cloud className="w-3 h-3" /> Online</div> : 
                                <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-1 rounded-lg text-xs font-bold border border-orange-100"><CloudOff className="w-3 h-3" /> Local</div>
                            }
                        </div>
                        <button onClick={() => setCommentsVisible(!commentsVisible)} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-semibold mr-2 ${commentsVisible ? 'text-sky-600 bg-sky-50' : 'text-slate-400 bg-slate-50'}`} title="הערות"><MessageCircle className="w-5 h-5" /></button>
                        <button onClick={() => setIsPrintMode(true)} className="flex items-center gap-2 text-sky-600 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl transition-all font-semibold mr-4" title="הכן להדפסה"><Printer className="w-5 h-5" /><span className="hidden md:inline">הכן להדפסה / PDF</span></button>
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