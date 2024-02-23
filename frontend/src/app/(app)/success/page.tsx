import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-5xl">
        <b>Payment Successful</b>
      </h2>
      <Link className="text-xl" href={"/"}>
        Go to home
      </Link>
    </div>
  );
}
