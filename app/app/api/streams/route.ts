import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { YT_REGEX } from "@/app/lib/utils";
import youtubesearchapi from "youtube-search-api"



const CreateStreamSchema = z.object({
    creatorId : z.string(),
    url: z.string()

})


export async function POST(req: NextRequest) {
try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = YT_REGEX.test(data.url)
    if (!isYt) {
        return NextResponse.json ({
            message : "Wrong url format "
        } , {
            status : 411
        })
    }

    const extractedId = data.url.split("v=")[1]?.split("&")[0] ?? "";

    const res = await youtubesearchapi.GetVideoDetails(extractedId)
    console.log(res.title)
    console.log(res.thumbnail.thumbnails)
    const thumbnails = res.thumbnail.thumbnails
    thumbnails.sort((a: {width: number},b: {width: number}) => a.width < b.width ? -1 : 1)


    const stream = await prismaClient.stream.create({
        data : {
            userId : data.creatorId,
            url : data.url,
            extractedId ,
            type : "Youtube",
            title: res.title ?? "Can't find video",
            smallImg:
            (thumbnails.length > 1
                ? thumbnails[thumbnails.length - 2].url
                : thumbnails[thumbnails.length - 1].url) ??
            "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
            bigImg:
            thumbnails[thumbnails.length - 1].url ??
            "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",

        }
    })

    return NextResponse.json({
        message: "Stream created successfully", 
        stream 
    } , {
        status: 201
        })
    
} catch(e) {
    console.log(e)
    return NextResponse.json({
        message: "Error while adding a stream"
    } , {
        status: 500
    })
}
}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId") 
    const streams = await prismaClient.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    })

    return NextResponse.json({
        streams
    } , {
        status: 200
    })
}

export async function  DELETE(req: NextRequest) {
    
    
}
