import { MAP_HOME, MAP_PINS } from "@/data/story";
import { MAP_H, MAP_W, projectX, projectY } from "@/utils/mapProjection";

// Dotted map of India: arcs run from the home city (Jamshedpur) to every city we bake for.
export default function RoadMap() {
  const h = { x: projectX(MAP_HOME.lon), y: projectY(MAP_HOME.lat) };
  const dots = [];
  for (let x = 20; x < MAP_W; x += 20) for (let y = 20; y < MAP_H; y += 20) dots.push([x, y]);
  return (
    <svg className="sj-map" viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="Brunch Bakers started in Jamshedpur and now bakes for cities across India">
      <g className="sj-map-grid" aria-hidden="true">{dots.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />)}</g>
      <g className="sj-map-arcs" aria-hidden="true">
        {MAP_PINS.map((p) => {
          const x = projectX(p.lon), y = projectY(p.lat);
          const mx = (x + h.x) / 2, my = (y + h.y) / 2 - Math.hypot(x - h.x, y - h.y) * 0.22;
          return <path key={p.name} d={`M${h.x},${h.y} Q${mx},${my} ${x},${y}`} />;
        })}
      </g>
      {MAP_PINS.map((p) => (
        <g key={p.name}>
          <rect className="sj-pin" x={projectX(p.lon) - 4} y={projectY(p.lat) - 4} width="8" height="8" />
          <text className="sj-city" x={projectX(p.lon) + p.dx} y={projectY(p.lat) + p.dy} textAnchor={p.end || "start"}>{p.name}</text>
        </g>
      ))}
      <rect className="sj-pin sj-pin-home" x={h.x - 6} y={h.y - 6} width="12" height="12" />
      <text className="sj-city sj-city-home" x={h.x + MAP_HOME.dx} y={h.y + MAP_HOME.dy}>{MAP_HOME.name}</text>
    </svg>
  );
}
