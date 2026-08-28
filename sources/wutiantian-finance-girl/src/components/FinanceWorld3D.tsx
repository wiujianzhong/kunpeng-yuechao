import { ContactShadows, Float, RoundedBox, Sparkles } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type SceneProps = {
  monthEnd: boolean
}

function Coin({ position, scale = 1, rose = false }: { position: [number, number, number]; scale?: number; rose?: boolean }) {
  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.45}>
      <group position={position} scale={scale} rotation={[Math.PI / 2.35, 0.1, -0.25]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.48, 0.48, 0.11, 48]} />
          <meshStandardMaterial
            color={rose ? '#b86f78' : '#d5bd7f'}
            metalness={0.62}
            roughness={0.28}
          />
        </mesh>
        <mesh position={[0, 0.061, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.31, 0.018, 12, 48]} />
          <meshStandardMaterial color={rose ? '#f7dce0' : '#fff2c9'} metalness={0.4} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

function LedgerSculpture({ monthEnd }: SceneProps) {
  const sculpture = useRef<THREE.Group>(null)
  const orbit = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const coffeePositions = useMemo(
    () => [
      [-2.45, 1.85, -0.6],
      [2.5, 1.4, -0.8],
      [-2.25, -1.65, 0.35],
      [2.45, -1.45, 0.55],
    ] as [number, number, number][],
    [],
  )

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  useFrame((state, delta) => {
    if (!sculpture.current || !orbit.current) return
    const speed = monthEnd ? 1.7 : 0.36
    orbit.current.rotation.z += delta * speed
    sculpture.current.rotation.y = THREE.MathUtils.damp(
      sculpture.current.rotation.y,
      pointer.current.x * 0.16 + Math.sin(state.clock.elapsedTime * 0.18) * 0.04,
      3,
      delta,
    )
    sculpture.current.rotation.x = THREE.MathUtils.damp(
      sculpture.current.rotation.x,
      -pointer.current.y * 0.09 - 0.08,
      3,
      delta,
    )
  })

  return (
    <group ref={sculpture} rotation={[-0.08, -0.12, -0.08]}>
      <group position={[0, -0.12, 0]}>
        <RoundedBox args={[3.65, 2.35, 0.22]} radius={0.12} smoothness={4} castShadow>
          <meshPhysicalMaterial color="#efe1d9" roughness={0.42} metalness={0.05} clearcoat={0.55} />
        </RoundedBox>
        <RoundedBox args={[3.45, 2.15, 0.18]} position={[0.15, 0.14, 0.17]} radius={0.1} smoothness={4} castShadow>
          <meshPhysicalMaterial color="#fbf8f3" roughness={0.6} clearcoat={0.25} />
        </RoundedBox>

        {[-0.62, 0, 0.62].map((y) => (
          <mesh key={y} position={[0.12, y, 0.285]}>
            <boxGeometry args={[2.82, 0.018, 0.016]} />
            <meshStandardMaterial color="#cdbbaa" transparent opacity={0.74} />
          </mesh>
        ))}
        {[-0.86, 0.12, 0.98].map((x) => (
          <mesh key={x} position={[x, 0, 0.285]}>
            <boxGeometry args={[0.016, 1.64, 0.016]} />
            <meshStandardMaterial color="#d8c9bb" transparent opacity={0.64} />
          </mesh>
        ))}

        <mesh position={[0.15, 0.08, 0.38]} rotation={[0, 0, 0]} castShadow>
          <torusGeometry args={[1.02, 0.075, 24, 96]} />
          <meshStandardMaterial color="#ad7d52" metalness={0.72} roughness={0.25} />
        </mesh>
        <mesh position={[0.15, 0.08, 0.4]}>
          <ringGeometry args={[0.76, 0.91, 64]} />
          <meshPhysicalMaterial color="#f2c5cb" transparent opacity={0.46} roughness={0.18} clearcoat={1} />
        </mesh>

        <group ref={orbit} position={[0.15, 0.08, 0.48]}>
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const angle = (index / 6) * Math.PI * 2
            return (
              <mesh key={index} position={[Math.cos(angle) * 1.48, Math.sin(angle) * 1.48, 0]}>
                <sphereGeometry args={[index === 0 ? 0.095 : 0.055, 20, 20]} />
                <meshStandardMaterial color={index === 0 ? '#934d58' : '#c7a96b'} metalness={0.62} roughness={0.25} />
              </mesh>
            )
          })}
        </group>
      </group>

      <Coin position={[-2.18, 1.26, 0.7]} scale={0.86} />
      <Coin position={[2.05, -1.24, 0.8]} scale={0.72} rose />
      <Coin position={[2.22, 1.42, -0.2]} scale={0.54} />

      {monthEnd && coffeePositions.map((position, index) => (
        <Float key={index} speed={2 + index * 0.15} floatIntensity={0.8}>
          <mesh position={position} rotation={[0.35, index, 0.15]}>
            <boxGeometry args={[0.28, 0.28, 0.28]} />
            <meshStandardMaterial color={index % 2 ? '#c7a96b' : '#b86f78'} metalness={0.3} roughness={0.5} />
          </mesh>
        </Float>
      ))}

      <Sparkles count={monthEnd ? 46 : 18} scale={[6, 4.5, 2]} size={1.55} speed={monthEnd ? 1.5 : 0.25} color="#c6a36d" />
    </group>
  )
}

export function FinanceWorld3D({ monthEnd }: SceneProps) {
  return (
    <div className="finance-world" aria-label="可随鼠标轻微转动的 3D 数字账本">
      <Canvas
        dpr={[1, 1.55]}
        camera={{ position: [0, 0.1, 7.2], fov: 37 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
      >
        <ambientLight intensity={1.9} />
        <directionalLight position={[4, 5, 6]} intensity={3.2} color="#fff5e8" castShadow />
        <pointLight position={[-4, 1, 4]} intensity={1.6} color="#efc4cc" />
        <pointLight position={[3, -3, 2]} intensity={1.4} color="#d6b66f" />
        <LedgerSculpture monthEnd={monthEnd} />
        <ContactShadows position={[0, -2.32, -0.4]} opacity={0.2} scale={7} blur={2.6} far={4} />
      </Canvas>
    </div>
  )
}
