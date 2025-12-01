
import Link from "next/link";
export default function Header() {
  return (
    <header className="text-white bg-black mt-5 p-2">
      <ul className=" flex justify-around">
        <li><Link href="/posts">Post</Link></li>
        <li><Link href="/categories">Category</Link></li>
        <li><Link href="/comments">Comment</Link></li>
      </ul>
    </header>
  );
}
