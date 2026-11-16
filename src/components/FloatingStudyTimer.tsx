import React, { useState, useEffect, useRef } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Settings2,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Check,
} from 'lucide-react';

export const FloatingStudyTimer: React.FC = () => {
  // Default 60 minutes (3600 seconds) for the daily 1-hour session
  const [totalSeconds, setTotalSeconds] = useState<number>(60 * 60);
  const [secondsLeft, setSecondsLeft] = useState<number>(60 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeLabel, setActiveLabel] = useState<string>('Sesión 60m');

  const [customMin, setCustomMin] = useState<string>('25');
  const [customSec, setCustomSec] = useState<string>('00');

  const audioCtxRef = useRef<AudioContext | null>(null);

  const playAlertBeep = () => {
    if (!soundEnabled) return;
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch {
      // Ignore if browser blocks audio
    }
  };

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          playAlertBeep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, soundEnabled]);

  const applyPreset = (secs: number, label: string) => {
    setIsRunning(false);
    setTotalSeconds(secs);
    setSecondsLeft(secs);
    setActiveLabel(label);
    setShowCustomInput(false);
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = Math.max(0, Math.min(240, parseInt(customMin || '0', 10)));
    const secs = Math.max(0, Math.min(59, parseInt(customSec || '0', 10)));
    const total = Math.max(5, mins * 60 + secs);
    applyPreset(total, `Personalizado (${mins}m ${secs}s)`);
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progressPct =
    totalSeconds > 0
      ? Math.min(100, Math.max(0, ((totalSeconds - secondsLeft) / totalSeconds) * 100))
      : 0;

  // Minimized pill on the right edge
  if (isMinimized) {
    return (
      <div className="fixed right-3 top-20 z-40 flex items-center gap-1.5 rounded-2xl border-2 border-[#026937] bg-white/95 px-3 py-2 shadow-xl backdrop-blur-md dark:border-emerald-500 dark:bg-slate-900/95">
        <button
          onClick={() => setIsRunning(!isRunning)}
          title={isRunning ? 'Pausar' : 'Iniciar'}
          className={`flex h-7 w-7 items-center justify-center rounded-lg text-white transition ${
            isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#026937] hover:bg-[#02542c]'
          }`}
        >
          {isRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>

        <div
          onClick={() => setIsMinimized(false)}
          className="cursor-pointer px-1 text-left"
          title="Expandir temporizador"
        >
          <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
            {activeLabel}
          </span>
          <span className="font-mono text-sm font-extrabold text-slate-900 dark:text-white">
            {formatTime(secondsLeft)}
          </span>
        </div>

        <button
          onClick={() => setIsMinimized(false)}
          title="Expandir temporizador"
          className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <aside className="fixed right-4 top-20 z-40 w-64 rounded-2xl border-2 border-[#026937]/80 bg-white/95 p-4 shadow-2xl backdrop-blur-md transition-all dark:border-emerald-600/80 dark:bg-slate-900/95">
      {/* Header del Temporizador */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#026937] text-white">
            <Timer className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="block text-xs font-extrabold text-slate-900 dark:text-white">
              Reloj de Estudio
            </span>
            <span className="block text-[10px] font-semibold text-[#026937] dark:text-emerald-400">
              {activeLabel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Silenciar alerta' : 'Activar alerta sonora'}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            {soundEnabled ? (
              <Volume2 className="h-3.5 w-3.5 text-[#026937] dark:text-emerald-400" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            title="Configurar tiempo personalizado"
            className={`rounded-lg p-1 transition ${
              showCustomInput
                ? 'bg-emerald-100 text-[#026937] dark:bg-emerald-950 dark:text-emerald-300'
                : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800'
            }`}
          >
            <Settings2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            title="Minimizar a la derecha"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Pantalla Digital Principal */}
      <div className="my-3 rounded-xl bg-slate-50 py-3 text-center dark:bg-slate-800/80">
        <div
          className={`font-mono text-3xl font-extrabold tracking-tight ${
            secondsLeft === 0
              ? 'animate-bounce text-rose-600 dark:text-rose-400'
              : isRunning
              ? 'text-[#026937] dark:text-emerald-400'
              : 'text-slate-900 dark:text-white'
          }`}
        >
          {formatTime(secondsLeft)}
        </div>
        <div className="mx-3 mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-[#026937] transition-all duration-300 dark:bg-emerald-400"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Controles Play / Pause / Reset */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (secondsLeft === 0) setSecondsLeft(totalSeconds);
            setIsRunning(!isRunning);
          }}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold text-white shadow-sm transition ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600'
              : 'bg-[#026937] hover:bg-[#02542c]'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="h-3.5 w-3.5" /> Pausar
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" /> {secondsLeft === 0 ? 'Reiniciar' : 'Iniciar'}
            </>
          )}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(totalSeconds);
          }}
          title="Reiniciar reloj"
          className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Botones Rápidos de Bloques UdeA (15m / 35m / 10m / 60m / 2:15) */}
      <div className="mt-3">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Bloques Rápidos UdeA:
        </span>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          <button
            onClick={() => applyPreset(15 * 60, 'Teoría (15m)')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-700 hover:border-[#026937] hover:text-[#026937] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            15m Teo
          </button>
          <button
            onClick={() => applyPreset(35 * 60, 'Práctica (35m)')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-700 hover:border-[#026937] hover:text-[#026937] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            35m Prác
          </button>
          <button
            onClick={() => applyPreset(10 * 60, 'Bitácora (10m)')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-700 hover:border-[#026937] hover:text-[#026937] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            10m Bit
          </button>
          <button
            onClick={() => applyPreset(60 * 60, 'Sesión 60m')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-700 hover:border-[#026937] hover:text-[#026937] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            60m Total
          </button>
          <button
            onClick={() => applyPreset(135, '1 Preg UdeA (2:15)')}
            className="col-span-2 rounded-lg border border-amber-300 bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
          >
            2:15 (1 Preg UdeA)
          </button>
        </div>
      </div>

      {/* Configurador Personalizado */}
      {showCustomInput && (
        <form
          onSubmit={handleApplyCustom}
          className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800/70"
        >
          <span className="block text-[10px] font-bold text-slate-600 dark:text-slate-300">
            Tiempo personalizado (Min : Seg)
          </span>
          <div className="mt-1.5 flex items-center gap-1.5">
            <input
              type="number"
              min={0}
              max={240}
              value={customMin}
              onChange={(e) => setCustomMin(e.target.value)}
              placeholder="Min"
              className="w-16 rounded-lg border border-slate-300 bg-white px-2 py-1 text-center text-xs font-bold text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
            <span className="font-bold text-slate-400">:</span>
            <input
              type="number"
              min={0}
              max={59}
              value={customSec}
              onChange={(e) => setCustomSec(e.target.value)}
              placeholder="Seg"
              className="w-16 rounded-lg border border-slate-300 bg-white px-2 py-1 text-center text-xs font-bold text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#026937] py-1.5 text-xs font-bold text-white hover:bg-[#02542c]"
            >
              <Check className="h-3.5 w-3.5" /> Fijar
            </button>
          </div>
        </form>
      )}
    </aside>
  );
};

