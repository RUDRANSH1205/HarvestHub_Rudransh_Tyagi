import { FieldDetails } from '@/components/fields/field-details'

export default async function FieldDetailsPage({ params }) {
  const { id } = await params
  return <FieldDetails id={id} />
}
