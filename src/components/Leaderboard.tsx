import { motion } from 'motion/react';
import { Trophy, RotateCw, Medal } from 'lucide-react';
import { cn } from '../lib/utils';

interface LeaderboardProps {
  entries: { name: string; score: number }[];
  currentScore: number;
  userName: string;
  onRestart: () => void;
}

export default function Leaderboard({ entries, currentScore, userName, onRestart }: LeaderboardProps) {
  // Determine the user's rank for the current score. If exact match not found,
  // fall back to the player's highest score on the board (first occurrence).
  let userRank = entries.findIndex(e => e.name === userName && e.score === currentScore) + 1;
  if (!userRank) {
    const idx = entries.findIndex(e => e.name === userName);
    userRank = idx >= 0 ? idx + 1 : 0;
  }

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return "text-yellow-400 border-yellow-400/50";
      case 1: return "text-slate-300 border-slate-300/50";
      case 2: return "text-amber-600 border-amber-600/50";
      default: return "text-white/40 border-white/10";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-xl w-full"
    >
      <div className="glass-card p-10 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent" />

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-display font-bold">Bảng Xếp Hạng & Kết Quả</h2>
          <p className="text-orange-400 font-medium">Top Sinh Viên</p>
        </div>

        <div className="space-y-3">
          {entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center"
            >
              <Trophy className="w-12 h-12 mx-auto mb-4 text-white/20" />
              <p className="text-white/60 text-lg font-medium">Chưa có ai chơi</p>
              <p className="text-white/40 text-sm mt-2">Hãy bắt đầu từ đầu</p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-12 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white/30">
                <div className="col-span-2">Rank</div>
                <div className="col-span-7">Tên Sinh Viên</div>
                <div className="col-span-3 text-right">Điểm</div>
              </div>

              <div className="space-y-2">
                {entries.map((entry, index) => (
                  <motion.div
                    key={`${entry.name}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "grid grid-cols-12 items-center px-6 py-3 rounded-lg border bg-white/5 transition-all",
                      getRankColor(index),
                      entry.name === userName && "ring-2 ring-orange-500/50 bg-orange-500/5"
                    )}
                  >
                    <div className="col-span-2 flex items-center gap-2">
                      <span className="font-bold">{index + 1}</span>
                      {index < 3 && <Medal className="w-4 h-4" />}
                    </div>
                    <div className="col-span-7 font-medium text-white">{entry.name}</div>
                    <div className="col-span-3 text-right font-mono font-bold text-white">
                      {entry.score.toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="pt-6 space-y-6 text-center border-t border-white/10">
          <div className="space-y-1">
            <p className="text-sm font-bold uppercase tracking-widest text-white/40">Game Over</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <p className="text-white/60">Điểm Số Của Bạn: <span className="text-white font-bold">{currentScore}</span></p>
              <p className="text-white/60">Hạng Hiện Tại: <span className="text-orange-400 font-bold">{userRank || '-'}</span></p>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="group relative px-12 py-4 bg-linear-to-r from-orange-400 to-orange-600 rounded-full font-bold shadow-lg shadow-orange-500/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <div className="relative flex items-center justify-center gap-2">
              <RotateCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>CHƠI LẠI</span>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
