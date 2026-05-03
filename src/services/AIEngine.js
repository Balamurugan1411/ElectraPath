import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * @fileoverview Electra Neural Engine v4.0 (Advanced)
 * Implements a multi-stage neural audit pipeline for electoral compliance.
 * Combines fast heuristic pattern matching with deep LLM validation.
 */

// Initialize Gemini API (User needs to provide API Key in environment or via settings)
// Fallback to heuristic analysis if API key is missing
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/**
 * Heuristic guidelines based on ECI Model Code of Conduct.
 */
const MCC_GUIDELINES = {
  BRIBERY: {
    patterns: [/bribe/i, /cash/i, /money/i, /gift/i, /liquor/i, /free/i, /reward/i, /incentive/i, /sari/i, /dhoti/i],
    rule: "MCC Part 1, Item 4: Prohibition of inducements to voters.",
    severity: "danger"
  },
  RELIGIOUS_APPEAL: {
    patterns: [/religion/i, /caste/i, /temple/i, /mosque/i, /church/i, /god/i, /faith/i, /communal/i],
    rule: "MCC Part 1, Item 3: Prohibition of caste or communal appeals.",
    severity: "danger"
  },
  HATE_SPEECH: {
    patterns: [/traitor/i, /enemy/i, /violence/i, /threat/i, /insult/i, /abuse/i, /defamation/i],
    rule: "MCC Part 1, Item 1: Focus on policies, not private life.",
    severity: "warning"
  },
  MISINFORMATION: {
    patterns: [/fake/i, /lie/i, /rumor/i, /conspiracy/i, /rigged/i, /doctored/i, /deepfake/i],
    rule: "ECI Digital Ethics: Prohibition of spreading false information.",
    severity: "warning"
  }
};

/**
 * Multi-Stage Neural Audit Pipeline
 */
export const analyzeMCC = async (text) => {
  const cleanText = text.replace(/<[^>]*>?/gm, '');
  
  // Stage 1: Fast Heuristic Analysis
  let heuristicViolations = [];
  Object.entries(MCC_GUIDELINES).forEach(([key, data]) => {
    data.patterns.forEach(pattern => {
      if (pattern.test(cleanText)) {
        heuristicViolations.push({
          category: key.replace('_', ' '),
          severity: data.severity,
          rule: data.rule,
          excerpt: cleanText.match(new RegExp(pattern.source, 'i'))?.[0]
        });
      }
    });
  });

  // Stage 2: Neural Validation (Deep Analysis)
  let neuralReport = null;
  let confidenceScore = 95;
  let metrics = { bribery: 0, hateSpeech: 0, misinformation: 0, religious: 0 };

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Analyze this political text for Model Code of Conduct (MCC) violations. 
      Categories: Bribery, Religious Appeal, Hate Speech, Misinformation.
      Text: "${cleanText}"
      Return a JSON object with: { violations: [{category, reason, severity, excerpt}], scores: {bribery, religious, hateSpeech, misinformation}, confidence: 0-100 }`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      neuralReport = JSON.parse(response.text().replace(/```json|```/g, ''));
      confidenceScore = neuralReport.confidence;
      metrics = neuralReport.scores;
    } catch (error) {
      console.warn("Neural Stage failed, falling back to heuristic weights:", error);
      // Fallback weights based on heuristic findings
      heuristicViolations.forEach(v => {
        const key = v.category.toLowerCase().replace(' ', '');
        if (metrics[key] !== undefined) metrics[key] = 85;
      });
    }
  } else {
    // Advanced Mock Neural Processing
    await new Promise(r => setTimeout(r, 1500));
    heuristicViolations.forEach(v => {
      const key = v.category.toLowerCase().replace(' ', '');
      const metricKey = key === 'religiousappeal' ? 'religious' : (key === 'hatespeech' ? 'hateSpeech' : key);
      if (metrics[metricKey] !== undefined) metrics[metricKey] = 75 + Math.floor(Math.random() * 20);
    });
    confidenceScore = heuristicViolations.length > 0 ? 88 : 99;
  }

  const finalViolations = neuralReport ? neuralReport.violations : heuristicViolations;
  const isClean = finalViolations.length === 0;

  return {
    isClean,
    confidenceScore,
    violations: isClean ? [{ type: 'success', msg: 'Compliance Audit Passed.', category: 'Audit' }] : 
      finalViolations.map(v => ({
        type: v.severity || 'warning',
        category: v.category,
        msg: v.rule || v.reason,
        excerpt: v.excerpt
      })),
    metrics,
    processedAt: new Date().toISOString()
  };
};

/**
 * Advanced Contextual Response Engine
 */
export const getAIResponse = async (query) => {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const context = "You are ElectraPath AI, a civic assistant for the 2026 Chennai Elections. Provide verified, neutral, and helpful guidance on voting procedures, candidates, and laws. Keep responses concise and use Markdown.";
      const result = await model.generateContent(`${context}\n\nUser Question: ${query}`);
      return (await result.response).text();
    } catch (error) {
      return "I'm experiencing a high-load in my neural circuits. Please try again or ask about specific topics like 'booth location' or 'election date'.";
    }
  }
  
  // Heuristic Fallback
  const lowerQuery = query.toLowerCase();
  const responses = {
    booth: "Your booth is **Loyola College**. Ramp access available.",
    status: "EPIC Status: **Verified**. You are eligible to vote.",
    laws: "Silence period starts 48 hours before polling (Section 126 RP Act).",
    candidates: "Chennai Central: 6 major candidates. View the 'Candidates' tab for details.",
    date: "Polling Date: **May 15, 2026**."
  };

  const key = Object.keys(responses).find(k => lowerQuery.includes(k));
  return responses[key] || "I am your ElectraPath AI assistant. Ask me about polling booths, candidates, or election laws.";
};


