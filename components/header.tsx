import { Shield, Star } from "lucide-react"
import Image from "next/image"

export default function Header() {
  return (

    <div className="w-full">
      <Image className="w-full" src={'/header.png'} alt="" width={100} height={100}/>
    </div>
  )
}
