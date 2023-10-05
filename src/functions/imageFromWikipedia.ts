import WikiImage from '../interfaces/WikiImage';

export default async (query: string) => {
  try {
    const url = `http://en.wikipedia.org/w/api.php?action=query&titles=${query}&prop=pageimages&format=json&pithumbsize=640`;
    const response = await fetch(url);
    const data = (await response.json()) as WikiImage;
    const page = data.query.pages[Object.keys(data.query.pages)[0]];
    return page.thumbnail.source;
  } catch (error) {
    return `https://via.placeholder.com/640x480?text=${query}`;
  }
};
