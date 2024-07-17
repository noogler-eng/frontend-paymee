

export default function LinkTag({current}) {
  
  return (
    <a
      className="border-subtle bg-subtle group mb-5 flex w-max items-center gap-x-2 rounded-full border text-sm py-1 px-2 transition-colors hover:bg-black/5 focus-visible:bg-black/10"
      href={current == "Dashboard"?"/dashboard/transfer":"/dashboard"}
    >
      <span className="-ml-1 flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium text-white bg-black">
        NEW
      </span>
      {current=="Dashboard" ? "Transfer": "Dashboard"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-focus-visible:translate-x-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </a>
  );
}
