import { ContactShadows, Edges, RoundedBox, Sparkles } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type SceneProps = {
  monthEnd: boolean
  scrollProgress: number
}

const GOLD = '#d7b46e'
const CHAMPAGNE = '#f0d9a1'
const ROSE = '#a95060'
const PAPER = '#f7f0e8'

function LedgerPane({ index }: { index: number }) {
  return (
    <group>
      <RoundedBox args={[2.75, 1.72, 0.075]} radius={0.07} smoothness={5} castShadow>
        <meshPhysicalMaterial
          color={index === 2 ? '#f9f3ec' : '#e9ded5'}
          roughness={0.2}
          metalness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.16}
          transparent
          opacity={0.82}
        />
        <Edges color={index === 2 ? '#c69770' : '#a99b90'} threshold={14} />
      </RoundedBox>

      {[-0.48, -0.16, 0.16, 0.48].map((y, row) => (
        <mesh key={y} position={[0.1, y, 0.047]}>
          <boxGeometry args={[2.22, row === 2 && index === 2 ? 0.035 : 0.014, 0.009]} />
          <meshStandardMaterial color={row === 2 && index === 2 ? ROSE : '#b8a99d'} transparent opacity={row === 2 && index === 2 ? 0.82 : 0.5} />
        </mesh>
      ))}

      {[-0.72, 0.48].map((x) => (
        <mesh key={x} position={[x, 0, 0.049]}>
          <boxGeometry args={[0.012, 1.26, 0.009]} />
          <meshStandardMaterial color="#b8a99d" transparent opacity={0.36} />
        </mesh>
      ))}

      <mesh position={[-1.05, 0.62, 0.052]}>
        <boxGeometry args={[0.34, 0.045, 0.01]} />
        <meshStandardMaterial color={index === 2 ? GOLD : '#a99b90'} transparent opacity={0.72} />
      </mesh>
    </group>
  )
}

function DataThread({ mirror = false }: { mirror?: boolean }) {
  const curve = useMemo(() => {
    const direction = mirror ? -1 : 1
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.65, -0.9 * direction, -0.6),
      new THREE.Vector3(-1.7, 0.95 * direction, 0.15),
      new THREE.Vector3(-0.55, -0.35 * direction, 0.75),
      new THREE.Vector3(0.65, 0.55 * direction, 0.5),
      new THREE.Vector3(1.75, -0.8 * direction, 0.05),
      new THREE.Vector3(2.72, 0.72 * direction, -0.5),
    ])
  }, [mirror])

  return (
    <mesh>
      <tubeGeometry args={[curve, 120, mirror ? 0.022 : 0.035, 10, false]} />
      <meshStandardMaterial
        color={mirror ? '#bd6775' : GOLD}
        emissive={mirror ? '#6c2430' : '#72551f'}
        emissiveIntensity={0.48}
        metalness={0.72}
        roughness={0.22}
      />
    </mesh>
  )
}

function FractureBranch({ index }: { index: number }) {
  const curve = useMemo(() => {
    const angle = (index / 7) * Math.PI * 2 + 0.12
    const tangent = angle + (index % 2 ? 0.34 : -0.28)
    const start = new THREE.Vector3(Math.cos(angle) * 0.56, Math.sin(angle) * 0.56, 0.9)
    const middle = new THREE.Vector3(Math.cos(angle) * 1.18, Math.sin(angle) * 1.18, 0.72)
    const end = new THREE.Vector3(
      Math.cos(angle) * 1.78 + Math.cos(tangent) * 0.28,
      Math.sin(angle) * 1.78 + Math.sin(tangent) * 0.28,
      0.38,
    )
    return new THREE.CatmullRomCurve3([start, middle, end])
  }, [index])

  return (
    <mesh>
      <tubeGeometry args={[curve, 42, index % 3 === 0 ? 0.022 : 0.012, 8, false]} />
      <meshBasicMaterial color={index % 2 ? '#d98794' : '#f0d39c'} transparent opacity={0.82} />
    </mesh>
  )
}

