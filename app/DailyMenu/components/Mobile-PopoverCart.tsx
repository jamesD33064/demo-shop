import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BackpackIcon } from "@radix-ui/react-icons"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PopoverCart() {
    return (
        <>
            <div className="md:hidden">
                <Popover>
                    <div className="z-10 fixed bottom-4 right-4">
                        <PopoverTrigger>
                            <Avatar>
                                <AvatarFallback className="bg-slate-200"><BackpackIcon></BackpackIcon></AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                    </div>
                    <PopoverContent>
                        <h1 className="pb-4">看看你的購物車吧！</h1>
                        <Carousel>
                            <CarouselContent>
                                <CarouselItem>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>5/1 面交單</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>抹茶*1 = $550</p>
                                            <p>無花果*1 = $680</p>
                                            <p>母親節限定*1 = $780</p>
                                            <p>檸檬*1 = $450</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button asChild>
                                                <Link href="/DailyMenu/Checkout">確認訂單</Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </CarouselItem>
                                <CarouselItem>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>5/2 面交單</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>抹茶*1 = $550</p>
                                            <p>無花果*1 = $680</p>
                                            <p>母親節限定*1 = $780</p>
                                            <p>檸檬*1 = $450</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button asChild>
                                                <Link href="/DailyMenu/Checkout">確認訂單</Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </CarouselItem>
                                <CarouselItem>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>5/3 面交單</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>抹茶*1 = $550</p>
                                            <p>無花果*1 = $680</p>
                                            <p>母親節限定*1 = $780</p>
                                            <p>檸檬*1 = $450</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button asChild>
                                                <Link href="/DailyMenu/Checkout">確認訂單</Link>
                                            </Button>
                                        </CardFooter>
                                    </Card></CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    )
}
