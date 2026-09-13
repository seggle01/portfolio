import React, { useEffect, useId, useRef, useState, useCallback } from "react";

/**
 * Interests
 * Drop-in JSX. Requires React 18+ only; no Three.js, models or extra CSS files.
 *
 * <Interests />
 * <Interests accent="#55acc5" speed={0.8} />
 *
 * These are stylised scientific illustrations, not scientific simulations.
 * Canvas 2D projects procedural 3D geometry for the AI / DNA illustrations.
 * The neuron signal / voltage trace is illustrative, not a biophysical model.
 *
 * Layout: a 3-column grid on lg screens and above (>=1024px).
 * On md and smaller screens the same cards become a swipeable / arrow-driven
 * carousel (one card per view).
 *
 * Activation: on devices with real hover (mouse/trackpad), the illustration
 * animates on hover/focus, same as before. On touch devices (no hover), each
 * card's illustration instead activates automatically once it scrolls far
 * enough into the viewport, since touch has no hover state to trigger it.
 */

const TAU = Math.PI * 2;
const clamp = (x, min = 0, max = 1) => Math.max(min, Math.min(max, x));
const mix = (a, b, t) => a + (b - a) * t;
const ease = (x) => x * x * (3 - 2 * x);
const rgb = (hex) => {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? [...value].map((c) => c + c).join("") : value;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
};
const ink = (c, alpha = 1) => `rgba(${c.join(",")},${clamp(alpha)})`;
const SLATE = [115, 139, 160];
const WHITE = [218, 237, 240];

const path = (ctx, points, color, width = 1, close = false, fill = null) => {
  if (!points.length) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
  if (close) ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (color) { ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke(); }
};
const dot = (ctx, p, radius, color, glow = 0) => {
  if (glow > 0) {
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius + glow);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(85,172,197,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius + glow, 0, TAU);
    ctx.fill();
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, radius, 0, TAU);
  ctx.fill();
};
const text = (ctx, label, x, y, color = ink(SLATE, 0.8), size = 12) => {
  ctx.font = `${size}px ui-monospace, SFMono-Regular, Consolas, monospace`;
  ctx.fillStyle = color;
  ctx.fillText(label, x, y);
};
const project = (point, yaw, pitch, center = [170, 133], scale = 1) => {
  const [x, y, z] = point;
  const xx = x * Math.cos(yaw) + z * Math.sin(yaw);
  const zz = -x * Math.sin(yaw) + z * Math.cos(yaw);
  const yy = y * Math.cos(pitch) - zz * Math.sin(pitch);
  const depth = y * Math.sin(pitch) + zz * Math.cos(pitch);
  const perspective = 700 / (700 + depth);
  return { x: center[0] + xx * perspective * scale, y: center[1] + yy * perspective * scale, z: depth, p: perspective };
};
const interpolate = (a, b, t) => ({ x: mix(a.x, b.x, t), y: mix(a.y, b.y, t) });

