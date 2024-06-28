import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ReactNode } from "react"
  
const CardComponent = ({children,cardTitle}:{children:ReactNode,cardTitle:string}) => {
  return (
    <Card className="w-fit mx-auto mt-10" >
    <CardHeader>
      <CardTitle>{cardTitle}</CardTitle>
    </CardHeader>
    <CardContent>
     {children}
    </CardContent>
   
  </Card>
  
  )
}

export default CardComponent
