/*
  와인 리스트의 와인, 댓글 리스트의 댓글 정렬을 위함.
*/

export const sortingList = (key, order, itemList) => {
  if (order === 'asc') {
    itemList.sort((a, b) => {
      return Number(a[key]) < Number(b[key]) ? -1 : Number(a[key]) > Number(b[key]) ? 1 : 0;
    })
  } else {
    itemList.sort((a, b) => {
      return Number(a[key]) > Number(b[key]) ? -1 : Number(a[key]) < Number(b[key]) ? 1 : 0;
    })
  }
  return itemList;
}
