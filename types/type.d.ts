declare interface CommentP {
  postId: string;
  comment?: {};
  newComment?: {};
}

// 'Users' 컬렉션 map 돌렸을 때
interface userProps {
  regions: string[];
  types: string[];
  userEmail: string;
  userName: string;
  userImage: string;
}
