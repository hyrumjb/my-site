"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import ThreeGlobe from "three-globe";
import * as THREE from "three";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";

export const locations = [
  { lat: 39.9612, lng: -82.9988, label: "Columbus" },
  { lat: 37.4419, lng: -122.143, label: "Palo Alto" },
  { lat: 33.3062, lng: -111.8413, label: "Chandler" },
  { lat: 37.0965, lng: -113.5684, label: "St. George" },
  { lat: 37.168, lng: -113.6768, label: "Ivins" },
  { lat: 44.0121, lng: -92.4802, label: "Rochester" },
  { lat: 41.0147, lng: -96.1538, label: "Bennington" },
  { lat: 33.3528, lng: -111.789, label: "Gilbert" },
  { lat: 41.0352, lng: -111.9385, label: "Kaysville" },
  { lat: 14.5995, lng: 120.9842, label: "Manila" },
  { lat: 14.5129, lng: 121.2089, label: "Morong" },
  { lat: 14.5176, lng: 121.0509, label: "Taguig" },
  { lat: 14.5886, lng: 121.1762, label: "Antipolo" },
  { lat: 14.5567, lng: 121.1326, label: "Taytay" },
  { lat: 14.4527, lng: 121.1956, label: "Binangonan" },
  { lat: 14.7468, lng: 121.6531, label: "Infanta" },
  { lat: 40.2338, lng: -111.6585, label: "Provo" },
  { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
];

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

  return (
    <>
      <ambientLight intensity={2.5} />
      <directionalLight position={[5, 3, 5]} intensity={0.5} />
      <group ref={groupRef} />
    </>
  );
}

export default function Globe({
  selectedLabel,
}: {
  selectedLabel?: string | null;
}) {
  const [countries, setCountries] = useState<object[]>([]);

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

  if (countries.length === 0) {
    return (
      <div className="w-[80%] mx-auto aspect-square bg-stone-200 rounded-full animate-pulse" />
    );
  }

  return (
    <div className="w-[80%] mx-auto aspect-square cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 250], fov: 55 }} dpr={[1, 2]}>
        <GlobeScene
          countries={countries}
          selectedLabel={selectedLabel ?? null}
        />
      </Canvas>
    </div>
  );
}