const drawBackdrop = (ctx, accent, active) => {
  for (let x = 26; x < 330; x += 24) {
    for (let y = 18; y < 265; y += 24) dot(ctx, { x, y }, 0.6, ink(SLATE, 0.12));
  }
  path(ctx, [{ x: 18, y: 31 }, { x: 18, y: 19 }, { x: 30, y: 19 }], ink(SLATE, 0.28));
  path(ctx, [{ x: 310, y: 261 }, { x: 322, y: 261 }, { x: 322, y: 249 }], ink(SLATE, 0.28));
  if (active > 0.01) {
    const glow = ctx.createRadialGradient(170, 135, 10, 170, 135, 125);
    glow.addColorStop(0, ink(accent, active * 0.065));
    glow.addColorStop(1, ink(accent, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(20, 10, 300, 260);
  }
};

const drawAI = (ctx, s, accent) => {
  const amount = ease(s.energy);
  const gap = 39 + amount * 16;
  const yaw = -0.6 + s.x * 0.28;
  const pitch = 0.44 + s.y * 0.16;
  const p = (x, y, z) => project([x, y, z], yaw, pitch, [162, 133], 1.05);
  const nodes = Array.from({ length: 4 }, (_, layer) =>
    Array.from({ length: 9 }, (_, i) => p((i % 3 - 1) * 35, (layer - 1.5) * gap, (Math.floor(i / 3) - 1) * 35))
  );
  const cycle = (s.time * 0.7) % 4.4;
  for (let layer = 0; layer < 3; layer++) {
    for (let i = 0; i < 9; i++) {
      for (const j of [i, (i + 3) % 9, (i + 1) % 9]) {
        const a = nodes[layer][i], b = nodes[layer + 1][j];
        path(ctx, [a, b], ink(accent, 0.06 + amount * 0.13), 0.6);
        const t = cycle - layer - (i % 3) * 0.06;
        if (amount > 0.02 && t > 0 && t < 1) {
          path(ctx, [interpolate(a, b, Math.max(0, t - 0.22)), interpolate(a, b, t)], ink(accent, amount * 0.85), 1.15);
          dot(ctx, interpolate(a, b, t), 1.45, ink(WHITE, amount), 2.5);
        }
      }
    }
  }
  for (let layer = 0; layer < 4; layer++) {
    const y = (layer - 1.5) * gap;
    const corners = [[-55, -55], [55, -55], [55, 55], [-55, 55]].map(([x, z]) => p(x, y, z));
    path(ctx, corners, ink(accent, 0.48 + amount * 0.25), 0.95, true, "rgba(17,29,44,0.54)");
    const bottom = corners.map((point) => ({ ...point, y: point.y + 5 }));
    path(ctx, [corners[3], bottom[3], bottom[2], bottom[1], corners[1]], ink(SLATE, 0.3), 0.7);
    path(ctx, [corners[2], bottom[2]], ink(SLATE, 0.3), 0.7);
    for (const n of [-35, 0, 35]) {
      path(ctx, [p(n, y, -51), p(n, y, 51)], ink(SLATE, 0.25), 0.65);
      path(ctx, [p(-51, y, n), p(51, y, n)], ink(SLATE, 0.25), 0.65);
    }
    nodes[layer].forEach((point, i) => {
      const firing = Math.exp(-Math.pow((cycle - layer - (i % 3) * 0.06) / 0.28, 2)) * amount;
      const proximity = Math.max(0, 1 - Math.hypot(point.x - (170 + s.x * 110), point.y - (140 + s.y * 110)) / 65) * amount;
      dot(ctx, point, 2.2 + firing * 1.3, ink(accent, 0.58 + 0.42 * Math.max(firing, proximity)), firing * 7);
      dot(ctx, { x: point.x - 0.4, y: point.y - 0.5 }, 0.7, ink(WHITE, 0.55 + firing * 0.45));
    });
    const label = ["IN", "H₁", "H₂", "OUT"][layer];
    const anchor = p(58, y, -55);
    path(ctx, [anchor, { x: anchor.x + 15, y: anchor.y }], ink(SLATE, 0.35), 0.65);
    text(ctx, label, anchor.x + 20, anchor.y + 3, ink(SLATE, 0.85), 12);
  }
};

const drawBio = (ctx, s, accent) => {
  const rotation = s.time * 0.36 + s.x * 0.85;
  const angle = -0.27 + s.y * 0.08;
  const n = 160;
  const at = (t, strand) => {
    const phase = t * TAU * 1.9 + rotation + strand * Math.PI;
    const x = Math.cos(phase) * 49, y = (t - 0.5) * 216, z = Math.sin(phase) * 36;
    return project([x * Math.cos(angle) - y * Math.sin(angle), x * Math.sin(angle) + y * Math.cos(angle), z], 0, 0.03, [170, 138]);
  };
  const pieces = [];
  for (let i = 0; i < n; i++) {
    for (let strand = 0; strand < 2; strand++) {
      const a = at(i / n, strand), b = at((i + 1) / n, strand);
      pieces.push({ a, b, z: (a.z + b.z) / 2, type: "strand", strand });
    }
  }
  for (let i = 0; i <= 26; i++) {
    const t = i / 26, a = at(t, 0), b = at(t, 1);
    pieces.push({ a, b, z: (a.z + b.z) / 2, type: "bond", t });
    pieces.push({ a, z: a.z, type: "atom", strand: 0, t });
    pieces.push({ a: b, z: b.z, type: "atom", strand: 1, t });
  }
  const scan = (s.time * 0.14) % 1;
  pieces.sort((a, b) => b.z - a.z);
  pieces.forEach((piece) => {
    const depth = clamp((36 - piece.z) / 72);
    const intensity = (0.32 + 0.58 * depth);
    const c = piece.strand === 1 ? WHITE : accent;
    if (piece.type === "strand") {
      path(ctx, [piece.a, piece.b], ink(c, intensity), 3.4 * piece.a.p);
      path(ctx, [{ x: piece.a.x - 0.7, y: piece.a.y }, { x: piece.b.x - 0.7, y: piece.b.y }], ink(WHITE, 0.12 + depth * 0.35), 0.7);
    } else {
      const hit = Math.exp(-Math.pow((piece.t - scan) / 0.09, 2)) * s.energy;
      if (piece.type === "bond") {
        const middle = interpolate(piece.a, piece.b, 0.5);
        path(ctx, [piece.a, middle], ink(accent, 0.3 + hit * 0.7), 1.8);
        path(ctx, [middle, piece.b], ink(WHITE, 0.22 + hit * 0.7), 1.8);
        dot(ctx, middle, 1, ink(WHITE, 0.3 + hit * 0.7));
      } else {
        dot(ctx, piece.a, (2.2 + hit * 0.6) * piece.a.p, ink(c, intensity + hit * 0.3), hit * 4);
        dot(ctx, { x: piece.a.x - 0.6, y: piece.a.y - 0.7 }, 0.65, ink(WHITE, depth * 0.8));
      }
    }
  });
  const sy = 30 + scan * 216;
  if (s.energy > 0.01) {
    ctx.setLineDash([2, 5]);
    path(ctx, [{ x: 71, y: sy }, { x: 265, y: sy }], ink(accent, s.energy * 0.2), 0.8);
    ctx.setLineDash([]);
    path(ctx, [{ x: 83, y: sy - 7 }, { x: 78, y: sy - 7 }, { x: 78, y: sy + 7 }, { x: 83, y: sy + 7 }], ink(accent, s.energy * 0.85), 1);
    path(ctx, [{ x: 257, y: sy - 7 }, { x: 262, y: sy - 7 }, { x: 262, y: sy + 7 }, { x: 257, y: sy + 7 }], ink(accent, s.energy * 0.85), 1);
  }
};

const makeDendrites = () => {
  const branches = [];
  const grow = (x, y, angle, length, level, seed, distance) => {
    const ex = x + Math.cos(angle) * length, ey = y + Math.sin(angle) * length;
    const points = Array.from({ length: 13 }, (_, i) => {
      const t = i / 12;
      const bend = Math.sin(t * Math.PI) * Math.sin(seed * 4.7) * 7;
      return { x: mix(x, ex, t) - Math.sin(angle) * bend, y: mix(y, ey, t) + Math.cos(angle) * bend };
    });
    branches.push({ points, level, distance, length, seed });
    if (level > 0) {
      grow(ex, ey, angle - 0.42 - Math.sin(seed) * 0.14, length * 0.7, level - 1, seed + 1.7, distance + length);
      grow(ex, ey, angle + 0.46, length * 0.67, level - 1, seed + 3.1, distance + length);
    }
  };
  [-2.76, -1.91, -1.15, 2.67, 1.8].forEach((a, i) => grow(123, 131, a, 34, 2, i + 1, 0));
  return branches;
};
const DENDRITES = makeDendrites();
const onPolyline = (points, t) => {
  const v = clamp(t) * (points.length - 1);
  const i = Math.min(points.length - 2, Math.floor(v));
  return interpolate(points[i], points[i + 1], v - i);
};
const voltage = (t) =>
  -28 * Math.exp(-Math.pow((t - 0.55) / 0.025, 2)) +
  10 * Math.exp(-Math.pow((t - 0.6) / 0.035, 2)) -
  4 * Math.exp(-Math.pow((t - 0.49) / 0.045, 2));

const drawNeuro = (ctx, s, accent) => {
  const cycle = (s.time * 0.32) % 1;
  const energy = s.energy;
  const soma = { x: 123, y: 131 };
  ctx.save();
  ctx.translate(s.x * 5, s.y * 3 - 5);
  DENDRITES.forEach((branch) => {
    path(ctx, branch.points, ink(accent, 0.46 + branch.level * 0.12), 0.9 + branch.level * 0.5);
    if (branch.level < 2) {
      for (const t of [0.32, 0.6, 0.86]) {
        const p = onPolyline(branch.points, t);
        const q = onPolyline(branch.points, t + 0.04);
        const a = Math.atan2(q.y - p.y, q.x - p.x) + Math.PI / 2;
        const end = { x: p.x + Math.cos(a) * 3, y: p.y + Math.sin(a) * 3 };
        path(ctx, [p, end], ink(SLATE, 0.55), 0.6);
      }
    }
    const distance = 95 * (1 - cycle / 0.36);
    const t = (distance - branch.distance) / branch.length;
    if (cycle < 0.36 && t >= 0 && t <= 1 && energy > 0.01) {
      dot(ctx, onPolyline(branch.points, t), 1.7, ink(WHITE, energy), 4);
    }
    const end = branch.points[branch.points.length - 1];
    if (branch.level === 0) dot(ctx, end, 1.45, ink(accent, 0.65));
  });
  const firing = Math.exp(-Math.pow((cycle - 0.37) / 0.048, 2)) * energy;
  const outline = Array.from({ length: 81 }, (_, i) => {
    const a = i / 80 * TAU, radius = 15 + Math.sin(a * 5 + 1) * 2.3;
    return { x: soma.x + Math.cos(a) * radius * 1.15, y: soma.y + Math.sin(a) * radius };
  });
  dot(ctx, soma, 15, ink(accent, 0.04 + firing * 0.22), firing * 14);
  path(ctx, outline, ink(accent, 0.85), 1.2, true, "rgba(20,38,51,0.8)");
  for (let i = 0; i < 7; i++) {
    const a = i / 7 * TAU;
    path(ctx, [soma, { x: soma.x + Math.cos(a) * 14, y: soma.y + Math.sin(a) * 12 }], ink(accent, 0.17 + firing * 0.3), 0.7);
  }
  dot(ctx, soma, 5.5, ink(accent, 0.25 + firing * 0.6), firing * 5);
  dot(ctx, { x: 121.5, y: 129.5 }, 2, ink(WHITE, 0.6 + firing * 0.4));
  const axon = Array.from({ length: 81 }, (_, i) => ({
    x: 142 + i / 80 * 140,
    y: 131 + Math.sin(i / 80 * Math.PI) * 10,
  }));
  path(ctx, axon, ink(accent, 0.45), 1);
  for (let i = 0; i < 6; i++) {
    const t = 0.045 + i * 0.137;
    const sheath = Array.from({ length: 9 }, (_, j) => onPolyline(axon, t + j / 8 * 0.09));
    path(ctx, sheath, "rgba(59,84,102,0.8)", 9);
    path(ctx, sheath, "rgba(17,34,49,1)", 7);
    path(ctx, sheath.map((p) => ({ x: p.x, y: p.y - 2.5 })), ink(accent, 0.4), 0.8);
  }
  if (cycle >= 0.38 && cycle < 0.75 && energy > 0.01) {
    const t = (cycle - 0.38) / 0.37;
    path(ctx, [onPolyline(axon, Math.max(0, t - 0.09)), onPolyline(axon, t)], ink(accent, energy), 2.2);
    dot(ctx, onPolyline(axon, t), 2.3, ink(WHITE, energy), 5);
  }
  const terminalPulse = Math.exp(-Math.pow((cycle - 0.78) / 0.065, 2)) * energy;
  [{ x: 304, y: 107 }, { x: 316, y: 132 }, { x: 306, y: 157 }].forEach((p, i) => {
    path(ctx, [axon[80], { x: 289 + i * 2, y: mix(131, p.y, 0.55) }, p], ink(accent, 0.52), 1);
    dot(ctx, p, 2.7 + terminalPulse, ink(accent, 0.65 + terminalPulse * 0.35), terminalPulse * 7);
    if (terminalPulse > 0.03) {
      for (let j = 0; j < 3; j++) dot(ctx, { x: p.x + 6 + j * 3, y: p.y + (j - 1) * 5 }, 0.9, ink(WHITE, terminalPulse * (1 - j * 0.22)));
    }
  });
  ctx.restore();
  path(ctx, [{ x: 30, y: 225 }, { x: 312, y: 225 }], ink(SLATE, 0.22), 0.7);
  const waveform = Array.from({ length: 210 }, (_, i) => {
    const t = i / 209;
    return { x: 30 + t * 282, y: 225 + voltage((t - cycle + 1.55) % 1) * (0.23 + 0.77 * energy) };
  });
  path(ctx, waveform, ink(accent, 0.7), 1.1);
};

const DRAW = { ai: drawAI, bio: drawBio, neuro: drawNeuro };

const ScientificVisual = ({ kind, active, pulse, pointer, accent, speed }) => {
  const canvasRef = useRef(null);
  const controller = useRef(null);
  const live = useRef({ active, pulse, pointer, speed });
  live.current = { active, pulse, pointer, speed };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const color = rgb(accent);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const s = { time: 0.38, energy: 0, x: 0, y: 0 };
    let raf = 0, previous = 0, width = 0, height = 0, disposed = false;
    let inView = true, seenPulse = live.current.pulse, burstUntil = 0;
    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width / 340, height / 280);
      ctx.translate((width - 340 * scale) / 2, (height - 280 * scale) / 2);
      ctx.scale(scale, scale);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      drawBackdrop(ctx, color, s.energy);
      DRAW[kind](ctx, s, color);
    };
    const frame = (now) => {
      raf = 0;
      if (disposed || !inView || document.hidden) { previous = 0; return; }
      const dt = previous ? Math.min((now - previous) / 1000, 0.04) : 1 / 60;
      previous = now;
      const input = live.current;
      if (input.pulse !== seenPulse) {
        seenPulse = input.pulse;
        burstUntil = now + 4000;
        s.time = reduce.matches ? 1.2 : 0;
      }
      const running = input.active || now < burstUntil;
      const target = running ? 1 : 0;
      const settle = 1 - Math.exp(-dt * 7);
      if (reduce.matches) {
        s.energy = target;
        s.x = 0; s.y = 0;
      } else {
        s.energy = mix(s.energy, target, settle);
        s.x = mix(s.x, running ? input.pointer.x : 0, settle);
        s.y = mix(s.y, running ? input.pointer.y : 0, settle);
        if (running) s.time += dt * input.speed;
      }
      render();
      if (!reduce.matches && (running || Math.abs(s.energy - target) > 0.002 || Math.abs(s.x) > 0.002 || Math.abs(s.y) > 0.002)) {
        raf = requestAnimationFrame(frame);
      } else previous = 0;
    };
    const wake = () => {
      if (!raf && !disposed && inView && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      render();
      wake();
    };
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; previous = 0; }
      else wake();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) wake();
      else { cancelAnimationFrame(raf); raf = 0; previous = 0; }
    });
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", visibility);
    reduce.addEventListener("change", wake);
    controller.current = wake;
    resize();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reduce.removeEventListener("change", wake);
      controller.current = null;
    };
  }, [kind, accent]);

  useEffect(() => { controller.current?.(); }, [active, pulse, pointer, speed]);
  return <canvas ref={canvasRef} className="block w-full h-full" aria-hidden="true" />;
};

