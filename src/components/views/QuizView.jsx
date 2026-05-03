import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Star, CheckCircle2, 
  XCircle, ChevronRight, RotateCcw, Award,
  Flame, Zap, Heart, Target
} from 'lucide-react';

export const QuizView = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = [
    {
      question: "What is the minimum age required to vote in India?",
      options: ["16 Years", "18 Years", "21 Years", "25 Years"],
      correct: 1,
      category: "Eligibility",
      explanation: "The voting age was lowered from 21 to 18 by the 61st Amendment Act in 1988."
    },
    {
      question: "What is the 'Silence Period' before an election?",
      options: ["12 Hours", "24 Hours", "48 Hours", "72 Hours"],
      correct: 2,
      category: "Procedures",
      explanation: "Campaigning must stop 48 hours before the conclusion of polling under Section 126 of the RPA."
    },
    {
      question: "Which of these is a violation of the Model Code of Conduct?",
      options: ["Discussing development", "Comparing party manifestos", "Using religious places for campaign", "Door-to-door visits"],
      correct: 2,
      category: "Ethics",
      explanation: "Using temples, mosques, or churches for election propaganda is strictly prohibited."
    },
    {
      question: "What does EPIC stand for in the context of voting?",
      options: ["Election Photo Identity Card", "Electronic Polling Identity Code", "Electoral Process Identity Certificate", "Essential People Identification Card"],
      correct: 0,
      category: "Documentation",
      explanation: "EPIC is the official photo identity card issued by the Election Commission of India."
    }
  ];

  const handleAnswer = (index) => {
    if (isAnswered || lives <= 0) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
      setLives(lives - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length && lives > 0) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setLives(3);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const progress = ((currentQuestion + (isAnswered ? 1 : 0)) / questions.length) * 100;

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Gamified Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <StatBox icon={<Heart size={16} color="var(--danger)" fill="var(--danger)" />} label="Lives" value={lives} />
          <StatBox icon={<Flame size={16} color="#ff4d00" fill="#ff4d00" />} label="Streak" value={streak} />
          <StatBox icon={<Star size={16} color="var(--warning)" fill="var(--warning)" />} label="XP" value={score * 150} />
        </div>
        <div style={{ textAlign: 'right' }}>
           <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>LEVEL 4 CITIZEN</div>
           <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>THE CONSTITUTIONALIST</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent))', boxShadow: '0 0 10px var(--primary-glow)' }}
        />
      </div>

      <AnimatePresence mode='wait'>
        {!showResults && lives > 0 ? (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel" 
            style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}
          >
            {/* Background Glow */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '200px', height: '200px', background: 'var(--primary-glow)', filter: 'blur(80px)', zIndex: 0, opacity: 0.5 }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                 <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', fontSize: '0.65rem', fontWeight: 800, border: '1px solid var(--primary-glow)' }}>
                   {questions[currentQuestion].category.toUpperCase()}
                 </span>
              </div>

              <h2 style={{ marginBottom: '32px', lineHeight: '1.4', fontSize: '1.6rem' }}>{questions[currentQuestion].question}</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {questions[currentQuestion].options.map((opt, i) => {
                  let status = 'default';
                  if (isAnswered) {
                    if (i === questions[currentQuestion].correct) status = 'correct';
                    else if (i === selectedAnswer) status = 'wrong';
                  }

                  return (
                    <QuizOption 
                      key={i}
                      text={opt}
                      status={status}
                      onClick={() => handleAnswer(i)}
                      disabled={isAnswered}
                    />
                  );
                })}
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: '32px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border)' }}
                  >
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px' }}>
                        <Award size={24} color="var(--primary)" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>CIVIC INSIGHT</div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{questions[currentQuestion].explanation}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                      <button className="glow-button" onClick={nextQuestion} style={{ padding: '12px 30px' }}>
                        {currentQuestion + 1 === questions.length ? 'See Results' : 'Next Mission'} <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel" 
            style={{ padding: '60px', textAlign: 'center' }}
          >
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 32px' }}>
               <div className="pulse" style={{ position: 'absolute', inset: 0, background: 'var(--warning)', borderRadius: '50%', opacity: 0.2 }}></div>
               <div style={{ position: 'absolute', inset: '10px', background: 'var(--warning)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 1 }}>
                  {lives <= 0 ? <XCircle size={48} /> : <Trophy size={48} />}
               </div>
            </div>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{lives <= 0 ? "Mission Failed" : "Level Up!"}</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
              {lives <= 0 ? "You ran out of lives. Review the ECI resources and try again!" : `You've earned the 'Constitutionalist' badge with ${score}/${questions.length} correct answers.`}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '48px' }}>
              <ResultStat icon={<Target size={20} />} label="Accuracy" value={`${(score/questions.length)*100}%`} />
              <ResultStat icon={<Zap size={20} />} label="Total XP" value={score * 150} />
              <ResultStat icon={<Trophy size={20} />} label="Badge" value={score === questions.length ? "Gold" : "Silver"} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button className="glow-button" style={{ background: 'var(--glass)', border: '1px solid var(--border)', padding: '14px 28px' }} onClick={resetQuiz}>
                <RotateCcw size={18} /> Restart Mission
              </button>
              <button className="glow-button" style={{ padding: '14px 32px' }}>Claim NFT Badge</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)' }}>
    {icon}
    <div style={{ textAlign: 'left' }}>
      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: '1rem', fontWeight: 800, lineHeight: 1 }}>{value}</div>
    </div>
  </div>
);

const QuizOption = ({ text, status, onClick, disabled }) => {
  let borderColor = 'var(--border)';
  let bg = 'rgba(255,255,255,0.03)';
  let color = 'white';

  if (status === 'correct') {
    borderColor = 'var(--success)';
    bg = 'rgba(16, 185, 129, 0.1)';
  } else if (status === 'wrong') {
    borderColor = 'var(--danger)';
    bg = 'rgba(239, 68, 68, 0.1)';
    color = 'var(--text-muted)';
  }

  return (
    <motion.button 
      whileHover={!disabled ? { scale: 1.02, x: 5 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className="glass-panel"
      style={{ 
        padding: '20px', textAlign: 'left', border: `1px solid ${borderColor}`, 
        background: bg, color: color, cursor: disabled ? 'default' : 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden'
      }}
    >
      <span style={{ fontWeight: 600, fontSize: '1rem' }}>{text}</span>
      {status === 'correct' && <CheckCircle2 size={20} color="var(--success)" />}
      {status === 'wrong' && <XCircle size={20} color="var(--danger)" />}
    </motion.button>
  );
};

const ResultStat = ({ icon, label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <div style={{ color: 'var(--primary)', display: 'flex', justifyContent: 'center' }}>{icon}</div>
    <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Outfit' }}>{value}</div>
    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>{label}</div>
  </div>
);
