'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Props {
  onAddressSelect: (address: string, lat: number, lng: number) => void
  inputValue: string
  onInputChange: (v: string) => void
  placeholder?: string
}

// Autocompletado de direcciones con LISTA PROPIA de sugerencias.
// En vez del widget .pac-container de Google (que choca con el autofill del navegador
// y a veces no se despliega), usamos AutocompleteService + PlacesService y renderizamos
// nuestra propia lista, que aparece SOLA al escribir y controlamos por completo.
export function SatelliteMap({ onAddressSelect, inputValue, onInputChange, placeholder = 'Escribe tu dirección...' }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)
  const acServiceRef = useRef<google.maps.places.AutocompleteService | null>(null)
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null)
  const blurTimer = useRef<number | null>(null)
  const [verified, setVerified] = useState(false)
  const [mapsAvailable, setMapsAvailable] = useState(false)
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [open, setOpen] = useState(false)
  const [outOfArea, setOutOfArea] = useState(false)

  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstanceRef.current) return
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 41.6032, lng: -73.0877 },
      zoom: 9,
      mapTypeId: 'satellite',
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: 'cooperative',
      mapTypeControl: false,
      streetViewControl: false,
    })
    markerRef.current = new google.maps.Marker({ map, animation: google.maps.Animation.DROP, visible: false })
    mapInstanceRef.current = map
    setMapsAvailable(true)
  }, [])

  const initServices = useCallback(() => {
    if (acServiceRef.current || !window.google?.maps?.places) return
    acServiceRef.current = new google.maps.places.AutocompleteService()
    placesServiceRef.current = new google.maps.places.PlacesService(document.createElement('div'))
  }, [])

  useEffect(() => {
    const tryInit = () => {
      if (window.google?.maps) { initMap(); initServices() }
    }
    tryInit()
    window.addEventListener('google-maps-ready', tryInit)
    return () => window.removeEventListener('google-maps-ready', tryInit)
  }, [initMap, initServices])

  const fetchPredictions = useCallback((val: string) => {
    if (!acServiceRef.current || val.trim().length < 3) { setPredictions([]); setOpen(false); return }
    acServiceRef.current.getPlacePredictions(
      {
        input: val,
        componentRestrictions: { country: 'us' },
        types: ['address'],
        // Sesga las sugerencias hacia Connecticut (aparecen primero las de CT)
        bounds: new google.maps.LatLngBounds({ lat: 40.98, lng: -73.73 }, { lat: 42.05, lng: -71.79 }),
      },
      (preds, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && preds && preds.length) {
          setPredictions(preds.slice(0, 5))
          setOpen(true)
        } else {
          setPredictions([])
          setOpen(false)
        }
      },
    )
  }, [])

  const handleChange = (val: string) => {
    if (verified) setVerified(false)
    setOutOfArea(false)
    onInputChange(val)
    fetchPredictions(val)
  }

  const selectPrediction = (p: google.maps.places.AutocompletePrediction) => {
    if (blurTimer.current) window.clearTimeout(blurTimer.current)
    setOpen(false)
    setPredictions([])
    onInputChange(p.description)
    if (!placesServiceRef.current) { onAddressSelect(p.description, 0, 0); setVerified(true); return }
    placesServiceRef.current.getDetails(
      { placeId: p.place_id, fields: ['formatted_address', 'geometry', 'address_components'] },
      (place, status) => {
        const address = place?.formatted_address ?? p.description
        // Solo Connecticut: si el estado no es CT, avisamos y NO verificamos
        const state = place?.address_components?.find((c) => c.types.includes('administrative_area_level_1'))?.short_name
        if (state && state !== 'CT') {
          setOutOfArea(true)
          setVerified(false)
          return
        }
        setOutOfArea(false)
        if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
          const lat = place.geometry.location.lat()
          const lng = place.geometry.location.lng()
          onAddressSelect(address, lat, lng)
          onInputChange(address)
          const map = mapInstanceRef.current
          const marker = markerRef.current
          if (map && marker) {
            map.panTo({ lat, lng })
            setTimeout(() => {
              map.setZoom(19)
              map.setCenter({ lat, lng })
              marker.setPosition({ lat, lng })
              marker.setVisible(true)
            }, 150)
          }
        } else {
          onAddressSelect(address, 0, 0)
        }
        setVerified(true)
      },
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
      {!verified && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: 'var(--navy)', fontWeight: 600, fontFamily: 'var(--font-sora)' }}>
          <span>Escribe tu dirección y <strong style={{ color: 'var(--orange)' }}>elígela de la lista</strong></span>
          <span style={{ fontSize: '1rem' }}>👇</span>
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => { if (predictions.length) setOpen(true) }}
          onBlur={() => { blurTimer.current = window.setTimeout(() => setOpen(false), 150) }}
          placeholder={placeholder}
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          style={{
            width: '100%',
            padding: '0.875rem 1rem 0.875rem 2.75rem',
            border: `2px solid ${verified ? 'var(--orange)' : 'var(--border)'}`,
            borderRadius: 'var(--radius)',
            fontSize: '0.9375rem',
            fontFamily: 'var(--font-dm)',
            color: 'var(--navy2)',
            outline: 'none',
            transition: 'border-color 0.2s',
            background: 'var(--white)',
          }}
        />
        <span style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>
          📍
        </span>
        {verified && (
          <span style={{
            position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)',
            background: 'var(--orange)', color: 'white', fontSize: '0.6875rem', fontWeight: 700,
            padding: '0.2rem 0.5rem', borderRadius: 999, fontFamily: 'var(--font-sora)',
          }}>
            🛰️ SATÉLITE
          </span>
        )}

        {/* Lista de sugerencias PROPIA — aparece sola al escribir */}
        {open && predictions.length > 0 && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 30,
            background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
            boxShadow: '0 12px 30px rgba(0,0,0,.15)', overflow: 'hidden',
          }}>
            {predictions.map((p) => (
              <button
                key={p.place_id}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); selectPrediction(p) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%',
                  padding: '0.75rem 0.875rem', border: 'none', borderTop: '1px solid var(--light)',
                  background: 'transparent', cursor: 'pointer', textAlign: 'left',
                  fontSize: '0.875rem', color: 'var(--navy2)', fontFamily: 'var(--font-dm)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--light)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ flexShrink: 0 }}>📍</span>
                <span>{p.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {outOfArea && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(200,16,46,.08)', border: '1px solid rgba(200,16,46,.25)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.875rem', fontSize: '0.8125rem', color: '#C8102E', fontWeight: 600 }}>
          <span>⚠️</span> Por ahora solo atendemos en Connecticut.
        </div>
      )}
      <div className={`map-block${verified ? ' verified' : ''}`} style={{ position: 'relative' }}>
        {verified && (
          <div style={{
            position: 'absolute', top: 8, left: 8, zIndex: 10,
            background: 'rgba(27,42,107,.85)', color: 'white',
            fontSize: '0.6875rem', fontWeight: 700, padding: '0.3rem 0.625rem',
            borderRadius: 6, fontFamily: 'var(--font-sora)', backdropFilter: 'blur(4px)',
          }}>
            🛰️ TU PROPIEDAD
          </div>
        )}
        <div ref={mapRef} style={{ width: '100%', height: 220 }} />
        {!mapsAvailable && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'var(--light)', borderRadius: 'var(--radius)',
            flexDirection: 'column', gap: '0.5rem', color: 'var(--muted)', fontSize: '0.875rem',
          }}>
            <span style={{ fontSize: '1.5rem' }}>🗺️</span>
            <span>Mapa satelital</span>
            <span style={{ fontSize: '0.75rem' }}>(se carga automáticamente)</span>
          </div>
        )}
      </div>

      {verified && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(5,150,105,.08)', border: '1px solid rgba(5,150,105,.2)',
          borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.875rem',
          fontSize: '0.8125rem', color: 'var(--green)', fontWeight: 600,
        }}>
          <span>✅</span> Propiedad verificada por satélite
        </div>
      )}
    </div>
  )
}
