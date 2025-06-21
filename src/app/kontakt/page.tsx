'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    console.log('Form data being sent:', data);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log('Response from API:', result);

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Takk for din henvendelse! Vi vil kontakte deg snart.',
        })
        reset()
      } else {
        throw new Error(result.error || 'Noe gikk galt')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Det oppstod en feil. Vennligst prøv igjen senere.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Kontakt oss</h1>
      
      {submitStatus.type && (
        <div
          className={`p-4 mb-6 rounded ${
            submitStatus.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Kontaktinformasjon</h2>
          <div className="space-y-4">
            <p>
              <strong>Adresse:</strong>
              <br />
              Storgata 1
              <br />
              0155 Oslo
            </p>
            <p>
              <strong>Telefon:</strong>
              <br />
              +47 972 90 600
            </p>
            <p>
              <strong>E-post:</strong>
              <br />
              post@kynetic.no
            </p>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Navn *
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Navn er påkrevd' })}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Ditt navn"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                E-post *
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'E-post er påkrevd',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Ugyldig e-postadresse',
                  },
                })}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="din@email.no"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Melding *
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message', { required: 'Melding er påkrevd' })}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Skriv din melding her..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message as string}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Sender...' : 'Send melding'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 