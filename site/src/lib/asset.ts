/** Resolves a file in /public relative to wherever the site is hosted (domain root, sub-folder such as GitHub Pages, etc.). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
