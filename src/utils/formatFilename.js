export default function formatFilename(path) {
  const filename = path.match(/[^/]+$/)?.[0];

  if (!filename) {
    throw new Error('Filename not found in the provided path.');
  }

  const [uniqueId, ...rest] = filename.split('_');

  return `${uniqueId.substring(0, 8)}...${rest.join('_')}`;
}