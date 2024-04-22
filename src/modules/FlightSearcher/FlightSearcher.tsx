import { Card, LoadingOverlay } from '@mantine/core';
import { clsx } from 'clsx';
import styles from './FlightSearcher.module.css';
import { FlightPicker } from '@/components/FlightPicker';
import { useEffect, useMemo, useState } from 'react';
import { FlightAutocomplete } from '@/shared/types/FlightAutocomplete';
import { ResponseMock } from '@/shared/types/ResponseMock';
import { useDebouncedValue } from '@mantine/hooks';

export function FlightSearcher() {
  const [data, setData] = useState<FlightAutocomplete[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [debouncedSearch] = useDebouncedValue(search, 400);

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(`/api/flights/autocomplete?q=${search}`)
    const payload: ResponseMock<FlightAutocomplete> = await response.json()

    setData(payload.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [debouncedSearch])

  function handleChange(value: string) {
    if(loading) return

    setSearch(value)
  }

  const countries = useMemo(() => {
    return data.map(item => item.country)
  }, [data])

  return (
      <Card className={clsx(styles.card)} radius='sm' mx='md'>
        <FlightPicker data={countries} value={search} onChange={handleChange}  />
      </Card>
  );
}