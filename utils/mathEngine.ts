import * as math from 'mathjs';

type AngleMode = 'DEG' | 'RAD' | 'GRAD';

const toRad = (mode: AngleMode): string => {
  if (mode === 'DEG') return '* (pi / 180)';
  if (mode === 'GRAD') return '* (pi / 200)';
  return ''; // RAD — no conversion
};

const fromRad = (mode: AngleMode): string => {
  if (mode === 'DEG') return '* (180 / pi)';
  if (mode === 'GRAD') return '* (200 / pi)';
  return '';
};

/**
 * Rewrites the expression so trig functions respect the current angle mode.
 * e.g. in DEG mode:  sin(30)  →  sin(30 * (pi/180))
 *                    asin(0.5) →  asin(0.5) * (180/pi)
 */
function applyAngleMode(expr: string, mode: AngleMode): string {
  if (mode === 'RAD') return expr;

  const conv = toRad(mode);
  const inv  = fromRad(mode);

  // Forward trig: sin, cos, tan — wrap their argument
  let result = expr.replace(/\b(sin|cos|tan)\s*\(/g, (_, fn) => `${fn}(`);

  // We need to inject the conversion INSIDE the parens.
  // Strategy: replace sin( → sin_DEG( then define sin_DEG in scope.
  // Simpler: do a token-level replacement using a helper that wraps the arg.
  // Easiest robust approach — use mathjs custom functions in a scope.
  return result; // handled via scope below
}

export function calculate(expression: string, angleMode: AngleMode = 'RAD'): string {
  try {
    // Clean up display symbols
    let expr = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√\(/g, 'sqrt(')
      .replace(/∛\(/g, 'cbrt(')
      .replace(/sin⁻¹\(/g, 'asin(')
      .replace(/cos⁻¹\(/g, 'acos(')
      .replace(/tan⁻¹\(/g, 'atan(')
      .replace(/×10\^/g, '*10^')
      .replace(/(\d)([a-zA-Z])/g, '$1*$2'); // implicit multiply: 2x → 2*x

    if (angleMode !== 'RAD') {
      const factor = angleMode === 'DEG' ? 'pi/180' : 'pi/200';
      const invFactor = angleMode === 'DEG' ? '180/pi' : '200/pi';

      // Forward trig: convert argument from DEG/GRAD to RAD
      expr = expr
        .replace(/\bsin\s*\(([^)]+)\)/g, `sin(($1)*(${factor}))`)
        .replace(/\bcos\s*\(([^)]+)\)/g, `cos(($1)*(${factor}))`)
        .replace(/\btan\s*\(([^)]+)\)/g, `tan(($1)*(${factor}))`);

      // Inverse trig: convert result from RAD back to DEG/GRAD
      expr = expr
        .replace(/\basin\s*\(([^)]+)\)/g, `(asin($1)*(${invFactor}))`)
        .replace(/\bacos\s*\(([^)]+)\)/g, `(acos($1)*(${invFactor}))`)
        .replace(/\batan\s*\(([^)]+)\)/g, `(atan($1)*(${invFactor}))`);
    }

    const result = math.evaluate(expr);

    if (typeof result === 'number') {
      if (!isFinite(result)) return 'Math Error';
      // Show up to 10 significant figures, strip trailing zeros
      return parseFloat(result.toPrecision(10)).toString();
    }

    return result.toString();
  } catch {
    return 'Syntax Error';
  }
}