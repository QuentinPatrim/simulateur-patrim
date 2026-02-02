"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Home, ArrowRight, Phone, MapPin, X, Mail, Building2, Wallet, PiggyBank, Stamp, Coins, CheckCircle2, AlertTriangle, Info, BedDouble, Square, MapPinned, Loader2, ArrowUpRight, Warehouse, Car, TrendingUp, Receipt, TrendingDown, Activity } from "lucide-react";

// --- UTILITAIRES ---

function AnimatedNumber({ value, currency = true, percentage = false }: { value: number; currency?: boolean, percentage?: boolean }) {
  return (
    <span>
      {new Intl.NumberFormat("fr-FR", {
        style: percentage ? "percent" : (currency ? "currency" : "decimal"),
        currency: "EUR",
        maximumFractionDigits: percentage ? 2 : 0,
        minimumFractionDigits: percentage ? 2 : 0,
      }).format(value)}
    </span>
  );
}

const BubbleInput = ({ label, value, onChange, suffix, icon: Icon }: any) => (
  <div className="flex flex-col gap-2 group w-full">
    <label className="text-xs uppercase tracking-[0.15em] text-zinc-500 font-bold ml-4 group-focus-within:text-[#d35f52] transition-colors">{label}</label>
    <div className="relative flex items-center bg-zinc-900/40 backdrop-blur-xl border border-white/5 ring-1 ring-black/20 rounded-2xl px-5 py-5 shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all duration-300 focus-within:border-[#d35f52]/50 focus-within:bg-zinc-900/80 group-hover:border-white/10">
      {Icon && <Icon size={24} className="text-zinc-500 mr-4 group-focus-within:text-[#d35f52] transition-colors opacity-80 min-w-[24px]" />}
      <input 
        type="number" 
        value={value === 0 ? "" : value} 
        onChange={(e) => onChange(Number(e.target.value))} 
        className="w-full bg-transparent text-zinc-100 text-2xl font-medium focus:outline-none placeholder-zinc-700 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" 
        placeholder="0" 
      />
      {suffix && <span className="text-[#d35f52] font-bold ml-2 opacity-90 text-lg">{suffix}</span>}
    </div>
  </div>
);

const BubbleSliderRow = ({ label, value, min, max, step, onChange, unit }: any) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return (
      <div className="flex flex-col gap-4 p-5 md:p-6 bg-zinc-900/40 rounded-2xl border border-white/5 ring-1 ring-black/20 hover:border-white/10 transition-all">
        <div className="flex justify-between items-center">
            <label className="text-sm uppercase tracking-[0.15em] text-zinc-400 font-bold">{label}</label>
            <div className="flex items-baseline gap-1 text-[#d35f52] font-bold">
                <span className="text-2xl">{value}</span>
                <span className="text-sm text-[#d35f52]/70">{unit}</span>
            </div>
        </div>
        <div className="relative w-full h-8 flex items-center group cursor-pointer">
          <div className="absolute w-full h-3 bg-black/40 rounded-full shadow-inner border border-white/5 overflow-hidden"><div className="absolute h-full bg-gradient-to-r from-[#8a0e01] to-[#d35f52]" style={{ width: `${percentage}%` }} /></div>
          <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="absolute w-full h-full opacity-0 z-20 cursor-grab active:cursor-grabbing" />
          <div className="absolute h-7 w-7 bg-zinc-100 rounded-full shadow-lg border-[3px] border-[#8a0e01] z-10 pointer-events-none flex items-center justify-center transition-transform group-hover:scale-110" style={{ left: `calc(${percentage}% - 14px)` }}><div className="w-2 h-2 bg-[#8a0e01] rounded-full" /></div>
        </div>
      </div>
    );
};

const InfoBlock = ({ icon: Icon, label, value, highlight = false, isPercent = false }: any) => (
    <div className={`p-5 rounded-2xl border ring-1 ring-black/20 flex flex-col justify-between min-h-[110px] ${highlight ? 'bg-[#8a0e01]/10 border-[#8a0e01]/30' : 'bg-zinc-900/40 border-white/5'}`}>
        <div className="flex items-center gap-3 mb-2 opacity-80"><Icon size={20} className={highlight ? "text-[#d35f52]" : "text-zinc-500"} /><p className={`text-xs uppercase tracking-wider font-bold ${highlight ? "text-[#d35f52]" : "text-zinc-500"}`}>{label}</p></div>
        <p className={`text-xl md:text-2xl font-bold ${highlight ? "text-white" : "text-zinc-300"}`}><AnimatedNumber value={value} percentage={isPercent} /></p>
    </div>
);

