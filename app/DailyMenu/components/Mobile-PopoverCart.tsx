import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BackpackIcon } from "@radix-ui/react-icons";
import { TbShoppingCart, TbShoppingCartFilled } from "react-icons/tb";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react"
import useLocalStorage from "@/CustomHook/localstorage";
import { useEffect, useState } from "react";
import { Order, tartList, Tart } from "../data/DailyMenu";

export function PopoverCart() {
    const [orders, _1] = useLocalStorage("order", "");
    const [orderList, setOrderList] = useState<Order[]>([]);

    useEffect(() => {
        setOrderList(orders);
    }, [orders]);

    const product: Tart = 1
        ? tartList.filter((item) => item.id === "1")[0]
        : tartList[0];

    // 訂單數量
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    return (
        <>
            <div className="md:hidden">
                <Popover>
                    <div className="z-10 fixed bottom-4 right-4">
                        <PopoverTrigger>
                            <Avatar>
                                <AvatarFallback className="bg-slate-200">
                                    <BackpackIcon></BackpackIcon>
                                </AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                    </div>
                    <PopoverContent className="w-screen">
                        {/* <h1 className="pb-4 font-bold">看看你的購物車吧！</h1> */}
                        <div className="font-bold text-center pb-3">
                            查看單日訂單
                        </div>
                        <Carousel setApi={setApi}>
                            <CarouselContent className="px-10">
                                {orderList ? orderList.map((item) => (
                                    <CarouselItem key={item.date}>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>{item.date} 面交單</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                {item.order ? item.order.map((product) => {
                                                    const matchedItem = tartList.filter(
                                                        (item) => item.id === product.id
                                                    )[0];
                                                    return (
                                                        <p key={product.id}>
                                                            {matchedItem
                                                                ? `${matchedItem.name} * ${product.count} = ${product.count * matchedItem.price} NTD`
                                                                : `Product not found ${product.id}`}
                                                        </p>
                                                    );
                                                }) : ""}
                                            </CardContent>
                                            <CardFooter>
                                                <Button asChild>
                                                    <Link href="/DailyMenu/Checkout">查看訂單</Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </CarouselItem>
                                )) : ""}
                            </CarouselContent>
                            {/* <CarouselPrevious />
                            <CarouselNext /> */}
                        </Carousel>
                        <div className="py-2 flex justify-center text-center text-sm">
                            {/* {current} of {count} */}
                            {Array.from({ length: count }, (_, index) => {
                                return index + 1 === current ? (
                                    <TbShoppingCartFilled key={index} />
                                ) : (
                                    <TbShoppingCart key={index} />
                                );
                            })}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    );
}