const ITEMS = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Focusing on machine learning and neural networks across RNN, CNN, and Transformer-based architectures, applied to high-complexity prediction tasks and structured representation learning.",
    action: "Send a signal",
  },
  {
    id: "bio",
    title: "Bioinformatics",
    description: "Protein structure prediction and end-to-end computational pipelines engineered for biologically feasible structures, alongside empirical research and rigorous comparison with state-of-the-art methods.",
    action: "Scan the helix",
  },
  {
    id: "neuro",
    title: "Computational Neuroscience",
    description: "Biophysical neuron dynamics, spiking neural networks, and the neural coding problem, alongside computational modeling of self-control and decision-making dynamics.",
    action: "Stimulate neuron",
  },
];

// True on devices that have no real hover capability (phones/tablets).
// Checked once per mount via matchMedia rather than user-agent sniffing.
function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsCoarse(mql.matches);
    const handleChange = (e) => setIsCoarse(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);
  return isCoarse;
}

const InterestCard = React.forwardRef(({ item, speed }, ref) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [feedback, setFeedback] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [inViewport, setInViewport] = useState(false);
  const localRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const isCoarse = useIsCoarsePointer();

  // On touch devices there's no hover, so instead the illustration activates
  // once the card is sufficiently visible in the viewport while scrolling.
  useEffect(() => {
    if (!isCoarse) return;
    const el = localRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.55 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isCoarse]);

  const active = hovered || focused || (isCoarse && inViewport);
  const highlighted = active || feedback;

  useEffect(() => {
    if (!feedback) return;
    const id = setTimeout(() => setFeedback(false), 1800);
    return () => clearTimeout(id);
  }, [feedback, pulse]);

  return (
    <article
      ref={(el) => {
        localRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      aria-labelledby={titleId}
      onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(true); }}
      onPointerLeave={() => { setHovered(false); setPointer({ x: 0, y: 0 }); }}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1),
          y: clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1),
        });
      }}
      className={`relative min-w-0 flex flex-col overflow-hidden rounded-3xl p-6
        min-h-[450px] lg:min-h-[550px]
        flex-[0_0_100%] snap-center lg:flex-initial lg:snap-align-none
        border transition-colors duration-300
        ${highlighted
          ? "border-[color:var(--accent)] bg-slate-800/50"
          : "border-slate-500/25 bg-slate-900/30"}`}
    >
      {/* Top row: pulse trigger button on the left, status lamp pinned on the right */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label={item.action}
          aria-describedby={descriptionId}
          onFocus={(event) => { if (event.target.matches(":focus-visible")) setFocused(true); }}
          onBlur={() => setFocused(false)}
          onClick={() => { setPulse((value) => value + 1); setFeedback(true); }}
          className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-slate-500/25 text-[color:var(--accent)] transition-colors duration-200 hover:border-[color:var(--accent)] active:scale-90"
        >
          {/* Responsive offset: neutral (0px) on mobile, -1px on md/laptop */}
          <span className="translate-y-0 md:-translate-y-[1px] leading-none text-sm font-light select-none">
            +
          </span>
        </button>

        <span
          aria-hidden="true"
          className={`h-[5px] w-[5px] rounded-full transition-colors duration-300 ${
            active ? "bg-[color:var(--accent)] [box-shadow:0_0_9px_var(--accent)]" : "bg-slate-500"
          }`}
        />
      </div>

      <div className="mt-2.5 -mx-4 h-[280px] flex-shrink-0">
        <ScientificVisual kind={item.id} active={active} pulse={pulse} pointer={pointer} accent={item.accent} speed={speed} />
      </div>

      <div className="mt-4">
        <h3 id={titleId} className="font-serif text-xl md:text-[22px] lg:text-2xl font-medium leading-tight tracking-tight text-slate-100">
          {item.title}
        </h3>
        <hr className="my-3 border-t border-slate-500/25" />
        <p id={descriptionId} className="font-serif text-base md:text-lg text-slate-300 text-justify">
          {item.description}
        </p>
      </div>
    </article>
  );
});
InterestCard.displayName = "InterestCard";

