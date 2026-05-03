import '@testing-library/jest-dom';
import { vi } from 'vitest';

// JSDOM doesn't implement scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();