function CentToken() {
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const context = canvas.getContext('2d')
    if (context) {
      context.clearRect(0, 0, 512, 512)
      context.fillStyle = '#f5dedf'
      context.beginPath()
      context.arc(256, 256, 234, 0, Math.PI * 2)
      context.fill()
      context.strokeStyle = '#7e3542'
      context.lineWidth = 7
      context.beginPath()
      context.arc(256, 256, 196, 0, Math.PI * 2)
      context.stroke()
      context.fillStyle = '#7e3542'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.font = '600 112px Georgia, serif'
      context.fillText('0.01', 256, 248)
      context.font = '500 25px Arial, sans-serif'
      context.letterSpacing = '5px'
      context.fillText('UNRESOLVED', 256, 340)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    return texture
  }, [])

  useEffect(() => () => labelTexture.dispose(), [labelTexture])

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.16, 96]} />
        <meshPhysicalMaterial color="#8e4050" metalness={0.42} roughness={0.2} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.086]}>
        <circleGeometry args={[0.64, 96]} />
        <meshBasicMaterial map={labelTexture} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <torusGeometry args={[0.66, 0.018, 12, 96]} />
        <meshStandardMaterial color="#f0c3c9" metalness={0.55} roughness={0.2} />
      </mesh>
    </group>
  )
}

