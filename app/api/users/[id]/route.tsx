import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
    request: NextRequest, 
    {params}: {params: {id: string}}) {
    // Fetch data from a db
    // If not found, return 404 error
    // Else return data

    const user = await prisma.user.findUnique({
        where: {id: parseInt(params.id)}
    })

    if (!user)
        return NextResponse.json({error: 'User not found'}, {status: 404})

    return NextResponse.json(user);
    //return NextResponse.json({id: 1, name: "Mosh"})
}

export async function PUT(
    request: NextRequest, 
    {params}: {params: {id:string}}) {
        //Validate request body
        //If invalid, return 400
        //Fetch the user with the given id
        //If doesn't exist, return 404
        //Update user
        //Return the updated user
        const body = await request.json();
        const validation = schema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.errors, {status: 400})
        }

        const user = await prisma.user.findUnique({
            where: {id: parseInt(params.id)}
        })

        if (!user) {
            return NextResponse.json({error: 'User not found'}, {status: 404})
        }

        const updatedUser = await prisma.user.update({
            where: {id: user.id},
            data: {
                name: body.name,
                email: body.email
            }
        })

        return NextResponse.json(updatedUser);
        //return NextResponse.json({id: 1, name: body.name})
    }

export async function DELETE(
    request: NextRequest, 
    {params}: {params: {id:string}}) {
        //Fetch the user from db
        //If not found, return 404
        //Delete the user
        //Return 200

        const user = await prisma.user.findUnique({
            where: {id: parseInt(params.id)}
        })

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        await prisma.user.delete({
            where: {id: user.id}
        });
        
        return NextResponse.json({});
    }