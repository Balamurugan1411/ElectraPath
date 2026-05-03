import { describe, it, expect } from 'vitest';
import { analyzeMCC, getAIResponse } from '../src/services/AIEngine';

describe('AIEngine - MCC Analysis', () => {
  it('should flag bribery keywords', async () => {
    const result = await analyzeMCC("Give me money for your vote");
    expect(result.isClean).toBe(false);
    expect(result.metrics.bribery).toBeGreaterThan(0);
  });

  it('should pass for clean civic text', async () => {
    const result = await analyzeMCC("Please remember to bring your voter ID to the booth.");
    expect(result.isClean).toBe(true);
  });
});

describe('AIEngine - AI Response', () => {
  it('should provide booth information', async () => {
    const response = await getAIResponse("where is my booth?");
    expect(response).toContain("booth");
  });

  it('should provide polling date', async () => {
    const response = await getAIResponse("when is the election?");
    expect(response).toContain("May 15, 2026");
  });
});
