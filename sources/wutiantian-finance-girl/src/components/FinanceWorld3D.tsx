import { ContactShadows, RoundedBox, Sparkles } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type SceneProps = {
  monthEnd: boolean
  scrollProgress: number
}

type CoinProps = {
  rose?: boolean
  scale?: number
}

function CoinToken({ rose = false, scale = 1 }: CoinProps) {
  return (
    <group scale={scale} rotation={[Math.PI / 2.35, 0.1, -0.25]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.48, 0.48, 0.11, 48]} />
        <meshStandardMaterial color={rose ? '#b86f78' : '#d5bd7f'} metalness={0.62} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.061, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.31, 0.018, 12, 48]} />
        <meshStandardMaterial color={rose ? '#f7dce0' : '#fff2c9'} metalness={0.4} roughness={0.3} />
      </mesh>
    </group>
  )
}

function CoffeeToken({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0.12, rotation, -0.08]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.24, 0.19, 0.42, 32, 1, true]} />
        <meshStandardMaterial color="#ead7c7" roughness={0.38} metalness={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.24, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.035, 12, 28, Math.PI * 1.6]} />
        <meshStandardMaterial color="#ead7c7" roughness={0.38} />
      </mesh>
      <mesh position={[0, 0.215, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.014, 32]} />
        <meshStandardMaterial color="#6c493a" roughness={0.72} />
      </mesh>
    </group>
  )
}

