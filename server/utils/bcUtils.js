export function removeIdentifierInArr(data) {
  let newList = [];
  // data.forEach(item => {
  //   newList.push(removeIdentifier(item));
  // })
  return newList;
}

export function removeIdentifier(string) {
  let split = string.split("#");
  return split.length === 1 ? split[0] : split[1];
}
