import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Play } from 'lucide-react';
import { cn } from '../lib/utils';

interface HomeProps {
  onStart: (name: string) => void;
  onShowLeaderboard: () => void;
}

export default function Home({ onStart, onShowLeaderboard }: HomeProps) {
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);

  return (
    <div className="bg-home w-full rounded-lg p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center space-y-12 px-4"
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            Đuổi Hình Bắt Chữ <br />
            <span className="text-3xl md:text-5xl">Triết Học Mác-Lênin</span>
          </h1>
          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
        </div>

        <div className="glass-card p-8 md:p-12 space-y-8 relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="space-y-6 text-left relative">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-4">Tên Sinh Viên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập Tên Sinh Viên của bạn..."
                className="w-full bg-white/5 border border-orange-500/30 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-white/20"
              />
              {touched && !name.trim() && (
                <p className="text-xs text-red-400 mt-1">Vui lòng nhập tên trước khi bắt đầu.</p>
              )}
            </div>

            <button
              onClick={() => {
                setTouched(true);
                if (name.trim()) onStart(name.trim());
              }}
              className="w-full bg-linear-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-4 rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group transition-all"
              disabled={!name.trim()}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>BẮT ĐẦU CHƠI</span>
            </button>
          </div>
        </div>

        <button
          onClick={onShowLeaderboard}
          className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-all text-sm font-medium flex items-center gap-2 mx-auto"
        >
          <Trophy className="w-4 h-4 text-orange-400" />
          <span>Bảng Xếp Hạng</span>
        </button>
      </motion.div>
    </div>
  );
}
