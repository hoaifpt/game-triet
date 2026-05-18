/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { GameStatus, LEVELS, Level } from './data/levels';
import Home from './components/Home';
import GameView from './components/GameView';
import VictoryModal from './components/VictoryModal';
import Leaderboard from './components/Leaderboard';
import { Heart } from 'lucide-react';
import { cn } from './lib/utils';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState<GameStatus>(GameStatus.HOME);
  const [userName, setUserName] = useState('');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const PER_QUESTION_TIME = 60; // seconds per question
  const [questionTimeLeft, setQuestionTimeLeft] = useState(PER_QUESTION_TIME);
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([
    { name: 'Nguyễn Văn A', score: 9500 },
    { name: 'Trần Thị B', score: 8800 },
    { name: 'Lê Văn C', score: 8200 },
    { name: 'Phạm Quốc D', score: 7500 },
    { name: 'Hoàng Mai E', score: 7000 },
  ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === GameStatus.PLAYING && questionTimeLeft > 0) {
      timer = setInterval(() => {
        setQuestionTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (questionTimeLeft === 0 && status === GameStatus.PLAYING) {
      // time's up for this question -> treat as wrong
      handleWrongAnswer();
    }
    return () => clearInterval(timer);
  }, [status, questionTimeLeft]);

  const handleStartGame = (name: string) => {
    setUserName(name || 'Sinh viên');
    setScore(0);
    setLives(3);
    setQuestionTimeLeft(PER_QUESTION_TIME);
    setCurrentLevelIndex(0);
    setShowHint(false);
    setStatus(GameStatus.PLAYING);
  };

  const handleCorrectAnswer = () => {
    // Scoring rules:
    // +100 base for correct
    // +50 bonus if answered within first 10 seconds
    let points = 100;
    if (questionTimeLeft > PER_QUESTION_TIME - 10) {
      points += 50;
    }
    setScore((prev) => prev + points);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setStatus(GameStatus.CORRECT);
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
      setQuestionTimeLeft(PER_QUESTION_TIME);
      setShowHint(false);
      setStatus(GameStatus.PLAYING);
    } else {
      handleGameOver();
    }
  };

  const handleWrongAnswer = () => {
    // -10 points per wrong answer and reduce a life
    if (lives > 1) {
      setLives((prev) => prev - 1);
      setScore((prev) => Math.max(0, prev - 10));
      // reset per-question timer for next attempt on same level
      setQuestionTimeLeft(PER_QUESTION_TIME);
    } else {
      setLives(0);
      setScore((prev) => Math.max(0, prev - 10));
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    const newEntry = { name: userName, score };
    setLeaderboard((prev) => {
      const next = [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 5);
      try { localStorage.setItem('philosophy_leaderboard', JSON.stringify(next)); } catch { }
      return next;
    });
    setStatus(GameStatus.LEADERBOARD);
  };

  const handleUseHint = () => {
    // Only deduct points when first opening the hint
    if (!showHint) {
      const levelId = LEVELS[currentLevelIndex].id;
      let penalty = 15;
      if (levelId === 1) penalty = 5;
      else if (levelId === 2) penalty = 10;
      else if (levelId >= 3 && levelId <= 4) penalty = 15;
      else if (levelId >= 5 && levelId <= 6) penalty = 20;
      else if (levelId === 7) penalty = 25;
      else if (levelId >= 8) penalty = 30;
      setScore((prev) => Math.max(0, prev - penalty));
    }
    setShowHint((prev) => !prev);
  };

  // compute current level hint penalty for display
  const getHintPenalty = (levelId: number) => {
    if (levelId === 1) return 5;
    if (levelId === 2) return 10;
    if (levelId >= 3 && levelId <= 4) return 15;
    if (levelId >= 5 && levelId <= 6) return 20;
    if (levelId === 7) return 25;
    return 30;
  };

  const currentHintPenalty = getHintPenalty(LEVELS[currentLevelIndex].id);

  // load leaderboard from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('philosophy_leaderboard');
      if (raw) setLeaderboard(JSON.parse(raw));
    } catch { }
  }, []);

  // Get background class based on current status
  const getBackgroundClass = () => {
    switch (status) {
      case GameStatus.HOME:
        return 'bg-home';
      case GameStatus.PLAYING:
      case GameStatus.CORRECT:
        // Return level-specific background during gameplay
        const levelId = LEVELS[currentLevelIndex]?.id;
        const levelBgMap: { [key: number]: string } = {
          1: 'level-1-bg',
          2: 'level-2-bg',
          3: 'level-3-bg',
          4: 'level-4-bg',
          5: 'level-5-bg',
          6: 'level-6-bg',
          7: 'level-7-bg',
          8: 'level-8-bg',
        };
        return levelBgMap[levelId || 1] || 'bg-gameplay';
      case GameStatus.LEADERBOARD:
        return 'bg-leaderboard';
      default:
        return 'circuit-bg';
    }
  };

  const getVictoryBackgroundClass = () => {
    return status === GameStatus.CORRECT ? 'bg-victory' : '';
  };

  return (
    <div className={cn("h-screen flex overflow-hidden", getBackgroundClass())}>
      {/* Desktop sidebar */}
      <aside className="w-72 hidden md:flex flex-col gap-4 p-6 sidebar-shadow">
        <div className="glass-card p-4">
          {status === GameStatus.PLAYING ? (
            <>
              <div className="text-sm text-white/40">Người chơi</div>
              <div className="font-bold text-white text-lg">{userName || 'Sinh viên'}</div>

              <div className="mt-4">
                <div className="text-sm text-white/40">Score</div>
                <div className="text-2xl font-bold text-orange-400">{score.toString().padStart(3, '0')}</div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3].map((i) => (
                  <Heart
                    key={i}
                    className={cn("w-6 h-6 transition-all", i <= lives ? "fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "text-white/20")}
                  />
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={() => setStatus(GameStatus.LEADERBOARD)}
                  className="w-full px-3 py-2 rounded-full border border-white/10 text-sm text-white/90 hover:bg-white/5"
                >
                  Bảng xếp hạng
                </button>
                <button
                  onClick={() => setStatus(GameStatus.HOME)}
                  className="w-full px-3 py-2 rounded-full border border-white/10 text-sm text-white/90 hover:bg-white/5"
                >
                  Trang chủ
                </button>
              </div>

              {/* Hint Section */}
              <button
                onClick={handleUseHint}
                className="mt-6 w-full px-4 py-3 rounded-xl border-2 border-orange-400/50 hover:border-orange-400 bg-linear-to-br from-orange-400/10 to-orange-400/5 transition-all hover:shadow-[0_0_15px_rgba(251,146,60,0.2)]"
              >
                <div className="text-xs text-orange-300 font-semibold mb-1">💡 MỞ GỢI Ý</div>
                <div className="text-xs text-orange-400/70">−{getHintPenalty(LEVELS[currentLevelIndex].id)} điểm</div>
              </button>

              {/* Hint Content */}
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mt-4 rounded-xl border border-orange-400/30 bg-linear-to-br from-orange-400/15 to-orange-400/5 p-4 overflow-hidden"
                >
                  <div className="flex items-start gap-2">
                    <div className="text-orange-300 mt-0.5">💭</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-orange-200 uppercase tracking-wide mb-2">Gợi ý cho câu {LEVELS[currentLevelIndex].id}</p>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {LEVELS[currentLevelIndex].hint}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="text-sm text-white/40">Sẵn sàng chơi?</div>
              <button
                onClick={() => setStatus(GameStatus.HOME)}
                className="w-full px-3 py-2 rounded-full border border-white/10 text-sm text-white/90 hover:bg-white/5"
              >
                Bắt đầu
              </button>
              <button
                onClick={() => setStatus(GameStatus.LEADERBOARD)}
                className="w-full px-3 py-2 rounded-full border border-white/10 text-sm text-white/90 hover:bg-white/5"
              >
                Bảng xếp hạng
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile header / toggle */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg bg-white/6 hover:bg-white/8 text-white/90 backdrop-blur"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* mobile sidebar (drawer) */}
      {
        sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="w-64 p-6">
              <div className="glass-card p-4 h-full relative">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
                {status === GameStatus.PLAYING ? (
                  <>
                    <div className="text-sm text-white/40">Người chơi</div>
                    <div className="font-bold text-white text-lg">{userName || 'Sinh viên'}</div>
                    <div className="mt-4">
                      <div className="text-sm text-white/40">Score</div>
                      <div className="text-2xl font-bold text-orange-400">{score.toString().padStart(3, '0')}</div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      {[1, 2, 3].map((i) => (
                        <Heart
                          key={i}
                          className={cn("w-6 h-6 transition-all", i <= lives ? "fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "text-white/20")}
                        />
                      ))}
                    </div>
                    <div className="mt-6 flex flex-col gap-2">
                      <button
                        onClick={() => { setStatus(GameStatus.LEADERBOARD); setSidebarOpen(false); }}
                        className="w-full px-3 py-2 rounded-full border border-white/10 text-sm text-white/90 hover:bg-white/5"
                      >
                        Bảng xếp hạng
                      </button>
                      <button
                        onClick={() => { setStatus(GameStatus.HOME); setSidebarOpen(false); }}
                        className="w-full px-3 py-2 rounded-full border border-white/10 text-sm text-white/90 hover:bg-white/5"
                      >
                        Trang chủ
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-sm text-white/40">Sẵn sàng chơi?</div>
                    <button
                      onClick={() => { setStatus(GameStatus.HOME); setSidebarOpen(false); }}
                      className="w-full px-3 py-2 rounded-full border border-white/10 text-sm text-white/90 hover:bg-white/5"
                    >
                      Bắt đầu
                    </button>
                    <button
                      onClick={() => { setStatus(GameStatus.LEADERBOARD); setSidebarOpen(false); }}
                      className="w-full px-3 py-2 rounded-full border border-white/10 text-sm text-white/90 hover:bg-white/5"
                    >
                      Bảng xếp hạng
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1" onClick={() => setSidebarOpen(false)} />
          </div>
        )
      }

      <main className="flex-1 overflow-auto p-6 flex items-center justify-center">
        <div className="w-full max-w-5xl">
          {status === GameStatus.PLAYING && (
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-white/60">Level {LEVELS[currentLevelIndex].id}</div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-white/40">Score</div>
                <div className="text-lg font-bold text-orange-400">{score.toString().padStart(3, '0')}</div>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {status === GameStatus.HOME && (
              <Home onStart={handleStartGame} onShowLeaderboard={() => setStatus(GameStatus.LEADERBOARD)} />
            )}

            {status === GameStatus.PLAYING && (
              <div className="mx-auto w-full">
                <GameView
                  level={LEVELS[currentLevelIndex]}
                  score={score}
                  lives={lives}
                  timeLeft={questionTimeLeft}
                  onCorrect={handleCorrectAnswer}
                  onWrong={handleWrongAnswer}
                  onUseHint={handleUseHint}
                  userName={userName}
                  hintPenalty={currentHintPenalty}
                />
              </div>
            )}

            {status === GameStatus.CORRECT && (
              <VictoryModal
                level={LEVELS[currentLevelIndex]}
                onNext={handleNextLevel}
              />
            )}

            {status === GameStatus.LEADERBOARD && (
              <Leaderboard
                entries={leaderboard}
                currentScore={score}
                userName={userName}
                onRestart={() => setStatus(GameStatus.HOME)}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div >
  );
}
