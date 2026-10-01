'use client'

import useSWR from 'swr'
import { services } from '@/lib/api/services'
import { useAuth } from '@/context/auth-context'

/**
 * Loads a list of records (e.g. 'farms') and gives you add / update / remove helpers.
 * Data is cached by SWR, so every page using the same collection stays in sync.
 *
 *   const { items, add, update, remove } = useCollection('farms')
 */
export function useCollection(name) {
  const service = services[name]
  const { user } = useAuth()
  // Keyed by user so switching accounts never shows the previous user's cached data
  const { data, error, isLoading, mutate } = useSWR(user ? [name, user.id] : null, () => service.getAll())

  async function add(item) {
    await service.create(item)
    await mutate()
  }

  async function update(id, item) {
    await service.update(id, item)
    await mutate()
  }

  async function remove(id) {
    await service.remove(id)
    await mutate()
  }

  return { items: data || [], isLoading, error, add, update, remove }
}
