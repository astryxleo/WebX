import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Points, PointMaterial, TorusKnot } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef()
  const positions = useMemo(() => {
    const data = new Float32Array(900 * 3)
    for (let i = 0; i < 900; i++) {
      data[i * 3] = (Math.random() - 0.5) * 15
      data[i * 3 + 1] = (Math.random() - 0.5) * 10
      data[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return data
  }, [])
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.012
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, state.pointer.y * 0.08, 3, delta)
    ref.current.rotation.z = THREE.MathUtils.damp(ref.current.rotation.z, -state.pointer.x * 0.05, 3, delta)
  })
  return <Points ref={ref} positions={positions} stride={3} frustumCulled>
    <PointMaterial transparent color="#a6f7e8" size={0.012} sizeAttenuation depthWrite={false} opacity={0.62} />
  </Points>
}

function OrbitalForm() {
  const group = useRef()
  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, state.pointer.y * 0.22 + 0.25, 2.2, delta)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.32, 2.2, delta)
    group.current.rotation.z += delta * 0.035
  })
  return <group ref={group} position={[2.55, -0.1, -1.5]}>
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.14}>
      <TorusKnot args={[1.18, 0.0038, 220, 8, 2, 5]}>
        <meshBasicMaterial color="#a6f7e8" transparent opacity={0.72} wireframe />
      </TorusKnot>
      <mesh rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[1.48, 1]} />
        <meshBasicMaterial color="#777777" wireframe transparent opacity={0.14} />
      </mesh>
    </Float>
  </group>
}

function Scene() {
  return <><ParticleField /><OrbitalForm /></>
}

export default function CanvasBackground() {
  return <div className="canvas-background" aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }} onCreated={({ gl }) => { gl.setClearColor('#050505', 0); }}>
      <Suspense fallback={null}><Scene /></Suspense>
    </Canvas>
  </div>
}