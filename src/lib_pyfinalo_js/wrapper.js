import raw from './dist/_raw.js';

// Extract pyfinalo from the first stage output and re-export it directly
export const pyfinalo = raw.pyfinalo;
export default pyfinalo;
