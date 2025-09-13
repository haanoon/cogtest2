import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapboxMap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const token = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

  useEffect(() => {
    if (!ref.current || !token) return;
    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-78.4678, -0.1807], // Quito
      zoom: 4,
    });
    return () => map.remove();
  }, [token]);

  if (!token) {
    return (
      <div className="rounded-lg border bg-card p-4">
        <div className="text-sm font-medium mb-1">Store Map</div>
        <div className="text-sm text-muted-foreground">
          Set VITE_MAPBOX_TOKEN to enable the interactive map.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="text-sm font-medium mb-2">Store Map</div>
      <div ref={ref} className="h-[260px] rounded-md" />
    </div>
  );
}
