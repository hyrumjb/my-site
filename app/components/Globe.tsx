"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import ThreeGlobe from "three-globe";
import * as THREE from "three";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";

import { locations } from "./locations";

function latLngToVector3(lat: number, lng: number, altitude: number = 0): THREE.Vector3 {
  const r = 100 * (1 + altitude);
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (90 - lng) * (Math.PI / 180);
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeScene({
  countries,
  selectedLabel,
}: {
  countries: object[];
  selectedLabel: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const globeRef = useRef<ThreeGlobe | null>(null);
  const targetRotationY = useRef<number | null>(null);
  const targetRotationX = useRef<number | null>(null);
  const { gl } = useThree();

  const globe = useMemo(() => {
    const g = new ThreeGlobe({ animateIn: false })
      .showGlobe(true)
      .showAtmosphere(false)
      .showGraticules(true)
      .polygonsData(countries)
      .polygonCapColor(() => "#d6cfc2")
      .polygonSideColor(() => "#c4bdb0")
      .polygonStrokeColor(() => "#8c8478")
      .polygonAltitude(0.005)
      .pointsData(locations)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#ea580c")
      .pointAltitude(0.05)
      .pointRadius(0.2)
      .pointResolution(6)
      .pointsTransitionDuration(300);

    const globeMat = g.globeMaterial() as THREE.MeshPhongMaterial;
    globeMat.color = new THREE.Color("#f5f5f4");
    globeMat.shininess = 0;

    globeRef.current = g;
    return g;
  }, [countries]);

  // Drag handlers
  const onPointerDown = useCallback((e: PointerEvent) => {
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    // Clear selection target so drag takes over
    targetRotationY.current = null;
    targetRotationX.current = null;
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current || !groupRef.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    groupRef.current.rotation.y += dx * 0.005;
    groupRef.current.rotation.x = Math.max(
      -1.2,
      Math.min(1.2, groupRef.current.rotation.x + dy * 0.005)
    );
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [gl, onPointerDown, onPointerMove, onPointerUp]);

  // Update pin sizes and rotation target when selection changes
  useEffect(() => {
    if (selectedLabel && groupRef.current) {
      const loc = locations.find((l) => l.label === selectedLabel);
      if (loc) {
        // Convert longitude to Y rotation
        // In three-globe, lng=0 faces +X. Camera is at +Z.
        // To rotate lng to face camera: rotate by (90 - lng) degrees
        const targetY = -loc.lng * (Math.PI / 180);
        const currentY = groupRef.current.rotation.y;
        let diff = targetY - currentY;
        diff = diff - Math.round(diff / (2 * Math.PI)) * 2 * Math.PI;
        targetRotationY.current = currentY + diff;

        // Tilt to show the latitude
        const targetX = loc.lat * (Math.PI / 180);
        targetRotationX.current = targetX;
      }
    } else {
      targetRotationY.current = null;
      targetRotationX.current = null;
    }
  }, [selectedLabel]);

  useEffect(() => {
    const group = groupRef.current;
    if (group) {
      group.add(globe);
    }
    return () => {
      if (group) {
        group.remove(globe);
      }
    };
  }, [globe]);

  useFrame(() => {
    if (!groupRef.current || isDragging.current) return;

    if (targetRotationY.current !== null) {
      const currentY = groupRef.current.rotation.y;
      const diffY = targetRotationY.current - currentY;
      if (Math.abs(diffY) > 0.001) {
        groupRef.current.rotation.y += diffY * 0.06;
      } else {
        groupRef.current.rotation.y = targetRotationY.current;
      }
    } else if (!selectedLabel) {
      groupRef.current.rotation.y += 0.002;
    }

    if (targetRotationX.current !== null) {
      const currentX = groupRef.current.rotation.x;
      const diffX = targetRotationX.current - currentX;
      if (Math.abs(diffX) > 0.001) {
        groupRef.current.rotation.x += diffX * 0.06;
      } else {
        groupRef.current.rotation.x = targetRotationX.current;
      }
    } else if (!selectedLabel) {
      // Ease back to equator view
      const currentX = groupRef.current.rotation.x;
      if (Math.abs(currentX) > 0.001) {
        groupRef.current.rotation.x += -currentX * 0.03;
      }
    }
  });

  const selectedLoc = selectedLabel
    ? locations.find((l) => l.label === selectedLabel)
    : null;
  const pinPos = selectedLoc
    ? latLngToVector3(selectedLoc.lat, selectedLoc.lng, 0.06)
    : null;
  return (
    <>
      <ambientLight intensity={2.5} />
      <directionalLight position={[5, 3, 5]} intensity={0.5} />
      <group ref={groupRef}>
        {pinPos && selectedLoc && (
          <>
            <Html
              position={[pinPos.x, pinPos.y, pinPos.z]}
              center={false}
              occlude={false}
              style={{
                pointerEvents: "none",
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                  {selectedLoc.label}, {selectedLoc.region}
                </div>
                <svg width="2" height="20" className="mt-0.5">
                  <line x1="1" y1="0" x2="1" y2="20" stroke="#1a1a1a" strokeWidth="1" />
                </svg>
              </div>
            </Html>
          </>
        )}
      </group>
    </>
  );
}

export default function Globe({
  selectedLabel,
}: {
  selectedLabel?: string | null;
}) {
  const [countries, setCountries] = useState<object[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/countries-110m.json")
      .then((r) => r.json())
      .then((topo: Topology) => {
        const geo = feature(topo, topo.objects.countries);
        if (geo.type === "FeatureCollection") {
          setCountries(geo.features);
        }
      });
  }, []);

  // Mark ready after first frame renders
  useEffect(() => {
    if (countries.length === 0) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true));
    });
    return () => cancelAnimationFrame(id);
  }, [countries]);

  return (
    <div className="w-[90%] mx-auto aspect-square relative">
      {/* Placeholder */}
      <div
        className={`absolute inset-0 bg-stone-200 rounded-full transition-opacity duration-500 ${
          ready ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse"
        }`}
      />

      {/* Globe */}
      {countries.length > 0 && (
        <div
          className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <Canvas camera={{ position: [0, 0, 250], fov: 55 }} dpr={[1, 2]}>
            <GlobeScene
              countries={countries}
              selectedLabel={selectedLabel ?? null}
            />
          </Canvas>
        </div>
      )}
    </div>
  );
}
