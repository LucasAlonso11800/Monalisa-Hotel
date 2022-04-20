import { StaticImageData } from "next/image";

export type Layout = {
    id: string
    children: React.ReactNode | React.ReactNode[]
}
export type Head = {
    title: string
};

export type Header = {
    image: StaticImageData
    children: React.ReactNode | React.ReactNode[]
}