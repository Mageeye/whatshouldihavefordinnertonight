import Link from 'next/link'

export interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

const BASE_URL = 'https://www.dinnerdecisionmaker.com'

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Always include Home as the first item
  const allItems: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    ...items,
  ]

  // Generate BreadcrumbList JSON-LD schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-muted-foreground/50" aria-hidden="true">
                  /
                </span>
              )}
              {index === allItems.length - 1 ? (
                // Last item (current page) - not a link
                <span className="text-foreground font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                // Link to parent pages
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
