interface PageLoaderProps {
  label?: string
}

function PageLoader({ label = 'Loading' }: PageLoaderProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6">
      <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">{label}</p>
    </div>
  )
}

export default PageLoader
