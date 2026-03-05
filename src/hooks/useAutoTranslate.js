import { useEffect, useMemo, useState } from 'react'

const translationCache = new Map()

const shouldTranslate = (value) => {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (!trimmed) return false
  if (/^https?:\/\//i.test(trimmed)) return false
  if (trimmed.startsWith('/')) return false
  if (trimmed.startsWith('#')) return false
  if (trimmed.length < 2) return false
  return true
}

const translateText = async (text, targetLang) => {
  if (!shouldTranslate(text)) return text
  const key = `${targetLang}::${text}`
  if (translationCache.has(key)) return translationCache.get(key)

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    const response = await fetch(url)
    
    if (response.status === 429) {
      console.warn('Google Translate: Muitas requisições. Aguardando...')
      return text
    }

    if (!response.ok) throw new Error('Falha na requisição')
    
    const data = await response.json()
    const translated = Array.isArray(data?.[0]) ? data[0].map((item) => item[0]).join('') : text
    
    if (translated) {
      translationCache.set(key, translated)
      return translated
    }
    return text
  } catch (error) {
    return text
  }
}

const flattenContent = (content) => {
  const entries = []
  const walk = (value, path) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, [...path, index]))
      return
    }
    if (value && typeof value === 'object') {
      Object.entries(value).forEach(([key, child]) => walk(child, [...path, key]))
      return
    }
    entries.push({ path, value })
  }
  walk(content, [])
  return entries
}

const setDeep = (target, path, value) => {
  let current = target
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]
    if (typeof key === 'number') {
      if (!Array.isArray(current[key])) current[key] = []
      current = current[key]
    } else {
      if (!current[key]) current[key] = typeof path[i + 1] === 'number' ? [] : {}
      current = current[key]
    }
  }
  const last = path[path.length - 1]
  current[last] = value
}

export const useAutoTranslate = (baseContent, targetLang) => {
  const [translated, setTranslated] = useState(baseContent)
  const [loading, setLoading] = useState(false)

  const flattened = useMemo(() => flattenContent(baseContent), [baseContent])

  useEffect(() => {
    let cancelled = false
    
    if (targetLang === 'pt' || !targetLang) {
      setTranslated(baseContent)
      setLoading(false)
      return
    }

    const translateAll = async () => {
      setLoading(true)
      try {
        const clone = JSON.parse(JSON.stringify(baseContent))
        const translatedValues = []
        for (const item of flattened) {
          if (cancelled) return
          if (shouldTranslate(item.value)) {
            const t = await translateText(item.value, targetLang)
            translatedValues.push(t)
            await new Promise(r => setTimeout(r, 50))
          } else {
            translatedValues.push(item.value)
          }
        }

        if (cancelled) return

        flattened.forEach(({ path }, index) => {
          setDeep(clone, path, translatedValues[index])
        })

        setTranslated(clone)
      } catch (error) {
        setTranslated(baseContent)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    translateAll()
    return () => { cancelled = true }
  }, [baseContent, flattened, targetLang])

  return { content: translated, loading }
}