function BalanceScale({ beamRef }: { beamRef: React.RefObject<THREE.Group | null> }) {
  return (
    <group>
      <mesh position={[0, -0.86, 0.58]} castShadow>
        <cylinderGeometry args={[0.4, 0.64, 0.12, 48]} />
        <meshStandardMaterial color="#aa7d50" metalness={0.72} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.08, 0.58]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 1.56, 28]} />
        <meshStandardMaterial color="#c39b62" metalness={0.78} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.73, 0.58]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#f0d795" metalness={0.76} roughness={0.22} />
      </mesh>

      <group ref={beamRef} position={[0, 0.7, 0.58]} rotation={[0, 0, 0.16]}>
        <mesh castShadow>
          <boxGeometry args={[3.7, 0.12, 0.17]} />
          <meshStandardMaterial color="#b78952" metalness={0.78} roughness={0.24} />
        </mesh>
        {[-1.5, 1.5].map((x) => (
          <group position={[x, -0.58, 0]} key={x}>
            <mesh position={[-0.38, 0.28, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.62, 12]} />
              <meshStandardMaterial color="#d6bd82" metalness={0.65} roughness={0.3} />
            </mesh>
            <mesh position={[0.38, 0.28, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.62, 12]} />
              <meshStandardMaterial color="#d6bd82" metalness={0.65} roughness={0.3} />
            </mesh>
            <mesh rotation={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.55, 0.68, 0.1, 40]} />
              <meshPhysicalMaterial color="#e7d3af" metalness={0.28} roughness={0.32} clearcoat={0.45} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

function LedgerSculpture({ monthEnd, scrollProgress }: SceneProps) {
  const sculpture = useRef<THREE.Group>(null)
  const ledger = useRef<THREE.Group>(null)
  const page = useRef<THREE.Group>(null)
  const orbit = useRef<THREE.Group>(null)
  const balance = useRef<THREE.Group>(null)
  const beam = useRef<THREE.Group>(null)
  const focusCoin = useRef<THREE.Group>(null)
  const coffeeRush = useRef<THREE.Group>(null)
  const finalSeal = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const smoothProgress = useRef(0)
  const camera = useThree((state) => state.camera)

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  useFrame((state, delta) => {
    if (!sculpture.current || !ledger.current || !page.current || !orbit.current || !balance.current || !beam.current || !focusCoin.current || !coffeeRush.current || !finalSeal.current) return

    smoothProgress.current = THREE.MathUtils.damp(smoothProgress.current, scrollProgress, 5.5, delta)
    const p = smoothProgress.current
    const open = THREE.MathUtils.smoothstep(p, 0.03, 0.24)
    const balancing = THREE.MathUtils.smoothstep(p, 0.18, 0.46)
    const rushIn = THREE.MathUtils.smoothstep(p, 0.38, 0.52)
    const rushOut = 1 - THREE.MathUtils.smoothstep(p, 0.58, 0.7)
    const rush = rushIn * rushOut
    const focus = THREE.MathUtils.smoothstep(p, 0.61, 0.81)
    const settle = THREE.MathUtils.smoothstep(p, 0.84, 0.985)
    const pointerWeight = 1 - Math.min(1, p * 1.8)

    const speed = monthEnd || rush > 0.05 ? 2.7 : 0.38 + p * 0.55
    orbit.current.rotation.z += delta * speed
    orbit.current.scale.setScalar(1 - balancing * 0.58 + settle * 0.34)

    sculpture.current.rotation.y = THREE.MathUtils.damp(
      sculpture.current.rotation.y,
      pointer.current.x * 0.16 * pointerWeight + p * 0.32 - focus * 0.18,
      4,
      delta,
    )
    sculpture.current.rotation.x = THREE.MathUtils.damp(
      sculpture.current.rotation.x,
      -pointer.current.y * 0.09 * pointerWeight - 0.08 + balancing * 0.1,
      4,
      delta,
    )
    sculpture.current.rotation.z = THREE.MathUtils.damp(sculpture.current.rotation.z, -0.08 + open * 0.12 - settle * 0.04, 4, delta)

    ledger.current.position.x = THREE.MathUtils.damp(ledger.current.position.x, -1.25 * balancing - 0.72 * focus + 0.34 * settle, 4.5, delta)
    ledger.current.position.y = THREE.MathUtils.damp(ledger.current.position.y, 0.12 * open - 0.18 * focus, 4.5, delta)
    ledger.current.position.z = THREE.MathUtils.damp(ledger.current.position.z, -0.7 * balancing - 0.55 * focus, 4.5, delta)
    const ledgerScale = 1 - balancing * 0.2 - focus * 0.18 + settle * 0.08
    ledger.current.scale.setScalar(ledgerScale)
    page.current.rotation.y = THREE.MathUtils.damp(page.current.rotation.y, -open * 1.12 + balancing * 0.2, 4.8, delta)
    page.current.position.z = THREE.MathUtils.damp(page.current.position.z, 0.17 + open * 0.18, 4.8, delta)

    const balanceVisibility = Math.max(0.001, balancing * (1 - focus * 0.72) + settle * 0.72)
    balance.current.scale.setScalar(balanceVisibility)
    balance.current.position.x = THREE.MathUtils.damp(balance.current.position.x, 1.25 - focus * 0.9 + settle * 0.65, 4.5, delta)
    balance.current.position.y = THREE.MathUtils.damp(balance.current.position.y, -0.05 + focus * 0.12, 4.5, delta)
    beam.current.rotation.z = THREE.MathUtils.damp(beam.current.rotation.z, 0.16 * (1 - settle), 4.8, delta)

    const coinBalanceX = 2.72
    const coinBalanceY = -0.03
    const targetCoinX = THREE.MathUtils.lerp(2.05, coinBalanceX, balancing)
    const targetCoinY = THREE.MathUtils.lerp(-1.24, coinBalanceY, balancing)
    focusCoin.current.position.x = THREE.MathUtils.damp(
      focusCoin.current.position.x,
      THREE.MathUtils.lerp(THREE.MathUtils.lerp(targetCoinX, 0.22, focus), coinBalanceX, settle),
      5.2,
      delta,
    )
    focusCoin.current.position.y = THREE.MathUtils.damp(
      focusCoin.current.position.y,
      THREE.MathUtils.lerp(THREE.MathUtils.lerp(targetCoinY, 0.12, focus), coinBalanceY, settle),
      5.2,
      delta,
    )
    focusCoin.current.position.z = THREE.MathUtils.damp(
      focusCoin.current.position.z,
      THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.8, 2.52, focus), 0.92, settle),
      5.2,
      delta,
    )
    const coinScale = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.72, 1.78, focus), 0.74, settle)
    focusCoin.current.scale.setScalar(coinScale)
    focusCoin.current.rotation.z += delta * (0.25 + focus * 1.8)

    const coffeeScale = monthEnd ? 1 : Math.max(0.001, rush)
    coffeeRush.current.scale.setScalar(coffeeScale)
    coffeeRush.current.rotation.y += delta * (monthEnd || rush > 0.02 ? 1.4 : 0.05)
    coffeeRush.current.rotation.z = Math.sin(state.clock.elapsedTime * 2.2) * 0.06 * rush

    finalSeal.current.scale.setScalar(Math.max(0.001, settle))
    finalSeal.current.rotation.z -= delta * (0.18 + settle * 0.24)

    camera.position.z = THREE.MathUtils.damp(camera.position.z, 7.2 - focus * 0.82 + settle * 0.46, 4.5, delta)
  })

  return (
    <group ref={sculpture} rotation={[-0.08, -0.12, -0.08]}>
      <group ref={ledger} position={[0, -0.12, 0]}>
        <RoundedBox args={[3.65, 2.35, 0.22]} radius={0.12} smoothness={4} castShadow>
          <meshPhysicalMaterial color="#e7d7cd" roughness={0.42} metalness={0.05} clearcoat={0.55} />
        </RoundedBox>

        <group ref={page} position={[0.15, 0.14, 0.17]}>
          <RoundedBox args={[3.45, 2.15, 0.16]} radius={0.1} smoothness={4} castShadow>
            <meshPhysicalMaterial color="#fbf8f3" roughness={0.6} clearcoat={0.25} />
          </RoundedBox>
          {[-0.62, 0, 0.62].map((y) => (
            <mesh key={y} position={[0, y, 0.095]}>
              <boxGeometry args={[2.82, 0.018, 0.016]} />
              <meshStandardMaterial color="#cdbbaa" transparent opacity={0.74} />
            </mesh>
          ))}
          {[-0.98, 0, 0.98].map((x) => (
            <mesh key={x} position={[x, 0, 0.095]}>
              <boxGeometry args={[0.016, 1.64, 0.016]} />
              <meshStandardMaterial color="#d8c9bb" transparent opacity={0.64} />
            </mesh>
          ))}
        </group>

        <mesh position={[0.15, 0.08, 0.48]} castShadow>
          <torusGeometry args={[1.02, 0.075, 24, 96]} />
          <meshStandardMaterial color="#ad7d52" metalness={0.72} roughness={0.25} />
        </mesh>
        <mesh position={[0.15, 0.08, 0.5]}>
          <ringGeometry args={[0.76, 0.91, 64]} />
          <meshPhysicalMaterial color="#f2c5cb" transparent opacity={0.46} roughness={0.18} clearcoat={1} />
        </mesh>

        <group ref={orbit} position={[0.15, 0.08, 0.59]}>
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

      <group ref={balance} scale={0.001} position={[1.25, -0.05, 0.25]}>
        <BalanceScale beamRef={beam} />
        <group position={[-0.25, 0.15, 0.82]} scale={0.54}><CoinToken /></group>
        <group position={[0.2, 0.22, 0.84]} scale={0.48}><CoinToken /></group>
      </group>

      <group position={[-2.18, 1.26, 0.7]}><CoinToken scale={0.86} /></group>
      <group position={[2.22, 1.42, -0.2]}><CoinToken scale={0.54} /></group>
      <group ref={focusCoin} position={[2.05, -1.24, 0.8]}><CoinToken rose /></group>

      <group ref={coffeeRush} scale={0.001}>
        <CoffeeToken position={[-2.7, 1.72, 0.2]} rotation={0.2} />
        <CoffeeToken position={[2.62, 1.5, -0.5]} rotation={1.1} />
        <CoffeeToken position={[-2.45, -1.72, 0.4]} rotation={2.2} />
      </group>

      <group ref={finalSeal} scale={0.001} position={[0.24, 0.1, -0.35]}>
        <mesh>
          <torusGeometry args={[2.15, 0.025, 12, 120]} />
          <meshStandardMaterial color="#d7bb78" metalness={0.65} roughness={0.3} />
        </mesh>
        {[0, 1, 2, 3].map((index) => {
          const angle = index * Math.PI / 2
          return (
            <mesh key={index} position={[Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0]}>
              <sphereGeometry args={[0.09, 20, 20]} />
              <meshStandardMaterial color="#f4e5b6" metalness={0.5} roughness={0.25} />
            </mesh>
          )
        })}
      </group>

      <Sparkles count={monthEnd ? 48 : 26} scale={[6, 4.5, 2]} size={1.55} speed={monthEnd ? 1.5 : 0.45} color="#c6a36d" />
    </group>
  )
}

export function FinanceWorld3D({ monthEnd, scrollProgress }: SceneProps) {
  return (
    <div className="finance-world" aria-label="随滚轮完成入账、借贷平衡和差额追踪的 3D 财务场景">
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
        <LedgerSculpture monthEnd={monthEnd} scrollProgress={scrollProgress} />
        <ContactShadows position={[0, -2.32, -0.4]} opacity={0.2} scale={7} blur={2.6} far={4} />
      </Canvas>
    </div>
  )
}
