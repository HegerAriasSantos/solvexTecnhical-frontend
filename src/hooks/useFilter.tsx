export default function useFilter(services: any, search: any) {
  const result = services.filter((service: any) => {
    let searchContent = Object.entries(service).reduce((acc: any, [key, value]: any) => {
      if (typeof value === 'object') return acc;
      if (key === 'isDeleted') return acc;
      return acc + value;
    }, '');
    return `${searchContent}`.toLowerCase().includes(search.toLowerCase());
  });
  return result;
}
