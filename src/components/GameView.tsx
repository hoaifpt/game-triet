import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { Level } from '../data/levels';
import { cn, normalizeAnswer } from '../lib/utils';

interface GameViewProps {
  level: Level;
  score: number;
  lives: number;
  timeLeft: number;
  onCorrect: () => void;
  onWrong: () => void;
  onUseHint: () => void;
  userName?: string;
  hintPenalty?: number;
  showHint?: boolean;
  onHintToggle?: (show: boolean) => void;
  timeLimit?: number;
}

export default function GameView({
  level,
  score,
  lives,
  timeLeft,
  onCorrect,
  onWrong,
  onUseHint,
  userName,
  hintPenalty = 0,
  showHint = false,
  onHintToggle,
  timeLimit = 60,
}: GameViewProps) {
  const [answer, setAnswer] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const rawImages = level.images && level.images.length ? level.images : (level.image ? [level.image] : []);
  const uniqueImages = rawImages.filter((img, idx) => rawImages.indexOf(img) === idx);
  const imageCount = uniqueImages.length;

  useEffect(() => {
    setAnswer('');
    setIsWrong(false);
    setSelectedImage(0);
  }, [level]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const normalizedInput = normalizeAnswer(answer);
    const normalizedMain = normalizeAnswer(level.answer);
    const aliases = (level as any).aliases || [];
    const normalizedAliases = aliases.map((a: string) => normalizeAnswer(a));

    if (normalizedInput === normalizedMain || normalizedAliases.includes(normalizedInput)) {
      onCorrect();
    } else {
      setIsWrong(true);
      onWrong();
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  // Determine grid layout based on image count
  const getImageGridClass = () => {
    switch (imageCount) {
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-2';
      default:
        return 'grid-cols-1';
    }
  };

  const getAspectRatio = () => {
    switch (imageCount) {
      case 2:
      case 3:
        return 'aspect-square';
      case 4:
        return 'aspect-video';
      default:
        return 'aspect-video';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col"
    >
      {/* Compact Level Header */}
      <div className="glass-card mx-4 mt-4 px-4 py-3 md:px-6 md:py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white/60 font-medium text-sm">Câu {level.id}</span>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-white font-semibold text-sm">{imageCount} hình gợi ý</span>
          </div>
          <div className="text-xs text-white/40">
            Mở gợi ý: −{hintPenalty} điểm
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-mono font-bold text-orange-300">{timeLeft}s</div>
            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                style={{ width: `${Math.max(0, (timeLeft / timeLimit) * 100)}%` }}
                className={cn(
                  'h-full transition-all',
                  timeLeft <= 10 ? 'bg-red-400' : 'bg-orange-400'
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Image Grid & Preview - Scrollable Container */}
      <div className="flex-1 flex flex-col min-h-0 mx-4 my-4 overflow-hidden">
        <div className="glass-card p-3 md:p-4 flex flex-col h-full overflow-hidden">
          {/* Thumbnails: horizontal scroll, thumbnails show full image (contain) */}
          <div className="w-full shrink-0 overflow-x-auto overflow-y-hidden py-1">
            <div className="flex gap-3 items-start">
              {uniqueImages.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    'flex-none rounded-lg overflow-hidden border-2 transition-all duration-300 bg-white/5',
                    selectedImage === idx
                      ? 'border-orange-400 ring-2 ring-orange-400/30 shadow-[0_0_15px_rgba(251,146,60,0.18)]'
                      : 'border-white/10 hover:border-orange-400/50'
                  )}
                  style={{ width: 220, height: 120 }}
                >
                  <img
                    src={img}
                    alt={`Gợi ý ${idx + 1}`}
                    className="w-full h-full object-contain bg-white/3 p-1"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Selected image preview */}
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10 flex-1 min-h-0 flex flex-col overflow-hidden"
          >
            <p className="text-xs text-white/50 mb-2 font-semibold shrink-0">Hình được chọn:</p>
            <div className="relative rounded-lg overflow-hidden border border-orange-400/30 bg-black/20 flex-1 min-h-0 max-h-[55vh] md:max-h-[70vh] flex items-center justify-center">
              <img
                src={uniqueImages[selectedImage]}
                alt={`Hình ${selectedImage + 1}`}
                className="max-h-[50vh] md:max-h-[65vh] max-w-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Answer Input Area */}
      <form onSubmit={handleSubmit} className="glass-card mx-4 mb-4 p-3 md:p-4 space-y-3 shrink-0">
        <div>
          <label className="text-xs text-white/60 block mb-2 font-semibold">Nhập câu trả lời</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.toUpperCase())}
              placeholder="Nhập đáp án..."
              className={cn(
                "flex-1 bg-white/5 border border-white/20 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-bold tracking-wider uppercase text-sm",
                isWrong && "animate-shake border-red-500/50 ring-red-500/30"
              )}
            />
            <button
              type="submit"
              disabled={!answer.trim()}
              className="bg-gradient-to-r from-orange-400 to-orange-600 px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold hover:from-orange-500 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap"
            >
              <Send className="w-3 md:w-4 h-3 md:h-4" />
              <span className="hidden sm:inline">TRẢ LỜI</span>
              <span className="sm:hidden">OK</span>
            </button>
          </div>
        </div>
      </form>

      {/* Hint Info */}
      <div className="text-xs text-white/50 px-4 pb-2 text-center shrink-0">
        {showHint ? (
          <div className="glass-card mx-4 p-3 rounded-lg text-left text-sm text-white/80">
            <strong>Gợi ý:</strong>
            <p className="mt-1 text-xs text-white/70">{level.hint}</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              onUseHint();
              onHintToggle?.(true);
            }}
            className="underline text-orange-300 hover:text-orange-400"
          >
            Mở gợi ý (−{hintPenalty} điểm)
          </button>
        )}
      </div>
    </motion.div>
  );
}
