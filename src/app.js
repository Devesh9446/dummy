import cors from 'cors'
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

import express from 'express'
const app=express()
app.listen(proces.env.PORT,()=>{
    console.log(`app is listning on port :${process.env.PORT}`)
})

import userRoutes from './routes/user.routes.js'
app.use("/api/v1/users",userRoutes)

export {app}