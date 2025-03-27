import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'App Test',
    // short_name: 'PWA',
    // description: 'A Progressvie Web App with Next.js',
    // start_url: '/',
    // display: 'standalone',
    // background_color: '#ffffff',
    // theme_color: '#000000',
  }
}