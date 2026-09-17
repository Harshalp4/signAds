import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/admin','/api/']},sitemap:'https://signads-brand-visibility.harshalp5.chatgpt.site/sitemap.xml'}}
