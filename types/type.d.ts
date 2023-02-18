declare interface CommentP {
  postId: string;
  comment?: {};
  newComment?: {};
}


// Firebase에서 가져온 data type
interface HomeListDBPropsJ {
  HomeListDB: {
    allHomeData: {}[];
  };
}



// adminPage - API로 받아오는 리스트 Props type
interface ListPropsJ {
  [key: string]: {}[];
}


// map, filter로 돌리는 리스트의 item type 
interface ItemJ {
  [key: string]: string;

}

// props로 넘기는 list type - props의 이름이 list 
interface PropsListJ {
  list: ItemJ
}  