import { FarmDetails } from '@/components/farms/farm-details'

export default async function FarmDetailsPage({ params }) {
  const { id } = await params
  return <FarmDetails id={id} />
}
