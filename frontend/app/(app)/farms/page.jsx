'use client'

import { CrudPage } from '@/components/common/crud-page'
import { emptyFarm, farmColumns, farmFormFields } from '@/components/farms/farm-config'

export default function FarmsPage() {
  return (
    <CrudPage
      title="Farms"
      description="All the farms you manage."
      collection="farms"
      singular="Farm"
      columns={farmColumns}
      formFields={farmFormFields}
      emptyValues={emptyFarm}
      searchKeys={['name', 'location']}
      detailsHref={(farm) => `/farms/${farm.id}`}
    />
  )
}
