import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-neutral-100">
      <div className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">404</p>
        <h1 className="mt-6 text-4xl font-medium uppercase tracking-[-0.05em] text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/work"
            className="border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.35em] text-white transition-colors hover:border-white/40"
          >
            View Work
          </Link>
          <Link
            to="/"
            className="px-5 py-3 text-xs uppercase tracking-[0.35em] text-neutral-500 transition-colors hover:text-white"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
