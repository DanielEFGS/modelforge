export interface MetadataInput {
  title: string;
  description: string;
  pathname: string;
  siteUrl: URL;
}

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    type: 'website';
    url: string;
  };
}

export function createMetadata(input: MetadataInput): PageMetadata {
  const pathname = input.pathname.startsWith('/')
    ? input.pathname
    : `/${input.pathname}`;
  const canonical = new URL(pathname, input.siteUrl).toString();

  return {
    title: input.title,
    description: input.description,
    canonical,
    openGraph: {
      title: input.title,
      description: input.description,
      type: 'website',
      url: canonical,
    },
  };
}
