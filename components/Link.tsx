import NextLink from 'next/link'

interface LinkProps {
  href: string
  children: React.ReactNode
}

export function Link({ href, children }: LinkProps) {
  const basePath = process.env.NODE_ENV === 'production' ? '/swush-me-app' : ''
  const fullHref = `${basePath}${href}`

  return <NextLink href={fullHref}>{children}</NextLink>
}
