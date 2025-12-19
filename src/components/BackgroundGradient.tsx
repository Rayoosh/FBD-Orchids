"use client";

import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import React, { Suspense } from "react";

export function BackgroundGradient() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden pointer-events-none bg-brand-blue-500">
      <Suspense fallback={<div className="w-full h-full bg-brand-blue-500" />}>
        <ShaderGradientCanvas
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <ShaderGradient
            animate="on"
            axesHelper="off"
            brightness={1.3}
            cAzimuthAngle={180}
            cDistance={3.62}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#00ccff"
            color2="#dbd7db"
            color3="#008ef3"
            destination="onCanvas"
            embedMode="off"
            envPreset="lobby"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={0.7}
            positionX={-1.4}
            positionY={0}
            positionZ={0}
            range="enabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={0}
            rotationY={10}
            rotationZ={50}
            shader="defaults"
            type="waterPlane"
            uAmplitude={1}
            uDensity={2.8}
            uFrequency={5.5}
            uSpeed={0.2}
            uStrength={1.4}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </Suspense>
    </div>
  );
}
