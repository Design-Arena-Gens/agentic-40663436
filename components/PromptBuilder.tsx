"use client"

import { useMemo, useState } from 'react'
import {
  basePrompt,
  negativePrompt,
  audioPrompt,
  cameraDirections,
  sceneDetails,
  shotList,
} from '@/utils/prompt'

function copy(text: string) {
  navigator.clipboard.writeText(text)
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export default function PromptBuilder() {
  const [includeNegative, setIncludeNegative] = useState(true)
  const [includeAudio, setIncludeAudio] = useState(true)
  const [includeCamera, setIncludeCamera] = useState(true)
  const [includeShots, setIncludeShots] = useState(true)
  const [durationSec, setDurationSec] = useState(12)
  const [aspect, setAspect] = useState<'16:9' | '9:16' | '1:1' | '2.39:1'>('16:9')

  const combined = useMemo(() => {
    const parts: string[] = []
    parts.push(basePrompt.trim())
    parts.push(sceneDetails.trim())
    if (includeCamera) parts.push(cameraDirections.trim())
    if (includeShots) parts.push(shotList.trim())
    if (includeAudio) parts.push(audioPrompt.trim())
    if (includeNegative) parts.push(`NEGATIVE PROMPT: ${negativePrompt.trim()}`)
    parts.push(`RENDER SPECS: ultra?realistic, 8K, HDR, global illumination, volumetrics, motion blur, film grain subtle, physically based shading, cinematic color grade (Kodak 2383), high dynamic range, ${aspect}, duration ${durationSec}s.`)
    return parts.join('\n\n')
  }, [includeAudio, includeCamera, includeNegative, includeShots, durationSec, aspect])

  const json = useMemo(() => ({
    model: 'general-video',
    prompt: combined,
    negative_prompt: includeNegative ? negativePrompt : undefined,
    aspect_ratio: aspect,
    duration_seconds: durationSec,
    guidance_scale: 9,
    seed: 123456789,
    audio_prompt: includeAudio ? 'Har Har Mahadev; Om Namah Shivaya; deep, bass, reverb' : undefined,
  }), [combined, includeNegative, includeAudio, aspect, durationSec])

  return (
    <section className="space-y-6">
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h2 className="text-lg font-semibold">Controls</h2>
          <div className="copy-badge">8K Cinematic ? Mahakal</div>
        </div>
        <div className="card-body grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="scale-110" checked={includeNegative} onChange={(e) => setIncludeNegative(e.target.checked)} />
              <span>Include negative prompt</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="scale-110" checked={includeAudio} onChange={(e) => setIncludeAudio(e.target.checked)} />
              <span>Include audio guidance</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="scale-110" checked={includeCamera} onChange={(e) => setIncludeCamera(e.target.checked)} />
              <span>Include camera directions</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="scale-110" checked={includeShots} onChange={(e) => setIncludeShots(e.target.checked)} />
              <span>Include shot list</span>
            </label>
          </div>
          <div className="space-y-3">
            <label className="block">
              <span className="block text-sm text-slate-300">Duration (seconds)</span>
              <input
                type="number"
                min={4}
                max={30}
                value={durationSec}
                onChange={(e) => setDurationSec(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 p-2 outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
              />
            </label>
            <label className="block">
              <span className="block text-sm text-slate-300">Aspect Ratio</span>
              <select
                value={aspect}
                onChange={(e) => setAspect(e.target.value as any)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 p-2 outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
              >
                <option value="16:9">16:9 (widescreen)</option>
                <option value="2.39:1">2.39:1 (scope)</option>
                <option value="9:16">9:16 (vertical)</option>
                <option value="1:1">1:1 (square)</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h2 className="text-lg font-semibold">Final Prompt</h2>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost" onClick={() => copy(combined)}>Copy</button>
            <button className="btn btn-primary" onClick={() => downloadJson('mahakal_tandav_prompt.json', json)}>Download JSON</button>
          </div>
        </div>
        <div className="card-body">
          <textarea className="prompt" rows={18} readOnly value={combined} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold">Base Prompt</h3>
            <button className="btn btn-ghost" onClick={() => copy(basePrompt)}>Copy</button>
          </div>
          <div className="card-body">
            <textarea className="prompt" rows={10} readOnly value={basePrompt} />
          </div>
        </section>

        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold">Scene Details</h3>
            <button className="btn btn-ghost" onClick={() => copy(sceneDetails)}>Copy</button>
          </div>
          <div className="card-body">
            <textarea className="prompt" rows={10} readOnly value={sceneDetails} />
          </div>
        </section>

        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold">Camera Directions</h3>
            <button className="btn btn-ghost" onClick={() => copy(cameraDirections)}>Copy</button>
          </div>
          <div className="card-body">
            <textarea className="prompt" rows={10} readOnly value={cameraDirections} />
          </div>
        </section>

        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold">Shot List</h3>
            <button className="btn btn-ghost" onClick={() => copy(shotList)}>Copy</button>
          </div>
          <div className="card-body">
            <textarea className="prompt" rows={10} readOnly value={shotList} />
          </div>
        </section>

        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold">Audio Prompt</h3>
            <button className="btn btn-ghost" onClick={() => copy(audioPrompt)}>Copy</button>
          </div>
          <div className="card-body">
            <textarea className="prompt" rows={10} readOnly value={audioPrompt} />
          </div>
        </section>

        <section className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold">Negative Prompt</h3>
            <button className="btn btn-ghost" onClick={() => copy(negativePrompt)}>Copy</button>
          </div>
          <div className="card-body">
            <textarea className="prompt" rows={10} readOnly value={negativePrompt} />
          </div>
        </section>
      </div>
    </section>
  )
}
