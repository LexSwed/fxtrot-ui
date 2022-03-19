import fs from 'fs';
import path from 'path';
import glob from 'glob';
import matter from 'gray-matter';

const ROOT_PATH = process.cwd();
const DOCS_PATH = path.join(ROOT_PATH, 'src/pages');

export const getDocsMeta = () => {
  const paths = glob.sync(`${DOCS_PATH}/**/*.mdx`);

  return paths.map((filePath) => {
    const source = fs.readFileSync(path.join(filePath), 'utf8');
    const { data } = matter(source);
    const href = filePath.replace(DOCS_PATH, '').replace('.mdx', '').replace('/index', '/');
    const [, section, component] = href.split('/');
    const capitalizedSection = component ? section.charAt(0).toUpperCase() + section.slice(1) : '';

    return {
      href,
      section: capitalizedSection,
      title: data.title,
    };
  });
};
