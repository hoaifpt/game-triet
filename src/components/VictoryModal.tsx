import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, BookOpen, Lightbulb } from 'lucide-react';
import { Level } from '../data/levels';

interface VictoryModalProps {
  level: Level;
  onNext: () => void;
}

export default function VictoryModal({ level, onNext }: VictoryModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Victory Background with Golden Stars Effect */}
      <div className="absolute inset-0 bg-victory z-0" />
      <div className="absolute inset-0 z-0 backdrop-blur-sm" />

      <div className="relative w-full z-10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-500/15 via-sky-500/10 to-transparent blur-2xl" />

        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/8 shadow-[0_24px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl w-[min(1100px,95vw)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_28%)]" />
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:18px_18px]" />

          <div className="relative p-6 md:p-10 space-y-6 md:space-y-8">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/45">
              <span>Success Flashcard Modal</span>
              <span>{level.id.toString().padStart(2, '0')}</span>
            </div>

            <div className="flex justify-center -mt-2">
              <motion.div
                initial={{ y: 14, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/30 shadow-[0_0_30px_rgba(74,222,128,0.35)]"
              >
                <CheckCircle2 className="h-9 w-9 text-emerald-300" />
              </motion.div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide text-white">ĐÚNG RỒI!</h2>
              <p className="text-white/70 text-sm md:text-base">
                Từ khóa chính xác: <span className="font-bold text-white tracking-wider">{level.answer}</span>
              </p>
            </div>

            <div className="mx-auto h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 items-start">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8">
                <div className="flex items-center gap-2 text-orange-300">
                  <BookOpen className="h-5 w-5" />
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em]">Định nghĩa</h3>
                </div>
                <p className="mt-3 text-sm md:text-[15px] leading-7 text-white/82">
                  {level.definition}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8">
                <div className="flex items-center gap-2 text-sky-300">
                  <Lightbulb className="h-5 w-5" />
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em]">Ứng dụng thực tế</h3>
                </div>
                <p className="mt-3 text-sm md:text-[15px] leading-7 text-white/82">
                  {level.application}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={onNext}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-amber-300 via-yellow-400 to-orange-400 px-10 py-3.5 md:px-12 md:py-4 font-bold text-[#1b1200] shadow-[0_10px_30px_rgba(245,158,11,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="text-lg md:text-xl">Tiếp tục</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
