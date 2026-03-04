import { useEffect, useMemo, useState } from 'react'

const translationCache = new Map()

const shouldTranslate = (value) => {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (!trimmed) return false
  if (/^https?:\/\//i.test(trimmed)) return false
  if (trimmed.startsWith('/')) return false
  if (trimmed.startsWith('#')) return false
  return true
}

const translateText = async (text, targetLang) => {
  if (!shouldTranslate(text)) return text
  const key = `${targetLang}::${text}`
  if (translationCache.has(key)) return translationCache.get(key)

  try {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`)
    if (!response.ok) throw new Error('Translation request failed')
    const data = await response.json()
    const translated = Array.isArray(data?.[0]) ? data[0].map((item) => item[0]).join('') : text
    translationCache.set(key, translated)
    return translated || text
  } catch (error) {
    console.warn('Translation error', error)
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
    if (targetLang === 'en') {
      setTranslated(baseContent)
      setLoading(false)
      return
    }

    const translateAll = async () => {
      setLoading(true)
      try {
        const clone = JSON.parse(JSON.stringify(baseContent))
        const translatedValues = await Promise.all(
          flattened.map(async ({ path, value }) => {
            if (!shouldTranslate(value)) return value
            return translateText(value, targetLang)
          })
        )

        if (cancelled) return

        flattened.forEach(({ path }, index) => {
          setDeep(clone, path, translatedValues[index])
        })

        setTranslated(clone)
      } catch (error) {
        console.error('Translation pipeline failed', error)
        setTranslated(baseContent)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    translateAll()

    return () => {
      cancelled = true
    }
  }, [baseContent, flattened, targetLang])

  return { content: translated, loading }
}
