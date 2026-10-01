import { CropDetails } from '@/components/crops/crop-details'

export default async function CropDetailsPage({ params }) {
  const { id } = await params
  return <CropDetails id={id} />
}
