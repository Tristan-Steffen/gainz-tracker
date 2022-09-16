import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import type {User} from "@prisma/client"
import { db } from '../../lib/db'
import {hash, compare} from "bcrypt";




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {

  if(req.method === "POST"){
    
    const {username, password} = req.body;
    
    if(!username || !password) {
      //TODO: implement validation
      return {
        notFound: true
      }
    }
    
    const hashedPassword = await hash(password, 10);
      
    const newUser = await db.user.create({data: {
      username ,
      hash:hashedPassword
    }})
    
    res.status(200).json(newUser);
  }
}
