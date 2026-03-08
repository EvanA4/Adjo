import Link from 'next/link';

function Header() {
  return (
    <div className="h-18 bg-neutral-800 border-b border-b-neutral-700 flex">
        <Link href="/" className="h-full flex items-center gap-2 px-3">
            <img
                src="/svgs/icon.svg"
                className="h-[40%] w-auto"
            />
            <p className="text-xl w-fit">Adjo</p>
        </Link>
    </div>
  )
}

export default Header