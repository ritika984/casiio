export interface Formula {
  name: string;
  formula: string;
  variables: string;
  category: string;
  result?: string;
  expr?: string;
  inputs?: { symbol: string; label: string }[];
}

export const formulaCategories = [
  'Mathematics', 'Physics', 'Chemistry', 'Engineering', 'Statistics', 'Geometry', 'Trigonometry', 'Finance',
];

export const formulas: Formula[] = [
  // ─── Mathematics ───
  { category: 'Mathematics', name: 'Quadratic Formula', formula: 'x = (-b ± √(b²-4ac)) / 2a', variables: 'a, b, c = coefficients' },
  { category: 'Mathematics', name: 'Binomial Theorem', formula: '(a+b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ', variables: 'a,b = terms, n = power' },
  { category: 'Mathematics', name: 'Sum of AP', formula: 'S = n/2 × (2a + (n-1)d)', variables: 'a = first term, d = common diff, n = terms', result: 'S', expr: '(n/2) * (2*a + (n-1)*d)', inputs: [{ symbol: 'n', label: 'number of terms' }, { symbol: 'a', label: 'first term' }, { symbol: 'd', label: 'common difference' }] },
  { category: 'Mathematics', name: 'nth term of AP', formula: 'aₙ = a + (n-1)d', variables: 'a = first term, d = common diff', result: 'aₙ', expr: 'a + (n-1)*d', inputs: [{ symbol: 'a', label: 'first term' }, { symbol: 'n', label: 'n (term number)' }, { symbol: 'd', label: 'common difference' }] },
  { category: 'Mathematics', name: 'Sum of GP', formula: 'S = a(rⁿ - 1) / (r - 1)', variables: 'a = first term, r = ratio, n = terms', result: 'S', expr: 'a * (r^n - 1) / (r - 1)', inputs: [{ symbol: 'a', label: 'first term' }, { symbol: 'r', label: 'common ratio' }, { symbol: 'n', label: 'number of terms' }] },
  { category: 'Mathematics', name: 'nth term of GP', formula: 'aₙ = a × rⁿ⁻¹', variables: 'a = first term, r = ratio', result: 'aₙ', expr: 'a * r^(n-1)', inputs: [{ symbol: 'a', label: 'first term' }, { symbol: 'r', label: 'common ratio' }, { symbol: 'n', label: 'term number' }] },
  { category: 'Mathematics', name: 'Permutation', formula: 'P(n,r) = n! / (n-r)!', variables: 'n = total, r = selected', result: 'P', expr: 'factorial(n) / factorial(n - r)', inputs: [{ symbol: 'n', label: 'total items (n)' }, { symbol: 'r', label: 'items selected (r)' }] },
  { category: 'Mathematics', name: 'Combination', formula: 'C(n,r) = n! / (r!(n-r)!)', variables: 'n = total, r = selected', result: 'C', expr: 'factorial(n) / (factorial(r) * factorial(n - r))', inputs: [{ symbol: 'n', label: 'total items (n)' }, { symbol: 'r', label: 'items selected (r)' }] },
  { category: 'Mathematics', name: 'Logarithm Change of Base', formula: 'logₐb = log b / log a', variables: 'a = base, b = argument', result: 'log', expr: 'log(b) / log(a)', inputs: [{ symbol: 'a', label: 'base (a)' }, { symbol: 'b', label: 'argument (b)' }] },
  { category: 'Mathematics', name: "Euler's Formula", formula: 'eⁱˣ = cos x + i sin x', variables: 'x = angle in radians' },
  { category: 'Mathematics', name: 'AM-GM Inequality', formula: 'AM ≥ GM: (a+b)/2 ≥ √(ab)', variables: 'a, b = positive numbers', result: 'AM', expr: '(a + b) / 2', inputs: [{ symbol: 'a', label: 'value a' }, { symbol: 'b', label: 'value b' }] },

  // ─── Geometry ───
  { category: 'Geometry', name: 'Area of Circle', formula: 'A = πr²', variables: 'r = radius', result: 'A', expr: 'pi * r^2', inputs: [{ symbol: 'r', label: 'radius (r)' }] },
  { category: 'Geometry', name: 'Circumference', formula: 'C = 2πr', variables: 'r = radius', result: 'C', expr: '2 * pi * r', inputs: [{ symbol: 'r', label: 'radius (r)' }] },
  { category: 'Geometry', name: 'Area of Triangle', formula: 'A = ½ × b × h', variables: 'b = base, h = height', result: 'A', expr: '0.5 * b * h', inputs: [{ symbol: 'b', label: 'base (b)' }, { symbol: 'h', label: 'height (h)' }] },
  { category: 'Geometry', name: "Heron's Formula", formula: 'A = √(s(s-a)(s-b)(s-c))', variables: 's = (a+b+c)/2', result: 'A', expr: 'sqrt(s*(s-a)*(s-b)*(s-c))', inputs: [{ symbol: 'a', label: 'side a' }, { symbol: 'b', label: 'side b' }, { symbol: 'c', label: 'side c' }, { symbol: 's', label: 'semi-perimeter s=(a+b+c)/2' }] },
  { category: 'Geometry', name: 'Area of Rectangle', formula: 'A = l × w', variables: 'l = length, w = width', result: 'A', expr: 'l * w', inputs: [{ symbol: 'l', label: 'length (l)' }, { symbol: 'w', label: 'width (w)' }] },
  { category: 'Geometry', name: 'Area of Trapezoid', formula: 'A = ½(a+b) × h', variables: 'a,b = parallel sides, h = height', result: 'A', expr: '0.5 * (a + b) * h', inputs: [{ symbol: 'a', label: 'parallel side a' }, { symbol: 'b', label: 'parallel side b' }, { symbol: 'h', label: 'height (h)' }] },
  { category: 'Geometry', name: 'Volume of Sphere', formula: 'V = (4/3)πr³', variables: 'r = radius', result: 'V', expr: '(4/3) * pi * r^3', inputs: [{ symbol: 'r', label: 'radius (r)' }] },
  { category: 'Geometry', name: 'Surface Area of Sphere', formula: 'SA = 4πr²', variables: 'r = radius', result: 'SA', expr: '4 * pi * r^2', inputs: [{ symbol: 'r', label: 'radius (r)' }] },
  { category: 'Geometry', name: 'Volume of Cylinder', formula: 'V = πr²h', variables: 'r = radius, h = height', result: 'V', expr: 'pi * r^2 * h', inputs: [{ symbol: 'r', label: 'radius (r)' }, { symbol: 'h', label: 'height (h)' }] },
  { category: 'Geometry', name: 'Volume of Cone', formula: 'V = (1/3)πr²h', variables: 'r = radius, h = height', result: 'V', expr: '(1/3) * pi * r^2 * h', inputs: [{ symbol: 'r', label: 'radius (r)' }, { symbol: 'h', label: 'height (h)' }] },
  { category: 'Geometry', name: 'Pythagorean Theorem', formula: 'c² = a² + b²', variables: 'a,b = legs, c = hypotenuse', result: 'c', expr: 'sqrt(a^2 + b^2)', inputs: [{ symbol: 'a', label: 'leg a' }, { symbol: 'b', label: 'leg b' }] },
  { category: 'Geometry', name: 'Distance Formula', formula: 'd = √((x₂-x₁)² + (y₂-y₁)²)', variables: '(x₁,y₁), (x₂,y₂) = points', result: 'd', expr: 'sqrt((x2 - x1)^2 + (y2 - y1)^2)', inputs: [{ symbol: 'x1', label: 'x₁' }, { symbol: 'y1', label: 'y₁' }, { symbol: 'x2', label: 'x₂' }, { symbol: 'y2', label: 'y₂' }] },
  { category: 'Geometry', name: 'Slope Formula', formula: 'm = (y₂-y₁)/(x₂-x₁)', variables: 'Two points on line', result: 'm', expr: '(y2 - y1) / (x2 - x1)', inputs: [{ symbol: 'x1', label: 'x₁' }, { symbol: 'y1', label: 'y₁' }, { symbol: 'x2', label: 'x₂' }, { symbol: 'y2', label: 'y₂' }] },
  { category: 'Geometry', name: 'Midpoint Formula', formula: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)', variables: 'Two points' },

  // ─── Trigonometry ───
  { category: 'Trigonometry', name: 'Sine Rule', formula: 'a/sin A = b/sin B = c/sin C', variables: 'a,b,c = sides, A,B,C = angles' },
  { category: 'Trigonometry', name: 'Cosine Rule', formula: 'c² = a² + b² - 2ab cos C', variables: 'a,b,c = sides, C = included angle', result: 'c', expr: 'sqrt(a^2 + b^2 - 2*a*b*cos(C * pi / 180))', inputs: [{ symbol: 'a', label: 'side a' }, { symbol: 'b', label: 'side b' }, { symbol: 'C', label: 'angle C (degrees)' }] },
  { category: 'Trigonometry', name: 'sin²θ + cos²θ', formula: 'sin²θ + cos²θ = 1', variables: 'θ = angle' },
  { category: 'Trigonometry', name: 'Double Angle (sin)', formula: 'sin 2θ = 2 sin θ cos θ', variables: 'θ = angle', result: 'sin2θ', expr: '2 * sin(theta * pi / 180) * cos(theta * pi / 180)', inputs: [{ symbol: 'theta', label: 'angle θ (degrees)' }] },
  { category: 'Trigonometry', name: 'Double Angle (cos)', formula: 'cos 2θ = cos²θ - sin²θ', variables: 'θ = angle', result: 'cos2θ', expr: 'cos(theta * pi / 180)^2 - sin(theta * pi / 180)^2', inputs: [{ symbol: 'theta', label: 'angle θ (degrees)' }] },
  { category: 'Trigonometry', name: 'tan Identity', formula: 'tan θ = sin θ / cos θ', variables: 'θ = angle', result: 'tanθ', expr: 'sin(theta * pi / 180) / cos(theta * pi / 180)', inputs: [{ symbol: 'theta', label: 'angle θ (degrees)' }] },
  { category: 'Trigonometry', name: '1 + tan²θ', formula: '1 + tan²θ = sec²θ', variables: 'θ = angle' },
  { category: 'Trigonometry', name: 'Sum to Product (sin)', formula: 'sin A + sin B = 2 sin((A+B)/2) cos((A-B)/2)', variables: 'A,B = angles', result: 'sinA+sinB', expr: '2 * sin((A + B) / 2 * pi / 180) * cos((A - B) / 2 * pi / 180)', inputs: [{ symbol: 'A', label: 'angle A (degrees)' }, { symbol: 'B', label: 'angle B (degrees)' }] },

  // ─── Physics ───
  { category: 'Physics', name: "Newton's Second Law", formula: 'F = ma', variables: 'F = force(N), m = mass(kg), a = acceleration(m/s²)', result: 'F', expr: 'm * a', inputs: [{ symbol: 'm', label: 'mass (kg)' }, { symbol: 'a', label: 'acceleration (m/s²)' }] },
  { category: 'Physics', name: 'Kinetic Energy', formula: 'KE = ½mv²', variables: 'm = mass(kg), v = velocity(m/s)', result: 'KE', expr: '0.5 * m * v^2', inputs: [{ symbol: 'm', label: 'mass (kg)' }, { symbol: 'v', label: 'velocity (m/s)' }] },
  { category: 'Physics', name: 'Potential Energy', formula: 'PE = mgh', variables: 'm = mass, g = 9.8 m/s², h = height(m)', result: 'PE', expr: 'm * g * h', inputs: [{ symbol: 'm', label: 'mass (kg)' }, { symbol: 'g', label: 'gravity (m/s²), use 9.8' }, { symbol: 'h', label: 'height (m)' }] },
  { category: 'Physics', name: 'Work Done', formula: 'W = F × d × cos θ', variables: 'F = force, d = displacement, θ = angle', result: 'W', expr: 'F * d * cos(theta * pi / 180)', inputs: [{ symbol: 'F', label: 'force (N)' }, { symbol: 'd', label: 'displacement (m)' }, { symbol: 'theta', label: 'angle θ (degrees)' }] },
  { category: 'Physics', name: "Ohm's Law", formula: 'V = IR', variables: 'V = voltage(V), I = current(A), R = resistance(Ω)', result: 'V', expr: 'I * R', inputs: [{ symbol: 'I', label: 'current (A)' }, { symbol: 'R', label: 'resistance (Ω)' }] },
  { category: 'Physics', name: 'Power (Electric)', formula: 'P = VI', variables: 'V = voltage, I = current, R = resistance', result: 'P', expr: 'V * I', inputs: [{ symbol: 'V', label: 'voltage (V)' }, { symbol: 'I', label: 'current (A)' }] },
  { category: 'Physics', name: 'Gravitational Force', formula: 'F = Gm₁m₂/r²', variables: 'G = 6.674×10⁻¹¹, m₁,m₂ = masses, r = distance', result: 'F', expr: '6.674e-11 * m1 * m2 / r^2', inputs: [{ symbol: 'm1', label: 'mass m₁ (kg)' }, { symbol: 'm2', label: 'mass m₂ (kg)' }, { symbol: 'r', label: 'distance r (m)' }] },
  { category: 'Physics', name: 'Wave Speed', formula: 'v = fλ', variables: 'f = frequency(Hz), λ = wavelength(m)', result: 'v', expr: 'f * lam', inputs: [{ symbol: 'f', label: 'frequency (Hz)' }, { symbol: 'lam', label: 'wavelength λ (m)' }] },
  { category: 'Physics', name: 'Equations of Motion (v)', formula: 'v = u + at', variables: 'u = initial vel, a = acc, t = time', result: 'v', expr: 'u + a * t', inputs: [{ symbol: 'u', label: 'initial velocity (m/s)' }, { symbol: 'a', label: 'acceleration (m/s²)' }, { symbol: 't', label: 'time (s)' }] },
  { category: 'Physics', name: 'Equations of Motion (s)', formula: 's = ut + ½at²', variables: 'u = initial vel, a = acc, t = time', result: 's', expr: 'u * t + 0.5 * a * t^2', inputs: [{ symbol: 'u', label: 'initial velocity (m/s)' }, { symbol: 'a', label: 'acceleration (m/s²)' }, { symbol: 't', label: 'time (s)' }] },
  { category: 'Physics', name: 'Equations of Motion (v²)', formula: 'v² = u² + 2as', variables: 'u = initial vel, a = acc, s = displacement', result: 'v', expr: 'sqrt(u^2 + 2 * a * s)', inputs: [{ symbol: 'u', label: 'initial velocity (m/s)' }, { symbol: 'a', label: 'acceleration (m/s²)' }, { symbol: 's', label: 'displacement (m)' }] },
  { category: 'Physics', name: "Coulomb's Law", formula: 'F = kq₁q₂/r²', variables: 'k = 8.99×10⁹, q = charges, r = distance', result: 'F', expr: '8.99e9 * q1 * q2 / r^2', inputs: [{ symbol: 'q1', label: 'charge q₁ (C)' }, { symbol: 'q2', label: 'charge q₂ (C)' }, { symbol: 'r', label: 'distance r (m)' }] },
  { category: 'Physics', name: 'Momentum', formula: 'p = mv', variables: 'm = mass(kg), v = velocity(m/s)', result: 'p', expr: 'm * v', inputs: [{ symbol: 'm', label: 'mass (kg)' }, { symbol: 'v', label: 'velocity (m/s)' }] },
  { category: 'Physics', name: "Hooke's Law", formula: 'F = kx', variables: 'k = spring constant, x = extension(m)', result: 'F', expr: 'k * x', inputs: [{ symbol: 'k', label: 'spring constant (N/m)' }, { symbol: 'x', label: 'extension (m)' }] },
  { category: 'Physics', name: 'Ideal Gas Law', formula: 'PV = nRT', variables: 'P = pressure, V = volume, n = moles, R = 8.314, T = temp(K)', result: 'P', expr: 'n * 8.314 * T / V', inputs: [{ symbol: 'n', label: 'moles (n)' }, { symbol: 'T', label: 'temperature (K)' }, { symbol: 'V', label: 'volume (m³)' }] },

  // ─── Chemistry ───
  { category: 'Chemistry', name: "Avogadro's Number", formula: 'N = n × Nₐ', variables: 'n = moles, Nₐ = 6.022×10²³', result: 'N', expr: 'n * 6.022e23', inputs: [{ symbol: 'n', label: 'moles (n)' }] },
  { category: 'Chemistry', name: 'Moles Calculation', formula: 'n = m / M', variables: 'm = mass(g), M = molar mass(g/mol)', result: 'n', expr: 'm / M', inputs: [{ symbol: 'm', label: 'mass (g)' }, { symbol: 'M', label: 'molar mass (g/mol)' }] },
  { category: 'Chemistry', name: 'pH Formula', formula: 'pH = -log[H⁺]', variables: '[H⁺] = hydrogen ion concentration', result: 'pH', expr: '-log10(H)', inputs: [{ symbol: 'H', label: '[H⁺] concentration (mol/L)' }] },
  { category: 'Chemistry', name: 'Concentration', formula: 'C = n / V', variables: 'n = moles, V = volume(L)', result: 'C', expr: 'n / V', inputs: [{ symbol: 'n', label: 'moles (n)' }, { symbol: 'V', label: 'volume (L)' }] },
  { category: 'Chemistry', name: "Faraday's Law", formula: 'Q = nFz', variables: 'n = moles, F = 96485 C/mol, z = electrons', result: 'Q', expr: 'n * 96485 * z', inputs: [{ symbol: 'n', label: 'moles (n)' }, { symbol: 'z', label: 'electrons transferred (z)' }] },
  { category: 'Chemistry', name: 'Enthalpy Change', formula: 'ΔH = H_products - H_reactants', variables: 'H = enthalpy', result: 'ΔH', expr: 'Hp - Hr', inputs: [{ symbol: 'Hp', label: 'H products (kJ)' }, { symbol: 'Hr', label: 'H reactants (kJ)' }] },
  { category: 'Chemistry', name: 'Rate of Reaction', formula: 'r = k[A]ˣ[B]ʸ', variables: 'k = rate constant, [A],[B] = concentrations' },
  { category: 'Chemistry', name: 'Henderson-Hasselbalch', formula: 'pH = pKa + log([A⁻]/[HA])', variables: 'pKa = -log(Ka)', result: 'pH', expr: 'pKa + log10(A / HA)', inputs: [{ symbol: 'pKa', label: 'pKa value' }, { symbol: 'A', label: '[A⁻] concentration' }, { symbol: 'HA', label: '[HA] concentration' }] },

  // ─── Engineering ───
  { category: 'Engineering', name: 'Stress Formula', formula: 'σ = F / A', variables: 'F = force(N), A = cross section area(m²)', result: 'σ', expr: 'F / A', inputs: [{ symbol: 'F', label: 'force (N)' }, { symbol: 'A', label: 'area (m²)' }] },
  { category: 'Engineering', name: 'Strain Formula', formula: 'ε = ΔL / L', variables: 'ΔL = change in length, L = original length', result: 'ε', expr: 'dL / L', inputs: [{ symbol: 'dL', label: 'change in length ΔL (m)' }, { symbol: 'L', label: 'original length (m)' }] },
  { category: 'Engineering', name: "Young's Modulus", formula: 'E = σ / ε', variables: 'σ = stress, ε = strain', result: 'E', expr: 'sigma / epsilon', inputs: [{ symbol: 'sigma', label: 'stress σ (Pa)' }, { symbol: 'epsilon', label: 'strain ε (dimensionless)' }] },
  { category: 'Engineering', name: 'Beam Bending Stress', formula: 'σ = My/I', variables: 'M = moment, y = dist from NA, I = moment of inertia', result: 'σ', expr: 'M * y / I', inputs: [{ symbol: 'M', label: 'bending moment (N·m)' }, { symbol: 'y', label: 'distance from NA (m)' }, { symbol: 'I', label: 'moment of inertia (m⁴)' }] },
  { category: 'Engineering', name: 'Shear Stress', formula: 'τ = VQ / Ib', variables: 'V = shear, Q = first moment, I = moment of inertia, b = width', result: 'τ', expr: 'V * Q / (I * b)', inputs: [{ symbol: 'V', label: 'shear force (N)' }, { symbol: 'Q', label: 'first moment of area (m³)' }, { symbol: 'I', label: 'moment of inertia (m⁴)' }, { symbol: 'b', label: 'width (m)' }] },
  { category: 'Engineering', name: "Euler's Column", formula: 'Pcr = π²EI / (KL)²', variables: 'E = modulus, I = moment of inertia, K = eff length factor, L = length', result: 'Pcr', expr: 'pi^2 * E * I / (K * L)^2', inputs: [{ symbol: 'E', label: "Young's modulus (Pa)" }, { symbol: 'I', label: 'moment of inertia (m⁴)' }, { symbol: 'K', label: 'eff. length factor K' }, { symbol: 'L', label: 'column length (m)' }] },
  { category: 'Engineering', name: 'Power (Mechanical)', formula: 'P = Fv', variables: 'F = force, v = velocity', result: 'P', expr: 'F * v', inputs: [{ symbol: 'F', label: 'force (N)' }, { symbol: 'v', label: 'velocity (m/s)' }] },
  { category: 'Engineering', name: 'Reynolds Number', formula: 'Re = ρvD / μ', variables: 'ρ = density, v = velocity, D = diameter, μ = viscosity', result: 'Re', expr: 'rho * v * D / mu', inputs: [{ symbol: 'rho', label: 'density ρ (kg/m³)' }, { symbol: 'v', label: 'velocity (m/s)' }, { symbol: 'D', label: 'diameter (m)' }, { symbol: 'mu', label: 'dynamic viscosity μ (Pa·s)' }] },
  { category: 'Engineering', name: "Ohm's Law Extended", formula: 'V = IR, P = I²R, P = V²/R', variables: 'V,I,R,P standard units' },

  // ─── Statistics ───
  { category: 'Statistics', name: 'Linear Regression', formula: 'y = mx + b', variables: 'm = slope, b = intercept', result: 'y', expr: 'm * x + b', inputs: [{ symbol: 'm', label: 'slope (m)' }, { symbol: 'x', label: 'x value' }, { symbol: 'b', label: 'intercept (b)' }] },
  { category: 'Statistics', name: 'Mean', formula: 'x̄ = Σx / n', variables: 'Σx = sum of values, n = count' },
  { category: 'Statistics', name: 'Variance', formula: 'σ² = Σ(x-x̄)² / n', variables: 'x̄ = mean, n = count' },
  { category: 'Statistics', name: 'Standard Deviation', formula: 'σ = √(Σ(x-x̄)² / n)', variables: 'x̄ = mean, n = count' },
  { category: 'Statistics', name: 'Normal Distribution', formula: 'f(x) = (1/σ√2π) e^(-(x-μ)²/2σ²)', variables: 'μ = mean, σ = std dev' },
  { category: 'Statistics', name: 'Correlation Coefficient', formula: 'r = Σ(x-x̄)(y-ȳ) / √(Σ(x-x̄)²Σ(y-ȳ)²)', variables: 'x,y = data sets' },
  { category: 'Statistics', name: 'Bayes Theorem', formula: 'P(A|B) = P(B|A)P(A) / P(B)', variables: 'P = probability', result: 'P(A|B)', expr: '(PBA * PA) / PB', inputs: [{ symbol: 'PBA', label: 'P(B|A)' }, { symbol: 'PA', label: 'P(A)' }, { symbol: 'PB', label: 'P(B)' }] },
  { category: 'Statistics', name: 'Binomial Distribution', formula: 'P(X=k) = C(n,k) pᵏ (1-p)ⁿ⁻ᵏ', variables: 'n = trials, p = probability, k = successes', result: 'P(X=k)', expr: 'factorial(n) / (factorial(k) * factorial(n - k)) * p^k * (1 - p)^(n - k)', inputs: [{ symbol: 'n', label: 'total trials (n)' }, { symbol: 'k', label: 'successes (k)' }, { symbol: 'p', label: 'probability (p)' }] },

  // ─── Finance ───
  { category: 'Finance', name: 'Simple Interest', formula: 'SI = P × r × t', variables: 'P = principal, r = rate, t = time', result: 'SI', expr: 'P * r * t', inputs: [{ symbol: 'P', label: 'principal (P)' }, { symbol: 'r', label: 'rate (decimal, e.g. 0.05)' }, { symbol: 't', label: 'time (years)' }] },
  { category: 'Finance', name: 'Compound Interest', formula: 'A = P(1 + r/n)^(nt)', variables: 'P = principal, r = rate, n = times/year, t = years', result: 'A', expr: 'P * (1 + r / n)^(n * t)', inputs: [{ symbol: 'P', label: 'principal (P)' }, { symbol: 'r', label: 'annual rate (decimal)' }, { symbol: 'n', label: 'compounds per year' }, { symbol: 't', label: 'time (years)' }] },
  { category: 'Finance', name: 'Present Value', formula: 'PV = FV / (1+r)ⁿ', variables: 'FV = future value, r = rate, n = periods', result: 'PV', expr: 'FV / (1 + r)^n', inputs: [{ symbol: 'FV', label: 'future value' }, { symbol: 'r', label: 'rate per period (decimal)' }, { symbol: 'n', label: 'periods' }] },
  { category: 'Finance', name: 'Future Value', formula: 'FV = PV × (1+r)ⁿ', variables: 'PV = present value, r = rate, n = periods', result: 'FV', expr: 'PV * (1 + r)^n', inputs: [{ symbol: 'PV', label: 'present value' }, { symbol: 'r', label: 'rate per period (decimal)' }, { symbol: 'n', label: 'periods' }] },
  { category: 'Finance', name: 'EMI Formula', formula: 'EMI = P × r(1+r)ⁿ / ((1+r)ⁿ - 1)', variables: 'P = principal, r = monthly rate, n = months', result: 'EMI', expr: 'P * r * (1 + r)^n / ((1 + r)^n - 1)', inputs: [{ symbol: 'P', label: 'principal (P)' }, { symbol: 'r', label: 'monthly rate (decimal)' }, { symbol: 'n', label: 'months' }] },
  { category: 'Finance', name: 'Rule of 72', formula: 'Years = 72 / rate', variables: 'rate = annual interest rate (%)', result: 'Years', expr: '72 / rate', inputs: [{ symbol: 'rate', label: 'annual rate (%)' }] },
  { category: 'Finance', name: 'NPV', formula: 'NPV = Σ Cₜ/(1+r)ᵗ - C₀', variables: 'Cₜ = cash flow, r = discount rate, C₀ = initial cost' },
];