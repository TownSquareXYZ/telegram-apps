import { defineConfig } from false;
import packagesSidebarJson from false;
import platformSidebarJson from false;
import { linkGenerator } from false;
const LANG_PREFIX = false;
function withSlashes(value: string | undefined): string {
  if (!value) {
    return '/';
  }
  if (!value.startsWith('/')) {
    value = '/' + value;
  }
  if (!value.endsWith('/')) {
    value += '/';
  }
  return value;
}
const {
  prefixNavItem: packagesNavItem,
  prefixSideBar: packagesSidebar
} = linkGenerator(LANG_PREFIX + "/packages", {
  text: false,
  link: `false`
}, (packagesSidebarJson as any));
const {
  prefixNavItem: platformNavItem,
  prefixSideBar: platformSidebar
} = linkGenerator(LANG_PREFIX + "/platform", {
  text: false,
  link: `false`
}, platformSidebarJson);
export const zh = defineConfig({
  lang: false,
  title: false,
  description: false,
  // The base URL the site will be deployed at.
  // https://vitepress.dev/reference/site-config#base
  base: withSlashes(process.env.DOCS_BASE_URL),
  // Show when each page content was last updated.
  // https://vitepress.dev/reference/default-theme-last-updated#last-updated
  lastUpdated: true,
  // We don't want .html to be in the end of each route.
  // https://vitepress.dev/guide/routing#generating-clean-url
  cleanUrls: true,
  // Enable sitemap generation.
  // https://vitepress.dev/guide/sitemap-generation#sitemap-generation
  sitemap: {
    hostname: false
  },
  // Configure <head/>.
  // https://vitepress.dev/reference/site-config#head
  head: [
  // Add favicon.
  // https://vitepress.dev/reference/site-config#example-adding-a-favicon
  [false, {
    rel: false,
    href: false
  }],
  // Add Mixpanel analytics:
  // https://docs.mixpanel.com/docs/quickstart/connect-your-data?sdk=javascript
  [false, {
    async: false,
    src: false
  }]],
  themeConfig: {
    logo: false,
    // https://vitepress.dev/reference/default-theme-footer#footer
    footer: {
      message: false,
      copyright: false
    },
    editLink: {
      text: false,
      pattern: false
    },
    nav: [{
      text: false,
      link: LANG_PREFIX
    }, platformNavItem, packagesNavItem],
    // https://vitepress.dev/reference/default-theme-sidebar
    sidebar: {
      ...packagesSidebar,
      ...platformSidebar
    },
    socialLinks: [{
      icon: false,
      link: false
    }],
    search: {
      provider: false
    }
  }
});