function FinanceMindCore({ monthEnd, scrollProgress }: SceneProps) {
  const root = useRef<THREE.Group>(null)
  const pageRefs = useRef<Array<THREE.Group | null>>([])
  const mindCore = useRef<THREE.Group>(null)
  const coreMaterial = useRef<THREE.MeshPhysicalMaterial>(null)
  const orbitA = useRef<THREE.Group>(null)
  const orbitB = useRef<THREE.Group>(null)
  const threads = useRef<THREE.Group>(null)
  const cent = useRef<THREE.Group>(null)
  const fracture = useRef<THREE.Group>(null)
  const finalHalo = useRef<THREE.Group>(null)
  const keyLight = useRef<THREE.PointLight>(null)
  const roseLight = useRef<THREE.PointLight>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const smoothProgress = useRef(0)
  const camera = useThree((state) => state.camera)
  const isCompact = useThree((state) => state.size.width < 700)

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  useFrame((state, delta) => {
    if (!root.current || !mindCore.current || !orbitA.current || !orbitB.current || !threads.current || !cent.current || !fracture.current || !finalHalo.current) return

    smoothProgress.current = THREE.MathUtils.damp(smoothProgress.current, scrollProgress, 4.7, delta)
    const p = smoothProgress.current
    const enter = THREE.MathUtils.smoothstep(p, 0.08, 0.32)
    const pressureIn = THREE.MathUtils.smoothstep(p, 0.3, 0.53)
    const pressureOut = 1 - THREE.MathUtils.smoothstep(p, 0.66, 0.8)
    const pressure = pressureIn * pressureOut
    const focus = THREE.MathUtils.smoothstep(p, 0.57, 0.82)
    const resolve = THREE.MathUtils.smoothstep(p, 0.84, 0.99)
    const pointerWeight = 1 - Math.min(1, p * 1.9)
    const time = state.clock.elapsedTime
    const speed = monthEnd ? 2.2 : 1

    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.current.x * 0.12 * pointerWeight + enter * 0.28 - focus * 0.18, 4, delta)
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -0.04 - pointer.current.y * 0.08 * pointerWeight + enter * 0.08, 4, delta)
    root.current.position.x = THREE.MathUtils.damp(root.current.position.x, 0.18 - focus * 0.22 + resolve * 0.12, 4, delta)

    pageRefs.current.forEach((page, index) => {
      if (!page) return
      const centered = index - 2
      const surfaceX = -0.78 + index * 0.2
      const surfaceY = centered * 0.08
      const surfaceZ = -index * 0.11
      const innerX = Math.sin(index * 1.43) * 1.12 - 0.45
      const innerY = centered * 0.6
      const innerZ = -1.05 + index * 0.38
      const resolvedX = centered * 0.22 - 0.52
      const resolvedY = centered * 0.16
      const resolvedZ = -Math.abs(centered) * 0.16
      const tremor = Math.sin(time * (2.1 + index * 0.17) * speed + index) * 0.09 * pressure
      const stagedX = THREE.MathUtils.lerp(surfaceX, innerX, enter)
      const stagedY = THREE.MathUtils.lerp(surfaceY, innerY, enter) + tremor
      const stagedZ = THREE.MathUtils.lerp(surfaceZ, innerZ, enter) + Math.cos(time * 1.7 + index) * 0.06 * pressure

      page.position.x = THREE.MathUtils.damp(page.position.x, THREE.MathUtils.lerp(THREE.MathUtils.lerp(stagedX, stagedX - 1.1, focus), resolvedX, resolve), 4.2, delta)
      page.position.y = THREE.MathUtils.damp(page.position.y, THREE.MathUtils.lerp(THREE.MathUtils.lerp(stagedY, stagedY * 0.72, focus), resolvedY, resolve), 4.2, delta)
      page.position.z = THREE.MathUtils.damp(page.position.z, THREE.MathUtils.lerp(THREE.MathUtils.lerp(stagedZ, stagedZ - 0.5, focus), resolvedZ, resolve), 4.2, delta)
      page.rotation.y = THREE.MathUtils.damp(page.rotation.y, THREE.MathUtils.lerp((-0.22 + index * 0.055) * (1 - enter) + centered * 0.18 * enter, centered * 0.045, resolve), 4.4, delta)
      page.rotation.z = THREE.MathUtils.damp(page.rotation.z, THREE.MathUtils.lerp(centered * 0.025 + tremor * 0.3, centered * 0.018, resolve), 4.4, delta)
      const pageScale = THREE.MathUtils.lerp(1, 0.73, focus) + resolve * 0.15
      page.scale.setScalar(THREE.MathUtils.damp(page.scale.x, pageScale, 4.2, delta))
    })

    const mindScale = (0.34 + enter * 0.74 - focus * 0.12 + resolve * 0.18) * (isCompact ? 0.88 : 1)
    mindCore.current.scale.setScalar(THREE.MathUtils.damp(mindCore.current.scale.x, mindScale, 4.5, delta))
    mindCore.current.rotation.y += delta * (0.12 + pressure * 0.7) * speed
    mindCore.current.rotation.z -= delta * (0.08 + pressure * 0.42) * speed
    if (coreMaterial.current) coreMaterial.current.emissiveIntensity = 0.3 + pressure * 1.5 + focus * 0.65 + resolve * 0.55

    orbitA.current.rotation.z += delta * (0.18 + pressure * 1.4) * speed
    orbitA.current.rotation.y += delta * 0.11
    orbitB.current.rotation.z -= delta * (0.13 + pressure * 1.1) * speed
    orbitB.current.rotation.x += delta * 0.07
    const expressiveOrbitScale = 0.72 + enter * 0.34 - focus * 0.16
    const orbitScale = THREE.MathUtils.lerp(expressiveOrbitScale, 0.64, resolve)
    orbitA.current.scale.setScalar(orbitScale)
    orbitB.current.scale.setScalar(orbitScale * 0.94)

    const expressiveThreadScale = 0.48 + enter * 0.58 - focus * 0.12
    threads.current.scale.setScalar(THREE.MathUtils.lerp(expressiveThreadScale, 0.54, resolve))
    threads.current.rotation.z = Math.sin(time * 0.28) * 0.05 + pressure * 0.08

    const centOrbitX = 1.95 - enter * 0.3
    const centOrbitY = -1.18 + enter * 0.86
    const focusX = THREE.MathUtils.lerp(centOrbitX, isCompact ? 0.55 : 0.08, focus)
    const focusY = THREE.MathUtils.lerp(centOrbitY, 0.02, focus)
    const focusZ = THREE.MathUtils.lerp(0.82, 2.42, focus)
    cent.current.position.x = THREE.MathUtils.damp(cent.current.position.x, THREE.MathUtils.lerp(focusX, 0.74, resolve), 5.2, delta)
    cent.current.position.y = THREE.MathUtils.damp(cent.current.position.y, THREE.MathUtils.lerp(focusY, 0, resolve), 5.2, delta)
    cent.current.position.z = THREE.MathUtils.damp(cent.current.position.z, THREE.MathUtils.lerp(focusZ, 0.9, resolve), 5.2, delta)
    const centScale = THREE.MathUtils.lerp(0.58 + enter * 0.16, isCompact ? 0.86 : 1.45, focus) * (1 - resolve * 0.92)
    cent.current.scale.setScalar(THREE.MathUtils.damp(cent.current.scale.x, centScale, 5.2, delta))
    cent.current.rotation.z += delta * (0.16 + pressure * 1.1 - resolve * 0.1)

    const fractureScale = Math.max(0.001, focus * (1 - resolve))
    fracture.current.scale.setScalar(THREE.MathUtils.damp(fracture.current.scale.x, fractureScale, 5.4, delta))
    fracture.current.rotation.z = -0.12 + Math.sin(time * 0.6) * 0.025

    const haloScale = Math.max(0.001, resolve)
    finalHalo.current.scale.setScalar(THREE.MathUtils.damp(finalHalo.current.scale.x, haloScale, 4.6, delta))
    finalHalo.current.rotation.z -= delta * 0.12

    if (keyLight.current) keyLight.current.intensity = 2.1 + enter * 1.5 + resolve * 1.6
    if (roseLight.current) roseLight.current.intensity = 0.8 + pressure * 3.8 + focus * 2.1 - resolve * 2.4

    camera.position.x = THREE.MathUtils.damp(camera.position.x, -0.1 + enter * 0.18 - focus * 0.12, 4, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.06 + pressure * 0.08, 4, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 7.4 - enter * 0.52 - focus * 1.02 + resolve * 1.18, 4.3, delta)
    camera.lookAt(0.05, 0, 0)
  })

  return (
    <group ref={root} position={[0.18, 0, 0]} rotation={[-0.04, -0.08, 0]}>
      <pointLight ref={keyLight} position={[2.4, 3.2, 4.5]} intensity={2.1} color="#ffe5bc" distance={12} />
      <pointLight ref={roseLight} position={[-2.7, 0.2, 3]} intensity={0.8} color="#d66e7e" distance={10} />

      {[0, 1, 2, 3, 4].map((index) => (
        <group
          key={index}
          ref={(node) => {
            pageRefs.current[index] = node
          }}
          position={[-0.78 + index * 0.2, (index - 2) * 0.08, -index * 0.11]}
          rotation={[0.02 * (index - 2), -0.22 + index * 0.055, (index - 2) * 0.025]}
        >
          <LedgerPane index={index} />
        </group>
      ))}

      <group ref={threads} scale={0.48}>
        <DataThread />
        <DataThread mirror />
      </group>

      <group ref={mindCore} scale={0.34} position={[0.22, 0, 0.45]}>
        <mesh castShadow>
          <sphereGeometry args={[1.04, 96, 96]} />
          <meshPhysicalMaterial color="#3a252b" emissive="#7d3140" emissiveIntensity={0.3} roughness={0.12} metalness={0.08} transmission={0.5} thickness={1.25} clearcoat={1} clearcoatRoughness={0.08} transparent opacity={0.92} />
        </mesh>
        <mesh scale={0.67}>
          <icosahedronGeometry args={[1, 4]} />
          <meshPhysicalMaterial ref={coreMaterial} color="#8e4050" emissive="#7d2636" emissiveIntensity={0.3} metalness={0.48} roughness={0.18} clearcoat={1} />
        </mesh>
        <mesh scale={1.2} rotation={[0.2, 0.4, 0]}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#e7c98e" wireframe transparent opacity={0.18} />
        </mesh>
      </group>

      <group ref={orbitA} position={[0.22, 0, 0.45]} rotation={[1.05, 0.35, -0.28]} scale={0.72}>
        <mesh>
          <torusGeometry args={[1.82, 0.035, 14, 180]} />
          <meshStandardMaterial color={GOLD} metalness={0.86} roughness={0.18} emissive="#594116" emissiveIntensity={0.32} />
        </mesh>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
          const angle = (index / 8) * Math.PI * 2
          return (
            <mesh key={index} position={[Math.cos(angle) * 1.82, Math.sin(angle) * 1.82, 0]} castShadow>
              <sphereGeometry args={[index % 3 === 0 ? 0.105 : 0.055, 24, 24]} />
              <meshStandardMaterial color={index % 3 === 0 ? CHAMPAGNE : GOLD} metalness={0.75} roughness={0.2} />
            </mesh>
          )
        })}
      </group>

      <group ref={orbitB} position={[0.22, 0, 0.45]} rotation={[-0.68, 0.85, 0.32]} scale={0.68}>
        <mesh>
          <torusGeometry args={[2.16, 0.022, 12, 200]} />
          <meshStandardMaterial color="#bb6573" metalness={0.58} roughness={0.22} emissive="#672330" emissiveIntensity={0.42} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = (index / 6) * Math.PI * 2 + 0.38
          return (
            <mesh key={index} position={[Math.cos(angle) * 2.16, Math.sin(angle) * 2.16, 0]}>
              <octahedronGeometry args={[index === 0 ? 0.12 : 0.065, 1]} />
              <meshStandardMaterial color={index === 0 ? '#e8a6b0' : '#ad5665'} metalness={0.5} roughness={0.22} />
            </mesh>
          )
        })}
      </group>

      <group ref={cent} position={[1.95, -1.18, 0.82]} scale={0.58}>
        <CentToken />
      </group>

      <group ref={fracture} scale={0.001}>
        {[0, 1, 2, 3, 4, 5, 6].map((index) => <FractureBranch index={index} key={index} />)}
      </group>

      <group ref={finalHalo} scale={0.001} position={[0.22, 0, -0.15]}>
        <mesh rotation={[0.05, 0.25, 0]}>
          <torusGeometry args={[2.54, 0.026, 14, 220]} />
          <meshStandardMaterial color={CHAMPAGNE} metalness={0.82} roughness={0.18} emissive="#76571d" emissiveIntensity={0.5} />
        </mesh>
        <mesh rotation={[0.6, -0.5, 0.32]}>
          <torusGeometry args={[2.1, 0.014, 10, 180]} />
          <meshBasicMaterial color="#d98a96" transparent opacity={0.7} />
        </mesh>
      </group>

      <Sparkles count={monthEnd ? 68 : 42} scale={[6.4, 4.8, 3]} size={1.2} speed={monthEnd ? 1.15 : 0.38} color={GOLD} />
    </group>
  )
}

export function FinanceWorld3D({ monthEnd, scrollProgress }: SceneProps) {
  return (
    <div className="finance-world" aria-label="随滚轮进入财务脑内的双重记账核心 3D 场景">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.06, 7.4], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.08
        }}
        shadows
      >
        <ambientLight intensity={0.82} color={PAPER} />
        <directionalLight position={[4.6, 5.2, 6]} intensity={2.7} color="#fff0d9" castShadow />
        <FinanceMindCore monthEnd={monthEnd} scrollProgress={scrollProgress} />
        <ContactShadows position={[0, -2.48, -0.35]} opacity={0.15} scale={7.5} blur={3.2} far={4.4} />
      </Canvas>
    </div>
  )
}
