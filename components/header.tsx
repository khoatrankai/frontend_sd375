import { Shield, Star } from "lucide-react"
import Image from "next/image"
import './styles.scss'

export default function Header() {
  return (

    <div className="w-full flex justify-center">
      <div className="w-full rounded-t-md overflow-hidden bg_header pb-2">
       <Image className="w-full" src={'/public/header.png'} alt="" width={100} height={100}/>
      </div>
      
    </div>
  )
}
