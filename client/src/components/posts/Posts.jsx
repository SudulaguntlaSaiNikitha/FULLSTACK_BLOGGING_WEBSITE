// import Post from "../post/Post";
// import './posts.css';
// export default function Posts({posts}) {
//   return (
//     <div className="posts">
//     {posts.map((p)=>(
//         <Post post={p}/>
//       )) }
//       {/* <div className='po'> 
//       <Post/>
//       <Post/>
//       </div> 
//        <div className='po'> 
//       <Post/>
//       <Post/>
//       </div> 
//        <div className='po'>
//       <Post/>
//       <Post/>
//       </div>  */}

//     </div>
//   )
// }



import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
}