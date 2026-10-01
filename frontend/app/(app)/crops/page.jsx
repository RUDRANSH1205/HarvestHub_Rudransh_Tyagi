'use client'

import { CrudPage } from '@/components/common/crud-page'
import { cropColumns, cropFormFields, emptyCrop } from '@/components/crops/crop-config'

export default function CropsPage() {
  return (
    <CrudPage
      title="Crops"
      description="The crops you grow and their requirements."
      collection="crops"
      singular="Crop"
      columns={cropColumns}
      formFields={cropFormFields}
      emptyValues={emptyCrop}
      searchKeys={['name', 'season']}
      detailsHref={(crop) => `/crops/${crop.id}`}
    />
  )
}
