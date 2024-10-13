import Image from "next/image"
import Link from "next/link"

export default function Logo() {
    return (
        <Link href="/" title="SCP Foundation">
            <Image alt="SCP Logo" src="/img/scp.svg" width={100} height={100} />
        </Link>
    )
}