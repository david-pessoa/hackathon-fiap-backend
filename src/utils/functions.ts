export function isUUID(id: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) return true;
  else return false;
}

export function isEmpty(list: any[]) {
  if (list.length == 0) return null;
  else return list;
}