const AdviceCard = ({ status, title, subtitle, message, advice }: { status: 'success' | 'warning' | 'danger' | 'info', title: string, subtitle: string, message: string, advice: string }) => {
    const colors = { 
        success: { border: 'border-green-500/30', bg: 'bg-green-950/20', icon: 'text-green-500', Icon: CheckCircle2 }, 
        warning: { border: 'border-orange-500/30', bg: 'bg-orange-950/20', icon: 'text-orange-500', Icon: AlertTriangle }, 
        danger: { border: 'border-red-500/30', bg: 'bg-red-950/20', icon: 'text-red-500', Icon: TrendingDown }, 
        info: { border: 'border-blue-500/30', bg: 'bg-blue-950/20', icon: 'text-blue-500', Icon: Info } 
    };
    const style = colors[status];
    const IconComponent = style.Icon;
    
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-8 rounded-3xl border ${style.border} ${style.bg} backdrop-blur-md overflow-hidden`}>
            <div className="p-6 border-b border-white/5">
                <div className="flex gap-4 items-center mb-2">
                    <div className={`p-2 rounded-full bg-white/5 ${style.icon}`}><IconComponent size={24} /></div>
                    <div>
                        <h4 className={`text-sm font-bold uppercase tracking-wider ${style.icon}`}>{title}</h4>
                        <p className="text-white font-medium text-lg">{subtitle}</p>
                    </div>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed mt-2">{message}</p>
            </div>
            <div className="p-4 bg-black/20 flex items-start gap-3">
                <div className="mt-1"><Info size={16} className="text-zinc-500" /></div>
                <p className="text-xs text-zinc-400 italic">💡 <span className="font-bold text-zinc-300">Conseil :</span> {advice}</p>
            </div>
        </motion.div>
    );
};

// --- CARTE BIEN IMMOBILIER ---
const PropertyCard = ({ property }: { property: any }) => {
    const hasImage = property.image && property.image.startsWith('http');
    let TypeIcon = Building2;
    if (property.title.includes("Maison")) TypeIcon = Home;
    if (property.title.includes("Parking")) TypeIcon = Car;
    if (property.title.includes("Local")) TypeIcon = Warehouse;

    return (
        <motion.a 
            href={property.url}
            target="_blank"
            rel="noopener noreferrer"
            layout
            className={`min-w-[300px] w-[300px] snap-center flex flex-col justify-between border border-white/5 hover:border-[#d35f52]/50 rounded-3xl p-7 shadow-xl group relative overflow-hidden transition-all duration-300 ${hasImage ? 'bg-black' : 'bg-zinc-900'}`}
        >
            {hasImage ? (
                <div className="absolute inset-0 z-0">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
                </div>
            ) : (
                <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[#d35f52] opacity-[0.05] blur-[50px] rounded-full pointer-events-none group-hover:opacity-10 transition-opacity"></div>
            )}

            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                    <div className="flex justify-between items-start mb-6">
                        {!hasImage ? (
                            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-[#d35f52] border border-white/5 group-hover:bg-[#d35f52] group-hover:text-white transition-colors duration-300"><TypeIcon size={24} /></div>
                        ) : (
                            <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-wide">Patrim</div>
                        )}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d35f52] text-white text-xs font-bold uppercase tracking-wide shadow-lg shadow-[#d35f52]/20">Vente</div>
                    </div>
                    <h4 className="text-base font-semibold text-white line-clamp-2 mb-3 drop-shadow-md leading-snug">{property.title}</h4>
                    <div className="text-3xl font-bold text-white tracking-tight flex items-baseline gap-1 drop-shadow-lg"><AnimatedNumber value={property.price} /></div>
                    <p className="text-sm text-zinc-400 font-medium flex items-center gap-2 mt-3"><MapPinned size={14} className="text-[#d35f52]" /> {property.location}</p>
                </div>
                <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex gap-4 text-sm text-zinc-300 font-medium">
                        {property.surface > 0 && (<div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5"><Square size={14} /> {property.surface}m²</div>)}
                        {property.rooms > 0 && (<div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5"><BedDouble size={14} /> T{property.rooms}</div>)}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black -mr-1 group-hover:scale-110 transition-transform shadow-lg"><ArrowUpRight size={20} strokeWidth={2.5} /></div>
                </div>
            </div>
        </motion.a>
    );
};

// --- MAIN PAGE ---

export default function PatrimPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'capacity' | 'project'>('capacity');
  
  // --- STATES ---
  const [income, setIncome] = useState(0);
  const [contribution, setContribution] = useState(0);
  const [propertyPrice, setPropertyPrice] = useState(0);
  const [duration, setDuration] = useState(25); 
  const [rate, setRate] = useState(3.8);

  // -- PARAMETRES INVESTISSEMENT --
  const [projectType, setProjectType] = useState<'principal' | 'rental'>('principal');
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [condoFees, setCondoFees] = useState(0); 
  const [propertyTax, setPropertyTax] = useState(0); 

  // -- RESULTATS --
  const [maxLoan, setMaxLoan] = useState(0);
  const [debtRatioDisplay, setDebtRatioDisplay] = useState(33);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [notaryFees, setNotaryFees] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [grossYield, setGrossYield] = useState(0); 
  const [netYield, setNetYield] = useState(0); 
  const [projectDebtRatio, setProjectDebtRatio] = useState(0);

  const [projectAnalysis, setProjectAnalysis] = useState<any>(null);
  
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [matchedProperties, setMatchedProperties] = useState<any[]>([]);
  const [isLoadingProps, setIsLoadingProps] = useState(true);

  // CHARGEMENT AUTOMATIQUE
  useEffect(() => {
    async function fetchProperties() {
        try {
            const res = await fetch(`/api/properties?t=${Date.now()}`);
            const data = await res.json();
            if(Array.isArray(data)) {
                setAllProperties(data);
            }
        } catch (e) {
            console.error("Erreur chargement biens", e);
        } finally {
            setIsLoadingProps(false);
        }
    }
    fetchProperties();
  }, []);

  // --- LOGIQUE FINANCIERE CENTRALISÉE ---
  useEffect(() => {
    // 1. CALCUL CAPACITÉ (Onglet 1)
    const debtRatio = 0.33;
    const maxMonthlyPayment = income * debtRatio;
    const r = rate / 100 / 12; 
    const n = duration * 12;
    
    let bankLoan = 0;
    if (income > 0) {
        bankLoan = r === 0 ? maxMonthlyPayment * n : maxMonthlyPayment * (1 - Math.pow(1 + r, -n)) / r;
    }
    const totalEnvelope = bankLoan + contribution;
    
    setMaxLoan(totalEnvelope);
    setDebtRatioDisplay(debtRatio * 100);

    // 2. SYNCHRO PRIX (Sens Unique Capacité -> Projet)
    if (activeTab === 'capacity' && totalEnvelope > 0) {
        const netPrice = totalEnvelope / 1.075;
        setPropertyPrice(Math.round(netPrice));
    }

    // 3. CALCUL DU PROJET EN TEMPS RÉEL
    const currentFees = propertyPrice * 0.075;
    const currentTotalCost = propertyPrice + currentFees;
    const currentLoanAmount = currentTotalCost - contribution;
    
    let currentMensualite = 0;
    if (currentLoanAmount > 0) {
        currentMensualite = (currentLoanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    // Mise à jour des states d'affichage
    setNotaryFees(currentFees);
    setTotalCost(currentTotalCost);
    setMonthlyPayment(currentMensualite);

    const currentProjectDebt = income > 0 ? (currentMensualite / income) * 100 : 0;
    setProjectDebtRatio(currentProjectDebt);

    // CALCULS RENTABILITÉ (Variables locales)
    let currentGrossYield = 0;
    let currentNetYield = 0;
    let currentCashflow = 0;

    if (projectType === 'rental' && currentTotalCost > 0) {
        const annualRent = monthlyRent * 12;
        currentGrossYield = (annualRent / currentTotalCost); 
        
        const annualCharges = (condoFees * 12) + propertyTax;
        currentNetYield = ((annualRent - annualCharges) / currentTotalCost);
        
        currentCashflow = monthlyRent - currentMensualite - condoFees - (propertyTax / 12);

        setGrossYield(currentGrossYield);
        setNetYield(currentNetYield);
    }

    // --- ANALYSE PÉDAGOGIQUE ET DOUCE ---
    const notaryCovered = contribution >= currentFees;

    if (propertyPrice > 0) {
        if (!notaryCovered) {
            setProjectAnalysis({ 
                status: 'danger', 
                title: 'Financement', 
                subtitle: 'Apport Insuffisant',
                message: `Les frais de notaire (${currentFees.toFixed(0)}€) doivent généralement être payés par l'apport.`,
                advice: 'Pour consolider votre dossier, envisagez d\'augmenter votre apport personnel.'
            });
        } else if (currentProjectDebt > 35) {
            setProjectAnalysis({ 
                status: 'danger', 
                title: 'Attention au budget', 
                subtitle: `Endettement à ${currentProjectDebt.toFixed(1)}%`,
                message: `La mensualité (${currentMensualite.toFixed(0)}€) pèse lourd dans votre budget. Les banques fixent souvent la limite autour de 35%.`,
                advice: 'Pour réduire ce taux, essayez d\'allonger la durée du crédit (ex: 25 ans) ou de revoir le montant du projet.'
            });
        } else if (projectType === 'principal') {
            setProjectAnalysis({ 
                status: 'success', 
                title: 'Projet Viable', 
                subtitle: `Endettement à ${currentProjectDebt.toFixed(1)}%`,
                message: `Votre situation financière semble permettre ce projet sereinement. Le taux d'effort est maîtrisé.`,
                advice: 'C\'est un profil rassurant pour les banques. Vous pouvez comparer les offres de crédit.'
            });
        } else {
            // MODE INVESTISSEUR
            if (monthlyRent === 0) {
                setProjectAnalysis({
                    status: 'info',
                    title: 'En attente',
                    subtitle: 'Loyer non renseigné',
                    message: 'Indiquez le loyer estimé pour calculer la rentabilité.',
                    advice: 'Regardez les prix du marché local pour une estimation réaliste.'
                });
            } else if (currentGrossYield > 0.10) {
                setProjectAnalysis({ 
                    status: 'warning', 
                    title: 'Rentabilité Atypique', 
                    subtitle: `Brut > ${(currentGrossYield*100).toFixed(1)}%`,
                    message: `Un rendement aussi élevé est rare. Vérifiez bien qu'il n'y a pas d'erreur dans le prix ou le loyer.`,
                    advice: 'Si les chiffres sont justes, assurez-vous de la qualité du quartier et de la demande locative.'
                });
            } else if (currentGrossYield > 0.07) {
                setProjectAnalysis({ 
                    status: 'success', 
                    title: 'Très Bon Rendement', 
                    subtitle: `Brut ${(currentGrossYield*100).toFixed(1)}%`,
                    message: `Une excellente performance. Le cashflow mensuel est positif (${currentCashflow.toFixed(0)}€).`,
                    advice: 'Ce type de bien est recherché. Validez bien les charges de copropriété.'
                });
            } else if (currentGrossYield > 0.04) {
                setProjectAnalysis({ 
                    status: 'success', 
                    title: 'Investissement Équilibré', 
                    subtitle: `Brut ${(currentGrossYield*100).toFixed(1)}%`,
                    message: `Rendement standard pour le secteur. L'effort d'épargne mensuel est de ${Math.abs(currentCashflow).toFixed(0)}€.`,
                    advice: 'C\'est un placement patrimonial classique : vous capitalisez grâce au crédit.'
                });
            } else {
                setProjectAnalysis({ 
                    status: 'warning', 
                    title: 'Rendement Modéré', 
                    subtitle: `Brut ${(currentGrossYield*100).toFixed(1)}%`,
                    message: `La rentabilité est faible. L'effort d'épargne demandé est important (${Math.abs(currentCashflow).toFixed(0)}€/mois).`,
                    advice: 'Pour améliorer la rentabilité, essayez de négocier le prix d\'achat.'
                });
            }
        }
    } else {
        setProjectAnalysis(null);
    }

    // FILTRAGE BIENS
    let targetPrice = activeTab === 'capacity' ? totalEnvelope / 1.075 : propertyPrice;
    
    if (allProperties.length > 0 && targetPrice > 50000) {
        const minPrice = targetPrice * 0.7; 
        const maxPrice = targetPrice * 1.3;
        const matches = allProperties.filter(p => p.price >= minPrice && p.price <= maxPrice).sort((a, b) => b.price - a.price);
        setMatchedProperties(matches);
    } else if (allProperties.length > 0 && income === 0 && propertyPrice === 0) {
        setMatchedProperties(allProperties);
    }

  }, [income, contribution, duration, rate, propertyPrice, allProperties, activeTab, projectType, monthlyRent, condoFees, propertyTax, maxLoan]);

  return (
    <main className="min-h-screen bg-[#191919] text-zinc-100 font-sans overflow-x-hidden selection:bg-[#8a0e01] selection:text-white relative">
      <style jsx global>{` .scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } `}</style>

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#8a0e01] opacity-10 blur-[150px] rounded-full mix-blend-screen" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#d35f52] opacity-10 blur-[120px] rounded-full mix-blend-screen" />
         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div animate={isContactOpen ? { scale: 0.95, opacity: 0.6, borderRadius: "2rem", y: -20, filter: "blur(2px)" } : { scale: 1, opacity: 1, borderRadius: "0rem", y: 0, filter: "blur(0px)" }} transition={{ type: "spring", stiffness: 200, damping: 25 }} className="relative z-10 h-full origin-top pb-40 min-h-screen" onClick={() => isContactOpen && setIsContactOpen(false)}>
        <div className="w-full max-w-md md:max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12">
            <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-white/5 pb-8">
                <div className="relative w-56 h-20 bg-gradient-to-br from-zinc-100 to-zinc-300 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.05)] border border-white/10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 pointer-events-none"></div>
                    <div className="relative w-48 h-14"><img src="/logo-patrim.png" alt="Patrim" className="w-full h-full object-contain p-1" /></div>
                </div>
                <div className="text-center md:text-right">
                    <h1 className="text-3xl md:text-4xl font-light text-white">Simulateur Immobilier<span className="text-[#d35f52]">.</span></h1>
                    <p className="text-zinc-500 text-sm md:text-base mt-2">Donnez vie à vos projet</p>
                </div>
            </header>

            <div className="flex justify-center mb-14">
                <div className="grid grid-cols-2 p-2 bg-zinc-900/60 rounded-full backdrop-blur-xl border border-white/5 ring-1 ring-black/20 w-full max-w-xl relative">
                    <button onClick={() => setActiveTab('capacity')} className="relative z-10 flex items-center justify-center gap-3 py-4 text-base font-medium transition-colors duration-200 outline-none" style={{ color: activeTab === 'capacity' ? 'white' : '#a1a1aa' }}>
                        <Wallet size={20} /> Ma Capacité
                        {activeTab === 'capacity' && (<motion.div layoutId="activePill" className="absolute inset-0 bg-gradient-to-b from-[#8a0e01] to-[#6a0a00] rounded-full shadow-[0_5px_20px_rgba(138,14,1,0.4)] border border-[#d35f52]/30 -z-10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />)}
                    </button>
                    <button onClick={() => setActiveTab('project')} className="relative z-10 flex items-center justify-center gap-3 py-4 text-base font-medium transition-colors duration-200 outline-none" style={{ color: activeTab === 'project' ? 'white' : '#a1a1aa' }}>
                        <Building2 size={20} /> Mon Projet
                        {activeTab === 'project' && (<motion.div layoutId="activePill" className="absolute inset-0 bg-gradient-to-b from-[#8a0e01] to-[#6a0a00] rounded-full shadow-[0_5px_20px_rgba(138,14,1,0.4)] border border-[#d35f52]/30 -z-10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />)}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* GAUCHE : INPUTS (ORDRE LOGIQUE) */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-zinc-800/20 backdrop-blur-md rounded-[2.5rem] border border-white/5 ring-1 ring-black/20 p-8 md:p-10">
                            
                            {/* EN-TETE */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                                <h3 className="text-2xl font-medium text-white flex items-center gap-4">
                                    <span className="flex items-center justify-center w-10 h-10 bg-[#8a0e01]/20 rounded-full text-[#d35f52]"><Calculator size={24} /></span> 
                                    {activeTab === 'capacity' ? 'Paramètres Financement' : 'Paramètres Acquisition'}
                                </h3>
                                {/* SWITCH PROJET */}
                                {activeTab === 'project' && (
                                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                                        <button onClick={() => setProjectType('principal')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${projectType === 'principal' ? 'bg-[#d35f52] text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>Résidence principale</button>
                                        <button onClick={() => setProjectType('rental')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${projectType === 'rental' ? 'bg-[#d35f52] text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>Investissement locatif</button>
                                    </div>
                                )}
                            </div>
                            
                            {/* BLOC 1 : LES CHIFFRES CLES (Revenus/Prix + Apport) - EN PREMIER */}
                            {activeTab === 'capacity' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <BubbleInput label="Revenus / Mois" value={income} onChange={setIncome} suffix="€" icon={Wallet} />
                                    <BubbleInput label="Apport Personnel" value={contribution} onChange={setContribution} suffix="€" icon={PiggyBank} />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-8 mb-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <BubbleInput label="Prix du Bien" value={propertyPrice} onChange={setPropertyPrice} suffix="€" icon={Home} />
                                        <BubbleInput label="Votre Apport" value={contribution} onChange={setContribution} suffix="€" icon={Wallet} />
                                    </div>
                                    
                                    {/* SECTION SPECIFIQUE INVESTISSEUR */}
                                    {projectType === 'rental' && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6 overflow-hidden">
                                            <div className="flex items-center gap-2 text-[#d35f52] font-bold text-xs uppercase tracking-widest">
                                                <div className="w-full h-px bg-[#d35f52]/30"></div><span>Données Locatives</span><div className="w-full h-px bg-[#d35f52]/30"></div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <BubbleInput label="Loyer Est." value={monthlyRent} onChange={setMonthlyRent} suffix="€" icon={TrendingUp} />
                                                <BubbleInput label="Copropriété/Mois" value={condoFees} onChange={setCondoFees} suffix="€" icon={Receipt} />
                                                <BubbleInput label="Taxe Foncière" value={propertyTax} onChange={setPropertyTax} suffix="€/an" icon={Building2} />
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {/* SEPARATEUR VISUEL */}
                            <div className="w-full h-px bg-white/5 mb-8"></div>

                            {/* BLOC 2 : LES CONDITIONS BANCAIRES (Durée / Taux) - EN SECOND */}
                            <div className="space-y-8 mb-8">
                                <BubbleSliderRow label="Durée du prêt" value={duration} min={10} max={30} step={1} onChange={setDuration} unit="ans" />
                                <BubbleSliderRow label="Taux d'intérêt" value={rate} min={1.0} max={6.0} step={0.1} onChange={setRate} unit="%" />
                            </div>

                            {/* BLOC 3 : DETAILS (Projet seulement) */}
                            {activeTab === 'project' && (
                                <>
                                    <div className="w-full h-px bg-white/5 mb-8"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InfoBlock icon={Stamp} label="Frais Notaire (7.5%)" value={notaryFees} />
                                        <InfoBlock icon={Coins} label="Coût Total Projet" value={totalCost} highlight={true} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* DROITE : RÉSULTATS */}
                    <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-8">
                        <div className="bg-zinc-800/30 backdrop-blur-xl rounded-[3rem] border border-white/10 ring-1 ring-black/20 p-10 md:p-12 text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8a0e01] opacity-20 blur-[80px] rounded-full pointer-events-none"></div>
                            
                            {activeTab === 'capacity' ? (
                                <>
                                    <p className="text-sm uppercase tracking-[0.2em] text-[#d35f52] font-bold mb-6 relative z-10">Enveloppe d'achat max</p>
                                    <div className="text-6xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl mb-10 relative z-10 flex justify-center items-baseline gap-2">
                                        <AnimatedNumber value={maxLoan} currency={false} /> <span className="text-4xl font-thin text-[#d35f52]">€</span>
                                    </div>
                                    <div className="flex justify-center gap-10 pt-8 border-t border-white/5 relative z-10">
                                        <div><p className="text-2xl font-bold text-white"><AnimatedNumber value={income * 0.33} /></p><p className="text-xs text-zinc-500 font-bold uppercase mt-1">Mensualité Max</p></div>
                                        <div className="w-px bg-white/5"></div>
                                        <div><p className="text-2xl font-bold text-white">{debtRatioDisplay}%</p><p className="text-xs text-zinc-500 font-bold uppercase mt-1">Endettement</p></div>
                                    </div>
                                </>
                            ) : (
                                <>  
                                    {/* MONITORING ENDETTEMENT (VISIBLE TOUT LE TEMPS DANS PROJET) */}
                                    <div className="mb-6 flex justify-center">
                                        <div className={`px-4 py-2 rounded-full border border-white/5 flex items-center gap-2 ${projectDebtRatio > 35 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                            <Activity size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Endettement Projet : {projectDebtRatio.toFixed(1)}%</span>
                                        </div>
                                    </div>

                                    {projectType === 'principal' ? (
                                        <>
                                            <div className="flex items-center justify-center gap-4 mb-6 opacity-80">
                                                <div className="p-2 bg-[#8a0e01] rounded-xl"><Building2 size={20} className="text-white"/></div>
                                                <p className="text-sm uppercase tracking-[0.2em] text-zinc-300 font-bold">Mensualité Estimée</p>
                                            </div>
                                            <div className="text-6xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl mb-8 relative z-10">
                                                <AnimatedNumber value={monthlyPayment} /> <span className="text-2xl text-zinc-400 font-thin">/ mois</span>
                                            </div>
                                            <div className="relative z-10 bg-black/30 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
                                                <p className="text-xs text-[#d35f52] font-bold mb-2 uppercase tracking-wide">Emprunt nécessaire</p>
                                                <p className="text-3xl font-bold text-white"><AnimatedNumber value={totalCost - contribution} /></p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-center gap-4 mb-6 opacity-80">
                                                <div className="p-2 bg-[#8a0e01] rounded-xl"><TrendingUp size={20} className="text-white"/></div>
                                                <p className="text-sm uppercase tracking-[0.2em] text-zinc-300 font-bold">Rentabilité</p>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                                                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                                                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Brute</p>
                                                    <p className="text-3xl font-bold text-white"><AnimatedNumber value={grossYield} percentage={true} /></p>
                                                </div>
                                                <div className="bg-[#8a0e01]/10 p-4 rounded-2xl border border-[#d35f52]/30">
                                                    <p className="text-[10px] text-[#d35f52] uppercase font-bold mb-1">Nette</p>
                                                    <p className="text-3xl font-bold text-white"><AnimatedNumber value={netYield} percentage={true} /></p>
                                                </div>
                                            </div>

                                            <div className="relative z-10 bg-black/30 p-4 rounded-3xl border border-white/5 backdrop-blur-md mb-2">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs text-zinc-400">Mensualité Crédit</span>
                                                    <span className="text-sm font-bold text-white"><AnimatedNumber value={monthlyPayment} /></span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-zinc-400">Cashflow Est. (Brut)</span>
                                                    <span className={`text-sm font-bold ${monthlyRent - monthlyPayment >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                        {monthlyRent - monthlyPayment > 0 ? '+' : ''}<AnimatedNumber value={monthlyRent - monthlyPayment} />
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    
                                    {/* COMPOSANT CONSEIL */}
                                    {projectAnalysis && <AdviceCard status={projectAnalysis.status} title={projectAnalysis.title} subtitle={projectAnalysis.subtitle} message={projectAnalysis.message} advice={projectAnalysis.advice} />}
                                </>
                            )}
                        </div>

                        {/* CAROUSEL BIENS */}
                        <div className="relative">
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h3 className="text-base font-bold text-white uppercase tracking-widest flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#8a0e01] animate-pulse"></span> {activeTab === 'capacity' ? 'Biens correspondants' : 'Biens similaires'}</h3>
                                <span className="text-xs text-zinc-500 bg-white/5 px-3 py-1.5 rounded-full font-medium">{isLoadingProps ? '...' : matchedProperties.length} biens</span>
                            </div>
                            <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
                                <AnimatePresence>
                                    {isLoadingProps ? (
                                        <div className="w-full flex justify-center py-8"><Loader2 className="animate-spin text-[#d35f52] w-8 h-8" /></div>
                                    ) : matchedProperties.length > 0 ? (
                                        matchedProperties.map((property) => (<PropertyCard key={property.id} property={property} />))
                                    ) : (
                                        <div className="w-full py-12 text-center text-zinc-500 text-base italic border border-dashed border-white/10 rounded-3xl bg-zinc-900/30 snap-center px-8">
                                            {income === 0 && propertyPrice === 0
                                                ? "Renseignez vos revenus ou un prix pour voir les opportunités." 
                                                : "Aucun bien ne correspond exactement à ces critères pour le moment."}
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
      </motion.div>

      <motion.div animate={{ y: isContactOpen ? 150 : 0, opacity: isContactOpen ? 0 : 1 }} className="fixed bottom-8 left-0 w-full px-4 z-40 flex justify-center pointer-events-none">
        <motion.button onClick={() => setIsContactOpen(true)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="pointer-events-auto w-full max-w-lg bg-gradient-to-b from-[#8a0e01] to-[#5a0900] text-white p-4 pl-8 pr-4 rounded-full shadow-[0_20px_40px_-10px_rgba(138,14,1,0.5),0_0_0_4px_rgba(20,20,20,1)] flex items-center justify-between border-t border-white/20 transition-all duration-300 outline-none group">
            <div className="flex items-center gap-4"><MapPin size={24} className="text-white drop-shadow-md" /><span className="font-bold text-xl tracking-wide text-shadow-sm">Contacter l'agence</span></div>
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#8a0e01] shadow-inner group-hover:scale-110 transition-transform"><ArrowRight size={28} strokeWidth={2.5} /></div>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isContactOpen && (
            <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsContactOpen(false)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-40" />
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} drag="y" dragConstraints={{ top: 0 }} onDragEnd={(_, info) => { if (info.offset.y > 100) setIsContactOpen(false); }} className="fixed bottom-0 left-0 w-full z-50 rounded-t-[3rem] bg-[#191919] border-t border-white/10 shadow-[0_-30px_80px_-20px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-[#d35f52] opacity-10 blur-[80px] pointer-events-none" />
                    <div className="w-full flex justify-center pt-6 pb-4 relative z-10" onClick={() => setIsContactOpen(false)}><div className="w-20 h-2 bg-zinc-700 rounded-full" /></div>
                    <div className="p-8 pb-28 md:p-10 md:pb-20 max-w-lg mx-auto relative z-10">
                        <button onClick={() => setIsContactOpen(false)} className="absolute top-6 right-6 p-4 bg-zinc-800/50 rounded-full text-zinc-400 hover:text-white border border-white/5 transition-colors"><X size={24} /></button>
                        <div className="text-center mb-12">
                            <div className="w-32 h-32 bg-gradient-to-br from-zinc-100 to-zinc-300 border border-white/10 ring-1 ring-black/20 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 pointer-events-none"></div>
                                <div className="relative w-28 h-16"><img src="/logo-patrim.png" alt="Logo" className="w-full h-full object-contain p-1" /></div>
                            </div>
                            <h3 className="text-3xl font-light text-white mb-3 tracking-wide">Agence Patrim</h3>
                        </div>
                        <div className="space-y-6">
                            <a href="tel:0561990808" className="group flex items-center gap-6 p-6 rounded-[2.5rem] bg-zinc-800/40 border border-white/5 hover:bg-black/30 hover:border-[#d35f52]/30 transition-all">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-900/40 to-green-950/20 text-green-400 flex items-center justify-center group-hover:from-green-500 group-hover:to-green-700 group-hover:text-white transition-all shadow-inner border border-white/5"><Phone size={28} /></div>
                                <div className="text-left"><p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5">Téléphone</p><p className="text-xl text-white font-bold tracking-wide">05 61 99 08 08</p></div><ArrowRight className="ml-auto text-zinc-600 group-hover:text-[#d35f52] group-hover:translate-x-2 transition-all" size={28} />
                            </a>
                            <a href="mailto:contact@patrim.fr" className="group flex items-center gap-6 p-6 rounded-[2.5rem] bg-zinc-800/40 border border-white/5 hover:bg-black/30 hover:border-[#d35f52]/30 transition-all">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-900/40 to-blue-950/20 text-blue-400 flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-700 group-hover:text-white transition-all shadow-inner border border-white/5"><Mail size={28} /></div>
                                <div className="text-left"><p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1.5">Email</p><p className="text-xl text-white font-bold tracking-wide">contact@patrim.com</p></div><ArrowRight className="ml-auto text-zinc-600 group-hover:text-[#d35f52] group-hover:translate-x-2 transition-all" size={28} />
                            </a>
                        </div>
                        <div className="mt-14 text-center"><p className="text-sm text-zinc-500 font-medium tracking-wider flex items-center justify-center gap-2 opacity-80"><MapPin size={16} className="text-[#d35f52]" />45 allée Jean Jaurès, 31000 Toulouse</p></div>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>
    </main>
  );
}