const ArrowIcon = ({ direction }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={direction === "prev" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Interests = ({ accent = "#55acc5", speed = 1, className = "" }) => {
  const headingId = useId();
  const safeAccent = /^#([a-f\d]{3}|[a-f\d]{6})$/i.test(accent) ? accent : "#55acc5";
  const safeSpeed = Number.isFinite(speed) ? clamp(speed, 0.1, 3) : 1;

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    const target = card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2;
    track.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.offsetWidth / 2;
        let closest = 0, closestDistance = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(cardCenter - center);
          if (distance < closestDistance) { closestDistance = distance; closest = i; }
        });
        setActiveIndex(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  const itemsWithAccent = ITEMS.map((item) => ({ ...item, accent: safeAccent }));

  return (
    <section
      id="interests"
      aria-labelledby={headingId}
      className={`w-full box-border p-5 md:p-10 text-left ${className}`}
      style={{ "--accent": safeAccent }}
    >
      <h2 id={headingId} className="mb-10 font-mono text-3xl font-semibold text-white">
        Interests
      </h2>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 -mx-1
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
            lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:snap-none"
        >
          {itemsWithAccent.map((item, i) => (
            <InterestCard
              key={item.id}
              item={item}
              speed={safeSpeed}
              ref={(el) => { cardRefs.current[i] = el; }}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 lg:hidden">
          <button
            type="button"
            aria-label="Previous interest"
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-slate-500/25 bg-slate-900/40 text-slate-200 transition-colors duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:border-[color:var(--accent)] focus-visible:text-[color:var(--accent)] disabled:cursor-default disabled:opacity-35 disabled:hover:border-slate-500/25 disabled:hover:text-slate-200"
          >
            <ArrowIcon direction="prev" />
          </button>

          <div className="flex items-center gap-2.5" role="tablist" aria-label="Select interest">
            {ITEMS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={item.title}
                onClick={() => scrollToIndex(i)}
                className={`h-[7px] rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-5 bg-[color:var(--accent)]" : "w-[7px] bg-slate-500"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next interest"
            onClick={() => scrollToIndex(Math.min(ITEMS.length - 1, activeIndex + 1))}
            disabled={activeIndex === ITEMS.length - 1}
            className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-slate-500/25 bg-slate-900/40 text-slate-200 transition-colors duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:border-[color:var(--accent)] focus-visible:text-[color:var(--accent)] disabled:cursor-default disabled:opacity-35 disabled:hover:border-slate-500/25 disabled:hover:text-slate-200"
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Interests;
